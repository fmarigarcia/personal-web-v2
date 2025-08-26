import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FORM_SUBMISSION_DELAY } from '@utils/constants';
import { contactMethods, socialLinks } from '@data/index';
import type { ContactForm } from '../../types/forms';

export const useContact = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const data = {
        form,
        isSubmitting,
        contactMethods,
        socialLinks,
    };

    const actions = {
        handleInputChange: useCallback(
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const { name, value } = e.target;
                setForm((prev) => ({ ...prev, [name]: value }));
            },
            []
        ),

        handleSubmit: useCallback(
            async (e: React.FormEvent) => {
                e.preventDefault();
                setIsSubmitting(true);

                try {
                    // Simulate form submission
                    await new Promise((resolve) => setTimeout(resolve, FORM_SUBMISSION_DELAY));

                    // Here you would typically send the form data to your backend
                    // TODO: Replace with actual API call
                    // await submitContactForm(form);

                    // Reset form
                    setForm({ name: '', email: '', subject: '', message: '' });

                    // You could show a success message here
                    alert(t('contact.form.successMessage'));
                } catch {
                    // Handle form submission error
                    alert(t('contact.form.errorMessage'));
                } finally {
                    setIsSubmitting(false);
                }
            },
            [t]
        ),
    };

    return { data, actions };
};
