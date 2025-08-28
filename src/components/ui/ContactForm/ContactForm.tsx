import type { FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { HiPaperAirplane } from 'react-icons/hi2';
import { FormLabel, FormInput, FormTextarea, Button } from '@components/ui';
import type { ContactForm as ContactFormData } from '../../../types/forms';

interface ContactFormProps {
    form: ContactFormData;
    isSubmitting: boolean;
    onInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: FormEvent) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    form,
    isSubmitting,
    onInputChange,
    onSubmit,
}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm dark:shadow-lg dark:shadow-green-400/5 p-8 border dark:border-zinc-700">
            <h3
                id="contact-form-title"
                className="text-2xl font-bold text-gray-900 dark:text-green-400 mb-6"
            >
                {t('contact.form.title')}
            </h3>
            <form
                onSubmit={onSubmit}
                className="space-y-6"
                aria-labelledby="contact-form-title"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <FormLabel htmlFor="name" required>
                            {t('contact.form.name')}
                        </FormLabel>
                        <FormInput
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onInputChange}
                            required
                            placeholder={t('contact.form.namePlaceholder')}
                        />
                    </div>
                    <div>
                        <FormLabel htmlFor="email" required>
                            {t('contact.form.email')}
                        </FormLabel>
                        <FormInput
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={onInputChange}
                            required
                            placeholder={t('contact.form.emailPlaceholder')}
                        />
                    </div>
                </div>

                <div>
                    <FormLabel htmlFor="subject" required>
                        {t('contact.form.subject')}
                    </FormLabel>
                    <FormInput
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={onInputChange}
                        required
                        placeholder={t('contact.form.subjectPlaceholder')}
                    />
                </div>

                <div>
                    <FormLabel htmlFor="message" required>
                        {t('contact.form.message')}
                    </FormLabel>
                    <FormTextarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={onInputChange}
                        required
                        rows={5}
                        placeholder={t('contact.form.messagePlaceholder')}
                    />
                </div>

                <Button
                    type="submit"
                    variant={isSubmitting ? 'disabled' : 'primary'}
                    disabled={isSubmitting}
                    className="w-full"
                >
                    <span className="flex items-center justify-center gap-2">
                        {isSubmitting
                            ? t('contact.sending')
                            : t('contact.sendMessage')}
                        {!isSubmitting && (
                            <HiPaperAirplane
                                className="w-5 h-5"
                                data-testid="send-icon"
                            />
                        )}
                    </span>
                </Button>
            </form>
        </div>
    );
};
