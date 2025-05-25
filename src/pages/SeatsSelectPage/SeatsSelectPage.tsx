import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOpenModal, setCloseModal } from "../../slices/modalSlice";
import { requestLastTickets } from "../../slices/lastTicketsSlice";
import { requestSeats } from "../../slices/seatsSlice";
import { TTrain, TLastTicket } from "../../models";
import { Loader, Modal, MessageWidget, TicketSearchForm, OrderProgressBar, LoadingProgressBar, LastTicketsWidget, List, LastTicketItem, FilterPanel, SelectSeats, Button } from "../../components";
import "./SeatsSelectPage.css";

const SeatsSelectPage = () => {
  const { isOpen } = useAppSelector(state => state.modal);
  const train = useAppSelector(state => state.trains.selectedTrain) as TTrain;
  const { activeTypeSeat, seatsFrom, seatsTo, selectedSeats, loading, error } = useAppSelector(state => state.seats);
  const { lastTickets } = useAppSelector(state => state.lastTickets);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestLastTickets());
    dispatch(requestSeats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(setOpenModal());
    } else {
      dispatch(setCloseModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const renders = {
    lastTicket: useCallback(
      (item: TLastTicket) => {
        return <LastTicketItem item={item} />;
      }, [])
  };

  return (
    <>
      {
        <Modal>
          {error &&
            <MessageWidget typeMessage="error"
              title={error}
              handlerMessageBtn={() => dispatch(requestSeats())}
            />}

          {isOpen && !error && (!activeTypeSeat.from || !activeTypeSeat.to) &&
            <MessageWidget typeMessage="info"
              title="Выберите тип билета!"
              text="Перед выбором места, выберите тип билета - взрослый, детский или детский без места."
              handlerMessageBtn={() => dispatch(setCloseModal())}
            />}
        </Modal>}

      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={1} />

      <LoadingProgressBar
        start={loading}
        requestStatus={seatsFrom.length ? true : false}
        error={error ? true : false}
      />

      {loading && <Loader />}

      {!loading && seatsFrom &&
        <div className="order-page-wrap">
          <aside className="sidebar">
            <FilterPanel />

            <LastTicketsWidget>
              {lastTickets.length
                ? <List
                  list={lastTickets}
                  classNameItem="last-tickets__item"
                  limit={3}
                  renderItem={renders.lastTicket}
                />
                : null}
            </LastTicketsWidget>
          </aside>

          <main className="main-select-seats">
            <h2 className="main-select-seats__title">Выбор мест</h2>

            <SelectSeats direction="from" train={train} seats={seatsFrom} />

            {train?.arrival && <SelectSeats direction="to" train={train} seats={seatsTo} />}

            <Button
              name="Далее"
              className={selectedSeats["from"].length
                ? "next-btn"
                : "next-btn next-btn--disable"}
              handler={() => {
                if (selectedSeats["from"].length) {
                  navigate("/passengers", { replace: true });
                }
              }}
            />
          </main>
        </div>}
    </>
  );
}

export default SeatsSelectPage;