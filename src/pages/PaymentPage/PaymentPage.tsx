import { TicketSearchForm, OrderProgressBar, LoadingProgressBar, DetailsTripPanel, PaymentForm } from "../../components";
// import { СurrencyIconSvg } from "../../components/icons";
import "./PaymentPage.css";

const PaymentPage = () => {
  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={3} />
      <LoadingProgressBar />

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