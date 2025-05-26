import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useValidateForm } from "../../hooks/useValidateForm";
import { requestSubscribe } from "../../slices/subscribeSlice";
import { setOpenModal, setCloseModal } from "../../slices/modalSlice";
import { subscribeFormErrors } from "../../data/formErrors";
import { Modal, MessageWidget } from "../../components";
import { YoutubeIcon, LinkedinIcon, GooglePlusIcon, FacebookIcon, TwitterIcon } from "./socialIcons";
import "./Subscription.css";

const Subscription = () => {
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const { subscribeStatus, loading, error } = useAppSelector(state => state.subscribe)
  const dispatch = useAppDispatch();

  const { isValid, validateForm, getFieldError } = useValidateForm(subscribeFormErrors);

  useEffect(() => {
    if (error) {
      dispatch(setOpenModal());
    } else {
      dispatch(setCloseModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (subscribeStatus) {
      setEmailInputValue("");
    }
  }, [subscribeStatus]);

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const isValidForm = validateForm(form);
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;

    if (isValidForm) {
      dispatch(requestSubscribe(emailInput.value));
    }
  }

  return (
    <>
      {error &&
        <Modal>
          <MessageWidget
            typeMessage={"error"}
            title={error}
            text="Попробуйте повторить запрос или обновите страницу."
            handlerMessageBtn={() => dispatch(requestSubscribe(emailInputValue))}
          />
        </Modal>}

      <div className="subscription">
        <h2 className="subscription__title">Подписка</h2>
        <form className="subscription__form" onSubmit={onSubscribe} noValidate>
          <label className="subscription__form-label">
            <span className="subscription__form-label-text">Будьте в курсе событий</span>
            <input
              type="text"
              className="subscription__form-input"
              name="email"
              value={emailInputValue}
              onChange={(e) => { setEmailInputValue(e.target.value) }}
              pattern="^\S+@\S+\.\S+$"
              placeholder="e-mail"
              required
            />

            <span className='subscription__field-message'>
              {subscribeStatus && isValid &&
                <span className="subscription__success-message">
                  ✓ Вы успешно подписались!
                </span>}
              {getFieldError("email")}
            </span>
          </label>
          <button type="submit" className="subscription__form-submit-btn">
            {loading ? "Загрузка..." : "Отправить"}
          </button>
        </form>

        <div className="subscription__social">
          <span className="subscription__social-title">Подписывайтесь на нас</span>
          <div className="subscription__social-group">
            <a href="#" className="subscription__social-link" aria-label="Подписаться на Youtube">
              <YoutubeIcon />
            </a>
            <a href="#" className="subscription__social-link" aria-label="Подписаться на Linkedin">
              <LinkedinIcon />
            </a>
            <a href="#" className="subscription__social-link" aria-label="Подписаться на Google Plus">
              <GooglePlusIcon />
            </a>
            <a href="#" className="subscription__social-link" aria-label="Подписаться на Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className="subscription__social-link" aria-label="Подписаться на Twitter">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </>

  );
}

export default Subscription;