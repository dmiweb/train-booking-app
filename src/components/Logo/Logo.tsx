import { useNavigate } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={() => navigate("/")}>
      Лого
    </div>
  );
}

export default Logo;