// import { useState } from "react";
import { FilterOptions, DoubleRangeSlider, FilterTime } from "../../components";
import "./FilterPanel.css";

const FilterPanel = () => {

  return (
    <>
      <section className="filter-panel" aria-label="Набор фильтров поездки">
        <form className="filter-panel__form">
          <div className="filter-panel__container">
            <div className="filter-dates">
              <label className="filter-dates__label">
                <span className="filter-dates__title-input">Дата поездки</span>
                <input type="text" className="filter-dates__input" />
              </label>
              <label className="filter-dates__label">
                <span className="filter-dates__title-input">Дата возвращения</span>
                <input type="text" className="filter-dates__input" />
              </label>
            </div>
          </div>

          <div className="filter-panel__container">
            <FilterOptions />
          </div>

          <div className="filter-panel__container">
            <div className="filter-prices">
              <div className="filter-prices__title">Стоимость</div>
              
              <div className="filter-prices__range-name">
                <span className="filter-prices__range-name-from">от</span>
                <span className="filter-prices__range-name-to">до</span>
              </div>

              <DoubleRangeSlider
                min={1511}
                max={10733}
                step={1}
                trackHeight={19}
                thumbWidth={24}
                thumbGap={10}
                type="number"
              />
            </div>
          </div>

          <div className="filter-panel__container">
            <FilterTime title="Туда" direction="outbound" />
          </div>

          <div className="filter-panel__container">
            <FilterTime title="Обратно" direction="inbound" />
          </div>
        </form>

      </section>
    </>
  );
}

export default FilterPanel;