import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOrder } from "../../slices/orderSlice";
import { TicketSearchForm, OrderProgressBar, DetailsTripPanel, PaymentForm } from "../../components";

const PaymentPage = () => {
  const passengers = useAppSelector(state => state.passengers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOrder({
      user: {
        first_name: "",
        last_name: "",
        patronymic: "",
        phone: "",
        email: "",
        payment_method: "",
      },
      departure: passengers.departure,
      arrival: passengers.arrival,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={3} />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <DetailsTripPanel />
        </aside>

        <main className="main-select-seats">
          <PaymentForm />
        </main>
      </div>
    </>
  );
}

export default PaymentPage;