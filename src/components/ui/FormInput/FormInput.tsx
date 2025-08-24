import type { InputHTMLAttributes } from 'react';
import { inputClasses } from '@utils/classNames';

export const FormInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    className = '',
    ...props
}) => {
    return <input className={`${inputClasses} ${className}`} {...props} />;
};
