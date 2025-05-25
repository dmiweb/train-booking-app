import { ReactNode, useState } from "react";
import { ArrowIconSvg, MinusIconSvg, PlusIconSvg, PassengerIconSvg } from "../icons";

type DetailsTripContainerProps = {
  direction?: string;
  title: string;
  date?: string;
  children: ReactNode;
}

const DetailsTripContainer = ({ direction, title, date, children }: DetailsTripContainerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="details-trip-panel__trip">
      <div className="details-trip-panel__trip-wrap">
        <div className="details-trip-panel__trip-direction">
          {direction
            ? <div className="details-trip-panel__trip-direction-icon">
              <ArrowIconSvg direction={direction === "from" ? "right" : "left"} width={13} fill='#3e3c41' />
            </div>
            : <div className="details-trip-panel__trip-direction-icon-passenger">
              <PassengerIconSvg width={26} fill='#ffa800' />
            </div>
          }
          <span className="details-trip-panel__trip-direction-title">{title}</span>
          {date && <span className="details-trip-panel__trip-date">{date}</span>}

          <label className="details-trip-panel__header-label">
            <input type="checkbox" className="details-trip-panel__header-checkbox" />
            <div
              className="details-trip-panel__header-toggle-btn"
              onClick={() => setIsVisible(!isVisible)}
            >
              {
                isVisible
                  ? <MinusIconSvg width={10} fill="#c4c4c4" />
                  : <PlusIconSvg width={10} fill="#ffffff" />}
            </div>
          </label>
        </div>

        {isVisible && children}
      </div>
    </div>
  );
}

export default DetailsTripContainer;