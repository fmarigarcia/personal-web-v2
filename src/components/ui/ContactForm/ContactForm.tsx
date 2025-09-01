import { useTranslation } from 'react-i18next';
import { HiPaperAirplane } from 'react-icons/hi2';
import { FormLabel, FormInput, FormTextarea, Button } from '@components/ui';
//@ts-expect-error random
import type { ContactForm as ContactFormData } from '@types/forms';
import { ValidationError, type SubmitHandler } from '@formspree/react';
import type { FieldValues } from '@formspree/core';
import type { RefObject } from 'react';

interface ContactFormProps {
    form: ContactFormData;
    onSubmit: SubmitHandler<FieldValues, void>;
    ref: RefObject<HTMLFormElement | null>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    form,
    onSubmit,
    ref,
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
                ref={ref}
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
                        required
                        rows={5}
                        placeholder={t('contact.form.messagePlaceholder')}
                    />
                </div>

                <div>
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={form.errors}
                    />
                </div>

                <Button
                    type="submit"
                    variant={form.submitting ? 'disabled' : 'primary'}
                    disabled={form.submitting}
                    className="w-full"
                >
                    <span className="flex items-center justify-center gap-2">
                        {form.submitting
                            ? t('contact.sending')
                            : t('contact.sendMessage')}
                        {!form.submitting && (
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
