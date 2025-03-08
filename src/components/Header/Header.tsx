import { ReactNode } from "react";
import "./Header.css";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
}

export default Header;