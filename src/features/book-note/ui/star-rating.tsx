import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-6 cursor-pointer ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : star - 0.5 <= rating
                ? 'half-filled fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
          }`}
          onClick={() => onRatingChange?.(star - 0.5 <= rating ? Math.floor(rating) : star)}
          onMouseEnter={() => onRatingChange?.(star)}
          onMouseLeave={() => onRatingChange?.(rating)}
        />
      ))}
    </div>
  );
}
