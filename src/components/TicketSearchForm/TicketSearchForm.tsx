import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchCity } from "../../components";
import "./TicketSearchForm.css";

const TicketBookingWidget = ({ className }: { className?: string }) => {
  const [activeDirection, setActiveDirection] = useState<"departure" | "arrival" | null>(null);
  const [departure, setDeparture] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");

  console.log(departure)


  const navigate = useNavigate();

  const onSelectDepartureCity = (city: string): void => {
    console.log(city)
    setDeparture(city);
    setActiveDirection(null);
  }

  const onSelectArrivalCity = (city: string): void => {
    console.log(city)
    setArrival(city);
    setActiveDirection(null);
  }

  const handleSubmitBtn = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate("/trains");
  }

  return (
    <form className={className || "ticket-search-form"} onSubmit={handleSubmitBtn}>
      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Напрвление</span>
        <div className="ticket-search-form__direction-fields">
          <div className="ticket-search-form__direction-fields-wrap">
            <input
              type="text"
              className="ticket-search-form__input"
              name="departure"
              value={departure}
              placeholder="Откуда"
              onChange={(e) => setDeparture(e.target.value)}
              onFocus={() => setActiveDirection("departure")}
              // onBlur={() => setActiveDirection(null)}
              autoComplete="off"
            />
            <SearchCity
              value={departure ? departure : ""}
              isVisible={activeDirection === "departure"}
              onSelect={onSelectDepartureCity}
            />
          </div>

          <button
            type="button"
            className="ticket-search-form__swap-btn"
            aria-label="Поменять местами точки отправления и прибытия"
          />
          <div className="ticket-search-form__direction-fields-wrap">
            <input
              type="text"
              className="ticket-search-form__input"
              name="arrival"
              value={arrival}
              placeholder="Куда"
              onChange={(e) => setArrival(e.target.value)}
              onFocus={() => setActiveDirection("arrival")}
              // onBlur={() => setActiveDirection(null)}
              autoComplete="off"
            />
            <SearchCity
              value={arrival ? arrival : ""}
              isVisible={activeDirection === "arrival"}
              onSelect={onSelectArrivalCity}
            />
          </div>
        </div>
      </div>

      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Дата</span>
        <div className="ticket-search-form__date-fields">
          <input type="text" className="ticket-search-form__input" name="date-to" placeholder="ДД.ММ.ГГГГ" />
          <input type="text" className="ticket-search-form__input" name="date-from" placeholder="ДД.ММ.ГГГГ" />
        </div>
      </div>

      <div className="ticket-search-form__container-submit-btn">
        <button className="ticket-search-form__submit-btn">Найти билеты</button>
      </div>
    </form>
  );
}

export default TicketBookingWidget;