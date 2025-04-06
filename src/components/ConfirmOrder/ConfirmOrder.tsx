// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train } from '../../components';
import { PassengerIconSvg, СurrencyIconSvg } from '../icons';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/success");
  }

  return (

    <div className='confirm'>
      <div className='confirm__column'>
        <div className='confirm__container confirm__train'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Поезд</h2>
          </div>
          <Train />
        </div>

        <div className='confirm__container confirm__passengers'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Пассажиры</h2>
          </div>

          <div className='confirm__row'>
            <div className='confirm__column confirm__column-passengers'>
              <div className='confirm__passengers-person'>
                <div className='confirm__person-age-group'>
                  <div className='confirm__person-age-group-icon'>
                    <PassengerIconSvg width={40} fill='#ffffff' />
                  </div>
                  <div className='confirm__person-age-group-name'>Взрослый</div>
                </div>
                <div className='confirm__person-info'>
                  <div className='confirm__person-full-name'>Мартынюк Ирина Эдуардовна</div>
                  <div className='confirm__person-gender'>Пол женский</div>
                  <div className='confirm__person-birthdata'>Дата рождения 17.02.1985</div>
                  <div className='confirm__person-document'>Паспорт РФ 4204 380694</div>
                </div>
              </div>
              <div className='confirm__passengers-person'>
                <div className='confirm__person-age-group'>
                  <div className='confirm__person-age-group-icon'>
                    <PassengerIconSvg width={40} fill='#ffffff' />
                  </div>
                  <div className='confirm__person-age-group-name'>Детский</div>
                </div>
                <div className='confirm__person-info'>
                  <div className='confirm__person-full-name'>Мартынюк Кирилл Сергеевич</div>
                  <div className='confirm__person-gender'>Пол мужской</div>
                  <div className='confirm__person-birthdata'>Дата рождения 25.01.2006</div>
                  <div className='confirm__person-document'>Свидетельство о рождении VIII УН 256319</div>
                </div>
              </div>
            </div>

            <div className='confirm__column confirm__column-price'>
              <div className='confirm__total-price'>
                <span className='confirm__total-price-title'>Всего</span>
                <span className='confirm__total-price-num'>7 760</span>
                <СurrencyIconSvg code='rub' width={20} fill='#928f94' />
              </div>
              <button className="confirm__change-button">Изменить</button>
            </div>
          </div>
        </div>

        <div className='confirm__container confirm__payment'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Способ оплаты</h2>
          </div>
          <div className="confirm__column confirm__column-payment">
            <div className='confirm__payment-type'>Наличными</div>
            <button className="confirm__change-button">Изменить</button>
          </div>
        </div>
      </div>

      <button className="confirm__next-button" onClick={handleClickButton}>Подтвердить</button>
    </div>
  );
}

export default ConfirmOrder;