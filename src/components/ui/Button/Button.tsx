import { buttonVariants } from '@utils/classNames';

interface ButtonProps {
    variant?: 'primary' | 'secondary';
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
}) => {
    const baseClasses =
        variant === 'primary'
            ? buttonVariants.primary
            : buttonVariants.secondary;

    const classes = `${baseClasses} ${className}`.trim();

    return (
        <button onClick={onClick} disabled={disabled} className={classes}>
            {children}
        </button>
    );
};
