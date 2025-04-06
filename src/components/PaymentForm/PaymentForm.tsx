// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/confirm");
  }

  return (
    <>
      <div className='payment'>
        <div className='payment__header'>
          <h2 className="payment__title">Персональные данные</h2>
        </div>

        <form className='payment__form'>
          <div className="payment__form-row payment__full-name">
            <div className="payment__field">
              <label htmlFor="payment-surname" className="payment__label">Фамилия</label>
              <input type="text" id="payment-surname" className="payment__input" />
            </div>

            <div className="payment__field">
              <label htmlFor="payment-name" className="payment__label">Имя</label>
              <input type="text" id="payment-name" className="payment__input" />
            </div>

            <div className="payment__field">
              <label htmlFor="payment-patronymic" className="payment__label">Отчество</label>
              <input type="text" id="payment-patronymic" className="payment__input" />
            </div>
          </div>


          <div className="payment__form-row payment__contacts">
            <div className="payment__field">
              <label htmlFor="payment-phone" className="payment__label">Контактный телефон</label>
              <input
                type="text"
                id="payment-phone"
                className="payment__input"
                placeholder="+7 ___ ___ __ __"
              />
            </div>

            <div className="payment__field">
              <label htmlFor="payment-email" className="payment__label">E-mail</label>
              <input
                type="text"
                id="payment-email"
                className="payment__input"
                placeholder="inbox@gmail.ru"
              />
            </div>
          </div>


          <div className='payment__header payment__type-header'>
            <h2 className="payment__title">Способ оплаты</h2>
          </div>

          <div className="payment__field payment__type-online">
            <label className="payment__checkbox-label">
              <input type="checkbox" className="payment__checkbox" />
              <div className='payment__checkbox-overlay'></div>
              <span className='payment__checkbox-title'>Онлайн</span>
            </label>

            <span className='payment__type-online-option'>Банковской<br />картой</span>
            <span className='payment__type-online-option'>PayPal</span>
            <span className='payment__type-online-option'>Visa QIWI Wallet</span>

          </div>

          <div className="payment__field payment__type-cash">
            <label className="payment__checkbox-label">
              <input type="checkbox" className="payment__checkbox" />
              <div className='payment__checkbox-overlay'></div>
              <span className='payment__checkbox-title'>Наличными</span>
            </label>
          </div>


          <button className="payment__next-button" onClick={(e) => handleClickButton(e)}>Купить билеты</button>
        </form>


      </div>
    </>
  );
}

export default PaymentForm;