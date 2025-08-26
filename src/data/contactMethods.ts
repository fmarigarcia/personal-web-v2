import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import type { ContactMethod } from '../types/data';

export const contactMethods: ContactMethod[] = [
    {
        id: 'email',
        icon: HiMail,
        titleKey: 'contact.methods.email',
        value: 'fran.mari.94@gmail.com',
        href: 'mailto:fran.mari.94@gmail.com',
    },
    {
        id: 'phone',
        icon: HiPhone,
        titleKey: 'contact.methods.phone',
        value: '+34 663 607 700',
        href: 'tel:+34663607700',
    },
    {
        id: 'location',
        icon: HiLocationMarker,
        titleKey: 'contact.methods.location',
        value: 'Algemesí, Spain',
        href: '#',
    },
];
