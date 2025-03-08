import {Logo, Menu} from "../../components";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className='header__container-logo'>
        <Logo />
      </div>
      <div className='header__container-menu'>
        <Menu />
      </div>
    </header>
  );
}

export default Header;