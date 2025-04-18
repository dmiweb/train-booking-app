type PlusIconSvgProps = {
  width: number;
  fill: string;
  className?: string;
  handler?: () => void;
}

const PlusIconSvg = ({ width, fill, className, handler }: PlusIconSvgProps) => {
  return (
    <svg
      width={width}
      viewBox="0 0 18 18"
      className={className}
      onClick={handler}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.94442 1.46381L7.94442 7.94493L1.46329 7.94493C0.860398 7.94493 0.408226 8.3971 0.408226 9C0.408226 9.6029 0.860398 10.0551 1.46329 10.0551L7.94442 10.0551L7.94442 16.5362C7.94442 17.1391 8.39659 17.5913 8.92412 17.5159L9.07485 17.5159C9.67774 17.5159 10.1299 17.0637 10.0546 16.5362L10.0546 10.0551L16.385 10.0551C16.9878 10.0551 17.44 9.6029 17.44 9C17.44 8.3971 16.9878 7.94493 16.385 7.94493L10.0546 7.94493L10.0546 1.46381C10.0546 0.860914 9.60238 0.408743 9.07485 0.484105L8.92412 0.484104C8.32123 0.484104 7.86906 0.936276 7.94442 1.46381Z" fill={fill} />
    </svg>
  );
}

export default PlusIconSvg;