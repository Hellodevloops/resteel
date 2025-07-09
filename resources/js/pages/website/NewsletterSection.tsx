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

        // Wait for the DOM to be ready
        const loadBrevoScript = () => {
            const existingScript = document.querySelector('script[src="https://sibforms.com/forms/end-form/build/main.js"]');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = 'https://sibforms.com/forms/end-form/build/main.js';
                script.defer = true;
                document.body.appendChild(script);
            }
        };

        // Only load the script once the form is in the DOM
        const interval = setInterval(() => {
            if (document.getElementById('sib-form')) {
                loadBrevoScript();
                clearInterval(interval);
            }
        }, 100);

        // Cleanup
        return () => {
            clearInterval(interval);
            const script = document.querySelector('script[src="https://sibforms.com/forms/end-form/build/main.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const features = [
        { icon: Clock, text: t('project_support_24_7') },
        { icon: Users, text: t('satisfied_clients_500') },
        { icon: Zap, text: t('weekly_updates') },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* Left - Text */}
                    <div className="space-y-5">
                        <h2 className="text-4xl font-bold" style={{ color: charcoal }}>
                            {t('stay_updated_with')}{' '}
                        </h2>
                        <h2 className="mt-[-10px] text-4xl font-bold" style={{ color: steelBlue }}>
                            {t('industry_insights')}
                        </h2>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-slate-800">{t('newsletter_heading')}</p>
                            <p className="text-lg text-slate-700">{t('newsletter_subheading')}</p>
                        </div>
                    </div>

                    {/* Right - Form & Stats */}
                    <div className="space-y-6">
                        <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
                                    className="flex flex-col items-center gap-4 sm:flex-row"
                                >
                                    <div className="relative w-full">
                                        <Mail className="absolute top-2 left-3 h-5 w-5" style={{ color: steelBlue }} />
                                        <Input
                                            type="email"
                                            id="EMAIL"
                                            name="EMAIL"
                                            placeholder={t('enter_your_email')}
                                            className="pl-10"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="text-white transition"
                                        style={{
                                            background: `linear-gradient(to right, ${vibrantOrange}, #e65c00)`,
                                        }}
                                    >
                                        {t('subscribe')}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                    <input type="text" name="email_address_check" value="" className="hidden" />
                                    <input type="hidden" name="locale" value="en" />
                                </form>
                            </div>
                        </Card>

                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                            {features.map((feature, index) => (
                                <Card key={index} className="bg-white p-4 text-center shadow-md">
                                    <div
                                        className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full"
                                        style={{ backgroundColor: steelBlue }}
                                    >
                                        <feature.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">{feature.text}</p>
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
