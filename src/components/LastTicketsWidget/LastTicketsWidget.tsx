import { ReactNode } from "react";
import "./LastTicketsWidget.css";

const LastTicketsWidget = ({children}: {children: ReactNode}) => {
  return (
    <div className="last-tickets">
      <h2 className="last-tickets__title">Последние билеты</h2>
      {children}
    </div>
  );
}

export default LastTicketsWidget;