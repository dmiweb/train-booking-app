import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setSelectedTrain } from "../../slices/trainSlice";
import { TTrain } from "../../models";
import { Button } from "../../components";
import { TrainIconSvg, ArrowIconSvg, WifiIconSvg, ExpressTrainIconSvg, FoodIconSvg, CurrencyIconSvg } from "../icons";
import { getStationPrefix } from "../../utils/getStationPrefix";
import { timestampToTime } from "../../utils/timestampToTime";
import { secondsToTime } from "../../utils/secondsToTime";
import "./Train.css";

const Train = ({ item, reselect }: { item: TTrain, reselect?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { departure, arrival } = item;

  const onSelectTrain = () => {
    if (item) {
      dispatch(setSelectedTrain(item));
    }

    navigate("/seats", { replace: true });
  }

  return (
    <div className="train">
      <div className="train-info">
        <div className="train-info__icon">
          <TrainIconSvg width={44} fill="#ffffff" />
        </div>
        <div className="train-info__number">{departure.train.name}</div>

        <div className="train-info__direction">
          {/* В ответе сервера нет отправной точки поезда, если посадка на промежуточной станции */}
          {/* <div className="train-info__direction-start">Адлер</div> */}
          <div className="train-info__direction-departure">
            {departure.from.city.name}
          </div>
          <div className="train-info__direction-arrival">
            {departure.to.city.name}
          </div>
          {/* В ответе сервера нет названий фирменных поездов типа Мегаполис или Волга */}
        </div>
      </div>

      <div className="train-trip">
        <div className="train-trip__container">
          <div className="train-trip-info">
            <div className="train-trip-info__time">{timestampToTime(departure.from.datetime)}</div>
            <div className="train-trip-info__location">{departure.from.city.name}</div>
            <div className="train-trip-info__station-wrapper">
              <div className="train-trip-info__station">
                {`${departure.from.railway_station_name} 
                ${getStationPrefix(departure.from.railway_station_name)}`}
              </div>
            </div>
          </div>

          <div className="train-trip__duration">
            <span className="train-trip__duration-time">
              {secondsToTime(departure.duration)}
            </span>
            <ArrowIconSvg direction="right" width={24} fill="#ffa800" />
          </div>

          <div className="train-trip__container">
            <div className="train-trip-info">
              <div className="train-trip-info__time">{timestampToTime(departure.to.datetime)}</div>
              <div className="train-trip-info__location">{departure.to.city.name}</div>
              <div className="train-trip-info__station-wrapper">
                <div className="train-trip-info__station">
                  {`${departure.to.railway_station_name} 
                ${getStationPrefix(departure.to.railway_station_name)}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {item.arrival &&
          <div className="train-trip__container">
            <div className="train-trip-info">
              <div className="train-trip-info__time">{timestampToTime(arrival.to.datetime)}</div>
              <div className="train-trip-info__location">{arrival.to.city.name}</div>
              <div className="train-trip-info__station-wrapper">
                <div className="train-trip-info__station">
                  {`${arrival.to.railway_station_name} 
                ${getStationPrefix(arrival.to.railway_station_name)}`}
                </div>
              </div>
            </div>

            <div className="train-trip__duration">
              <span className="train-trip__duration-time">
                {secondsToTime(arrival.duration)}
              </span>
              <ArrowIconSvg direction="left" width={24} fill="#ffa800" />
            </div>

            <div className="train-trip__container">
              <div className="train-trip-info">
                <div className="train-trip-info__time">{timestampToTime(arrival.from.datetime)}</div>
                <div className="train-trip-info__location">{arrival.from.city.name}</div>
                <div className="train-trip-info__station-wrapper">
                  <div className="train-trip-info__station">
                    {`${arrival.from.railway_station_name} 
                ${getStationPrefix(arrival.from.railway_station_name)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>

      <div className="train-seats">
        <div className="train-seats__row">
          {departure.have_fourth_class &&
            <div className="train-seats__fourth-class">
              <div className="train-seats__seating-type">Сидячий</div>
              <div className="train-seats__seating-count">
                {item.available_seats_info.fourth}
              </div>
              <div className="train-seats__seating-min-price">
                {departure.price_info.fourth.bottom_price}
              </div>
              <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
            </div>}

          {departure.have_third_class &&
            <div className="train-seats__third-class">
              <div className="train-seats__seating-type">Плацкарт</div>
              <div className="train-seats__seating-count">
                {item.available_seats_info.third}
              </div>
              <div className="train-seats__seating-min-price">
                {departure.price_info.third.bottom_price}
              </div>
              <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
            </div>}

          {departure.have_second_class &&
            <div className="train-seats__second-class">
              <div className="train-seats__seating-type">Купе</div>
              <div className="train-seats__seating-count">
                {item.available_seats_info.second}
              </div>
              <div className="train-seats__seating-min-price">
                {departure.price_info.second.bottom_price}
              </div>
              <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
            </div>}

          {departure.have_first_class &&
            <div className="train-seats__first-class">
              <div className="train-seats__seating-type">Люкс</div>
              <div className="train-seats__seating-count">
                {item.available_seats_info.first}
              </div>
              <div className="train-seats__seating-min-price">
                {departure.price_info.first.bottom_price}
              </div>
              <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
            </div>}
        </div>

        <div className="train-seats__row">
          <div className="train-seats__services">
            <WifiIconSvg width={22} fill={departure.have_wifi ? "#ffa800" : "#c4c4c4"} />
            <ExpressTrainIconSvg width={20} fill={item.is_express ? "#ffa800" : "#c4c4c4"} />
            {/* нет свойства вагона-ресторана */}
            <FoodIconSvg width={22} fill="#c4c4c4" />
          </div>
          {reselect
            ? < Button
              name="Изменить"
              className="change-btn"
              handler={() => navigate("/trains", { replace: true })}
            />

            : <Button
              name="Выбрать места"
              className="select-train-btn"
              handler={onSelectTrain}
            />
          }
        </div>
      </div>
    </div >
  );
}

export default Train;