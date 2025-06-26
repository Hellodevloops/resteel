import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, Lightbulb, ShieldCheck, Users2, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const About = () => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('about_us')} | Resteel`}>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 px-4 pt-35 pb-20 text-center text-white">
                <h1 className="mb-4 text-4xl leading-tight font-bold md:text-6xl">{t('about_hero_title')}</h1>
                <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">{t('about_hero_subtitle')}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button variant="outline" asChild className="text-text-orange-500 rounded-xl border-white px-6 py-4 hover:text-orange-600">
                        <Link href="/shop" className="text-orange-500">
                            {t('browse_structures')}
                        </Link>
                    </Button>
                    <Button asChild className="rounded-xl bg-orange-500 px-6 py-4 text-white hover:bg-orange-600">
                        <Link href="/contact">
                            {t('lets_work_together')} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Company Story */}
            <section className="bg-white px-4 py-20 text-center">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-charcoal mt-4 mb-4 text-4xl font-bold md:text-5xl">
                        {t('who_we_are').split(' ')[0]}
                        <span className="text-[var(--primary)]"> {t('who_we_are').split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="mb-6 text-lg text-gray-600">{t('who_we_are_description')}</p>
                    <div className="text-sm text-gray-400 italic">{t('founded_info')}</div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-slate-50 px-4 py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-charcoal mt-4 mb-4 text-4xl font-bold md:text-5xl">
                        {t('our_mission').split(' ')[0]}
                        <span className="text-[var(--primary)]"> {t('our_mission').split(' ').slice(1).join(' ')}</span>
                    </h2>

                    <p className="mb-12 text-lg text-gray-600">{t('mission_description')}</p>
                    <div className="grid gap-6 text-left sm:grid-cols-3">
                        {[
                            { icon: CheckCircle2, title: t('integrity'), desc: t('integrity_desc') },
                            { icon: BriefcaseBusiness, title: t('expertise'), desc: t('expertise_desc') },
                            { icon: Lightbulb, title: t('innovation'), desc: t('innovation_desc') },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-4">
                                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                                    <p className="text-sm text-gray-600">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="bg-white px-4 py-20">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="text-charcoal mt-4 mb-4 text-4xl font-bold md:text-5xl">
                        {t('what_we_offer').split(' ')[0]} {t('what_we_offer').split(' ')[1]}
                        <span className="text-[var(--primary)]"> {t('what_we_offer').split(' ').slice(2).join(' ')}</span>
                    </h2>
                    <p className="mb-12 text-lg text-gray-600">{t('what_we_offer_description')}</p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Building2, title: t('steel_halls'), desc: t('steel_halls_desc') },
                            { icon: Wrench, title: t('assembly_services'), desc: t('assembly_services_desc') },
                            { icon: Users2, title: t('project_guidance'), desc: t('project_guidance_desc') },
                            { icon: ShieldCheck, title: t('certified_steel'), desc: t('certified_steel_desc') },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="rounded-xl bg-slate-50 p-6 shadow transition hover:shadow-md">
                                <div className="mb-4 inline-block rounded-lg bg-white p-3 text-slate-700">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h4 className="mb-1 text-lg font-semibold text-gray-800">{title}</h4>
                                <p className="text-sm text-gray-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Footprint */}
            {/* <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Across Borders</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our structures stand in more than 25 countries — from farms in Finland to factories in France. No project is too far or too complex.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-orange-600 font-bold text-xl">
            <div>🇳🇱 Netherlands</div>
            <div>🇩🇪 Germany</div>
            <div>🇫🇷 France</div>
            <div>🇳🇴 Norway</div>
          </div>
        </div>
      </section> */}

            {/* Sustainability Stats */}
            {/* <section className="py-20 bg-slate-900 text-white px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Environmental Impact</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { value: '12,000+ tons', label: 'Steel Reused' },
              { value: '9,500 tons', label: 'CO₂ Prevented' },
              { value: '120+ ha', label: 'Land Reclaimed' }
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-orange-400">{value}</div>
                <div className="text-sm text-slate-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

            {/* Stats Section */}
            <section className="bg-slate-50 px-4 py-20 text-center">
                <h2 className="text-charcoal mt-4 mb-4 text-4xl font-bold md:text-5xl">
                    {t('across_borders').split(' ')[0]}
                    <span className="text-[var(--primary)]"> {t('across_borders').split(' ').slice(1).join(' ')}</span>
                </h2>

                <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">{t('across_borders_description')}</p>
                <div className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: t('years_experience'), value: '20+' },
                        { label: t('countries_served'), value: '25+' },
                        { label: t('projects_delivered'), value: '500+' },
                        { label: t('max_hall_size'), value: '60,000 m²' },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <div className="text-4xl font-bold text-[var(--primary)]">{value}</div>
                            <div className="mt-1 text-sm text-gray-600">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-tr from-slate-100 to-slate-100 px-4 py-16 text-center text-slate-800">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('lets_build_sustainable')}</h2>
                <p className="mx-auto mb-6 max-w-xl text-slate-800">{t('lets_build_sustainable_desc')}</p>
                <Button
                    asChild
                    className="rounded-xl border border-orange-500 bg-white px-6 py-3 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                    <Link href="/contact">{t('get_in_touch')}</Link>
                </Button>
            </section>
        </Layout>
    );
};

export default About;
