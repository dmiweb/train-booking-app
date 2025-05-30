type ArrowIconSvgProps = {
  direction: string;
  width: number;
  fill: string;
  className?: string;
  handler?: () => void;
}

const ArrowIconSvg = ({ direction, width, fill, className, handler }: ArrowIconSvgProps) => {
  return (
    <svg
      width={width}
      viewBox="0 0 30 20"
      className={className}
      onClick={handler}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === "right" &&
        <path d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z" fill={fill} />}

      {direction === "left" &&
        <path d="M10.6373 20C10.6373 17.8073 10.6373 15.3821 10.6373 12.8239C17.1379 12.8239 23.5342 12.8239 30 12.8239C30 11.0299 30 9.36877 30 7.57475C23.6732 7.57475 17.2769 7.57475 10.6721 7.57475C10.6721 4.91694 10.6721 2.42525 10.6721 0C7.05678 3.3887 3.47625 6.77741 1.90735e-06 10.0664C3.44148 13.2558 7.05678 16.6445 10.6373 20Z" fill={fill} />}
    </svg>
  );
}

export default ArrowIconSvg;