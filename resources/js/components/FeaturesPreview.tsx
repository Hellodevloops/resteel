import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { Building2, Globe, Hammer, PackageCheck, ShieldCheck, Store, Truck, Users2, Wrench } from 'lucide-react';

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface SiteSettings {
    why_choose_us_title?: string;
    why_choose_us_subtitle?: string;
    why_choose_us_items?: FeatureItem[];
}

const iconMap = {
    Globe,
    Hammer,
    ShieldCheck,
    Store,
    Truck,
    Wrench,
    PackageCheck,
    Building2,
    Users2,
};

// Helper function to safely split title and highlight last word
const formatTitle = (title: string): { firstPart: string; lastWord: string } => {
    const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'Why Choose Us';
    const words = safeTitle.split(' ');
    return {
        firstPart: words.slice(0, -1).join(' '),
        lastWord: words.slice(-1)[0] || '',
    };
};

export default function WhyChooseUs() {
    const { siteSettings } = usePage().props as unknown as { siteSettings: SiteSettings };

    // Use dynamic features from site settings, or fall back to defaults
    const features =
        siteSettings?.why_choose_us_items && siteSettings.why_choose_us_items.length > 0
            ? siteSettings.why_choose_us_items
            : [
                  {
                      icon: 'Globe',
                      title: 'Europe-Wide Reach',
                      description: 'We advertise your listings across 20+ countries through our network of verified buyers and partners.',
                  },
                  {
                      icon: 'Hammer',
                      title: 'End-to-End Support',
                      description: 'We manage the full lifecycle — disassembly, transport, and reassembly included.',
                  },
                  {
                      icon: 'ShieldCheck',
                      title: '20+ Years of Trust',
                      description: "Since 2000, we've helped hundreds of industrial and agri businesses relocate or resell steel halls.",
                  },
              ];

    const titleText = siteSettings?.why_choose_us_title || 'Why Choose Us';
    const subtitle =
        siteSettings?.why_choose_us_subtitle ||
        'We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective';
    const { firstPart, lastWord } = formatTitle(titleText);

    return (
        <section className="bg-slate-100 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-2 text-2xl font-bold sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
                    {firstPart} <span className="text-[var(--primary)]">{lastWord}</span>
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:mt-3 sm:text-base lg:text-lg">{subtitle}</p>

                <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Globe;
                        return (
                            <Card key={idx} className="bg-white p-4 shadow-md transition duration-200 hover:shadow-lg sm:p-6">
                                <CardHeader className="flex flex-col items-center pb-3 sm:pb-4">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 sm:h-14 sm:w-14">
                                        <IconComponent className="h-5 w-5 text-[var(--primary)] sm:h-6 sm:w-6" />
                                    </div>
                                    <CardTitle className="text-base font-semibold sm:text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-2 text-center text-sm text-gray-600 sm:px-4 sm:text-base">
                                    {feature.description}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
