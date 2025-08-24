import { useMemo } from 'react';
import { Star } from './Star';

interface SkillStarsProps {
    score: number; // 0-5
    maxStars?: number; // default 5
    size?: number;
}

export const SkillStars: React.FC<SkillStarsProps> = ({
    score,
    maxStars = 5,
    size = 20,
}) => {
    const starColors = ['#a50104', '#d15e04', '#fcba04', '#b2ae2a', '#6da34d'];
    const starValues = useMemo(
        () =>
            Array.from({ length: maxStars }).map((_, i) =>
                Math.min(1, Math.max(0, score - i))
            ),
        [maxStars, score]
    );
    return (
        <div className="flex">
            {starValues.map((starValue, i) => (
                <Star
                    value={starValue}
                    size={size}
                    color={starColors[i]}
                    key={`star_${i}`}
                />
            ))}
        </div>
    );
};
