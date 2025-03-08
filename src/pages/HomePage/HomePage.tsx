import { SloganCompany, TicketBookingWidget } from "../../components";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section className="order-tickets-section">
        <SloganCompany />
        <div className="order-tickets-section__container">
          <TicketBookingWidget />
        </div>
      </section>
    </>
  );
}

export default HomePage;