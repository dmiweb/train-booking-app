import { useNavigate } from "react-router-dom";

import "./TrainList.css";

const TrainList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="train">
        <div className="train-info">
          <div className="train-info__icon"></div>
          <div className="train-info__number">116С</div>

          <div className="train-info__direction">
            <div className="train-info__direction-start">Адлер</div>
            <div className="train-info__direction-departure">Москва</div>
            <div className="train-info__direction-arrival">Санкт-Петербург</div>
          </div>
        </div>

        <div className="train-trip">
          <div className="train-trip__container">
            <div className="train-trip-info">
              <div className="train-trip-info__time">00:10</div>
              <div className="train-trip-info__location">Москва</div>
              <div className="train-trip-info__station">Курский вокзал</div>
            </div>

            <div className="train-trip__duration">
              <span className="train-trip__duration-time">9:42</span>
              <span className="train-trip__direction-icon-from"></span>
            </div>

            <div className="train-trip__container">
              <div className="train-trip-info">
                <div className="train-trip-info__time">09:52</div>
                <div className="train-trip-info__location">Санкт-Петербург</div>
                <div className="train-trip-info__station">Ладожский вокзал</div>
              </div>
            </div>
          </div>

          <div className="train-trip__container">
            <div className="train-trip-info">
              <div className="train-trip-info__time">00:10</div>
              <div className="train-trip-info__location">Москва</div>
              <div className="train-trip-info__station">Курский вокзал</div>
            </div>

            <div className="train-trip__duration">
              <span className="train-trip__duration-time">9:42</span>
              <span className="train-trip__direction-icon-back"></span>
            </div>

            <div className="train-trip__container">
              <div className="train-trip-info">
                <div className="train-trip-info__time">09:52</div>
                <div className="train-trip-info__location">Санкт-Петербург</div>
                <div className="train-trip-info__station">Ладожский вокзал</div>
              </div>
            </div>
          </div>
        </div>

        <div className="train-seats">
          <div className="train-seats__seating">
            <div className="train-seats__seating-type">Сидячий</div>
            <div className="train-seats__seating-count">88</div>
            <div className="train-seats__seating-min-price">1920</div>
          </div>
          <div className="train-seats__reserved">
            <div className="train-seats__seating-type">Плацкарт</div>
            <div className="train-seats__seating-count">52</div>
            <div className="train-seats__seating-min-price">2530</div>
          </div>
          <div className="train-seats__coupe">
            <div className="train-seats__seating-type">Купе</div>
            <div className="train-seats__seating-count">24</div>
            <div className="train-seats__seating-min-price">3820</div>
          </div>
          <div className="train-seats__lux">
            <div className="train-seats__seating-type">Люкс</div>
            <div className="train-seats__seating-count">15</div>
            <div className="train-seats__seating-min-price">4950</div>
          </div>

          <div className="train-seats__services"></div>
          <button
            type="button"
            className="train-seats__select-btn"
            onClick={() => navigate("/seats")}
          >
            Выбрать места
          </button>
        </div>
      </div>

      <ul className="train__list">
        <li className="train__list-item">

        </li>
      </ul>
    </>

  );
}

export default TrainList;