import "./Button.css";

type ButtonProps = {
  name: string;
  type?: "button" | "submit";
  className: string;
  handler?: () => void;
}

const Button = ({name, type = "button", className, handler }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={handler}>
      {name}
    </button>
  );
}

export default Button;