import { Contacts, Subscription, Logo, ScrollPageTopButton } from "../../components";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__contacts">
        <Contacts />
      </div>
      <div className="footer__subscribe">
        <Subscription />
      </div>

      <div className="fotter__bottom-container">
        <Logo />
        <ScrollPageTopButton />
        <div className="footer__copyright">2018 WEB</div>
      </div>
    </footer>
  );
}

export default Footer;