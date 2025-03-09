import "./TicketSearchForm.css";

const TicketBookingWidget = ({className}: {className?: string}) => {


  return (
    <form className={className || "ticket-search-form"}>
      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Напрвление</span>
        <input type="text" className="ticket-search-form__input" />
        <button
          type="button"
          className="ticket-search-form__swap-btn"
          aria-label="Поменять местами точки отправления и прибытия"
        />
        <input type="text" className="ticket-search-form__input" />
      </div>

      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Дата</span>
        <input type="text" className="ticket-search-form__input" />
        <input type="text" className="ticket-search-form__input" />
      </div>

      <button className="ticket-search-form__submit-btn">Найти билеты</button>
    </form>
  );
}

export default TicketBookingWidget;