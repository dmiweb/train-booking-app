import {
  LoadingProgressBar, OrderProgressBar, TicketSearchForm, FilterPanel, TrainListToolbar, TrainList } from "../../components";
import "./TrainSelectPage.css";

const TrainSelectPage = () => {
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
          {/* <LastTicketsWidget /> */}
        </aside>

        <main className="main-train-selection-page">
          <TrainListToolbar />
          <TrainList />
        </main>
      </div>
    </>
  );
}

export default TrainSelectPage;