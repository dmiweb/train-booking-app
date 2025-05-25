import "./Contacts.css";

const Contacts = () => {
  return (
    <div className="contacts">
      <h2 className="contacts__title">Свяжитесь с нами</h2>
      <ul className="contacts__list">
        <li className="contacts__item contacts__phone">
          <a href="tel:88000000000" aria-label="Звоните на восемь восемсот три ноля ноль ноль ноль ноль">
            8 (800) 000 00 00
          </a>
        </li>

        <li className="contacts__item contacts__email">
          <a href="mailto:inbox@mail.ru">inbox@mail.ru</a>
        </li>

        <li className="contacts__item contacts__skype">
          <a href="skype:tu.train.tickets?chat">tu.train.tickets</a>
        </li>

        <li className="contacts__item contacts__address">
          <a
            href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%20%D1%83%D0%BB.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2027-35"
            target="_blank"
            rel="noopener noreferrer"
            className="contacts__link"
          >
            г. Москва ул.<br />Московская 27-35<br />555 555
          </a>
        </li>
      </ul>
    </div>

  );
}

export default Contacts;