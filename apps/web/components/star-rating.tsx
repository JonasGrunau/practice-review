import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  const filledColor = 'fill-amber-400 text-amber-400';
  const unfilledColor = 'text-zinc-300 dark:text-zinc-700';

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => {
        const filled = hovered >= rating || (!hovered && value >= rating);

        return (
          <motion.button
            key={rating}
            type="button"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(rating)}
            className="p-1 cursor-pointer transition-transform">
            <motion.div
              animate={{ scale: filled ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
              <Star
                className={`w-6 h-6 transition-colors ${filled ? filledColor : unfilledColor}`}
              />
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
