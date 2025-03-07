import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
}

export default Header;