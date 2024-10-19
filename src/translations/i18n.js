import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vi from './vi.js';
import en from './en.js';

i18n.use(initReactI18next).init({
    resources: {
        en,
        vi,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
