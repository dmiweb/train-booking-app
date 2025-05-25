import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setSelectedTrain } from "../../slices/trainSlice";
import { requestSeats } from "../../slices/seatsSlice";
import { TLastTicket } from "../../models";
import { WifiIconSvg, ExpressTrainIconSvg, FoodIconSvg, CurrencyIconSvg } from "../icons";
import { getStationPrefix } from "../../utils/getStationPrefix";
import "./LastTicketItem.css";

const LastTicketItem = ({ item }: { item: TLastTicket }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ticket = {
    departure: item.departure.from.city.name,
    departureStation: item.departure.from.railway_station_name,
    arrival: item.departure.to.city.name,
    arrivalStation: item.departure.to.railway_station_name,
    wifi: item.have_wifi,
    express: item.is_express,
    // food: item, // нет данных о вагоне-ресторане
    minPrice: item.min_price,
  }

  const handleClickTicket = () => {
    navigate("/seats");

    if (item) {
      dispatch(setSelectedTrain(item));
    }

    if (location.pathname === "/seats") {
      dispatch(requestSeats());
    }
  }

  return (
    <div className="last-ticket" onClick={handleClickTicket}>
      <div className="last-ticket__location">
        <div className="last-ticket__location-departure">{ticket.departure}</div>
        <div className="last-ticket__location-arrival">{ticket.arrival}</div>
      </div>

      <div className="last-ticket__station">
        <div className="last-ticket__station-departure">
          {`${ticket.departureStation} ${getStationPrefix(ticket.departureStation)}`}
        </div>
        <div className="last-ticket__station-arrival">
          {`${ticket.arrivalStation} ${getStationPrefix(ticket.arrivalStation)}`}
        </div>
      </div>

      <div className="last-ticket__info">
        <div className="last-ticket__info-options">
          <WifiIconSvg width={20} fill={ticket.wifi ? "#ffa800" : "#e5e5e5"} />
          <ExpressTrainIconSvg width={16} fill={ticket.express ? "#ffa800" : "#e5e5e5"} />
          <FoodIconSvg width={20} fill="#e5e5e5" />
        </div>

        <div className="last-ticket__info-min-price">
          <span className="last-ticket__info-min-price-prefix">от</span>
          <span className="last-ticket__info-min-price-amount">{ticket.minPrice}</span>
          <span className="last-ticket__info-min-price-currency">
            <CurrencyIconSvg code="rub" width={20} fill="#928f94" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default LastTicketItem;