import { useTranslation } from 'react-i18next';
import type { ContactMethod } from '@data/index';

interface ContactMethodCardProps {
    method: ContactMethod;
}

export const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
    method,
}) => {
    const { t } = useTranslation();
    const IconComponent = method.icon;

    return (
        <a
            href={method.href}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                <IconComponent className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">
                    {t(method.titleKey)}
                </h4>
                <p className="text-gray-600">{method.value}</p>
            </div>
        </a>
    );
};
