'use client';

import { RefObject, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface StarRatingProps {
  ref?: RefObject<HTMLDivElement>;
  className?: string;
  value: number;
  onChange?: (rating: number) => void;
}

const StarRating = ({ ref, className, value, onChange }: StarRatingProps) => {
  const [hovered, setHovered] = useState(value);

  return (
    <div
      ref={ref}
      className={cn('flex items-center focus-visible:ring-ring', className)}
      tabIndex={0}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn('size-6 cursor-pointer', star <= hovered ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
          onClick={() => onChange?.(hovered)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(value)}
        />
      ))}
    </div>
  );
};

export { StarRating };
