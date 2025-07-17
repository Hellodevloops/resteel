import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { Building2, Globe, Hammer, PackageCheck, ShieldCheck, Store, Truck, Users2, Wrench } from 'lucide-react';

interface ServiceItem {
    icon: string;
    title: string;
    description: string;
}

interface SiteSettings {
    services_title?: string;
    services_subtitle?: string;
    services_items?: ServiceItem[];
}

const iconMap = {
    Store,
    Wrench,
    Truck,
    PackageCheck,
    Building2,
    Users2,
    Globe,
    Hammer,
    ShieldCheck,
};

// Helper function to safely split title and highlight last word
const formatTitle = (title: string): { firstPart: string; lastWord: string } => {
    const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'Services We Provide';
    const words = safeTitle.split(' ');
    return {
        firstPart: words.slice(0, -1).join(' '),
        lastWord: words.slice(-1)[0] || '',
    };
};

export default function ServicesWeProvide() {
    const { siteSettings } = usePage().props as unknown as { siteSettings: SiteSettings };

    // Use dynamic services from site settings, or fall back to defaults
    const services =
        siteSettings?.services_items && siteSettings.services_items.length > 0
            ? siteSettings.services_items
            : [
                  {
                      icon: 'Store',
                      title: 'Premium Re-Sale',
                      description: 'Access a wide selection of vetted second-hand steel buildings ready for new purpose.',
                  },
                  {
                      icon: 'Wrench',
                      title: 'Assembly & Disassembly',
                      description: 'From full dismounting to site setup, we manage both ends of the lifecycle.',
                  },
                  {
                      icon: 'Truck',
                      title: 'Transport & Logistics',
                      description: 'International transport across Europe with partner fleets and freight planning.',
                  },
                  {
                      icon: 'PackageCheck',
                      title: 'Equipment Tracking',
                      description: "Get visibility, safety, and updates throughout your building's relocation journey.",
                  },
              ];

    const titleText = siteSettings?.services_title || 'Services We Provide';
    const subtitle = siteSettings?.services_subtitle || 'Comprehensive solutions for your industrial building needs';
    const { firstPart, lastWord } = formatTitle(titleText);

    return (
        <section className="bg-slate-100 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-2 text-2xl font-bold sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
                    {firstPart} <span className="text-[var(--primary)]">{lastWord}</span>
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:mt-3 sm:text-base lg:text-lg">{subtitle}</p>

                <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, idx) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Store;
                        return (
                            <Card key={idx} className="bg-white p-4 shadow-sm transition duration-200 hover:shadow-md sm:p-6">
                                <CardHeader className="flex flex-col items-center gap-3 pb-3 sm:gap-4 sm:pb-4">
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 sm:h-14 sm:w-14">
                                        <IconComponent className="h-5 w-5 text-[var(--primary)] sm:h-6 sm:w-6" />
                                    </div>
                                    <CardTitle className="text-base font-semibold sm:text-lg">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-2 text-center text-sm text-gray-600 sm:px-4 sm:text-base">
                                    {service.description}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
