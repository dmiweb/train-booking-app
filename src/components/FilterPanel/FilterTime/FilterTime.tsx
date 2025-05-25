import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { setStartDepartureHourFrom, setStartDepartureHourTo, setStartArrivalHourFrom, setStartArrivalHourTo, setEndDepartureHourFrom, setEndDepartureHourTo, setEndArrivalHourFrom, setEndArrivalHourTo } from "../../../slices/queryParamsSlice";
import { DoubleRangeSlider } from "../../../components";
import { MinusIconSvg, PlusIconSvg } from "../../icons";
import "./FilterTime.css";

type FilterTimeProps = {
  title: string;
  direction: "from" | "to";
  minValueDepartureFrom: number;
  maxValueDepartureTo: number;
  minValueArrivalFrom: number;
  maxValueArrivalTo: number;
}

const FilterTime = ({
  title, direction,
  minValueDepartureFrom,
  maxValueDepartureTo,
  minValueArrivalFrom,
  maxValueArrivalTo
}: FilterTimeProps) => {

  const [isVisible, setIsVisible] = useState(() => {
    return (
      minValueDepartureFrom !== 0 ||
        maxValueDepartureTo !== 0 && maxValueDepartureTo !== 24 ||
        minValueArrivalFrom !== 0 ||
        maxValueArrivalTo !== 0 && maxValueArrivalTo !== 24
        ? true
        : false
    )
  });

  const dispatch = useAppDispatch();

  const classNameBody = isVisible ? "filter-time__body" : "filter-time__body filter-time__body--hidden";

  const handleVisibleFilter = () => {
    setIsVisible(() => !isVisible);
  }

  const onMinChangeDeparture = (value: number) => {
    if (direction === "from") dispatch(setStartDepartureHourFrom(value));
    if (direction === "to") dispatch(setEndDepartureHourFrom(value));
  }
  const onMaxChangeDeparture = (value: number) => {
    if (direction === "from") dispatch(setStartDepartureHourTo(value));
    if (direction === "to") dispatch(setEndDepartureHourTo(value));
  }
  const onMinChangeArrival = (value: number) => {
    if (direction === "from") dispatch(setStartArrivalHourFrom(value))
    if (direction === "to") dispatch(setEndArrivalHourFrom(value))
  }
  const onMaxChangeArrival = (value: number) => {
    if (direction === "from") dispatch(setStartArrivalHourTo(value))
    if (direction === "to") dispatch(setEndArrivalHourTo(value))
  }

  return (
    <div className="filter-time">
      <div className="filter-time__header">
        <div className="filter-time__header-icon">
          {direction === "from" && <div className="filter-time__header-icon-arrow-outbound"></div>}
          {direction === "to" && <div className="filter-time__header-icon-arrow-inbound"></div>}
        </div>
        <div className="filter-time__header-title">{title}</div>

        <div className="filter-time__header-label">
          <div
            className={isVisible
              ? "filter-time__header-drop-box-btn filter-time__header-drop-box-btn--open"
              : "filter-time__header-drop-box-btn"}
            onClick={handleVisibleFilter}
          >
            {isVisible
              ? <MinusIconSvg width={16} fill="#c4c4c4" />
              : <PlusIconSvg width={16} fill="#ffffff" />}
          </div>
        </div>
      </div>

      <div className={classNameBody}>
        <div className="filter-time__departure">
          <div className="filter-time__departure__title">Время отбытия</div>
          <DoubleRangeSlider
            type="time"
            min={0}
            max={24}
            minValue={minValueDepartureFrom}
            maxValue={maxValueDepartureTo}
            step={1}
            trackHeight={10}
            thumbWidth={18}
            thumbGap={1}
            onMinChange={onMinChangeDeparture}
            onMaxChange={onMaxChangeDeparture}
          />
        </div>

        <div className="filter-time__arrival">
          <div className="filter-time__arrival__title">Время прибытия</div>
          <DoubleRangeSlider
            type="time"
            min={0}
            max={24}
            minValue={minValueArrivalFrom}
            maxValue={maxValueArrivalTo}
            step={1}
            trackHeight={10}
            thumbWidth={18}
            thumbGap={1}
            onMinChange={onMinChangeArrival}
            onMaxChange={onMaxChangeArrival}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterTime;