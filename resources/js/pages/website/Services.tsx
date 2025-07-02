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
        <section className="bg-slate-100 px-6 py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-4 text-4xl font-bold md:text-5xl">
                    {firstPart} <span className="text-[var(--primary)]">{lastWord}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600">{subtitle}</p>

                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {services.map((service, idx) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Store;
                        return (
                            <Card key={idx} className="shadow-sm transition hover:shadow-md">
                                <CardHeader className="flex flex-col items-center gap-2">
                                    <IconComponent className="h-6 w-6 text-[var(--primary)]" />
                                    <CardTitle className="text-md">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-sm text-gray-600">{service.description}</CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
