import { Button } from '@/components/ui/button';
import { SiteSettings } from '@/types/site-settings';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HeroProps {
    siteSettings?: SiteSettings;
}

const Hero: React.FC<HeroProps> = ({ siteSettings }) => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* Background Image with overlay effects */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero.jpg')" }}>
                {/* Radiant Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-600/20 to-slate-900 backdrop-blur-xs" />

                {/* Conic Highlighting */}
                <div className="bg-gradient-conic absolute inset-0 from-blue-900 via-transparent to-orange-500 opacity-20 blur-3xl" />

                {/* Subtle Noise/Grain Layer (Optional aesthetic) */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl text-4xl leading-tight font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] md:text-6xl"
                >
                    {siteSettings?.company_name ? (
                        <>
                            {siteSettings.company_name.split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="text-orange-500">{siteSettings.company_name.split(' ').slice(-1)[0]}</span>
                        </>
                    ) : (
                        <>
                            {t('hero2_title').split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="text-orange-500">{t('hero2_title').split(' ').slice(-1)[0]}</span>
                        </>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-xl"
                >
                    {siteSettings?.company_tagline || siteSettings?.company_description || t('hero2_subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 flex flex-col gap-4 sm:flex-row"
                >
                    <Link href="/buildings">
                        <Button size="lg" className="rounded-10 rounded bg-orange-600/80 text-white shadow-lg hover:bg-orange-600/90">
                            {t('browse_structures_btn')}
                        </Button>
                    </Link>

                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="rounded-10 rounded text-slate-800 shadow-md">
                            {t('sell_your_property_btn')}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
