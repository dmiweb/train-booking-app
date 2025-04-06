import { useState } from "react";
import { ArrowIconSvg, MinusIconSvg, PlusIconSvg, PassengerIconSvg, СurrencyIconSvg } from "../../components/icons";
// import { FilterOptions, DoubleRangeSlider, FilterTime } from "../../components";
import "./DetailsTripPanel.css";

const DetailsTripPanel = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleVisibleFilter = () => {
    setIsVisible(() => !isVisible)
  }

  return (
    <section className="details-trip-panel" aria-label="Детали поездки">
      <h2 className="details-trip-panel__header">Детали поездки</h2>

      <div className="details-trip-panel__trip">
        <div className="details-trip-panel__trip-wrap">
          <div className="details-trip-panel__trip-direction">
            <div className="details-trip-panel__trip-direction-icon">
              <ArrowIconSvg direction="right" width={13} fill='#3e3c41' />
            </div>
            <span className="details-trip-panel__trip-direction-title">Туда</span>
            <span className="details-trip-panel__trip-date">30.08.2018</span>
            <label className="details-trip-panel__header-label">
              <input type="checkbox" className="details-trip-panel__header-checkbox" />
              <div
                className="details-trip-panel__header-toggle-btn"
                onClick={handleVisibleFilter}
              >
                {isVisible
                  ? <MinusIconSvg width={10} fill="#c4c4c4" />
                  : <PlusIconSvg width={10} fill="#ffffff" />}
              </div>
            </label>
          </div>

          <div className="details-trip-panel__trip-train-info">
            <div className="details-trip-panel__trip-train">
              <span className="details-trip-panel__trip-train-title">№ Поезда </span>
              <span className="details-trip-panel__trip-train-number">116C</span>
            </div>
            <div className="details-trip-panel__trip-train">
              <span className="details-trip-panel__trip-train-title">Название</span>
              <span className="details-trip-panel__trip-train-name">Адлер<br />Санкт-Петербург</span>
            </div>
          </div>

          <div className="details-trip-panel__trip-time-info">
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-departure-time">00:10</div>
              <div className="details-trip-panel__trip-departure-date">30.08.2018</div>
            </div>
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-total-time">9:42</div>
              <ArrowIconSvg direction="right" width={30} fill='#ffa800' />
            </div>
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-arrival-time">09:52</div>
              <div className="details-trip-panel__trip-arrival-date">31.08.2018</div>
            </div>
          </div>

          <div className="details-trip-panel__trip-city-info">
            <div className="details-trip-panel__trip-city-wrap">
              <div className="details-trip-panel__trip-departure-city">Москва</div>
              <div className="details-trip-panel__trip-departure-station">Курский вокзал</div>
            </div>
            <div className="details-trip-panel__trip-city-wrap">
              <div className="details-trip-panel__trip-arrival-city">Санкт-Петербург</div>
              <div className="details-trip-panel__trip-arrival-station">Ладожский вокзал</div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-trip-panel__trip">
        <div className="details-trip-panel__trip-wrap">
          <div className="details-trip-panel__trip-direction">
            <div className="details-trip-panel__trip-direction-icon">
              <ArrowIconSvg direction="left" width={13} fill='#3e3c41' />
            </div>
            <span className="details-trip-panel__trip-direction-title">Обратно</span>
            <span className="details-trip-panel__trip-date">09.09.2018</span>
            <label className="details-trip-panel__header-label">
              <input type="checkbox" className="details-trip-panel__header-checkbox" />
              <div
                className="details-trip-panel__header-toggle-btn"
                onClick={handleVisibleFilter}
              >
                {isVisible
                  ? <MinusIconSvg width={10} fill="#c4c4c4" />
                  : <PlusIconSvg width={10} fill="#ffffff" />}
              </div>
            </label>
          </div>

          <div className="details-trip-panel__trip-train-info">
            <div className="details-trip-panel__trip-train">
              <span className="details-trip-panel__trip-train-title">№ Поезда </span>
              <span className="details-trip-panel__trip-train-number">116C</span>
            </div>
            <div className="details-trip-panel__trip-train">
              <span className="details-trip-panel__trip-train-title">Название</span>
              <span className="details-trip-panel__trip-train-name">Адлер<br />Санкт-Петербург</span>
            </div>
          </div>

          <div className="details-trip-panel__trip-time-info">
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-departure-time">00:10</div>
              <div className="details-trip-panel__trip-departure-date">30.08.2018</div>
            </div>
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-total-time">9:42</div>
              <ArrowIconSvg direction="left" width={30} fill='#ffa800' />
            </div>
            <div className="details-trip-panel__trip-time-wrap">
              <div className="details-trip-panel__trip-arrival-time">09:52</div>
              <div className="details-trip-panel__trip-arrival-date">31.08.2018</div>
            </div>
          </div>

          <div className="details-trip-panel__trip-city-info">
            <div className="details-trip-panel__trip-city-wrap">
              <div className="details-trip-panel__trip-departure-city">Москва</div>
              <div className="details-trip-panel__trip-departure-station">Курский вокзал</div>
            </div>
            <div className="details-trip-panel__trip-city-wrap">
              <div className="details-trip-panel__trip-arrival-city">Санкт-Петербург</div>
              <div className="details-trip-panel__trip-arrival-station">Ладожский вокзал</div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-trip-panel__passengers">
        <div className="details-trip-panel__trip-direction">
          {/* <div className="details-trip-panel__trip-direction-icon"> */}
          <PassengerIconSvg width={26} fill='#ffa800' />
          {/* </div> */}
          <span className="details-trip-panel__trip-direction-title">Пассажиры</span>
          <label className="details-trip-panel__header-label">
            <input type="checkbox" className="details-trip-panel__header-checkbox" />
            <div
              className="details-trip-panel__header-toggle-btn"
              onClick={handleVisibleFilter}
            >
              {isVisible
                ? <MinusIconSvg width={10} fill="#c4c4c4" />
                : <PlusIconSvg width={10} fill="#ffffff" />}
            </div>
          </label>
        </div>

        <div className="details-trip-panel__passengers-summary">
          <div className="details-trip-panel__passengers-summary-adults">
            <div className="details-trip-panel__passengers-summary-person-count">2 Взрослых</div>
            <div className="details-trip-panel__passengers-summary-sum">
              <span className="details-trip-panel__passengers-summary-sum-num">5 840</span>
              <СurrencyIconSvg code="rub" width={14} fill="#928f94" />
            </div>
          </div>
          <div className="details-trip-panel__passengers-summary-children">
            <div className="details-trip-panel__passengers-summary-person-count">1 Ребенок </div>
            <div className="details-trip-panel__passengers-summary-sum">
            <span className="details-trip-panel__passengers-summary-sum-num">1 920</span>
            <СurrencyIconSvg code="rub" width={14} fill="#928f94" />
            </div>
          </div>
        </div>
      </div>

      <div className="details-trip-panel__total">
        <div className="details-trip-panel__total-title">Итог</div>
        <div className="details-trip-panel__total-price">
          <span className="details-trip-panel__total-price-number">7 760</span>
          <СurrencyIconSvg code="rub" width={27} fill="#e5e5e5" />
        </div>
      </div>


    </section>
  );
}

export default DetailsTripPanel;