import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageCheck, Store, Truck, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ServicesWeProvide() {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Store className="h-6 w-6 text-[var(--primary)]" />,
            title: t('premium_resale'),
            description: t('premium_resale_desc'),
        },
        {
            icon: <Wrench className="h-6 w-6 text-[var(--primary)]" />,
            title: t('assembly_disassembly'),
            description: t('assembly_disassembly_desc'),
        },
        {
            icon: <Truck className="h-6 w-6 text-[var(--primary)]" />,
            title: t('transport_logistics'),
            description: t('transport_logistics_desc'),
        },
        {
            icon: <PackageCheck className="h-6 w-6 text-[var(--primary)]" />,
            title: t('equipment_tracking'),
            description: t('equipment_tracking_desc'),
        },
    ];

    return (
        <section className="bg-slate-100 px-6 py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-4 text-4xl font-bold md:text-5xl">
                    {t('services_we_provide')} <span className="text-[var(--primary)]">{t('we_provide')}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600">{t('services_subtitle')}</p>

                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {services.map((service, idx) => (
                        <Card key={idx} className="shadow-sm transition hover:shadow-md">
                            <CardHeader className="flex flex-col items-center gap-2">
                                {service.icon}
                                <CardTitle className="text-md">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-gray-600">{service.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
