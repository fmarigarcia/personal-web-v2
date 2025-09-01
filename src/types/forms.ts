import {
    SubmissionError,
    SubmissionSuccess,
    type FieldValues,
} from '@formspree/core';
// Form-related interfaces and types

export interface ContactForm {
    errors: SubmissionError<FieldValues> | null;
    result: SubmissionSuccess | null;
    submitting: boolean;
    succeeded: boolean;
}
