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
            className="flex items-center p-4 bg-stone-50 dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:hover:shadow-lg dark:hover:shadow-green-400/10 dark:border dark:border-zinc-700"
        >
            <div className="flex-shrink-0 w-12 h-12 bg-stone-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-stone-950 dark:text-green-400 mr-4 dark:border dark:border-zinc-600">
                <IconComponent className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-semibold text-stone-800 dark:text-white">
                    {t(method.titleKey)}
                </h4>
                <p className="text-stone-600 dark:text-zinc-400">
                    {method.value}
                </p>
            </div>
        </a>
    );
};
