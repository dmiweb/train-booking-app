import { useAppSelector } from '../../hooks';
import { TTrain } from '../../models';
import { TicketSearchForm, OrderProgressBar, DetailsTripPanel, ConfirmOrder } from "../../components";

const ConfirmPage = () => {
  const { selectedTrain } = useAppSelector(state => state.trains);
  const { seats } = useAppSelector(state => state.passengers.departure);

  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={4} />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <DetailsTripPanel />
        </aside>

        <main className="main-select-seats">
          {selectedTrain &&
            <ConfirmOrder
              selectedTrain={selectedTrain as TTrain}
              seats={seats}
            />}

        </main>
      </div>
    </>
  );
}

export default ConfirmPage;