import { TicketSearchForm, OrderProgressBar, LoadingProgressBar, DetailsTripPanel, ConfirmOrder } from "../../components";
// import { СurrencyIconSvg } from "../../components/icons";
import "./ConfirmPage.css";

const ConfirmPage = () => {
  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={4} />
      <LoadingProgressBar />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <DetailsTripPanel />
        </aside>

        <main className="main-select-seats">
        <ConfirmOrder />

        </main>
      </div>
    </>
  );
}

export default ConfirmPage;