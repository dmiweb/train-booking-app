import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="#" className="menu__item">О нас</Link>
      <Link to="#" className="menu__item">Как это работает</Link>
      <Link to="#" className="menu__item">Отзывы</Link>
      <Link to="#" className="menu__item">Контакты</Link>
    </nav>
  );
}

export default Menu;