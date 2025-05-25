import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { requestTrains } from "../../../slices/trainSlice";
import "./DoubleRangeSlider.css";

type DoubleRangeSliderProps = {
  type: "price" | "time";
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step: number;
  trackHeight: number;
  thumbWidth: number;
  thumbGap: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const DoubleRangeSlider = (props: DoubleRangeSliderProps) => {
  const { type, min, max, minValue, maxValue, step, trackHeight, thumbWidth, thumbGap, onMinChange, onMaxChange } = props;

  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);

  const [minPercent, setMinPercent] = useState<string>("0%");
  const [maxPercent, setMaxPercent] = useState<string>("100%");

  const minValRef = useRef(min);
  const maxValRef = useRef(max);

  const minThumbRef = useRef<HTMLInputElement | null>(null);
  const maxThumbRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (minThumbRef.current && maxThumbRef.current) {
      minThumbRef.current.style.setProperty('--thumb-width', `${thumbWidth}px`);
      minThumbRef.current.style.setProperty('--thumb-height', `${thumbWidth}px`);
      maxThumbRef.current.style.setProperty('--thumb-width', `${thumbWidth}px`);
      maxThumbRef.current.style.setProperty('--thumb-height', `${thumbWidth}px`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    minValRef.current = minValue || min;
    maxValRef.current = maxValue || max;

    const minPercent = ((minValRef.current - min) / (max - min)) * 100;
    const maxPercent = ((maxValRef.current - min) / (max - min)) * 100;

    setMinPercent(`${minPercent}%`); // min custom track value
    setMaxPercent(`${maxPercent - minPercent}%`); // max custom track value
  }, [min, max, minValue, maxValue]);

  const slideMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (value >= min && maxValRef.current - value >= thumbGap) {
      minValRef.current = value;

      setMinVal(value)
      onMinChange(+e.target.value);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (value <= max && value - minValRef.current >= thumbGap) {
      maxValRef.current = value;

      setMaxVal(value)
      onMaxChange(+e.target.value);
    }
  };
  
  return (
    <div className="double-range-slider" style={{ height: trackHeight }}>
      <div className="double-range-slider__track-wrap">
        <div className="double-range-slider__track" style={{ left: minPercent, width: maxPercent }}></div>
      </div>

      <input
        type="range"
        name="min"
        min={min}
        max={max}
        value={minVal !== 0 ? minVal : min}
        onChange={slideMin}
        onMouseUp={() => dispatch(requestTrains())}
        onTouchEnd={() => dispatch(requestTrains())}
        step={step}
        ref={minThumbRef}
        disabled={false}
      />
      <input
        type="range"
        name="max"
        min={min}
        max={max}
        value={maxVal !== 0 ? maxVal : max}
        onChange={slideMax}
        onMouseUp={() => dispatch(requestTrains())}
        onTouchEnd={() => dispatch(requestTrains())}
        step={step}
        ref={maxThumbRef}
        disabled={false}
      />

      <div className="double-range-slider__values">
        <div className="double-range-slider__values-min">
          {`${minVal !== 0 ? minVal : min}${type === "time" ? ":00" : ""}`}
        </div>

        <div className="double-range-slider__values-max">
          {`${maxVal !== 0 ? maxVal : max}${type === "time" ? ":00" : ""}`}
        </div>
      </div>
    </div>
  );
}

export default DoubleRangeSlider;