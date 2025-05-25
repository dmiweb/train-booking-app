import { TimeToWords } from "../../components";
import { ArrowIconSvg, TrainIconSvg, ClockIconSvg } from "../../components/icons";
import { TTrain } from "../../models";
import { getStationPrefix } from "../../utils/getStationPrefix";
import { timestampToTime } from "../../utils/timestampToTime";

type TripInfoProps = {
  direction: "from" | "to"
  train: TTrain | null;
}

const TripInfo = ({ direction, train }: TripInfoProps) => {

  const { departure, arrival } = train || {};

  return (
    <div className="select-seats__trip-details">
      <div className="select-seats__train-direction">
        <span className="select-seats__train-icon">
          <TrainIconSvg width={15.5} fill="#ffa800" />
        </span>
        <span className="select-seats__train-number">
          {direction === "from" ? departure?.train.name : arrival?.train.name}
        </span>
        {/* Нет в ответе сервера стартовай точки поезда */}
        {/* <span className="select-seats__train-start">Адлер → </span> */}
        <span className="select-seats__train-departure">
          {direction === "from" ? departure?.from.city.name : arrival?.from.city.name} {'→'}
        </span>
        <span className="select-seats__train-arrival">
          {direction === "from" ? departure?.to.city.name : arrival?.to.city.name}
        </span>
      </div>

      <div className="select-seats__trip">
        <div className="select-seats__container">
          <div className="select-seats-info">
            <div className="select-seats__trip-time">
              {departure && direction === "from" ? timestampToTime(departure.from.datetime) : null}
              {arrival && direction === "to" ? timestampToTime(arrival.to.datetime) : null}
            </div>
            <div className="select-seats-trip-location">{departure?.from.city.name}</div>
            <div className="select-seats__trip-station">
              {`${departure?.from.railway_station_name} 
              ${departure && getStationPrefix(departure.from.railway_station_name)}`}
            </div>
          </div>

          <div className="train-trip__direction-from">
            <ArrowIconSvg
              direction={direction === "from" ? "right" : "left"}
              width={30}
              fill="rgba(255, 168, 0, 0.79)" />
          </div>

          <div className="select-seats__container">
            <div className="select-seats-info">
              <div className="select-seats__trip-time">
                {departure && direction === "from" ? timestampToTime(departure.to.datetime) : null}
                {arrival && direction === "to" ? timestampToTime(arrival.from.datetime) : null}
              </div>
              <div className="select-seats-trip-location">{departure?.to.city.name}</div>
              <div className="select-seats__trip-station">
                {`${departure?.to.railway_station_name} 
                ${departure && getStationPrefix(departure.to.railway_station_name)}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="select-seats__travel-time">
        <span className="select-seats__travel-time-icon">
          <ClockIconSvg width={30} fill="#ffa800" />
        </span>
        <div className="select-seats__travel-duration">
          {departure && direction === "from" && <TimeToWords
            departureTimestamp={departure?.from.datetime}
            arrivalTimestamp={departure?.to.datetime}
          />}
          {arrival && direction === "to" && <TimeToWords
            departureTimestamp={arrival.from.datetime}
            arrivalTimestamp={arrival.to.datetime}
          />}
        </div>
      </div>
    </div>
  );
}

export default TripInfo;