import React from 'react';

interface IStarProps {
    color: string;
    value: number;
    size: number;
}

export const Star: React.FC<IStarProps> = ({ color, value, size }) => {
    const percent = `${value * 100}%`;
    const gradientId = `starGradient${percent}-${Math.random()}`;
    return (
        <svg
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
        >
            <linearGradient id={gradientId} x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor={color} />
                <stop offset={percent} stopColor={color} />
                {value < 1 && (
                    <>
                        <stop offset={percent} stopOpacity={0} />
                        <stop offset="100%" stopOpacity={0} />
                    </>
                )}
            </linearGradient>
            <polygon
                points="100,10 129,60 195,69 148,115 159,181 100,150 41,181 52,115 5,69 71,60"
                fill={`url(#${gradientId})`}
                style={{
                    stroke: '#000000',
                    strokeWidth: 5,
                }}
            />
        </svg>
    );
};
