import { useTranslation } from 'react-i18next';
import { HiArrowDownTray } from 'react-icons/hi2';
import { Button } from '@components/ui';

interface CVDownloadButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary';
}

export const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({
    className = '',
    variant = 'secondary',
}) => {
    const { t } = useTranslation();

    const handleDownload = () => {
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = '/CV Francisco Marí.pdf';
        link.download = 'CV Francisco Marí.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            variant={variant}
            onClick={handleDownload}
            className={className}
            aria-label={t('experience.downloadCV')}
        >
            <span className="flex items-center gap-2">
                <HiArrowDownTray
                    className="w-5 h-5"
                    data-testid="download-icon"
                />
                {t('experience.downloadCV')}
            </span>
        </Button>
    );
};
