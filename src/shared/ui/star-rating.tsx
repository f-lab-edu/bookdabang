'use client';

import { Ref, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StarRatingProps {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  value: number;
  onChange?: (rating: number) => void;
}

const StarRating = ({ ref, className, value, onChange }: StarRatingProps) => {
  const [hovered, setHovered] = useState(value);

  return (
    <div
      ref={ref}
      className={cn('flex items-center', className)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange?.(hovered)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(value)}
          className={cn('size-6 cursor-pointer', star <= hovered ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
        />
      ))}
    </div>
  );
};

export { StarRating };
