import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import {
    Section,
    ContactMethodCard,
    SocialLinkButton,
    ContactForm,
    CVDownloadButton,
} from '@components/ui';
import { usePlatform } from '@hooks/usePlatform';
import { useContact } from './useContact';

export const Contact: React.FC = () => {
    const { t } = useTranslation();
    const { data, actions } = useContact();
    const { form, isSubmitting, contactMethods, socialLinks } = data;
    const { handleInputChange, handleSubmit } = actions;
    const {
        data: { isDesktop },
    } = usePlatform();

    return (
        <Section
            id={SECTIONS.CONTACT}
            backgroundColor="gray-50"
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
        >
            <div className="max-w-6xl lg:mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-stone-800 dark:text-green-400 mb-6">
                                {t('contact.letsConnect')}
                            </h3>
                            <div className="space-y-4">
                                {contactMethods.map((method) => (
                                    <ContactMethodCard
                                        key={method.id}
                                        method={method}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-stone-800 dark:text-green-200 mb-4">
                                {t('contact.followMe')}
                            </h3>
                            <div className="flex space-x-4 mb-6">
                                {socialLinks.map((social) => (
                                    <SocialLinkButton
                                        key={social.id}
                                        social={social}
                                    />
                                ))}
                            </div>

                            {/* CV Download Button */}
                            <div className="mt-6">
                                <CVDownloadButton
                                    variant="secondary"
                                    className="text-sm px-4 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    {isDesktop && (
                        <ContactForm
                            form={form}
                            isSubmitting={isSubmitting}
                            onInputChange={handleInputChange}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Contact;
