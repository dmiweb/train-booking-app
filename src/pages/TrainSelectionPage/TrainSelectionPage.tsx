import { LoadingProgressBar, OrderProgressBar, TicketSearchForm, FilterPanel } from "../../components";
import "./TrainSelectionPage.css";

const TrainSelectionPage = () => {
  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={1} />
      <LoadingProgressBar />
      <div className="order-page-wrap">
        <aside className="sidebar">
          <FilterPanel />
        </aside>

        <main className="main">
          
        </main>
      </div>
    </>
  );
}

export default TrainSelectionPage;