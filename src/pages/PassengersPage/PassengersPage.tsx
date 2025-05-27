import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addPassenger } from "../../slices/passengersSlice";
import { TPassengerInfo } from "../../models";
import { TicketSearchForm, OrderProgressBar, DetailsTripPanel, PassengerForm, Button } from "../../components";
import { PlusIconSvg } from "../../components/icons";
import "./PassengersPage.css";

const PassengersPage = () => {
  const [openForms, setOpenForms] = useState<number[]>([0]);
  const [validForms, setValidForms] = useState<number[]>([]);
  const { selectedTrain } = useAppSelector(state => state.trains);
  const { selectedSeats } = useAppSelector(state => state.seats);
  const { departure } = useAppSelector(state => state.passengers);

  // console.log("PassengersPage", selectedSeats)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const newPassengers: TPassengerInfo[] = selectedSeats["from"].map((seat) => {
      const passenger = departure.seats.find(s =>
        s.coach_id === seat.coach_id && s.seat_number === seat.seat_number);

      return {
        coach_id: seat.coach_id,
        person_info: {
          is_adult: seat.is_adult,
          first_name: passenger?.person_info.first_name || "",
          last_name: passenger?.person_info.last_name || "",
          patronymic: passenger?.person_info.patronymic || "",
          gender: passenger?.person_info.gender || "",
          birthday: passenger?.person_info.birthday || "",
          document_type: passenger?.person_info.document_type || "",
          document_data: passenger?.person_info.document_data || ""
        },
        seat_number: seat.seat_number,
        is_child: seat.is_child,
        include_children_seat: seat.include_children_seat,
      }
    });

    dispatch(addPassenger({
      type: "departure",
      value: {
        route_direction_id: selectedTrain ? selectedTrain.departure._id : "",
        seats: newPassengers,
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addValidForm = (formNumber: number) => {
    if (!validForms.includes(formNumber)) {
      setValidForms([...validForms, formNumber]);
    }
  }

  const deleteValidForm = (formNumber: number) => {
    if (validForms.includes(formNumber)) {
      const newValidForms = validForms.filter(num => num !== formNumber)
      setValidForms(newValidForms);
    }
  }

  const toggleVisibilityForm = useCallback((numberForm: number): void => {
    if (!openForms.includes(numberForm)) {
      setOpenForms(prev => [...prev, numberForm]);
    } else {
      setOpenForms(openForms.filter(number => number !== numberForm));
    }
  }, [openForms]);

  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={2} />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <DetailsTripPanel />
        </aside>

        <main className="main-select-seats">
          {openForms && selectedSeats["from"].map((seat, index) => {
            return <PassengerForm
              key={`${seat.coach_id}-${seat.seat_number}`}
              isOpenForm={openForms.includes(index) ? true : false}
              passengerNumber={index}
              lastForm={index === (selectedSeats["from"].length - 1) ? true : false}
              seat={seat}
              toggleVisibilityForm={toggleVisibilityForm}
              addValidForm={addValidForm}
              deleteValidForm={deleteValidForm}
            />
          })}

          <button
            className="passenger__add-passenger-form-btn"
            onClick={() => navigate("/seats", {state: {updatePassengers: true}})}
          >
            Добавить пассажира
            <PlusIconSvg width={18} fill='#ffa800' />
          </button>

          <Button
            name="Далее"
            className={selectedSeats["from"].length === validForms.length
              ? "next-btn"
              : "next-btn next-btn--disable"}
            handler={() =>
              selectedSeats["from"].length === validForms.length &&
              navigate("/payment", { replace: true })}
          />
        </main>
      </div>
    </>
  );
}

export default PassengersPage;