// pages/index.tsx
import CarouselSection from '@/components/CarouselSection';
import FeaturesPreview from '@/components/FeaturesPreview';
import Hero from '@/components/hero2';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import FeaturedBuildings from '@/pages/website/FeaturedBuildings';
import Services from '@/pages/website/Services';
import { useTranslation } from 'react-i18next';
import ContactCTA from './Contact';
import Layout from './Layout';
import NewsletterSection from './NewsletterSection';
import Testimonials from './Testimonials';

const Index = () => {
    const { t } = useTranslation();
    useScrollAnimation();

    return (
        <Layout title={`Resteel | ${t('hero_title')}`}>
            <Hero />
            <FeaturesPreview />
            <CarouselSection />
            <Services />
            <FeaturedBuildings />
            <Testimonials />
            <ContactCTA />
            <NewsletterSection />
        </Layout>
    );
};

export default Index;
