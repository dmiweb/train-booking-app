import { useAppSelector } from "../../hooks";
import { TTrain } from "../../models";
import { CurrencyIconSvg } from "../../components/icons";
import { DetailsTripContainer, DetailsTripInfo } from "../../components";
import { convertFormatDate } from "../../utils/convertFormatDate";
import "./DetailsTripPanel.css";

const DetailsTripPanel = () => {
  const { date_start, date_end } = useAppSelector(state => state.queryParams);
  const { departure, arrival } = useAppSelector(state => state.trains.selectedTrain as TTrain);
  const { selectedSeats } = useAppSelector(state => state.seats);

  const getCountTickets = (typeTickets: "adult" | "child"): number => {
    const adultCountFrom = selectedSeats["from"].reduce((count, seat) =>
      count + (seat.is_adult ? 1 : 0), 0);
    const adultCountTo = selectedSeats["to"].reduce((count, seat) =>
      count + (seat.is_adult ? 1 : 0), 0) || 0;

    const childCountFrom = selectedSeats["from"].reduce((count, seat) =>
      count + (seat.include_children_seat ? 1 : 0), 0);
    const childCountTo = selectedSeats["to"].reduce((count, seat) =>
      count + (seat.include_children_seat ? 1 : 0), 0) || 0;

    const adultTicketsCount = adultCountFrom + adultCountTo;
    const childTicketsCount = childCountFrom + childCountTo;

    return typeTickets === "adult" ? adultTicketsCount : childTicketsCount;
  }

  const getPriceTickets = (typeTickets: "adult" | "child"): number => {
    const adultPriceFrom = selectedSeats["from"].reduce((sum, seat) =>
      sum + (seat.is_adult ? seat.price : 0), 0);
    const adultPriceTo = selectedSeats["to"].reduce((sum, seat) =>
      sum + (seat.is_adult ? seat.price : 0), 0) || 0;


    const childPriceFrom = selectedSeats["from"].reduce((sum, seat) =>
      sum + (!seat.is_adult ? seat.price : 0), 0)
    const childPriceTo = selectedSeats["to"].reduce((sum, seat) =>
      sum + (!seat.is_adult ? seat.price : 0), 0)

    const adultPrice = adultPriceFrom + adultPriceTo;
    const childPrice = childPriceFrom + childPriceTo;

    return typeTickets === "adult" ? adultPrice : childPrice;
  }

  const getTotalPrice = () => {
    const priceFrom = selectedSeats["from"].reduce((sum, seat) => sum + seat.price, 0);
    const priceTo = selectedSeats["to"].reduce((sum, seat) => sum + seat.price, 0) || 0;

    return priceFrom + priceTo;
  }

  return (
    <section className="details-trip-panel" aria-label="Детали поездки">
      <h2 className="details-trip-panel__header">Детали поездки</h2>

      {departure &&
        <DetailsTripContainer direction="from" title="Туда" date={convertFormatDate(date_start)}>
          <DetailsTripInfo direction="from" info={departure} />
        </DetailsTripContainer>}

      {arrival &&
        <DetailsTripContainer direction="to" title="Обратно" date={convertFormatDate(date_end)}>
          <DetailsTripInfo direction="to" info={arrival} />
        </DetailsTripContainer>
      }

      <DetailsTripContainer title="Пассажиры">
        <div className="details-trip-panel__passengers">
          <div className="details-trip-panel__passengers-summary">
            <div className="details-trip-panel__passengers-summary-adults">
              <div className="details-trip-panel__passengers-summary-person-count">
                {getCountTickets("adult")}
                <span> Взрослых</span>
              </div>
              <div className="details-trip-panel__passengers-summary-sum">
                <span className="details-trip-panel__passengers-summary-sum-num">
                  {getPriceTickets("adult")}
                </span>
                <CurrencyIconSvg code="rub" width={14} fill="#928f94" />
              </div>
            </div>

            {getCountTickets("child") !== 0 &&
              <div className="details-trip-panel__passengers-summary-children">
                <div className="details-trip-panel__passengers-summary-person-count">
                  {getCountTickets("child")}
                  <span> Ребенок</span>
                </div>
                <div className="details-trip-panel__passengers-summary-sum">
                  <span className="details-trip-panel__passengers-summary-sum-num">
                    {getPriceTickets("child")}
                  </span>
                  <CurrencyIconSvg code="rub" width={14} fill="#928f94" />
                </div>
              </div>}
          </div>
        </div>
      </DetailsTripContainer>

      <div className="details-trip-panel__total">
        <div className="details-trip-panel__total-title">Итог</div>
        <div className="details-trip-panel__total-price">
          <span className="details-trip-panel__total-price-number">
            {getTotalPrice()}
          </span>
          <CurrencyIconSvg code="rub" width={27} fill="#e5e5e5" />
        </div>
      </div>
    </section>
  );
}

export default DetailsTripPanel;