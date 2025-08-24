import { buttonVariants } from '@utils/classNames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'disabled';
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    onClick,
    children,
    disabled = false,
    className = '',
    type = 'button',
    ...props
}) => {
    const baseClasses = buttonVariants[variant] || buttonVariants.primary;
    const classes = `${baseClasses} ${className}`.trim();

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classes}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};
