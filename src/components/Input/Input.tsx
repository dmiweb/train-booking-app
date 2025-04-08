import "./Input.css";

type InputProps = {
  type: string;
  className: string;
  name: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input = ({ type, className, name, placeholder, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      className={className}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}

export default Input;