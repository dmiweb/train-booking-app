
import { CurrencyIconSvg } from "../icons";
import "./Train.css";

type TooltipInfoSeatsProps = {
  topPrice: number;
  bottomPrice: number;
  topSeatsCount?: number;
  bottomSeatsCount?: number;
}

const TooltipInfoSeats = ({
  topPrice,
  bottomPrice,
  topSeatsCount,
  bottomSeatsCount
}: TooltipInfoSeatsProps) => {
  return (
    <div className="train-tooltip">

      <div className="train-tooltip__seats-info">
        <div className="train-tooltip__seats-type">верхние</div>
        <div className="train-tooltip__seats-count">{topSeatsCount}</div>
        <div className="train-tooltip__seats-price">
          {topPrice}
          <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
        </div>
      </div>

      <div className="train-tooltip__seats-info">
        <div className="train-tooltip__seats-type">нижние</div>
        <div className="train-tooltip__seats-count">{bottomSeatsCount}</div>
        <div className="train-tooltip__seats-price">
          {bottomPrice}
          <CurrencyIconSvg code="rub" width={16} fill="#928f94" />
        </div>
      </div>

    </div>
  );
}

export default TooltipInfoSeats;