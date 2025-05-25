import { useState } from "react";
import { StarIconSvg } from "../../components/icons";
import "./RatingStars.css";

const RatingStars = ({ countStars }: { countStars: number }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const stars = new Array(countStars).fill(null).map((_, index) => {
    const starIndex = index + 1;
    const isFilled = starIndex <= (hoverRating || rating);

    return (
      <span
        key={starIndex}
        className="rating-stars__star"
        onClick={() => setRating(starIndex)}
        onMouseEnter={() => setHoverRating(starIndex)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <StarIconSvg
          width={48}
          fill={isFilled ? "#ffffff" : undefined}
          colorStroke="#ffffff"
        />
      </span>
    );
  });

  return (
    <div className="rating-stars">
      {stars}
      
      {rating > 0 && (
        <div className="rating-stars__text">Ваша оценка: {rating}</div>
      )}
    </div>
  );
};

export default RatingStars;