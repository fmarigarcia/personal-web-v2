import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import {
    Section,
    ContactMethodCard,
    SocialLinkButton,
    ContactForm,
} from '@components/ui';
import { useContact } from './useContact';

export const Contact: React.FC = () => {
    const { t } = useTranslation();
    const { data, actions } = useContact();
    const { form, isSubmitting, contactMethods, socialLinks } = data;
    const { handleInputChange, handleSubmit } = actions;

    return (
        <Section id={SECTIONS.CONTACT} backgroundColor="gray-50" fullHeight>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('contact.title')}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {t('contact.followMe')}
                            </h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <SocialLinkButton
                                        key={social.id}
                                        social={social}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm
                        form={form}
                        isSubmitting={isSubmitting}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </Section>
    );
};

export default Contact;
