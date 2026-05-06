'use client';

import { Star, StarHalf } from 'lucide-react';
import { getStarArray } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export default function StarRating({ rating, size = 16, showValue = true, count }: StarRatingProps) {
  const stars = getStarArray(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((type, i) => {
          if (type === 'full') {
            return <Star key={i} className="text-amber-400 fill-amber-400" style={{ width: size, height: size }} />;
          }
          if (type === 'half') {
            return <StarHalf key={i} className="text-amber-400 fill-amber-400" style={{ width: size, height: size }} />;
          }
          return <Star key={i} className="text-gray-300" style={{ width: size, height: size }} />;
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-text ml-1">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-sm text-text-secondary">({count})</span>
      )}
    </div>
  );
}
