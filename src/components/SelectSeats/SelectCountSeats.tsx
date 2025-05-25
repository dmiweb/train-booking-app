import { useAppDispatch, useAppSelector } from "../../hooks";
import { setActiveTypeSeat } from "../../slices/seatsSlice";

const SelectCountSeats = ({ direction }: { direction: "from" | "to" }) => {
  const { activeTypeSeat, limitPassenger, selectedSeats } = useAppSelector(state => state.seats);
  const dispatch = useAppDispatch();

  const onSelectTicketType = (typeValue: string) => {
    dispatch(setActiveTypeSeat({ type: direction, value: typeValue }));
  }

  const getPassengerCounts = (direction: 'from' | 'to') => {
    const seats = selectedSeats[direction];

    return {
      adult: seats.filter(s => s.is_adult).length,
      child: seats.filter(s => s.is_child && s.include_children_seat).length,
      childNoSeat: seats.filter(s => s.is_child && !s.include_children_seat).length
    }
  }

  const { adult, child, childNoSeat } = getPassengerCounts(direction);
  
  return (
    <div className="select-seats__count-tickets">
      <h2 className="select-seats__count-tickets-title">Количество билетов</h2>

      <div className="select-seats__type-tickets">
        <label
          className={`
            select-seats__adult-tickets
            ${activeTypeSeat[direction] === "adult" ? " select-seats__adult-tickets--active" : ""}
            ${adult > 0 ? " select-seats__adult-tickets--selected" : ""}
          `}
          onClick={() => onSelectTicketType("adult")}
        >
          <div className="select-seats__type-age-tickets">Взрослых - {adult}</div>
          <span className="select-seats__adult-passenger-info">
            Можно добавить еще {limitPassenger - adult - child} пассажиров
          </span>
        </label>

        <label
          className={activeTypeSeat[direction] === "child"
            ? "select-seats__child-tickets select-seats__child-tickets--active"
            : "select-seats__child-tickets"}
          onClick={() => onSelectTicketType("child")}
        >
          <div className="select-seats__type-age-tickets">Детских - {child}</div>
          <span className="select-seats__child-passenger-info">
            Можно добавить еще {limitPassenger - child - adult} детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%
          </span>
        </label>

        <label
          className={activeTypeSeat[direction] === "childNoSeat"
            ? "select-seats__child-no-seat-tickets select-seats__child-no-seat-tickets--active"
            : "select-seats__child-no-seat-tickets"}
          onClick={() => onSelectTicketType("childNoSeat")}
        >
          <div className="select-seats__type-age-tickets">
            Детских «без места» - {childNoSeat}
          </div>
        </label>
      </div>
    </div>
  );
}

export default SelectCountSeats;