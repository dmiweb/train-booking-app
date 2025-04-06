import "./LastTicketsWidget.css";

const LastTicketsWidget = ({ tickets = [] }) => {
  return (
    <div className="last-tickets">
      <h2 className="last-tickets__title">Последние билеты</h2>

      <ul className="last-tickets__list">

        <li className="last-tickets__item last-ticket">
          <div className="last-ticket__location">
            <div className="last-ticket__location-departure">Санкт-петербург</div>
            <div className="last-ticket__location-arrival">Самара</div>
          </div>
          <div className="last-ticket__station">
            <div className="last-ticket__station-departure">Курский вокзал</div>
            <div className="last-ticket__station-arrival">Московский вокзал</div>
          </div>
          <div className="last-ticket__info">

            <div className="last-ticket__info-options"></div>

            <div className="last-ticket__info-min-price">
              <span className="last-ticket__info-min-price-prefix">от</span>
              <span className="last-ticket__info-min-price-amount">3500</span>
              <span className="last-ticket__info-min-price-currency"></span>
            </div>
          </div>
        </li>

        {tickets.length ? tickets.map((ticket) => {
          return (
            <li key={ticket} className="last-tickets__item last-ticket">
              <div className="last-ticket__location">
                <div className="last-ticket__location-departure">Санкт-петербург</div>
                <div className="last-ticket__location-arrival">Самара</div>
              </div>
              <div className="last-ticket__station">
                <div className="last-ticket__station-departure">Курский вокзал</div>
                <div className="last-ticket__station-arrival">Московский вокзал</div>
              </div>
              <div className="last-ticket__info">
                <div className="last-ticket__info-options"></div>
                <div className="last-ticket__info-min-price">
                  <span className="last-ticket__info-min-price-prefix">от</span>
                  <span className="last-ticket__info-min-price-amount">3500</span>
                  <span className="last-ticket__info-min-price-currency">₽</span>
                </div>
              </div>
            </li>
          );
        }) : null}
      </ul>
    </div>
  );
}

export default LastTicketsWidget;