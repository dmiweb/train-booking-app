import { useState } from "react";
import { DoubleRangeSlider } from "../../../components";
import "./FilterTime.css";

const FilterTime = ({ title = "", direction = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const classNameBody = isVisible ? "filter-time__body" : "filter-time__body filter-time__body--hidden";

  const handleVisibleFilter = () => {
    setIsVisible(() => !isVisible);
  }

  return (
    <div className="filter-time">
      <div className="filter-time__header">
        <div className="filter-time__header-icon">
          {direction === "outbound" && <div className="filter-time__header-icon-arrow-outbound"></div>}
          {direction === "inbound" && <div className="filter-time__header-icon-arrow-inbound"></div>}
        </div>
        <div className="filter-time__header-title">{title}</div>
        <label className="filter-time__header-label">
          <input type="checkbox" className="filter-time__header-checkbox" />
          <div className="filter-time__header-toggle-show-body" onClick={handleVisibleFilter}></div>
        </label>
      </div>

      <div className={classNameBody}>
        <div className="filter-time__departure">
          <div className="filter-time__departure__title">Время отбытия</div>
          <DoubleRangeSlider
            min={0}
            max={24}
            step={1}
            trackHeight={10}
            thumbWidth={18}
            thumbGap={1}
            type="time"
          />
        </div>
        <div className="filter-time__arrival">
          <div className="filter-time__arrival__title">Время прибытия</div>
          <DoubleRangeSlider
            min={0}
            max={24}
            step={1}
            trackHeight={10}
            thumbWidth={18}
            thumbGap={1}
            type="time"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterTime;