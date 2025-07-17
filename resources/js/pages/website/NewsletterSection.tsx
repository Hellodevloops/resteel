import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, Mail, Users, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Brand color constants
const steelBlue = '#0076A8';
const charcoal = '#3C3F48';
const vibrantOrange = '#FF6600';

const NewsletterSection = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Add Brevo required global variables
        window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
        window.LOCALE = 'en';
        window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
            'The information provided is invalid. Please review the field format and try again.';
        window.REQUIRED_ERROR_MESSAGE = 'This field cannot be left blank. ';
        window.GENERIC_INVALID_MESSAGE = 'The information provided is invalid. Please review the field format and try again.';
        window.translation = {
            common: {
                selectedList: '{quantity} list selected',
                selectedLists: '{quantity} lists selected',
                selectedOption: '{quantity} selected',
                selectedOptions: '{quantity} selected',
            },
        };
        window.AUTOHIDE = Boolean(0);

        // We intentionally do NOT load Brevo's JavaScript here so that the form falls back to a normal HTML POST.
        // This prevents the Brevo script from intercepting the submission and displaying an in-page confirmation,
        // allowing the browser to follow the response/redirect in a **new tab** thanks to `target="_blank"`.

        // No cleanup required because no script or interval is created.
    }, []);

    const features = [
        { icon: Clock, text: t('project_support_24_7') },
        { icon: Users, text: t('satisfied_clients_500') },
        { icon: Zap, text: t('weekly_updates') },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-white py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                    {/* Left - Text */}
                    <div className="space-y-4 sm:space-y-5">
                        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl" style={{ color: charcoal }}>
                            {t('stay_updated_with')}{' '}
                        </h2>
                        <h2 className="mt-[-8px] text-2xl font-bold sm:mt-[-10px] sm:text-3xl md:text-4xl" style={{ color: steelBlue }}>
                            {t('industry_insights')}
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-lg font-semibold text-slate-800 sm:text-xl">{t('newsletter_heading')}</p>
                            <p className="text-base text-slate-700 sm:text-lg">{t('newsletter_subheading')}</p>
                        </div>
                    </div>

                    {/* Right - Form & Stats */}
                    <div className="space-y-6">
                        <Card className="border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
                            <div id="sib-form-container" className="sib-form-container">
                                {/* Error Message */}
                                <div id="error-message" className="mt-4 hidden rounded-md bg-red-100 p-4 text-red-700">
                                    {t('subscription_error')}
                                </div>

                                {/* Success Message */}
                                <div id="success-message" className="mt-4 hidden rounded-md bg-green-100 p-4 text-green-700">
                                    {t('subscription_success')}
                                </div>

                                {/* Brevo Form */}
                                <form
                                    id="sib-form"
                                    method="POST"
                                    action="https://063e6ab8.sibforms.com/serve/MUIFAD972bnEpiWpFk-eyW12k0sDvqdiq9f7gxspg4ccCSeC-MmsZrFYdwXAlOoCdwe-qpk7aYrANGTKXERrAAttC6k8CzSynLB-wo9tUTQe-gxpuq4K2c2f-FLibWBcEx7cT-2FTp6-MLyWR17OyweXyxlyH3f-bnPprGPjXhv_6r_f3xaVSef9bYJqa2f-JvTZ91JxOpHN6EFO"
                                    data-type="subscription"
                                    target="_blank"
                                    className="flex flex-col gap-4 sm:flex-row sm:items-center"
                                >
                                    <div className="relative w-full">
                                        <Mail className="absolute top-2.5 left-3 h-4 w-4 sm:top-2 sm:h-5 sm:w-5" style={{ color: steelBlue }} />
                                        <Input
                                            type="email"
                                            id="EMAIL"
                                            name="EMAIL"
                                            placeholder={t('enter_your_email')}
                                            className="h-10 pl-10 text-sm sm:h-11 sm:text-base"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="h-10 w-full text-sm text-white transition sm:h-11 sm:w-auto sm:text-base"
                                        style={{
                                            background: `linear-gradient(to right, ${vibrantOrange}, #e65c00)`,
                                        }}
                                    >
                                        {t('subscribe')}
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                    <input type="text" name="email_address_check" value="" className="hidden" />
                                    <input type="hidden" name="locale" value="en" />
                                </form>
                            </div>
                        </Card>

                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3 sm:gap-4">
                            {features.map((feature, index) => (
                                <Card key={index} className="bg-white p-3 text-center shadow-md sm:p-4">
                                    <div
                                        className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10"
                                        style={{ backgroundColor: steelBlue }}
                                    >
                                        <feature.icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                    </div>
                                    <p className="text-xs font-medium text-slate-700 sm:text-sm">{feature.text}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
