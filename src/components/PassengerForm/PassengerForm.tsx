import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useValidateForm } from '../../hooks/useValidateForm';
import { updatePassenger } from '../../slices/passengersSlice';
import { PassengerDropDownBox } from '../../components';
import { TSelectedSeat, TPassengerInfo } from '../../models';
import { passengerFormErrors } from '../../data/formErrors';
import { PlusIconSvg, CheckMarkIconSvg } from '../icons';
import './PassengerForm.css';

type PassengerFormProps = {
  isOpenForm: boolean;
  passengerNumber: number;
  lastForm: boolean;
  seat: TSelectedSeat;
  toggleVisibilityForm: (formNumber: number) => void;
  addValidForm: (formNumber: number) => void;
  deleteValidForm: (formNumber: number) => void;
}

const PassengerForm = ({
  isOpenForm,
  passengerNumber,
  lastForm,
  seat,
  toggleVisibilityForm,
  addValidForm,
  deleteValidForm
}: PassengerFormProps) => {
  const [wasOpenForm, setWasOpenForm] = useState(false);
  const [wasValidateForm, setWasValidateForm] = useState(false);
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [typeDocument, setTypeDocument] =
    useState(seat.is_adult ? "passport" : "birth-certificate");
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const { seats } = useAppSelector(state => state.passengers.departure);
  const dispatch = useAppDispatch();

  const { fieldErrors, isValid, validateForm } = useValidateForm(passengerFormErrors);

  const getFieldValue = <K extends keyof TPassengerInfo["person_info"]>(
    field: K
  ): TPassengerInfo["person_info"][K] | undefined => {
    const passenger = seats.find(s =>
      s.coach_id === seat.coach_id && s.seat_number === seat.seat_number);

    if (passenger) {
      return passenger.person_info[field];
    }
  }

  const handleFieldChange = useCallback((
    field: keyof TPassengerInfo["person_info"],
    value: string | boolean
  ) => {
    dispatch(updatePassenger({
      direction: "departure",
      coach_id: seat.coach_id,
      seat_number: seat.seat_number,
      field,
      value
    }));

    if (wasValidateForm) {
      nextBtnRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasValidateForm]);

  // разделение и запись данных паспорта в useState при монтировании
  useEffect(() => {
    const passport = getFieldValue("document_data");

    if (passport) {
      const passportData = passport.split(" ");

      setPassportSeries(passportData[0])
      setPassportNumber(passportData[1])
    }
  }, []);

  // Соединение серии и номера паспорта в одну строку
  useEffect(() => {
    const newDocumentData = `${passportSeries} ${passportNumber}`.trim();
    handleFieldChange("document_data", newDocumentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passportSeries, passportNumber]);

  useEffect(() => {
    handleFieldChange("document_type", typeDocument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFieldChange]);

  // Открытие следующей формы
  useEffect(() => {
    if (isValid && !wasOpenForm) {
      toggleVisibilityForm(passengerNumber + 1);
      setWasOpenForm(true);
    }

    // Отправка номера валидной формы
    if (isValid) {
      addValidForm(passengerNumber);
    } else {
      deleteValidForm(passengerNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  return (
    <>
      <div className='passenger'>
        <PassengerDropDownBox
          isOpenForm={isOpenForm}
          passengerNumber={passengerNumber}
          seat={seat}
          toggleVisibilityForm={toggleVisibilityForm}
        />

        {isOpenForm &&
          <form className='passenger__form' onSubmit={(e) => validateForm(e)} noValidate>

            <div className="passenger__field">
              <div className="passenger__type">
                <select
                  className="passenger__type-select"
                  value={seat.is_adult ? "adult" : "child"}
                  onChange={(e) => handleFieldChange("is_adult", e.target.value === "adult")}
                >
                  <option className="passenger__type-select-item" value="adult">
                    Взрослый
                  </option>
                  <option className="passenger__type-select-item" value="child">
                    Детский
                  </option>
                </select>
              </div>
            </div>

            <div className="passenger__form-row passenger__full-name">
              <div className="passenger__field">
                <label htmlFor={`last-name${passengerNumber}`} className="passenger__label">Фамилия</label>
                <input
                  type="text"
                  id={`last-name${passengerNumber}`}
                  className={fieldErrors[0]?.field === "last_name"
                    ? "passenger__input passenger__input--error"
                    : "passenger__input"}
                  name="last_name"
                  value={getFieldValue("last_name") || ""}
                  onChange={(e) => handleFieldChange("last_name", e.target.value.trim())}
                  required
                />
              </div>

              <div className="passenger__field">
                <label htmlFor={`first-name${passengerNumber}`} className="passenger__label">Имя</label>
                <input
                  type="text"
                  id={`first-name${passengerNumber}`}
                  className={fieldErrors[0]?.field === "first_name"
                    ? "passenger__input passenger__input--error"
                    : "passenger__input"}
                  name="first_name"
                  value={getFieldValue("first_name") || ""}
                  onChange={(e) => handleFieldChange("first_name", e.target.value)}
                  required
                />
              </div>

              <div className="passenger__field">
                <label htmlFor={`patronymic${passengerNumber}`} className="passenger__label">Отчество</label>
                <input
                  type="text"
                  id={`patronymic${passengerNumber}`}
                  className={fieldErrors[0]?.field === "patronymic"
                    ? "passenger__input passenger__input--error"
                    : "passenger__input"}
                  name="patronymic"
                  value={getFieldValue("patronymic") || ""}
                  onChange={(e) => handleFieldChange("patronymic", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="passenger__form-row passenger__info">
              <div className="passenger__field">
                <label className="passenger__label">Пол</label>
                <div className={fieldErrors[0]?.field === "gender"
                  ? "passenger__gender passenger__gender--error"
                  : "passenger__gender"}
                >
                  <label className='passenger__gender-label'>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="passenger__gender-input"
                      checked={getFieldValue("gender") === "male"}
                      onChange={(e) => handleFieldChange("gender", e.target.value)}
                    />
                    <div className="passenger__gender-male-button" data-gender="male">М</div>
                  </label>
                  <label className='passenger__gender-label'>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="passenger__gender-input"
                      checked={getFieldValue("gender") === "female"}
                      onChange={(e) => handleFieldChange("gender", e.target.value)}
                      required
                    />
                    <div className="passenger__gender-female-button" data-gender="female">Ж</div>
                  </label>
                </div>
              </div>

              <div className="passenger__field">
                <label htmlFor={`passenger-birthdate${passengerNumber}`} className="passenger__label">Дата рождения</label>
                <input
                  type="date"
                  id={`passenger-birthdate${passengerNumber}`}
                  className={fieldErrors[0]?.field === "birthday"
                    ? "passenger__input passenger__input-date passenger__input--error"
                    : "passenger__input passenger__input-date"}
                  name="birthday"
                  min="1900-01-01"
                  max="9999-01-01"
                  value={getFieldValue("birthday") || ""}
                  onChange={(e) => handleFieldChange("birthday", e.target.value)}
                  required
                />
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

                <select
                  id="passenger-document-type"
                  className={typeDocument === "passport"
                    ? "passenger__document-select"
                    : "passenger__document-select passenger__document-birth-certificate"}
                  value={typeDocument}
                  onChange={(e) => {
                    setTypeDocument(e.target.value);
                    handleFieldChange("document_type", e.target.value);
                  }}
                >
                  <option value="passport">Паспорт РФ</option>
                  <option value="birth-certificate">Свидетельство о рождении</option>
                </select>
              </div>

              {typeDocument === "passport" &&
                <>
                  <div className="passenger__field">
                    <label htmlFor={`passenger-document-series${passengerNumber}`} className="passenger__label">Серия</label>
                    <input
                      type="text"
                      id={`passenger-document-series${passengerNumber}`}
                      className={fieldErrors[0]?.field === "passport_series"
                        ? "passenger__input passenger__document-input passenger__input--error"
                        : "passenger__input passenger__document-input"}
                      name="passport_series"
                      pattern="[0-9]{4}"
                      value={passportSeries}
                      onChange={(e) => setPassportSeries(e.target.value)}
                      required
                    />
                  </div>

                  <div className="passenger__field">
                    <label htmlFor={`passenger-document-number${passengerNumber}`} className="passenger__label">Номер</label>
                    <input
                      type="text"
                      id={`passenger-document-number${passengerNumber}`}
                      className={fieldErrors[0]?.field === "passport_number"
                        ? "passenger__input passenger__document-input passenger__input--error"
                        : "passenger__input passenger__document-input"}
                      name="passport_number"
                      pattern="[0-9]{6}"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      required
                    />
                  </div>
                </>}

              {typeDocument === "birth-certificate" &&
                <div className="passenger__field">
                  <label htmlFor={`passenger-document-number${passengerNumber}`} className="passenger__label">Номер</label>
                  <input
                    type="text"
                    id={`passenger-document-number${passengerNumber}`}
                    className={fieldErrors[0]?.field === "birth_certificate"
                      ? "passenger__input passenger__document-input passenger__input--error"
                      : "passenger__input passenger__document-input"}
                    name="birth_certificate"
                    pattern="^[IVX]{1,4}-[А-Я]{2}-\d{6}$"
                    value={getFieldValue("document_data") || ""}
                    onChange={(e) => handleFieldChange("document_data", e.target.value)}
                    required
                  />
                </div>}
            </div>

            <div
              className={
                fieldErrors.length
                  ? "passenger__actions passenger__actions--error"
                  : isValid
                    ? "passenger__actions passenger__actions--success"
                    : "passenger__actions"
              }
            >
              {fieldErrors[0] &&
                <div className="passenger__error-message">
                  <div className="passenger__error-message-icon">
                    <PlusIconSvg width={18} fill='rgba(255, 61, 0, 0.38)' />
                  </div>
                  {fieldErrors[0] && fieldErrors[0].field === "birth_certificate"
                    ? <div dangerouslySetInnerHTML={{ __html: fieldErrors[0].error || "" }} />
                    : fieldErrors[0].error}
                </div>}

              {isValid &&
                <div className="passenger__error-message">
                  <div className="passenger__success-message-icon">
                    <CheckMarkIconSvg width={15} fill='#b2f6a1' />
                  </div>
                  Готово
                </div>}

              <button
                type="submit"
                className={!fieldErrors[0]
                  ? "passenger__next-passenger-button"
                  : "passenger__next-passenger-button--hidden"}
                ref={nextBtnRef}
                onClick={() => setWasValidateForm(true)}
              >
                {lastForm ? "Готово" : "Следующий пассажир"}
              </button>
            </div>
          </form>}
      </div>
    </>
  );
}

export default PassengerForm;