import { SloganCompany, TicketSearchForm, ProgressBar } from "../../components";
import "./HomePage.css";
import advantagesGroup1 from "../../assets/img/icon/advantages-group-1.svg";
import advantagesGroup2 from "../../assets/img/icon/advantages-group-2.svg";
import advantagesGroup3 from "../../assets/img/icon/advantages-group-3.svg";

const HomePage = () => {
  return (
    <>
      <section className="order-tickets-section-homepage">
        <SloganCompany />
        <div className="order-tickets-section-homepage__container">
          <TicketSearchForm className="ticket-search-form ticket-search-form--homepage" />
        </div>
      </section>
      <ProgressBar />

      <section className="about-section">
        <h2 className="about-section__title">О нас</h2>
        <div className="about-section__container">
          <p className="about-section__text">Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
            все больше людей заказывают жд билеты через интернет.</p>
          <p className="about-section__text">Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
            Мы расскажем о преимуществах заказа через интернет.</p>
          <p className="about-section__text">Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br />
            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="how-it-works-section__header">
          <h2 className="how-it-works-section__header-title">Как это работает</h2>
          <button type="button" className="how-it-works-section__header-btn">Узнать больше</button>
        </div>
        <div className="how-it-works-section__advantages-group">
          <div className="how-it-works-section__advantage">
            <img
              src={advantagesGroup1}
              className="how-it-works-section__advantage-icon"
              alt="Удобный заказ на сайте"
            />
            <span className="how-it-works-section__advantage-text">Удобный заказ <br/> на сайте</span>
          </div>
          <div className="how-it-works-section__advantage">
            <img
              src={advantagesGroup2}
              className="how-it-works-section__advantage-icon"
              alt="Нет необходимости ехать в офис"
            />
            <span className="how-it-works-section__advantage-text">Нет необходимости ехать в офис</span>
          </div>
          <div className="how-it-works-section__advantage">
            <img
              src={advantagesGroup3}
              className="how-it-works-section__advantage-icon"
              alt="Огромный выбор напрвлений"
            />
            <span className="how-it-works-section__advantage-text">Огромный выбор напрвлений</span>
          </div>
        </div>
      </section>

      <section className="reviews-section">

      </section>
    </>
  );
}

export default HomePage;