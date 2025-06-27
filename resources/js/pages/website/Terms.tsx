// pages/terms.tsx
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('terms_of_service')} | Resteel`}>
            {/* Hero Banner */}
            <section className="bg-resteel-primary text-white">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 text-3xl font-bold md:text-5xl">{t('terms_of_service')}</h1>
                    <p className="text-lg text-white/90">{t('terms_last_updated')}</p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">1. {t('terms_introduction')}</h2>
                            <p className="mb-6">{t('terms_introduction_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">2. {t('terms_definitions')}</h2>
                            <p className="mb-2">{t('terms_definitions_text')}</p>
                            <ul className="mb-6 list-disc pl-6">
                                <li>{t('terms_definitions_company')}</li>
                                <li>{t('terms_definitions_website')}</li>
                                <li>{t('terms_definitions_services')}</li>
                                <li>{t('terms_definitions_user')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">3. {t('terms_use_of_services')}</h2>
                            <p className="mb-6">{t('terms_use_of_services_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">4. {t('terms_inquiries_communication')}</h2>
                            <p className="mb-6">{t('terms_inquiries_communication_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">5. {t('terms_intellectual_property')}</h2>
                            <p className="mb-6">{t('terms_intellectual_property_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">6. {t('terms_limitation_liability')}</h2>
                            <p className="mb-6">{t('terms_limitation_liability_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">7. {t('terms_governing_law')}</h2>
                            <p className="mb-6">{t('terms_governing_law_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">8. {t('terms_changes_to_terms')}</h2>
                            <p className="mb-6">{t('terms_changes_to_terms_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">9. {t('terms_contact_us')}</h2>
                            <p className="mb-6">{t('terms_contact_us_text')}</p>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('terms_contact_info') }}></p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Terms;
