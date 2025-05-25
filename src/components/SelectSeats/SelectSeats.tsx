import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { TripInfo, SelectCountSeats, SelectTypeCoach, NumberCoachMenu, CoachInfo } from "../../components";
import { ArrowIconSvg, CurrencyIconSvg } from "../../components/icons";
import { TTrain, TSeat } from "../../models";
import "./SelectSeats.css";

type SelectSeatsProps = {
  direction: "from" | "to"
  train: TTrain | null;
  seats: TSeat[];
}

const SelectSeats = ({ direction, train, seats }: SelectSeatsProps) => {
  const [openedCoaches, setOpenedCoaches] = useState<{ from: string[], to: string[] }>({
    from: [],
    to: []
  });

  const [firstCoachSent, setFirstCoachSent] = useState<{
    [direction: string]: { [coachType: string]: boolean }
  }>({});

  // console.log(seats)

  const { activeTypeCoach, selectedSeats } = useAppSelector(state => state.seats)
  const navigate = useNavigate();

  const coaches = seats
    .map((coach, index) => ({ coach, coachNumber: String(index + 1).padStart(2, '0') }))
    .filter(({ coach }) => coach.coach.class_type === activeTypeCoach[direction]);

  useEffect(() => {
    if (coaches.length && !(firstCoachSent[direction]?.[activeTypeCoach[direction]])) {
      const firstCoachNumber = coaches[coaches.length - 1].coachNumber;
      if (firstCoachNumber && !openedCoaches[direction].includes(firstCoachNumber)) {
        handleCoachToggle(firstCoachNumber);
        setFirstCoachSent(prev => ({
          ...prev,
          [direction]: {
            ...prev[direction],
            [activeTypeCoach[direction]]: true,
          }
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coaches, openedCoaches, direction, firstCoachSent, activeTypeCoach]);

  const handleCoachToggle = (coachNumber: string) => {
    setOpenedCoaches(prev => ({
      ...prev,
      [direction]: prev[direction].includes(coachNumber)
        ? prev[direction].filter(num => num !== coachNumber)
        : [...prev[direction], coachNumber]
    }));
  };

  return (
    <div className="select-seats">
      <div className={`select-seats__back-action-${direction}`}>
        <span className="select-seats__direction-icon">
          <ArrowIconSvg
            direction={`${direction === "from" ? "right" : "left"}`}
            width={30}
            fill="#ffffff" />
        </span>

        <button className="select-seats__back-btn" onClick={() => navigate("/trains")}>
          Выбрать другой поезд
        </button>
      </div>

      <TripInfo direction={direction} train={train} />
      <SelectCountSeats direction={direction} />
      <SelectTypeCoach direction={direction} />

      {activeTypeCoach[direction] &&
        <div className="select-seats__coach">
          <NumberCoachMenu
            direction={direction}
            activeTypeCoach={activeTypeCoach}
            coaches={coaches}
            openedCoaches={openedCoaches[direction]}
            onSelect={handleCoachToggle}
          />

          {coaches.reverse().map(coach => (
            openedCoaches[direction].includes(coach.coachNumber) &&
            <CoachInfo key={coach.coachNumber} direction={direction} currentCoach={coach} />
          ))}

        </div>}

      {selectedSeats[direction].length
        ? <div className="select-seats__total-price">
          <span className="select-seats__total-price-number">
            {selectedSeats[direction].reduce((sum, seat) => sum + seat.price, 0)}
          </span>
          <CurrencyIconSvg code="rub" width={14} fill="#928f94" />
        </div>
        : null}
    </div>
  );
}

export default SelectSeats;