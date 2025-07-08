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

                        {/* Enhanced Terms & Conditions Button */}
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Full Document</h3>
                                    <p className="text-sm text-gray-500">Download complete terms & conditions</p>
                                </div>
                                <button
                                    onClick={() => window.open('/assets/General_Terms_and_Conditions_of_Resteel_Solutions_B_V_2005.docx', '_blank')}
                                    className="bg-resteel-primary hover:bg-resteel-primary/90 focus:ring-resteel-primary inline-flex items-center rounded-lg px-5 py-2.5 font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <svg className="mr-2 h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    <span className="text-black">Download</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Terms;
