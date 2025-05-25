import Button from "../Button/Button";
import "./MessageWidget.css";

type MessageWidgetProps = {
  typeMessage: "info" | "error";
  title?: string;
  text?: string;
  handlerMessageBtn: () => void;
}

const headerClassMap: { [key in MessageWidgetProps["typeMessage"]]: string } = {
  info: "message__header message__header--info",
  error: "message__header message__header--error",
};

const iconClassMap: { [key in MessageWidgetProps["typeMessage"]]: string } = {
  info: "message__header-icon message__header-icon--info",
  error: "message__header-icon message__header-icon--error",
};

const MessageWidget = ({ typeMessage, title, text, handlerMessageBtn }: MessageWidgetProps) => {
  const headerClassName = headerClassMap[typeMessage] || "message__header";
  const iconClassName = iconClassMap[typeMessage] || "message__header-icon";

  return (
    <div className="message">
      <div className={headerClassName}>
        <div className={iconClassName} />
      </div>

      <div className="message__body">
        {title && <h2 className="message__body-header-text">{title}</h2>}
        {text && <p className="message__body-text">{text}</p>}
      </div>

      <div className="massage__action">
        <Button
          name={typeMessage === "error" ? "Повторить" : "Понятно"}
          className="massage-btn"
          handler={handlerMessageBtn}
        />
      </div>
    </div>
  );
}

export default MessageWidget;