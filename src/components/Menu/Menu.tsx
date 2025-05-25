import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "О нас", anchor: "about" },
    { name: "Как это работает", anchor: "how-it-works" },
    { name: "Отзывы", anchor: "reviews" },
    { name: "Контакты", anchor: "footer" },
  ];

  const handleClickMenuItem = (anchor: string) => {
    if (location.pathname !== "/" && anchor !== "footer") {
      navigate("/");
    }
  }

  return (
    <nav className="menu">
      {menuItems.map((item, index) =>
        <a
          key={index}
          href={`#${item.anchor}`}
          className="menu__item"
          onClick={() => handleClickMenuItem(item.anchor)}
        >
          {item.name}
        </a>)}
    </nav>
  );
}

export default Menu;