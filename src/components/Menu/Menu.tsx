import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <a href="#about" className="menu__item">О нас</a>
      <a href="#how-it-works" className="menu__item">Как это работает</a>
      <a href="#reviews" className="menu__item">Отзывы</a>
      <a href="#footer" className="menu__item">Контакты</a>
    </nav>
  );
}

export default Menu;