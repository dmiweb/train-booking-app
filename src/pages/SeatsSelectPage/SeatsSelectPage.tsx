import { useNavigate } from "react-router-dom";
import { TicketSearchForm, OrderProgressBar, LoadingProgressBar, FilterPanel, PlazcartWagon } from "../../components";
import { SeatingPlacesIconSvg, PlazcartIconSvg, CoupeIconSvg, LuxIconSvg, СurrencyIconSvg, ConditionerIconSvg, WifiIconSvg, BedLinenIconSvg, FoodIconSvg } from "../../components/icons";
import "./SeatsSelectPage.css";

const SeatsSelectPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={1} />
      <LoadingProgressBar />

      <div className="order-page-wrap">
        <aside className="sidebar">
          <FilterPanel />
          {/* <LastTicketsWidget /> */}
        </aside>

        <main className="main-select-seats">
          <h2 className="main-select-seats__title">Выбор мест</h2>

          <div className="select-seats">
            <span className="select-seats__direction-icon-from"></span>
            <button className="select-seats__back-btn">Выбрать другой поезд</button>

            <div className="select-seats__trip-details">
              <div className="select-seats__train-direction">
                <span className="select-seats__train-icon"></span>
                <span className="select-seats__train-number">116C</span>
                <span className="select-seats__train-start">Адлер → </span>
                <span className="select-seats__train-departure">Москва → </span>
                <span className="select-seats__train-arrival">Санкт-Петербург</span>
              </div>

              <div className="select-seats__trip">
                <div className="select-seats__container">
                  <div className="select-seats-info">
                    <div className="select-seats__trip-time">00:10</div>
                    <div className="select-seats-trip-location">Москва</div>
                    <div className="select-seats__trip-station">Курский вокзал</div>
                  </div>

                  <div className="train-trip__direction-from">
                    <span className="train-trip__direction-from-icon"></span>
                  </div>

                  <div className="select-seats__container">
                    <div className="select-seats-info">
                      <div className="select-seats__trip-time">09:52</div>
                      <div className="select-seats-trip-location">Санкт-Петербург</div>
                      <div className="select-seats__trip-station">Ладожский вокзал</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="select-seats__travel-time">
                <span className="select-seats__travel-time-icon"></span>
                <div className="select-seats__travel-duration">
                  <span className="select-seats__travel-duration-hours">9 часов</span>
                  <span className="select-seats__travel-duration-hours">42 минуты</span>
                </div>
              </div>
            </div>


            <div className="select-seats__count-tickets">
              <h2 className="select-seats__count-tickets-title">Количество билетов</h2>

              <div className="select-seats__type-tickets">
                <div className="select-seats__adult-tickets">
                  <div className="select-seats__type-age-tickets">Взрослых - 2</div>
                  <span className="select-seats__adult-passenger-info">Можно добавить еще 3 пассажиров</span>
                </div>

                <div className="select-seats__child-tickets">
                  <div className="select-seats__type-age-tickets">Детских - 1</div>
                  <span className="select-seats__child-passenger-info">Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</span>
                </div>

                <div className="select-seats__child-no-seat-tickets">
                  <div className="select-seats__type-age-tickets">Детских «без места» - 0</div>
                </div>
              </div>
            </div>


            <div className="select-seats__wagon">
              <h2 className="select-seats__wagon-title">Тип вагона</h2>

              <div className="select-seats__wagon-types">
                <div className="select-seats__seating-places">
                  <SeatingPlacesIconSvg width={30.5} fill="#c4c4c4" />
                  <div className="select-seats__wagon-type-name">Сидячий</div>
                </div>
                <div className="select-seats__plazcart">
                  <PlazcartIconSvg width={50} fill="#c4c4c4" />
                  <div className="select-seats__wagon-type-name">Плацкарт</div>
                </div>
                <div className="select-seats__coupe">
                  <CoupeIconSvg width={50} fill="#c4c4c4" />
                  <div className="select-seats__wagon-type-name">Купе</div>
                </div>
                <div className="select-seats__lux">
                  <LuxIconSvg width={56.5} fill="#c4c4c4" />
                  <div className="select-seats__wagon-type-name">Люкс</div>
                </div>
              </div>

              <div className="select-seats__wagon-number">
                <span className="select-seats__wagon-menu-title">Вагоны</span>
                <nav className="select-seats__wagon-menu">
                  <a href="##" >10</a>
                  <a href="##">12</a>
                  <a href="##">15</a>
                </nav>
                <span className="select-seats__wagon-menu-info">
                  Нумерация вагонов начинается с головы поезда
                </span>
              </div>


              <div className="select-seats__wagon-info">
                <div className="select-seats__wagon-current">
                  <span className="select-seats__wagon-current-number">12</span>
                  <span className="select-seats__wagon-current-text">вагон</span>
                </div>

                <div className="select-seats__wagon-seats-info">
                  <div className="select-seats__wagon-seats-free">
                    <div className="select-seats__wagon-seats-free-all">
                      <span className="select-seats__wagon-seats-free-all-title">Места</span>
                      <span className="select-seats__wagon-seats-free-all-count">21</span>
                    </div>
                    <div className="select-seats__wagon-seats-free-upper">
                      <span className="select-seats__wagon-seats-free-upper-title">Верхние</span>
                      <span className="select-seats__wagon-seats-free-upper-count">10</span>
                    </div>
                    <div className="select-seats__wagon-seats-free-lower">
                      <span className="select-seats__wagon-seats-free-lower-title">Нижние</span>
                      <span className="select-seats__wagon-seats-free-lower-count">11</span>
                    </div>
                  </div>
                  <div className="select-seats__wagon-seats-price">
                    <span className="select-seats__wagon-seats-price-title">Стоимость</span>
                    <span className="select-seats__wagon-seats-price-upper">
                      2020
                      <СurrencyIconSvg code="rub" width={14} fill="#928f94" />
                    </span>
                    <span className="select-seats__wagon-seats-price-lower">
                      3030
                      <СurrencyIconSvg code="rub" width={14} fill="#928f94" />
                    </span>
                  </div>

                  <div className="select-seats__wagon-seats-service">
                    <span className="select-seats__wagon-seats-service-title">Обслуживание</span>
                    <span className="select-seats__wagon-seats-service-company">ФПК</span>
                    <div className="select-seats__wagon-seats-service-options">
                      <span className="select-seats__wagon-seats-service-options-conditioner">
                        <ConditionerIconSvg width={22} fill="#292929" />
                      </span>
                      <span className="select-seats__wagon-seats-service-options-wifi">
                        <WifiIconSvg width={19} fill="#292929" />
                      </span>
                      <span className="select-seats__wagon-seats-service-options-bed-linen">
                        <BedLinenIconSvg width={21} fill="#292929" />
                      </span>
                      <span className="select-seats__wagon-seats-service-options-food">
                        <FoodIconSvg width={19} fill="#292929" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="select-seats__people-online-choose">
              11 человек выбирают места в этом поезде
            </div>

            <PlazcartWagon />

            <button onClick={() => navigate('/passengers')}>Далее</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default SeatsSelectPage;