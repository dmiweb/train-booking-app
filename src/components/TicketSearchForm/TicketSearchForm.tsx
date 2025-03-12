import { useNavigate } from "react-router-dom";
import "./TicketSearchForm.css";

const TicketBookingWidget = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleSubmitBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/trains");
  }

  return (
    <form className={className || "ticket-search-form"} onSubmit={handleSubmitBtn}>
      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Напрвление</span>
        <div className="ticket-search-form__direction-fields">
          <input type="text" className="ticket-search-form__input" />
          <button
            type="button"
            className="ticket-search-form__swap-btn"
            aria-label="Поменять местами точки отправления и прибытия"
          />
          <input type="text" className="ticket-search-form__input" />
        </div>
      </div>

      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Дата</span>
        <div className="ticket-search-form__date-fields">
          <input type="text" className="ticket-search-form__input" />
          <input type="text" className="ticket-search-form__input" />
        </div>
      </div>

      <div className="ticket-search-form__container-submit-btn">
        <button className="ticket-search-form__submit-btn">Найти билеты</button>
      </div>
    </form>
  );
}

export default TicketBookingWidget;