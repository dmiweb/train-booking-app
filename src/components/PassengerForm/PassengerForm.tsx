import { useState } from 'react';
import { PlusIconSvg, MinusIconSvg } from '../icons';
import './PassengerForm.css';

const PassengerForm = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className='passenger'>

        <div className='passenger__header'>
          <button className={open
            ? "passenger__toggle-visible-btn--open"
            : "passenger__toggle-visible-btn--close"}
            onClick={() => setOpen(!open)}
          >
            {open
              ? <MinusIconSvg width={18} fill='#928f94' />
              : <PlusIconSvg width={18} fill='#ffa800' />}
          </button>
          <h2 className="passenger__title">Пассажир 1</h2>
          <button className="passenger__remove">
            <PlusIconSvg width={18} fill='#928f94' />
          </button>
        </div>

        {open &&
          <form className='passenger__form'>

            <div className="passenger__field">
              <div className="passenger__type">
                <select className="passenger__type-select">
                  <option className='passenger__type-select-item'>Взрослый</option>
                  <option className='passenger__type-select-item'>Детский</option>
                </select>
              </div>
            </div>


            <div className="passenger__form-row passenger__full-name">
              <div className="passenger__field">
                <label htmlFor="passenger-surname" className="passenger__label">Фамилия</label>
                <input type="text" id="passenger-surname" className="passenger__input" />
              </div>

              <div className="passenger__field">
                <label htmlFor="passenger-name" className="passenger__label">Имя</label>
                <input type="text" id="passenger-name" className="passenger__input" />
              </div>

              <div className="passenger__field">
                <label htmlFor="passenger-patronymic" className="passenger__label">Отчество</label>
                <input type="text" id="passenger-patronymic" className="passenger__input" />
              </div>
            </div>


            <div className="passenger__form-row passenger__info">
              <div className="passenger__field">
                <label className="passenger__label">Пол</label>
                <div className="passenger__gender">
                  <label className='passenger__gender-label'>
                    <input type="radio" name="gender" value="male" className='passenger__gender-input' />
                    <div className="passenger__gender-male-button" data-gender="male">М</div>
                  </label>
                  <label className='passenger__gender-label'>
                    <input type="radio" name="gender" value="female" className='passenger__gender-input' />
                    <div className="passenger__gender-female-button" data-gender="female">Ж</div>
                  </label>
                </div>
              </div>

              <div className="passenger__field">
                <label htmlFor="passenger-birthdate" className="passenger__label">Дата рождения</label>
                <input type="text" id="passenger-birthdate" className="passenger__input" placeholder="ДД/ММ/ГГ" />
              </div>
            </div>


            <div className="passenger__field passenger__limited-mobility">
              <label className="passenger__checkbox-label">
                <input type="checkbox" className="passenger__checkbox" />
                <div className='passenger__checkbox-overlay'></div>
                <span className='passenger__checkbox-title'>ограниченная подвижность</span>
              </label>
            </div>

            <div className="passenger__form-row passenger__document">
              <div className="passenger__field">
                <label htmlFor="passenger-document-type" className="passenger__label">Тип документа</label>
                <select id="passenger-document-type" className="passenger__document-select">
                  <option>Паспорт РФ</option>
                  <option>Свидетельство о рождении</option>
                </select>
              </div>

              <div className="passenger__field">
                <label htmlFor="passenger-document-series" className="passenger__label">Серия</label>
                <input type="text" id="passenger-document-series" className="passenger__input passenger__document-input" />
              </div>

              <div className="passenger__field">
                <label htmlFor="passenger-document-number" className="passenger__label">Номер</label>
                <input type="text" id="passenger-document-number" className="passenger__input passenger__document-input" />
              </div>
            </div>


            <button className="passenger__next-button">Следующий пассажир</button>
          </form>}


      </div>
    </>
  );
}

export default PassengerForm;