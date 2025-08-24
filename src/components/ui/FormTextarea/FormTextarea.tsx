import type { TextareaHTMLAttributes } from 'react';
import { inputClasses } from '@utils/classNames';

export const FormTextarea: React.FC<
    TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className = '', ...props }) => {
    return <textarea className={`${inputClasses} ${className}`} {...props} />;
};
