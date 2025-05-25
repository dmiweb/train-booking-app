import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { requestTrains, setMinPrice } from "../../slices/trainSlice";
import { setDateStart, setDateEnd, setPriceFrom, setPriceTo } from "../../slices/queryParamsSlice";
import { TTrain } from "../../models";
import { Calendar, FilterOptions, DoubleRangeSlider, FilterTime } from "../../components";
import "./FilterPanel.css";

const FilterPanel = () => {
  const [isOpenCalendarFrom, setIsOpenCalendarFrom] = useState(false);
  const [isOpenCalendarTo, setIsOpenCalendarTo] = useState(false);
  const trains: TTrain[] = useAppSelector(state => state.trains.trains.items) || [];

  const {
    date_start, date_end,
    price_from, price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to
  } = useAppSelector(state => state.queryParams);
  const { minPrice, maxPrice } = useAppSelector(state => state.trains);

  const calendarFromRef = useRef<HTMLDivElement>(null);
  const calendarToRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelectFromDate = (day: string) => {
    dispatch(setDateStart(day));
    setIsOpenCalendarFrom(false);

    dispatch(requestTrains());
    navigate("/trains");
  }

  const onSelectToDate = (day: string) => {
    dispatch(setDateEnd(day));
    setIsOpenCalendarTo(false);

    dispatch(requestTrains());
    navigate("/trains");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    if (isOpenCalendarFrom || isOpenCalendarTo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenCalendarFrom, isOpenCalendarTo]);

  useEffect(() => {
    if (minPrice === 0) {
      const prices = trains.map(item => item.min_price) || [];
      const min = Math.min(...prices);

      if (min === Infinity) {
        dispatch(setMinPrice(0));
      } else {
        dispatch(setMinPrice(min));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="filter-panel" aria-label="Набор фильтров поездки">
      <form className="filter-panel__form">
        <div className="filter-panel__container">
          <div className="filter-dates">
            <div className="filter-dates__container">
              <label className="filter-dates__label">
                <span className="filter-dates__title-input">Дата поездки</span>
                <input
                  type="date"
                  className={date_start
                    ? "filter-dates__input"
                    : "filter-dates__input filter-dates__input--mask"}
                  name="date-from"
                  value={date_start}
                  placeholder="ДД.ММ.ГГГГ"
                  onChange={(e) => dispatch(setDateStart(e.target.value))}
                  onClick={() => setIsOpenCalendarFrom(true)}
                  autoComplete="off"
                />
              </label>

              {isOpenCalendarFrom &&
                <Calendar
                  className="filter-dates__calendar"
                  selectedDate={date_start}
                  handler={onSelectFromDate}
                  ref={calendarFromRef}
                />}
            </div>
            
            <div className="filter-dates__container">
              <label className="filter-dates__label">
                <span className="filter-dates__title-input">Дата возвращения</span>
                <input
                  type="date"
                  className={date_end
                    ? "filter-dates__input"
                    : "filter-dates__input filter-dates__input--mask"}
                  name="date-to"
                  value={date_end}
                  placeholder="ДД.ММ.ГГГГ"
                  onChange={(e) => dispatch(setDateEnd(e.target.value))}
                  onClick={() => setIsOpenCalendarTo(true)}
                  autoComplete="off"
                />
              </label>

              {isOpenCalendarTo &&
                <Calendar
                  className="filter-dates__calendar"
                  selectedDate={date_end}
                  handler={onSelectToDate}
                  ref={calendarToRef}
                />}
            </div>
          </div>
        </div>

        <div className="filter-panel__container">
          <FilterOptions />
        </div>

        <div className="filter-panel__container">
          <div className="filter-prices">
            <div className="filter-prices__title">Стоимость</div>

            <div className="filter-prices__range-name">
              <span className="filter-prices__range-name-from">от</span>
              <span className="filter-prices__range-name-to">до</span>
            </div>
            <DoubleRangeSlider
              type="price"
              min={minPrice}
              max={maxPrice}
              minValue={price_from}
              maxValue={price_to}
              step={1}
              trackHeight={19}
              thumbWidth={24}
              thumbGap={10}
              onMinChange={(value) => dispatch(setPriceFrom(value))}
              onMaxChange={(value) => dispatch(setPriceTo(value))}
            />
          </div>
        </div>

        <div className="filter-panel__container">
          <FilterTime
            title="Туда"
            direction="from"
            minValueDepartureFrom={start_departure_hour_from}
            maxValueDepartureTo={start_departure_hour_to}
            minValueArrivalFrom={start_arrival_hour_from}
            maxValueArrivalTo={start_arrival_hour_to}
          />
        </div>

        <div className="filter-panel__container">
          <FilterTime
            title="Обратно"
            direction="to"
            minValueDepartureFrom={end_departure_hour_from}
            maxValueDepartureTo={end_departure_hour_to}
            minValueArrivalFrom={end_arrival_hour_from}
            maxValueArrivalTo={end_arrival_hour_to}
          />
        </div>
      </form>

    </section>
  );
}

export default FilterPanel;