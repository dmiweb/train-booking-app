import { useNavigate } from "react-router-dom";
import { TicketSearchForm, OrderProgressBar, LoadingProgressBar, DetailsTripPanel, PassengerForm } from "../../components";
// import { СurrencyIconSvg } from "../../components/icons";
import "./PassengersPage.css";

const PassengersPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={2} />
      <LoadingProgressBar />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <DetailsTripPanel />
        </aside>

        <main className="main-select-seats">
          <PassengerForm />

          <button onClick={() => navigate('/payment')}>Далее</button>
        </main>
      </div>
    </>
  );
}

export default PassengersPage;