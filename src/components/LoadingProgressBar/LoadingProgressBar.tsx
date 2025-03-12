import "./LoadingProgressBar.css";

const LoadingProgressBar = () => {
  return (
    <progress className="progress-bar" value="50" max="100" />
  );
}

export default LoadingProgressBar;