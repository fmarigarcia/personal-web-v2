import { useEffect, useRef } from 'react';
import { useForm } from '@formspree/react';
import { contactMethods, socialLinks } from '@data/index';

export const useContact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [form, handleSubmit] = useForm(import.meta.env.VITE_CONTACT_FORM_KEY);

    useEffect(() => {
        if (form.succeeded && formRef.current) {
            formRef.current.reset();
        }
    }, [form.succeeded]);

    const data = {
        form,
        formRef,
        contactMethods,
        socialLinks,
    };

    const actions = {
        handleSubmit,
    };

    return { data, actions };
};
