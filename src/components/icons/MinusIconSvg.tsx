type MinusIconSvgProps = {
  width: number;
  fill: string;
  className?: string;
  handler?: () => void;
}

const MinusIconSvg = ({ width, fill, className, handler }: MinusIconSvgProps) => {
  return (
    <svg
      width={width}
      viewBox="0 0 18 2"
      className={className}
      onClick={handler}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="1" y1="1" x2="17" y2="1" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export default MinusIconSvg;