import { useAppSelector } from "../../hooks";
import { TCoach, TSelectedOptions } from "../../models";
import FirstClassCoach from "../SchemeCoaches/FirstClassCoach";
import SecondClassCoach from "../SchemeCoaches/SecondClassCoach";
import ThirdClassCoach from "../SchemeCoaches/ThirdClassCoach";
import FourthClassCoach from "../SchemeCoaches/FourthClassCoach";
import { SelectServiceOptions } from "../../components";
import { CurrencyIconSvg } from "../../components/icons";
import { getRandomNumber } from "../../utils/getRandomNumber";

type CoachInfoProps = {
  direction: "from" | "to";
  currentCoach: TCoach;
}

const CoachInfo = ({ direction, currentCoach }: CoachInfoProps) => {
  const { coachNumber, coach: coachData } = currentCoach;
  const { coach, seats } = coachData;
  const { optionsService, activeTypeSeat } = useAppSelector(state => state.seats);

  const getPriceTicket = (basePrice: number): number => {
    // Определяем текущий тип билета и опции для направления
    const ticketType = activeTypeSeat[direction];
    const options = optionsService[direction] as TSelectedOptions;

    // Рассчитываем коэффициент скидки
    const discount = ticketType === "child" ? 0.65 : 0;

    // Базовая цена со скидкой
    let total = basePrice * (1 - discount);

    // Добавляем опции с учетом скидки (если детский билет)
    if (options.wifi === "selected" && coach.wifi_price) {
      total += coach.wifi_price * (1 - discount);
    }

    if (options.linens === "selected" && coach.linens_price) {
      total += coach.linens_price * (1 - discount);
    }

    // Для взрослых: добавляем полную стоимость опций
    if (ticketType === "adult") {
      if (options.wifi === "selected" && coach.wifi_price) {
        total += coach.wifi_price;
      }
      if (options.linens === "selected" && coach.linens_price) {
        total += coach.linens_price;
      }
    }

    return Number(total.toFixed(0));
  };

  return (
    <div className="select-seats__coach-info-wrap">
      <div className="select-seats__coach-info">
        <div className="select-seats__coach-current">
          <span className="select-seats__coach-current-number">{coachNumber}</span>
          <span className="select-seats__coach-current-text">вагон</span>
        </div>

        <div className="select-seats__coach-seats-info">
          <div className="select-seats__coach-seats-free">
            <div className="select-seats__coach-seats-free-all">
              <span className="select-seats__coach-seats-free-all-title">Места</span>
              <span className="select-seats__coach-seats-free-all-count">{coach.available_seats}</span>
            </div>

            {(coach.class_type === "second" || coach.class_type === "third") &&
              <div className="select-seats__coach-seats-free-upper">
                <span className="select-seats__coach-seats-free-upper-title">Верхние</span>
                <span className="select-seats__coach-seats-free-upper-count">
                  {seats.filter(num => num.index % 2 === 0).length}
                </span>
              </div>}

            {(coach.class_type === "second" || coach.class_type === "third") &&
              <div className="select-seats__coach-seats-free-lower">
                <span className="select-seats__coach-seats-free-lower-title">Нижние</span>
                <span className="select-seats__coach-seats-free-lower-count">
                  {seats.filter(num => num.index % 2 !== 0).length}
                </span>
              </div>}
          </div>

          <div
            className={(coach.class_type === "second" || coach.class_type === "third")
              ? "select-seats__coach-seats-price"
              : "select-seats__coach-seats-price select-seats__coach-seats-only-price"}
          >
            <span className="select-seats__coach-seats-price-title">Стоимость</span>

            <span className="select-seats__coach-seats-price-upper">
              {coach.class_type === "first" && getPriceTicket(coach.price)}
              {coach.class_type === "second" && getPriceTicket(coach.top_price)}
              {coach.class_type === "third" && getPriceTicket(coach.top_price)}
              {coach.class_type === "fourth" && getPriceTicket(coach.bottom_price)}
              <CurrencyIconSvg code="rub" width={14} fill="#928f94" />
            </span>

            {(coach.class_type === "second" || coach.class_type === "third") &&
              <span className="select-seats__coach-seats-price-lower">
                {getPriceTicket(coach.bottom_price)}
                <CurrencyIconSvg code="rub" width={14} fill="#928f94" />
              </span>}
          </div>

          <SelectServiceOptions direction={direction} coach={coach} />
        </div>
      </div>

      <div className="select-seats__people-online-choose">
        {`${getRandomNumber(1, 13)} человек выбирают места в этом поезде`}
      </div>

      {coach.class_type === "first"
        && <FirstClassCoach
          direction={direction}
          coachId={coach._id}
          coachNumber={coachNumber}
          availableSeats={seats}
          seatPrice={getPriceTicket(coach.price)}
        />}

      {coach.class_type === "second"
        && <SecondClassCoach
          direction={direction}
          coachId={coach._id}
          coachNumber={coachNumber}
          availableSeats={seats}
          topSeatPrice={getPriceTicket(coach.top_price)}
          bottomSeatPrice={getPriceTicket(coach.bottom_price)}
        />}

      {coach.class_type === "third"
        && <ThirdClassCoach
          direction={direction}
          coachId={coach._id}
          coachNumber={coachNumber}
          availableSeats={seats}
          topSeatPrice={getPriceTicket(coach.top_price)}
          bottomSeatPrice={getPriceTicket(coach.bottom_price)}
          sideSeatPrice={getPriceTicket(coach.side_price)}
        />}

      {coach.class_type === "fourth"
        && <FourthClassCoach
          direction={direction}
          coachId={coach._id}
          coachNumber={coachNumber}
          availableSeats={seats}
          topSeatPrice={getPriceTicket(coach.top_price)}
          bottomSeatPrice={getPriceTicket(coach.bottom_price)}
          sideSeatPrice={getPriceTicket(coach.side_price)}
        />}
    </div>
  );
}

export default CoachInfo;