import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCityDeparture, setCityArrival, requestCities } from "../../slices/citiesSlice";
import { requestLastTickets } from "../../slices/lastTicketsSlice";
import { requestTrains, setPage, setMinPrice } from "../../slices/trainSlice";
import { setFromCityId, setToCityId, setPriceFrom, setPriceTo, setDateStart, setDateEnd, setOffset } from "../../slices/queryParamsSlice";
import { TCities } from "../../models";
import { SearchCity, Calendar, Button } from "../../components";
import { timestampToDate } from "../../utils/timestampToDate";
import "./TicketSearchForm.css";

const TicketSearchForm = ({ className }: { className?: string }) => {
  const [activeDirection, setActiveDirection] = useState<"departure" | "arrival" | null>(null);
  const [isOpenCityFrom, setIsOpenCityFrom] = useState(false);
  const [isOpenCityTo, setIsOpenCityTo] = useState(false);
  const [isOpenCalendarFrom, setIsOpenCalendarFrom] = useState(false);
  const [isOpenCalendarTo, setIsOpenCalendarTo] = useState(false);

  const CityFromRef = useRef<HTMLUListElement>(null);
  const CityToRef = useRef<HTMLUListElement>(null);
  const calendarFromRef = useRef<HTMLDivElement>(null);
  const calendarToRef = useRef<HTMLDivElement>(null);

  const { cityDeparture, cityArrival } = useAppSelector(state => state.cities);
  const { from_city_id, to_city_id, date_start, date_end } = useAppSelector(state => state.queryParams);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpenCityFrom && CityFromRef.current && !CityFromRef.current.contains(event.target as Node)) {
        setIsOpenCityFrom(false);
      }

      if (isOpenCityTo && CityToRef.current && !CityToRef.current.contains(event.target as Node)) {
        setIsOpenCityTo(false);
      }

      if (
        isOpenCalendarFrom &&
        calendarFromRef.current &&
        !calendarFromRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalendarFrom(false);
      }

      // Проверяем, что клик был НЕ внутри календаря "To"
      if (
        isOpenCalendarTo &&
        calendarToRef.current &&
        !calendarToRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalendarTo(false);
      }
    };

    // Добавляем обработчик только если хотя бы один календарь открыт
    if (isOpenCityFrom || isOpenCityTo || isOpenCalendarFrom || isOpenCalendarTo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenCityFrom, isOpenCityTo, isOpenCalendarFrom, isOpenCalendarTo]);

  const onSelectDepartureCity = (city: TCities): void => {
    dispatch(setCityDeparture(city.name));
    dispatch(setFromCityId(city._id));
    setActiveDirection(null);
  }

  const onSelectArrivalCity = (city: TCities): void => {
    dispatch(setCityArrival(city.name));
    dispatch(setToCityId(city._id));
    setActiveDirection(null);
  }

  const onSelectFromDate = (day: string) => {
    dispatch(setDateStart(day));
    setIsOpenCalendarFrom(false);
  }

  const onSelectToDate = (day: string) => {
    dispatch(setDateEnd(day));
    setIsOpenCalendarTo(false);
  }

  const handleSubmitBtn = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!date_start) {
      const currentDate = timestampToDate((Date.now() / 1000), "yyyy-mm-dd");
      dispatch(setDateStart(currentDate));
    }

    dispatch(setPriceFrom(0));
    dispatch(setPriceTo(0));
    dispatch(setOffset(0));
    dispatch(setPage(1));
    dispatch(setMinPrice(0));
    dispatch(requestTrains());
    dispatch(requestLastTickets())
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
              value={cityDeparture}
              placeholder="Откуда"
              onChange={(e) => dispatch(setCityDeparture(e.target.value))}
              onFocus={(e) => {
                setIsOpenCityFrom(true);
                setActiveDirection("departure");
                if (e.target.value !== "") dispatch(requestCities(e.target.value));
              }}
              autoComplete="off"
              required
            />
            {isOpenCityFrom &&
              <SearchCity
                value={cityDeparture ? cityDeparture : ""}
                isVisible={activeDirection === "departure"}
                onSelect={onSelectDepartureCity}
                ref={CityFromRef}
              />}
          </div>

          <button
            type="button"
            className="ticket-search-form__swap-btn"
            aria-label="Поменять местами точки отправления и прибытия"
            onClick={() => {
              dispatch(setCityDeparture(cityArrival))
              dispatch(setCityArrival(cityDeparture))
              dispatch(setFromCityId(to_city_id));
              dispatch(setToCityId(from_city_id));
            }}
          />

          <div className="ticket-search-form__direction-fields-wrap">
            <input
              type="text"
              className="ticket-search-form__input"
              name="arrival"
              value={cityArrival}
              placeholder="Куда"
              onChange={(e) => dispatch(setCityArrival(e.target.value))}
              onFocus={(e) => {
                setIsOpenCityTo(true)
                setActiveDirection("arrival");
                if (e.target.value !== "") dispatch(requestCities(e.target.value));
              }}
              autoComplete="off"
              required
            />
            {isOpenCityTo &&
              <SearchCity
                value={cityArrival ? cityArrival : ""}
                isVisible={activeDirection === "arrival"}
                onSelect={onSelectArrivalCity}
                ref={CityToRef}
              />}
          </div>
        </div>
      </div>

      <div className="ticket-search-form__container">
        <span className="ticket-search-form__container-title">Дата</span>
        <div className="ticket-search-form__date-fields">
          <div className="ticket-search-form__date-fields-calendar">
            <input
              type="date"
              className={date_start
                ? "ticket-search-form__date-input"
                : "ticket-search-form__date-input ticket-search-form__date-input--mask"}
              name="date-from"
              value={date_start}
              placeholder="ДД.ММ.ГГГГ"
              onChange={(e) => dispatch(setDateStart(e.target.value))}
              onClick={() => setIsOpenCalendarFrom(true)}
              autoComplete="off"
            />

            {isOpenCalendarFrom &&
              <Calendar
                selectedDate={date_start}
                handler={onSelectFromDate}
                ref={calendarFromRef}
              />}
          </div>

          <div className="ticket-search-form__date-fields-calendar">
            <input
              type="date"
              className={date_end
                ? "ticket-search-form__date-input"
                : "ticket-search-form__date-input ticket-search-form__date-input--mask"}
              name="date-to"
              value={date_end}
              placeholder="ДД.ММ.ГГГГ"
              onChange={(e) => dispatch(setDateEnd(e.target.value))}
              onClick={() => setIsOpenCalendarTo(true)}
              autoComplete="off"
            />

            {isOpenCalendarTo &&
              <Calendar
                selectedDate={date_end}
                handler={onSelectToDate}
                ref={calendarToRef}
              />}
          </div>
        </div>
      </div>

      <div className="ticket-search-form__container-submit-btn">
        <Button name="Найти билеты" type="submit" className="searh-tickets-btn" />
      </div>
    </form>
  );
}

export default TicketSearchForm;