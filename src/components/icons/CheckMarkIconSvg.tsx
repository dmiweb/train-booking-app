type CheckMarkIconSvgProps = {
  width: number;
  fill: string;
  className?: string;
  handler?: () => void;
}

const CheckMarkIconSvg = ({ width, fill, className, handler }: CheckMarkIconSvgProps) => {
  return (
    <svg
      width={width}
      viewBox="0 0 23 18"
      className={className}
      onClick={handler}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.366071 9.55647L0.383399 9.53895C0.851239 9.08325 1.61364 9.08325 2.08148 9.55647C3.62362 11.1164 5.18309 12.7113 6.7079 14.2712C6.77721 14.3413 6.86385 14.3413 6.93316 14.2712C11.5769 9.574 16.1167 4.98199 20.6911 0.354917C21.159 -0.118306 21.9387 -0.118306 22.4065 0.354917L22.6491 0.617819C23.117 1.09104 23.117 1.86222 22.6491 2.33544C17.4855 7.55842 12.322 12.7814 7.22773 17.9343C7.14109 18.0219 7.00247 18.0219 6.91583 17.9343C4.78456 15.796 2.60131 13.5701 0.348744 11.3092C-0.119096 10.8184 -0.119096 10.0297 0.366071 9.55647Z" fill={fill} />
    </svg>
  );
}

export default CheckMarkIconSvg;