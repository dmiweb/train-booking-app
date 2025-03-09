import { SloganCompany, TicketSearchForm } from "../../components";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section className="order-tickets-section-homepage">
        <SloganCompany />
        <div className="order-tickets-section-homepage__container">
          <TicketSearchForm className="ticket-search-form ticket-search-form--homepage" />
        </div>
      </section>
    </>
  );
}

export default HomePage;