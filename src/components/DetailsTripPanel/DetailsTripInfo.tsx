import { TTrain } from "../../models";
import { ArrowIconSvg } from "../icons";
import { timestampToTime } from "../../utils/timestampToTime";
import { timestampToDate } from "../../utils/timestampToDate";
import { secondsToTime } from "../../utils/secondsToTime";
import { getStationPrefix } from "../../utils/getStationPrefix";

type DetailsTripInfoProps = {
  direction: string;
  info: TTrain["departure"] | TTrain["arrival"];
}

const DetailsTripInfo = ({ direction, info }: DetailsTripInfoProps) => {
  return (
    <>
      <div className="details-trip-panel__trip-train-info">
        <div className="details-trip-panel__trip-train">
          <span className="details-trip-panel__trip-train-title">№ Поезда </span>
          <span className="details-trip-panel__trip-train-number">{info.train.name}</span>
        </div>
        <div className="details-trip-panel__trip-train">
          <span className="details-trip-panel__trip-train-title">Название</span>
          <span className="details-trip-panel__trip-train-name">
            {info.from.city.name}<br />{info.to.city.name}
          </span>
        </div>
      </div>

      <div className="details-trip-panel__trip-time-info">

        <div className="details-trip-panel__trip-time-wrap">
          {direction === "from"
            ? <>
              <div className="details-trip-panel__trip-departure-time">
                {timestampToTime(info.from.datetime)}
              </div>
              <div className="details-trip-panel__trip-departure-date">
                {timestampToDate(info.from.datetime)}
              </div>
            </>
            : <>
              <div className="details-trip-panel__trip-departure-time">
                {timestampToTime(info.to.datetime)}
              </div>
              <div className="details-trip-panel__trip-departure-date">
                {timestampToDate(info.to.datetime)}
              </div>
            </>
          }
        </div>

        <div className="details-trip-panel__trip-time-wrap">
          <div className="details-trip-panel__trip-total-time">
            {secondsToTime(info.duration)}
          </div>
          <ArrowIconSvg direction={direction === "from" ? "right" : "left"} width={30} fill='#ffa800' />
        </div>
        <div className="details-trip-panel__trip-time-wrap">
          {direction === "from"
            ? <>
              <div className="details-trip-panel__trip-arrival-time">
                {timestampToTime(info.to.datetime)}
              </div>
              <div className="details-trip-panel__trip-arrival-date">
                {timestampToDate(info.to.datetime)}
              </div>
            </>
            : <>
              <div className="details-trip-panel__trip-arrival-time">
                {timestampToTime(info.from.datetime)}
              </div>
              <div className="details-trip-panel__trip-arrival-date">
                {timestampToDate(info.from.datetime)}
              </div>
            </>}
        </div>
      </div>

      <div className="details-trip-panel__trip-city-info">
        <div className="details-trip-panel__trip-city-wrap">
          <div className="details-trip-panel__trip-departure-city">
            {direction === "from" ? info.from.city.name : info.to.city.name}
          </div>
          <div className="details-trip-panel__trip-departure-station">
            <span className="details-trip-panel__trip-departure-station-name">
              {direction === "from" ? info.from.railway_station_name : info.to.railway_station_name}
            </span>
            <span className="details-trip-panel__trip-departure-station-prefix">
              {direction === "from"
                ? getStationPrefix(info.from.railway_station_name)
                : getStationPrefix(info.to.railway_station_name)
              }
            </span>
          </div>
        </div>
        <div className="details-trip-panel__trip-city-wrap">
          <div className="details-trip-panel__trip-arrival-city">
            {direction === "from" ? info.to.city.name : info.from.city.name}
          </div>
          <div className="details-trip-panel__trip-arrival-station">
            <span className="details-trip-panel__trip-arrival-station-name">
              {direction === "from" ? info.to.railway_station_name : info.from.railway_station_name}
            </span>
            <span className="details-trip-panel__trip-arrival-station-prefix">
              {direction === "to"
                ? getStationPrefix(info.from.railway_station_name)
                : getStationPrefix(info.to.railway_station_name)
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsTripInfo;