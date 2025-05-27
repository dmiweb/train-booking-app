import { useNavigate } from "react-router-dom";
import { Button } from "../../components"
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404<br />Страница не найдена</h1>
      <div className="not-found__action">
        <Button
          name="Вернуться на главную"
          className="confirm-btn"
          handler={handleGoHome}
        />
      </div>
    </section>
  );
}

export default NotFoundPage;