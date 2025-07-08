// pages/index.tsx
import FeaturesPreview from '@/components/FeaturesPreview';
import Hero from '@/components/hero2';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import FeaturedBuildings from '@/pages/website/FeaturedBuildings';
import Services from '@/pages/website/Services';
import { SiteSettings } from '@/types/site-settings';
import ContactCTA from './Contact';
import Layout from './Layout';
import NewsletterSection from './NewsletterSection';

interface Props {
    siteSettings: SiteSettings;
}

const Index = ({ siteSettings }: Props) => {
    useScrollAnimation();

    return (
        <Layout title={`${siteSettings.company_name} | ${siteSettings.company_tagline}`} siteSettings={siteSettings}>
            <Hero siteSettings={siteSettings} />
            <FeaturedBuildings />
            <FeaturesPreview />
            {/* <CarouselSection /> */}
            <Services />
            {/* <Testimonials /> */}
            <ContactCTA siteSettings={siteSettings} />
            <NewsletterSection />
        </Layout>
    );
};

export default Index;
