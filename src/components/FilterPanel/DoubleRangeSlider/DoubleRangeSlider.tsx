import { useState, useEffect, useRef } from "react";
import "./DoubleRangeSlider.css";


type DoubleRangeSliderProps = {
  min: number;
  max: number;
  step: number;
  trackHeight: number;
  thumbWidth: number;
  thumbGap: number;
  type: "number" | "time"
}


const DoubleRangeSlider = (props: DoubleRangeSliderProps) => {
  const { min, max, step, trackHeight, thumbWidth, thumbGap, type } = props;

  const [sliderMinValue] = useState(min);
  const [sliderMaxValue] = useState(max);

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const [isDragging, setIsDragging] = useState(false);
  console.log(isDragging)
  // const [position, setPosition] = useState(false);

  const rangeSliderRef = useRef<HTMLDivElement | null>(null);
  const trackSliderRef = useRef<HTMLDivElement | null>(null);
  const minThumbRef = useRef<HTMLInputElement | null>(null);
  const maxThumbRef = useRef<HTMLInputElement | null>(null);
  const valueRangeMinRef = useRef<HTMLDivElement | null>(null);
  const valueRangeMaxRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (rangeSliderRef.current) {
      rangeSliderRef.current.style.height = trackHeight + "px";
    }

    if (minThumbRef.current && maxThumbRef.current) {
      minThumbRef.current.style.setProperty('--thumb-width', `${thumbWidth}px`);
      minThumbRef.current.style.setProperty('--thumb-height', `${thumbWidth}px`);
      maxThumbRef.current.style.setProperty('--thumb-width', `${thumbWidth}px`);
      maxThumbRef.current.style.setProperty('--thumb-height', `${thumbWidth}px`);
    }

    setSliderTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal]);



  const slideMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= thumbGap) {
      setMinVal(value);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= thumbGap) {
      setMaxVal(value);
    }
  };

  const setSliderTrack = () => {

    if (trackSliderRef.current) {
      const minPercent = ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent = ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      // range.style.left = `${minPercent}%`;
      // range.style.right = `${100 - maxPercent}%`;
      trackSliderRef.current.style.left = `${minPercent}%`;
      trackSliderRef.current.style.width = `${maxPercent - minPercent}%`;



      // let positionPriceMin = valueRangeMinRef.current.getBoundingClientRect().right;
      // let positionPriceMax = valueRangeMaxRef.current.getBoundingClientRect().left;

      // if (positionPriceMin >= positionPriceMax) {
      //   setPosition(true)
      // } else {
      //   setPosition(false)
      // }

      let minPriceLeft = `calc(${minPercent}% - ${thumbWidth / 2}px)`;
      let maxPriceLeft = `calc(${maxPercent}% - ${thumbWidth}px)`;

      // Если минимальная ручка в крайнем левом положении
      if (minPercent === 0) {
        minPriceLeft = `${minPercent}%`; // Выравниваем по левому краю
      }

      // Если максимальная ручка в крайнем правом положении
      if (maxPercent === 100) {
        maxPriceLeft = `calc(${maxPercent}% - ${thumbWidth * 2}px)`; // Выравниваем по правому краю (нужно учесть ширину thumb)
      }

      if (valueRangeMinRef.current) valueRangeMinRef.current.style.left = minPriceLeft;
      if (valueRangeMaxRef.current) valueRangeMaxRef.current.style.left = maxPriceLeft;
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="double-range-slider" ref={rangeSliderRef}>
      <div className="double-range-slider__track-wrap">
        <div className="double-range-slider__track" ref={trackSliderRef}></div>
      </div>

      <input
        type="range"
        name="min"
        min={sliderMinValue}
        max={sliderMaxValue}
        value={minVal}
        onChange={slideMin}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        step={step}
        ref={minThumbRef}
      />
      <input
        type="range"
        name="max"
        min={sliderMinValue}
        max={sliderMaxValue}
        value={maxVal}
        onChange={slideMax}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        step={step}
        ref={maxThumbRef}
      />

      <div className="double-range-slider__values">
        {type === "number" ? <div className="double-range-slider__values-min" ref={valueRangeMinRef}>
          {minVal}
        </div> : null}
        {type === "number" ? <div className="double-range-slider__values-max" ref={valueRangeMaxRef}>
          {maxVal}
        </div> : null}
        {type === "time" ? <div className="double-range-slider__values-min" ref={valueRangeMinRef}>
          {`${minVal}:00`}
        </div> : null}
        {type === "time" ? <div className="double-range-slider__values-max" ref={valueRangeMaxRef}>
          {`${maxVal}:00`}
        </div> : null}
      </div>
    </div>
  );
}

export default DoubleRangeSlider;