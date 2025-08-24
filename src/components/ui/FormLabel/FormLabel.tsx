import type { LabelHTMLAttributes } from 'react';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({
    required = false,
    children,
    className = '',
    ...props
}) => {
    return (
        <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};
