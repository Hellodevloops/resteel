import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    Globe,
    Hammer,
    Lightbulb,
    PackageCheck,
    ShieldCheck,
    Store,
    Truck,
    Users2,
    Wrench,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

interface OfferingItem {
    icon: string;
    title: string;
    description: string;
}

interface StatItem {
    label: string;
    value: string;
}

interface MissionItem {
    icon: string;
    title: string;
    description: string;
}

interface SiteSettings {
    who_we_are_title?: string;
    who_we_are_description?: string;
    who_we_are_founded?: string;
    what_we_offer_title?: string;
    what_we_offer_subtitle?: string;
    what_we_offer_items?: OfferingItem[];
    stats_title?: string;
    stats_subtitle?: string;
    stats_items?: StatItem[];
    mission_title?: string;
    mission_subtitle?: string;
    mission_items?: MissionItem[];
}

const iconMap = {
    Building2,
    Wrench,
    Users2,
    ShieldCheck,
    Store,
    Truck,
    PackageCheck,
    Globe,
    Hammer,
    CheckCircle2,
    BriefcaseBusiness,
    Lightbulb,
};

// Helper function to safely split title and highlight last word(s)
const formatWhoWeAreTitle = (title: string): { firstWord: string; restWords: string } => {
    const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'Who We Are';
    const words = safeTitle.split(' ');
    return {
        firstWord: words[0] || '',
        restWords: words.slice(1).join(' ') || '',
    };
};

// Helper function to safely split what we offer title (first 2 words vs rest)
const formatWhatWeOfferTitle = (title: string): { firstPart: string; lastPart: string } => {
    const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'What We Offer';
    const words = safeTitle.split(' ');
    return {
        firstPart: words.slice(0, 2).join(' '),
        lastPart: words.slice(2).join(' ') || '',
    };
};

// Helper function for simple title split (first words vs last word)
const formatSimpleTitle = (title: string, fallback: string = 'Title'): { firstPart: string; lastWord: string } => {
    const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : fallback;
    const words = safeTitle.split(' ');
    return {
        firstPart: words.slice(0, -1).join(' '),
        lastWord: words.slice(-1)[0] || '',
    };
};

const About = () => {
    const { siteSettings } = usePage().props as unknown as { siteSettings: SiteSettings };
    const { t } = useTranslation();

    return (
        <Layout title="About Us | Resteel">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 px-4 pt-20 pb-16 text-center text-white sm:pt-24 sm:pb-20 md:pt-32 md:pb-24">
                <h1 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">{t('about_hero_title')}</h1>
                <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl">{t('about_hero_subtitle')}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <Button
                        variant="outline"
                        asChild
                        className="w-full rounded-xl border-white px-6 py-3 text-orange-500 hover:text-orange-600 sm:w-auto sm:px-6 sm:py-4"
                    >
                        <Link href="/buildings" className="text-orange-500">
                            {t('browse_structures')}
                        </Link>
                    </Button>
                    <Button asChild className="w-full rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 sm:w-auto sm:px-6 sm:py-4">
                        <Link href="/contact">
                            {t('lets_work_together')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Company Story */}
            <section className="bg-white px-4 py-12 text-center sm:py-16 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-charcoal mt-4 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                        {(() => {
                            const titleText = siteSettings?.who_we_are_title || 'Who We Are';
                            const { firstWord, restWords } = formatWhoWeAreTitle(titleText);
                            return (
                                <>
                                    {firstWord}
                                    <span className="text-[var(--primary)]">{restWords && ` ${restWords}`}</span>
                                </>
                            );
                        })()}
                    </h2>
                    <p className="mb-6 text-base text-gray-600 sm:text-lg">
                        {siteSettings?.who_we_are_description ||
                            'Resteel is a trusted European leader in sustainable steel construction. We help companies rethink infrastructure using reclaimed, premium-grade materials — without compromising on strength, safety, or style.'}
                    </p>
                    <div className="text-xs text-gray-400 italic sm:text-sm">
                        {siteSettings?.who_we_are_founded || 'Founded in 2005 · Headquartered in Helmond, Netherlands'}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-slate-50 px-4 py-12 sm:py-16 md:py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-charcoal mt-4 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                        {(() => {
                            const titleText = siteSettings?.mission_title || 'Our Mission';
                            const { firstPart, lastWord } = formatSimpleTitle(titleText, 'Our Mission');
                            return (
                                <>
                                    {firstPart}
                                    <span className="text-[var(--primary)]"> {lastWord}</span>
                                </>
                            );
                        })()}
                    </h2>

                    <p className="mb-8 text-base text-gray-600 sm:mb-10 sm:text-lg md:mb-12">
                        {siteSettings?.mission_subtitle || t('about_mission_subtitle')}
                    </p>
                    <div className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
                        {(siteSettings?.mission_items && siteSettings.mission_items.length > 0
                            ? siteSettings.mission_items
                            : [
                                  { icon: 'CheckCircle2', title: t('integrity'), description: t('honest_transparent_business') },
                                  { icon: 'BriefcaseBusiness', title: t('expertise'), description: t('deep_industry_knowledge') },
                                  { icon: 'Lightbulb', title: t('innovation'), description: t('creative_solutions_challenges') },
                              ]
                        ).map((item, idx) => {
                            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || CheckCircle2;
                            return (
                                <div key={idx} className="flex items-start gap-3 sm:gap-4">
                                    <div className="rounded-xl bg-slate-100 p-2 text-slate-600 sm:p-3">
                                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 sm:text-lg">{item.title}</h4>
                                        <p className="text-xs text-gray-600 sm:text-sm">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="bg-white px-4 py-12 sm:py-16 md:py-20">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="text-charcoal mt-4 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                        {(() => {
                            const titleText = siteSettings?.what_we_offer_title || 'What We Offer';
                            const { firstPart, lastPart } = formatWhatWeOfferTitle(titleText);
                            return (
                                <>
                                    {firstPart}
                                    <span className="text-[var(--primary)]">{lastPart && ` ${lastPart}`}</span>
                                </>
                            );
                        })()}
                    </h2>
                    <p className="mb-8 text-base text-gray-600 sm:mb-10 sm:text-lg md:mb-12">
                        {siteSettings?.what_we_offer_subtitle ||
                            'More than just buying and selling — we help move, manage, and optimize every structure'}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {(siteSettings?.what_we_offer_items && siteSettings.what_we_offer_items.length > 0
                            ? siteSettings.what_we_offer_items
                            : [
                                  { icon: 'Building2', title: 'Steel Halls', description: 'Pre-owned halls for industrial and agricultural use.' },
                                  { icon: 'Wrench', title: 'Assembly Services', description: 'Complete dismantling, transport, and reassembly.' },
                                  { icon: 'Users2', title: 'Project Guidance', description: 'Consultation on layout, logistics, and feasibility.' },
                                  { icon: 'ShieldCheck', title: 'Certified Steel', description: 'Compliance-backed quality and safety assurance.' },
                              ]
                        ).map((item, idx) => {
                            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Building2;
                            return (
                                <div key={idx} className="rounded-xl bg-slate-50 p-4 shadow transition hover:shadow-md sm:p-6">
                                    <div className="mb-3 inline-block rounded-lg bg-white p-2 text-slate-700 sm:mb-4 sm:p-3">
                                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <h4 className="mb-1 text-base font-semibold text-gray-800 sm:text-lg">{item.title}</h4>
                                    <p className="text-xs text-gray-600 sm:text-sm">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-50 px-4 py-12 text-center sm:py-16 md:py-20">
                <h2 className="text-charcoal mt-4 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                    {(() => {
                        const titleText = siteSettings?.stats_title || 'Across Borders';
                        const { firstPart, lastWord } = formatSimpleTitle(titleText, 'Across Borders');
                        return (
                            <>
                                {firstPart}
                                <span className="text-[var(--primary)]"> {lastWord}</span>
                            </>
                        );
                    })()}
                </h2>

                <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:mb-10 sm:text-lg md:mb-12">
                    {siteSettings?.stats_subtitle || 'Our structures stand in more than 25 countries — from farms in Finland to factories in France'}
                </p>
                <div className="mx-auto grid max-w-6xl gap-6 text-center sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                    {(siteSettings?.stats_items && siteSettings.stats_items.length > 0
                        ? siteSettings.stats_items
                        : [
                              { label: 'Years Experience', value: '20+' },
                              { label: 'Countries Served', value: '25+' },
                              { label: 'Projects Delivered', value: '500+' },
                              { label: 'Max Hall Size', value: '60,000 m²' },
                          ]
                    ).map((stat, idx) => (
                        <div key={idx} className="py-4">
                            <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">{stat.value}</div>
                            <div className="mt-1 text-xs text-gray-600 sm:text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-tr from-slate-100 to-slate-100 px-4 py-12 text-center text-slate-800 sm:py-16">
                <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{t('lets_build_sustainable')}</h2>
                <p className="mx-auto mb-6 max-w-xl text-sm text-slate-800 sm:text-base">{t('lets_build_sustainable_desc')}</p>
                <Button
                    asChild
                    className="w-full rounded-xl border border-orange-500 bg-white px-6 py-3 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white sm:w-auto"
                >
                    <Link href="/contact">{t('get_in_touch')}</Link>
                </Button>
            </section>
        </Layout>
    );
};

export default About;
