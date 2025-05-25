import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { resetCitiesState } from "../../slices/citiesSlice";
import { resetTrainState } from "../../slices/trainSlice";
import { resetSeatsState } from "../../slices/seatsSlice";
import { resetPassengersState } from "../../slices/passengersSlice";
import { resetQueryParamsState } from "../../slices/queryParamsSlice";
import { resetOrderState } from "../../slices/orderSlice";
import { Loader, LoadingProgressBar, RatingStars } from "../../components";
import { CurrencyIconSvg } from "../../components/icons";
import ConductorIcon from "./img/conductor.svg";
import ElectronicTicketsIcon from "./img/electronic-tickets.svg";
import TicketsIcon from "./img/tickets.svg";
import "./SuccessOrderPage.css";

const SuccessOrderPage = () => {
  const selectedSeats = useAppSelector(state => state.seats.selectedSeats);
  const { first_name, patronymic } = useAppSelector(state => state.order.owner);
  const { orderStatus, loading, error } = useAppSelector(state => state.order);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    const priceFrom = selectedSeats["from"].reduce((sum, seat) => sum + seat.price, 0);
    const priceTo = selectedSeats["to"].reduce((sum, seat) => sum + seat.price, 0) || 0;

    return priceFrom + priceTo;
  }

  const goHomepage = () => {
    dispatch(resetCitiesState());
    dispatch(resetTrainState());
    dispatch(resetSeatsState());
    dispatch(resetPassengersState());
    dispatch(resetQueryParamsState());
    dispatch(resetOrderState())

    navigate("/", { replace: true });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading &&
        <div className="loading-process-container">
          <LoadingProgressBar
            start={loading}
            requestStatus={orderStatus === true}
            error={error ? true : false}
          />
          <Loader />
        </div>}

      {!loading && orderStatus &&
        <>
          <section className="header__background"></section>
          <section className="success-order">
            <h1 className="success-order__title">Благодарим Вас за заказ!</h1>

            <div className="success-order__info">

              <div className="success-order__info-header">
                <div className="success-order__number">№Заказа 285AA</div>
                <div className="success-order__total-price">
                  <span className="success-order__total-price-title">сумма </span>
                  <span className="success-order__total-price-num">{getTotalPrice()}</span>
                  <CurrencyIconSvg code="rub" width={21} fill="#928f94" />
                </div>
              </div>

              <div className="success-order__instruction">
                <div className="success-order__instruction__step-item">
                  <div className="success-order__instruction__step-icon">
                    <img
                      src={ElectronicTicketsIcon}
                      className="success-order__instruction__step-icon-img"
                      alt="Электронные билеты придут на почту"
                    />
                  </div>
                  <div className="success-order__instruction__step-text">
                    билеты будут<br />отправлены<br />на ваш <b>e-mail</b>
                  </div>
                </div>
                <div className="success-order__instruction__step-item">
                  <div className="success-order__instruction__step-icon">
                    <img
                      src={TicketsIcon}
                      className="success-order__instruction__step-icon-img"
                      alt="Распечатайте электронные билеты"
                    />
                  </div>
                  <div className="success-order__instruction__step-text">
                    <b>распечатайте</b><br />и сохраняйте билеты<br />до даты поездки
                  </div>
                </div>
                <div className="success-order__instruction__step-item">
                  <div className="success-order__instruction__step-icon">
                    <img
                      src={ConductorIcon}
                      className="success-order__instruction__step-icon-img"
                      alt="Предъявите билеты при посадке"
                    />
                  </div>
                  <div className="success-order__instruction__step-text">
                    <b>предьявите</b><br />распечатанные<br />билеты при посадке
                  </div>
                </div>
              </div>

              <div className="success-order__message">
                <h2 className="success-order__message-title">{`${first_name} ${patronymic}!`}</h2>
                <p className="success-order__message-text">Ваш заказ успешно оформлен.<br />В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                <p className="success-order__message-endnote">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
              </div>

              <div className="success-order__actions">
                <div className="success-order__rating">
                  <div className="success-order__rating-title">Оценить сервис</div>
                  <div className="success-order__rating-stars">
                    <RatingStars countStars={5} />
                  </div>
                </div>
                <button
                  className="success-order__homepage-btn"
                  onClick={goHomepage}
                >
                  Вернуться на главную
                </button>
              </div>
            </div>
          </section>
        </>}
    </>


  );
}

export default SuccessOrderPage;