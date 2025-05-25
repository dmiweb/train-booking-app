import { useState, useEffect } from "react";
import "./LoadingProgressBar.css";

type LoadingProgressBarProps = {
  start: boolean;
  requestStatus: boolean;
  error: boolean;
}

const LoadingProgressBar = ({ start, requestStatus, error }: LoadingProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Старт анимации до 75% при начале запроса
  useEffect(() => {
    if (start) {
      setIsVisible(true);
      setProgress(0);
      setTransitionDuration(0);

      const timer = setTimeout(() => {
        setTransitionDuration(1000);
        setProgress(75);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [start]);

  // Продолжение анимации при успешном ответе или ошибке
  useEffect(() => {
    if (requestStatus || error) {
      // Анимация до 100% перед скрытием
      setTransitionDuration(300);
      setProgress(100);

      // Задержка перед скрытием, чтобы анимация завершилась
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [requestStatus, error]);

  if (!isVisible) return null;

  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{
          width: `${progress}%`,
          transition: `width ${transitionDuration}ms ease-out`,
        }}
      />
    </div>
  );
};

export default LoadingProgressBar;