import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Hammer, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhyChooseUs() {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Globe className="h-6 w-6 text-[var(--primary)]" />,
            title: t('europe_wide_reach'),
            description: t('europe_wide_reach_desc'),
        },
        {
            icon: <Hammer className="h-6 w-6 text-[var(--primary)]" />,
            title: t('end_to_end_support'),
            description: t('end_to_end_support_desc'),
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-[var(--primary)]" />,
            title: t('years_of_trust'),
            description: t('years_of_trust_desc'),
        },
    ];

    return (
        <section className="bg-slate-100 px-6 py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-4 text-4xl font-bold md:text-5xl">
                    {t('why_choose_us').split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-[var(--primary)]">{t('why_choose_us').split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600">{t('why_choose_us_subtitle')}</p>
                {/* <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Combining experience with industry-specific knowledge, we make relocation, reuse, and resale simple and secure.
        </p> */}

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="bg-white shadow-md transition duration-200 hover:shadow-lg">
                            <CardHeader className="flex flex-col items-center">
                                {feature.icon}
                                <CardTitle className="mt-2 text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-gray-600">{feature.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
