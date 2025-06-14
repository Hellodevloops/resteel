import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Read Inertia page props injected into <div id="app" data-page>
const el = document.getElementById('app')!;
const page = JSON.parse(el.dataset.page!);
const { locale, fallback_locale, translations } = page.props;

// Initialize i18next with translations from Laravel
i18n
  .use(initReactI18next)
  .init({
    resources: {
      [locale]: {
        translation: Object.assign({}, ...Object.values(translations)),
      },
    },
    lng: locale,
    fallbackLng: fallback_locale || 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export default i18n;