import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

// Brevo Form Global Variables
declare global {
    interface Window {
        REQUIRED_CODE_ERROR_MESSAGE: string;
        LOCALE: string;
        EMAIL_INVALID_MESSAGE: string;
        SMS_INVALID_MESSAGE: string;
        REQUIRED_ERROR_MESSAGE: string;
        GENERIC_INVALID_MESSAGE: string;
        AUTOHIDE: boolean;
        translation: {
            common: {
                selectedList: string;
                selectedLists: string;
                selectedOption: string;
                selectedOptions: string;
            };
        };
    }
}

export {};
