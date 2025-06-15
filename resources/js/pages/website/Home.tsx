// pages/index.tsx
import useScrollAnimation from '@/hooks/useScrollAnimation';
import FeaturedBuildings from '@/pages/website/FeaturedBuildings';
import Services from '@/pages/website/Services';
import Hero from '@/components/hero2';
import FeaturesPreview from '@/components/FeaturesPreview';
import CarouselSection from '@/components/CarouselSection';
import ContactCTA from './Contact';
import NewsletterSection from './NewsletterSection';
import Testimonials from './Testimonials';
import Layout from './Layout';

const Index = () => {
    useScrollAnimation();

    return (
        <Layout title="Resteel | Second-Hand Industrial Buildings">
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
