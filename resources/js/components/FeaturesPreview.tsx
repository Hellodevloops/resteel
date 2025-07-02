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
                      description: "Since 2005, we've helped hundreds of industrial and agri businesses relocate or resell steel halls.",
                  },
              ];

    const titleText = siteSettings?.why_choose_us_title || 'Why Choose Us';
    const subtitle =
        siteSettings?.why_choose_us_subtitle ||
        'We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective';
    const { firstPart, lastWord } = formatTitle(titleText);

    return (
        <section className="bg-slate-100 px-6 py-20">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-charcoal mt-4 text-4xl font-bold md:text-5xl">
                    {firstPart} <span className="text-[var(--primary)]">{lastWord}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600">{subtitle}</p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {features.map((feature, idx) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Globe;
                        return (
                            <Card key={idx} className="bg-white shadow-md transition duration-200 hover:shadow-lg">
                                <CardHeader className="flex flex-col items-center">
                                    <IconComponent className="h-6 w-6 text-[var(--primary)]" />
                                    <CardTitle className="mt-2 text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-sm text-gray-600">{feature.description}</CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
