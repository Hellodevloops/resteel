// pages/privacy.tsx
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('privacy_policy_title')} | Resteel`}>
            {/* Hero Banner */}
            <section className="bg-resteel-primary text-white">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 text-3xl font-bold md:text-5xl">{t('privacy_policy_title')}</h1>
                    <p className="text-lg text-white/90">{t('privacy_last_updated')}</p>
                </div>
            </section>

            {/* Privacy Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">1. {t('privacy_introduction')}</h2>
                            <p className="mb-6">{t('privacy_introduction_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">2. {t('privacy_information_collect')}</h2>
                            <p className="mb-2">{t('privacy_information_collect_text')}</p>
                            <ul className="mb-6 list-disc pl-6">
                                <li>
                                    <span className="font-medium">{t('privacy_personal_identification')}</span>
                                    {t('privacy_personal_identification_text')}
                                </li>
                                <li>
                                    <span className="font-medium">{t('privacy_technical_information')}</span>
                                    {t('privacy_technical_information_text')}
                                </li>
                                <li>
                                    <span className="font-medium">{t('privacy_usage_information')}</span>
                                    {t('privacy_usage_information_text')}
                                </li>
                            </ul>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">3. {t('privacy_how_we_use')}</h2>
                            <p className="mb-2">{t('privacy_how_we_use_text')}</p>
                            <ul className="mb-6 list-disc pl-6">
                                <li>{t('privacy_use_provide_services')}</li>
                                <li>{t('privacy_use_respond_inquiries')}</li>
                                <li>{t('privacy_use_send_information')}</li>
                                <li>{t('privacy_use_improve_services')}</li>
                                <li>{t('privacy_use_comply_legal')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">4. {t('privacy_data_security')}</h2>
                            <p className="mb-6">{t('privacy_data_security_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">5. {t('privacy_data_retention')}</h2>
                            <p className="mb-6">{t('privacy_data_retention_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">6. {t('privacy_your_rights')}</h2>
                            <p className="mb-2">{t('privacy_your_rights_text')}</p>
                            <ul className="mb-6 list-disc pl-6">
                                <li>{t('privacy_right_access')}</li>
                                <li>{t('privacy_right_rectification')}</li>
                                <li>{t('privacy_right_erasure')}</li>
                                <li>{t('privacy_right_restrict')}</li>
                                <li>{t('privacy_right_portability')}</li>
                                <li>{t('privacy_right_object')}</li>
                            </ul>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">7. {t('privacy_cookies')}</h2>
                            <p className="mb-6">{t('privacy_cookies_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">8. {t('privacy_third_party_links')}</h2>
                            <p className="mb-6">{t('privacy_third_party_links_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">9. {t('privacy_changes_policy')}</h2>
                            <p className="mb-6">{t('privacy_changes_policy_text')}</p>

                            <h2 className="text-resteel-primary mb-4 text-2xl font-bold">10. {t('privacy_contact_us')}</h2>
                            <p className="mb-6">{t('privacy_contact_us_text')}</p>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('privacy_contact_info') }}></p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Privacy;
