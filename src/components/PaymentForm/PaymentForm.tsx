import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateOwner } from '../../slices/orderSlice';
import { useValidateForm } from '../../hooks/useValidateForm';
import { ownerFormErrors } from '../../data/formErrors';
import { Button } from '../../components';
import PhoneInput from './PhoneInput';
import { TOrderOwner } from '../../models';
import './PaymentForm.css';


const PaymentForm = () => {
  const [wasValidateForm, setWasValidateForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { owner } = useAppSelector(state => state.order);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { fieldErrors, validateForm, getFieldError } = useValidateForm(ownerFormErrors);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFieldChange = useCallback((field: keyof TOrderOwner, value: string) => {
    dispatch(updateOwner({
      field,
      value
    }));

    if (wasValidateForm && formRef.current) {
      validateForm(formRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasValidateForm]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const valid = validateForm(e);
    setWasValidateForm(true);

    if (valid) {
      navigate("/confirm", { replace: true });
    }
  }

  return (
    <>
      <div className='payment'>
        <div className='payment__header'>
          <h2 className="payment__title">Персональные данные</h2>
        </div>

        <form className='payment__form' onSubmit={(e) => handleSubmitForm(e)} ref={formRef} noValidate>
          <div className="payment__form-row payment__full-name">
            <div className="payment__field">
              <label htmlFor="payment-surname" className="payment__label">Фамилия</label>
              <input
                type="text"
                id="payment-surname"
                className={fieldErrors.find(f => f.field === "last_name")
                  ? "payment__input payment__input-error"
                  : "payment__input"}
                name="last_name"
                value={owner.last_name}
                onChange={(e) => handleFieldChange("last_name", e.target.value)}
                required
              />
              <span className='payment__field-error-message'>
                {getFieldError("last_name")}
              </span>
            </div>

            <div className="payment__field">
              <label htmlFor="payment-name" className="payment__label">Имя</label>
              <input
                type="text"
                id="payment-name"
                className={fieldErrors.find(f => f.field === "first_name")
                  ? "payment__input payment__input-error"
                  : "payment__input"}
                name="first_name"
                value={owner.first_name}
                onChange={(e) => handleFieldChange("first_name", e.target.value)}
                required
              />
              <span className='payment__field-error-message'>
                {getFieldError("first_name")}
              </span>
            </div>

            <div className="payment__field">
              <label htmlFor="payment-patronymic" className="payment__label">Отчество</label>
              <input
                type="text"
                id="payment-patronymic"
                className={fieldErrors.find(f => f.field === "patronymic")
                  ? "payment__input payment__input-error"
                  : "payment__input"}
                name="patronymic"
                value={owner.patronymic}
                onChange={(e) => handleFieldChange("patronymic", e.target.value)}
                required
              />
              <span className='payment__field-error-message'>
                {getFieldError("patronymic")}
              </span>
            </div>
          </div>

          <div className="payment__form-row payment__contacts">
            <div className="payment__field">
              <label htmlFor="payment-phone" className="payment__label">Контактный телефон</label>
              <PhoneInput
                value={owner.phone}
                fieldErrors={fieldErrors}
                handler={handleFieldChange}
              />
              <span className='payment__field-error-message'>
                {getFieldError("phone")}
              </span>
            </div>

            <div className="payment__field">
              <label htmlFor="payment-email" className="payment__label">E-mail</label>
              <input
                type="text"
                id="payment-email"
                className={fieldErrors.find(f => f.field === "email")
                  ? "payment__input payment__input-error"
                  : "payment__input"}
                name="email"
                pattern="^\S+@\S+\.\S+$"
                placeholder="inbox@gmail.ru"
                value={owner.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                required
              />
              <span className='payment__field-error-message'>
                {getFieldError("email")}
              </span>
            </div>
          </div>

          <div className='payment__header payment__type-header'>
            <h2 className="payment__title">Способ оплаты</h2>
          </div>

          <div className="payment__field payment__type-online">
            <label className="payment__checkbox-label">
              <input
                type="radio"
                className="payment__checkbox"
                name="payment_method"
                value="online"
                checked={owner.payment_method === "online"}
                onChange={(e) => {
                  handleFieldChange("payment_method", e.target.value);
                }}
                required
              />
              <div
                className={fieldErrors.find(f => f.field === "payment_method")
                  ? "payment__checkbox-overlay payment__checkbox-overlay-error"
                  : "payment__checkbox-overlay"}
              ></div>
              <span
                className={fieldErrors.find(f => f.field === "payment_method")
                  ? "payment__checkbox-title payment__checkbox-title--error"
                  : "payment__checkbox-title"}
              >
                Онлайн
              </span>

              <span className='payment__field-error-message'>
                {getFieldError("payment_method")}
              </span>
            </label>

            <span className='payment__type-online-option'>Банковской<br />картой</span>
            <span className='payment__type-online-option'>PayPal</span>
            <span className='payment__type-online-option'>Visa QIWI Wallet</span>

          </div>

          <div className="payment__field payment__type-cash">
            <label className="payment__checkbox-label">
              <input
                type="radio"
                className="payment__checkbox"
                name="payment_method"
                value="cash"
                checked={owner.payment_method === "cash"}
                onChange={(e) => {
                  handleFieldChange("payment_method", e.target.value);
                }}
              />
              <div
                className={fieldErrors.find(f => f.field === "payment_method")
                  ? "payment__checkbox-overlay payment__checkbox-overlay-error"
                  : "payment__checkbox-overlay"}
              ></div>
              <span
                className={fieldErrors.find(f => f.field === "payment_method")
                  ? "payment__checkbox-title payment__checkbox-title--error"
                  : "payment__checkbox-title"}
              >
                Наличными
              </span>

              <span className='payment__field-error-message'>
                {getFieldError("payment_method")}
              </span>
            </label>
          </div>

          <div className='payment__btn-container'>
            <Button
              name="Купить билеты"
              type="submit"
              className="confirm-btn"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default PaymentForm;