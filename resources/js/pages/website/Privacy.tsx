// pages/privacy.tsx
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('privacy_policy_title')} | Resteel`}>
            {/* Hero Banner */}

            {/* Privacy Content */}
            <section className="py-8 sm:py-12 lg:py-16">
                <section className="bg-resteel-primary text-black">
                    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <h1 className="mb-3 text-2xl leading-tight font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                                {t('privacy_policy_title')}
                            </h1>
                            {/* <p className="text-base text-white/90 sm:text-lg lg:text-xl">{t('privacy_last_updated')}</p> */}
                        </div>
                    </div>
                </section>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                1. {t('privacy_introduction')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_introduction_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                2. {t('privacy_information_collect')}
                            </h2>
                            <p className="mb-2 text-sm leading-relaxed sm:text-base">{t('privacy_information_collect_text')}</p>
                            <ul className="mb-4 list-disc space-y-2 pl-4 text-sm sm:mb-6 sm:pl-6 sm:text-base">
                                <li className="leading-relaxed">
                                    <span className="font-medium">{t('privacy_personal_identification')}</span>
                                    {t('privacy_personal_identification_text')}
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-medium">{t('privacy_technical_information')}</span>
                                    {t('privacy_technical_information_text')}
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-medium">{t('privacy_usage_information')}</span>
                                    {t('privacy_usage_information_text')}
                                </li>
                            </ul>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                3. {t('privacy_how_we_use')}
                            </h2>
                            <p className="mb-2 text-sm leading-relaxed sm:text-base">{t('privacy_how_we_use_text')}</p>
                            <ul className="mb-4 list-disc space-y-2 pl-4 text-sm sm:mb-6 sm:pl-6 sm:text-base">
                                <li className="leading-relaxed">{t('privacy_use_provide_services')}</li>
                                <li className="leading-relaxed">{t('privacy_use_respond_inquiries')}</li>
                                <li className="leading-relaxed">{t('privacy_use_send_information')}</li>
                                <li className="leading-relaxed">{t('privacy_use_improve_services')}</li>
                                <li className="leading-relaxed">{t('privacy_use_comply_legal')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                4. {t('privacy_data_security')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_data_security_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                5. {t('privacy_data_retention')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_data_retention_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                6. {t('privacy_your_rights')}
                            </h2>
                            <p className="mb-2 text-sm leading-relaxed sm:text-base">{t('privacy_your_rights_text')}</p>
                            <ul className="mb-4 list-disc space-y-2 pl-4 text-sm sm:mb-6 sm:pl-6 sm:text-base">
                                <li className="leading-relaxed">{t('privacy_right_access')}</li>
                                <li className="leading-relaxed">{t('privacy_right_rectification')}</li>
                                <li className="leading-relaxed">{t('privacy_right_erasure')}</li>
                                <li className="leading-relaxed">{t('privacy_right_restrict')}</li>
                                <li className="leading-relaxed">{t('privacy_right_portability')}</li>
                                <li className="leading-relaxed">{t('privacy_right_object')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                7. {t('privacy_cookies')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_cookies_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                8. {t('privacy_third_party_links')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_third_party_links_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                9. {t('privacy_changes_policy')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_changes_policy_text')}</p>

                            <h2 className="text-resteel-primary mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl">
                                10. {t('privacy_contact_us')}
                            </h2>
                            <p className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">{t('privacy_contact_us_text')}</p>
                            <p
                                className="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base"
                                dangerouslySetInnerHTML={{ __html: t('privacy_contact_info') }}
                            ></p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Privacy;
