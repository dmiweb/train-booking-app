import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateOrder, submitOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { TTrain, TPassengerInfo } from '../../models';
import { Train, Button } from '../../components';
import { PassengerIconSvg, CurrencyIconSvg } from '../icons';
import { convertFormatDate } from '../../utils/convertFormatDate';
import './ConfirmOrder.css';

type ConfirmOrderProps = {
  selectedTrain: TTrain;
  seats: TPassengerInfo[];
}

const ConfirmOrder = ({ selectedTrain, seats }: ConfirmOrderProps) => {
  const { selectedSeats } = useAppSelector(state => state.seats);
  const { owner } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPriceFrom = selectedSeats["from"].reduce((sum, seat) => sum + seat.price, 0);
  const totalPriceTo = (selectedSeats["to"] || []).reduce((sum, seat) => sum + seat.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmButton = () => {
    dispatch(updateOrder(owner));
    dispatch(submitOrder());

    navigate("/success", { replace: true });
  }

  return (
    <div className='confirm'>
      <div className='confirm__column'>
        <div className='confirm__container confirm__train'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Поезд</h2>
          </div>
          <Train item={selectedTrain} reselect />
        </div>

        <div className='confirm__container confirm__passengers'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Пассажиры</h2>
          </div>

          <div className='confirm__row'>
            <div className='confirm__column confirm__column-passengers'>
              {seats.map((seat, index) => {
                const { is_adult, first_name, last_name, patronymic, gender, birthday, document_type, document_data } = seat.person_info

                return (
                  <div key={index} className='confirm__passengers-person'>
                    <div className='confirm__person-age-group'>
                      <div className='confirm__person-age-group-icon'>
                        <PassengerIconSvg width={40} fill='#ffffff' />
                      </div>
                      <div className='confirm__person-age-group-name'>
                        {is_adult ? "Взрослый" : "Детский"}
                      </div>
                    </div>
                    <div className='confirm__person-info'>
                      <div className='confirm__person-full-name'>
                        {`${last_name} ${first_name} ${patronymic}`}
                      </div>
                      <div className='confirm__person-gender'>
                        Пол {gender === "male" ? "мужской" : "женский"}
                      </div>
                      <div className='confirm__person-birthdata'>
                        Дата рождения {convertFormatDate(birthday)}
                      </div>
                      <div className='confirm__person-document'>
                        {document_type === "passport" ? "Паспорт РФ" : "Свидетельство о рождении"} {document_data}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='confirm__column confirm__column-price'>
              <div className='confirm__total-price'>
                <span className='confirm__total-price-title'>Всего</span>
                <span className='confirm__total-price-num'>{totalPriceFrom + totalPriceTo}</span>
                <CurrencyIconSvg code='rub' width={20} fill='#928f94' />
              </div>

              <Button
                name="Изменить"
                className="change-btn"
                handler={() => navigate("/passengers", { replace: true })}
              />
            </div>
          </div>
        </div>

        <div className='confirm__container confirm__payment'>
          <div className='confirm__header'>
            <h2 className="confirm__title">Способ оплаты</h2>
          </div>
          <div className="confirm__column confirm__column-payment">
            <div className='confirm__payment-type'>
              {owner.payment_method === "online" ? "Онлайн" : "Наличными"}
            </div>

            <Button
              name="Изменить"
              className="change-btn"
              handler={() => navigate("/payment", { replace: true })}
            />
          </div>
        </div>
      </div>

      <div className='confirm__btn-container'>
        <Button
          name="Подтвердить"
          className="confirm-btn"
          handler={handleConfirmButton} />
      </div>
    </div>
  );
}

export default ConfirmOrder;