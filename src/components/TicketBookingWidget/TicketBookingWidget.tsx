import "./TicketBookingWidget.css";
import swapIcon from "../../assets/img/icon/swap.svg";

const TicketBookingWidget = () => {
  return (
    <div className="ticket-booking-widget">
      <label className="ticket-booking-widget__label">
        <span className="ticket-booking-widget__title-label">Напрвление</span>
        <input type="text" className="ticket-booking-widget__input" />
        <img src={swapIcon} className="ticket-booking-widget__swap" />
        <input type="text" className="ticket-booking-widget__input" />
      </label>
      <label className="ticket-booking-widget__label">
        <span className="ticket-booking-widget__title-label">Дата</span>
        <input type="text" className="ticket-booking-widget__input" />
        <input type="text" className="ticket-booking-widget__input" />
      </label>
    </div>
  );
}

export default TicketBookingWidget;