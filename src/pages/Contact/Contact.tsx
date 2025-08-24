import { useTranslation } from 'react-i18next';
import { HiPaperAirplane } from 'react-icons/hi2';
import { SECTIONS } from '@utils/constants';
import {
    Section,
    ContactMethodCard,
    SocialLinkButton,
    Button,
} from '@components/ui';
import { inputClasses } from '@utils/classNames';
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
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('contact.form.title')}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {t('contact.form.name')} *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleInputChange}
                                        required
                                        className={inputClasses}
                                        placeholder={t(
                                            'contact.form.namePlaceholder'
                                        )}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {t('contact.form.email')} *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        required
                                        className={inputClasses}
                                        placeholder={t(
                                            'contact.form.emailPlaceholder'
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {t('contact.form.subject')} *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder={t(
                                        'contact.form.subjectPlaceholder'
                                    )}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {t('contact.form.message')} *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder={t(
                                        'contact.form.messagePlaceholder'
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant={isSubmitting ? 'disabled' : 'primary'}
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                <span className="flex items-center justify-between gap-2 w-full">
                                    {isSubmitting
                                        ? t('contact.sending')
                                        : t('contact.sendMessage')}
                                    <HiPaperAirplane className="w-5 h-5" />
                                </span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
