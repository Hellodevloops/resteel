import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, Mail, Users, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Brand color constants
const steelBlue = '#0076A8';
const charcoal = '#3C3F48';
const vibrantOrange = '#FF6600';

const NewsletterSection = () => {
    const { t } = useTranslation();

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
                        <h2 className="text-4xl font-bold" style={{ color: steelBlue }}>
                            {t('industry_insights')}
                        </h2>
                        <p className="max-w-md text-lg text-slate-600">{t('newsletter_weekly_desc')}</p>
                    </div>

                    {/* Right - Form & Stats */}
                    <div className="space-y-6">
                        <Card className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                            <form
                                action="https://devloops.us17.list-manage.com/subscribe/post?u=a0091f78f874cb693028bc8d9&amp;id=997de3977b"
                                method="post"
                                target="_blank"
                                noValidate
                                className="flex flex-col items-center gap-4 sm:flex-row"
                            >
                                <div className="relative w-full">
                                    <Mail className="absolute top-2 left-3 h-5 w-5" style={{ color: steelBlue }} />
                                    <Input type="email" name="EMAIL" placeholder={t('enter_your_email')} className="pl-10" required />
                                </div>
                                <Button
                                    type="submit"
                                    name="subscribe"
                                    size="lg"
                                    className="text-white transition"
                                    style={{
                                        background: `linear-gradient(to right, ${vibrantOrange}, #e65c00)`,
                                    }}
                                >
                                    {t('subscribe')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </form>
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
