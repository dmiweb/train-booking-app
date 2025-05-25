import { SloganCompany, TicketSearchForm } from "../../components";
import "./HomePage.css";
import advantagesGroup1 from "../../assets/icon/advantages-group-1.svg";
import advantagesGroup2 from "../../assets/icon/advantages-group-2.svg";
import advantagesGroup3 from "../../assets/icon/advantages-group-3.svg";
import client1 from "../../assets/img/client-1.png";
import client2 from "../../assets/img/client-2.png";

const HomePage = () => {
  return (
    <>
      <section className="order-tickets-section-homepage">
        <SloganCompany />
        <div className="order-tickets-section-homepage__container">
          <TicketSearchForm className="ticket-search-form ticket-search-form--homepage" />
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-section__wrap">
          <h2 className="about-section__title">О нас</h2>
          <div className="about-section__container">
            <p className="about-section__text">Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
              все больше людей заказывают жд билеты через интернет.</p>
            <p className="about-section__text">Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
              Мы расскажем о преимуществах заказа через интернет.</p>
            <p className="about-section__text">Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br />
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
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
            <span className="how-it-works-section__advantage-text">Удобный заказ <br /> на сайте</span>
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

      <section id="reviews" className="reviews-section">
        <div className="reviews-section__wrap">
          <h2 className="reviews-section__title">Отзывы</h2>

          <div className="reviews-slider">
            <div className="reviews-slider__slide">
              <div className="reviews-slider__review">
                <img src={client1} className="reviews-slider__review-photo" alt="Фото клиента" />
                <div className="reviews-slider__review-info">
                  <div className="reviews-slider__review-author">Екатерина Вальнова</div>
                  <p className="reviews-slider__review-text">Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.</p>
                </div>
              </div>
              <div className="reviews-slider__review">
                <img src={client2} className="reviews-slider__review-photo" alt="Фото клиента" />
                <div className="reviews-slider__review-info">
                  <div className="reviews-slider__review-author">Евгений Стрыкало</div>
                  <p className="reviews-slider__review-text">СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews-slider__navigation-dots"></div>
        </div>
      </section>
    </>
  );
}

export default HomePage;