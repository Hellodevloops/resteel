// pages/terms.tsx
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const Terms = () => {
    const { t } = useTranslation();

    const handleDownload = () => {
        const fileUrl = '/assets/General_Terms_and_Conditions_of_Resteel_Solutions_B_V_2025.docx';
        const fileName = 'General_Terms_and_Conditions_of_Resteel_Solutions_B_V_2025.docx';

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout title={`${t('terms_of_service')} | Resteel`}>
            {/* Hero Banner */}
            <section className="bg-resteel-primary text-white">
                <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-3 text-2xl leading-tight font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">{t('terms_of_service')}</h1>
                        <p className="text-base text-white/90 sm:text-lg lg:text-xl">{t('terms_last_updated')}</p>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                1. {t('terms_introduction')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_introduction_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                2. {t('terms_definitions')}
                            </h2>
                            <p className="mb-2 text-sm leading-relaxed sm:text-base">{t('terms_definitions_text')}</p>
                            <ul className="mb-4 list-disc space-y-2 pl-4 text-sm sm:mb-6 sm:pl-6 sm:text-base">
                                <li className="leading-relaxed">{t('terms_definitions_company')}</li>
                                <li className="leading-relaxed">{t('terms_definitions_website')}</li>
                                <li className="leading-relaxed">{t('terms_definitions_services')}</li>
                                <li className="leading-relaxed">{t('terms_definitions_user')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                3. {t('terms_use_of_services')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_use_of_services_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                4. {t('terms_inquiries_communication')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_inquiries_communication_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                5. {t('terms_intellectual_property')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_intellectual_property_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                6. {t('terms_limitation_liability')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_limitation_liability_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                7. {t('terms_governing_law')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_governing_law_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                8. {t('terms_changes_to_terms')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_changes_to_terms_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                9. {t('terms_contact_us')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('terms_contact_us_text')}</p>
                            <p
                                className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base"
                                dangerouslySetInnerHTML={{ __html: t('terms_contact_info') }}
                            ></p>
                        </div>

                        {/* Enhanced Terms & Conditions Button */}
                        <div className="mt-6 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-6">
                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div className="text-center sm:text-left">
                                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">{t('terms_full_document')}</h3>
                                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">{t('terms_download_complete')}</p>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none active:bg-orange-700 sm:w-auto sm:px-5 sm:text-base"
                                >
                                    <svg className="mr-2 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    <span>Download</span>
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
