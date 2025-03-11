import "./Subscription.css";
import { YoutubeIcon, LinkedinIcon, GooglePlusIcon, FacebookIcon, TwitterIcon } from "./socialIcons";

const Subscription = () => {

  return (
    <div className="subscription">
      <h2 className="subscription__title">Подписка</h2>
      <form className="subscription__form">
        <label className="subscription__form-label">
          <span className="subscription__form-label-text">Будьте в курсе событий</span>
          <input type="text" className="subscription__form-input" placeholder="e-mail" />
        </label>
        <button type="submit" className="subscription__form-submit-btn">Отправить</button>
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
  );
}

export default Subscription;