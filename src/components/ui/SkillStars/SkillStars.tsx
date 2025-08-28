import { useMemo } from 'react';
import {
    STAR_COLORS,
    DEFAULT_STAR_SIZE,
    DEFAULT_MAX_STARS,
} from '@utils/constants';
import { useTheme } from '@contexts/ThemeContext';
import { Star } from './Star';

interface SkillStarsProps {
    score: number; // 0-5
    maxStars?: number; // default 5
    size?: number;
}

export const SkillStars: React.FC<SkillStarsProps> = ({
    score,
    maxStars = DEFAULT_MAX_STARS,
    size = DEFAULT_STAR_SIZE,
}) => {
    const {
        data: { theme },
    } = useTheme();
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
                    color={STAR_COLORS[theme][i]}
                    key={`star_${i}`}
                />
            ))}
        </div>
    );
};
