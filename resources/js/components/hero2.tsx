import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* Background Image with overlay effects */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/6300613837098961878.jpg')" }}>
                {/* Radiant Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-600/20 to-slate-900 backdrop-blur-xs" />

                {/* Conic Highlighting */}
                <div className="bg-gradient-conic absolute inset-0 from-blue-900 via-transparent to-orange-500 opacity-20 blur-3xl" />

                {/* Subtle Noise/Grain Layer (Optional aesthetic) */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 pt-16 text-center text-white sm:px-6 sm:pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl text-2xl leading-tight font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] sm:text-3xl md:max-w-6xl md:text-4xl lg:text-5xl"
                >
                    {t('hero2_title')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-lg md:max-w-3xl md:text-xl lg:text-2xl"
                >
                    {t('hero2_subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4"
                >
                    <Link href="/buildings" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full rounded bg-orange-600/80 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-orange-600/90 sm:w-auto"
                        >
                            {t('browse_structures_btn')}
                        </Button>
                    </Link>

                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full rounded border-white/20 bg-white/10 text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:w-auto"
                        >
                            {t('sell_your_property_btn')}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
