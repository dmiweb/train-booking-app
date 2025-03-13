import { FilterOptions } from "../../components";
import "./FilterPanel.css";

const FilterPanel = () => {
  return (
    <>
      <section className="filter-panel" aria-label="Набор фильтров">
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


              <div className="range-slider">
                
                <input type="range" id="lower" onInput="upper.value=this.value<this.max?this.value:upper.value" min="0" max="100" step="1" />
                  <input type="range" id="upper" onInput="lower.value=this.value>lower.min?this.value:lower.value" min="0" max="100" step="1" />
                  </div>

              </div>
            </div>


            <div className="filter-panel__container fp-form-time-outbound"></div>
            <div className="filter-panel__container fp-form-time-inbound"></div>

        </form>

      </section>
    </>
  );
}

export default FilterPanel;