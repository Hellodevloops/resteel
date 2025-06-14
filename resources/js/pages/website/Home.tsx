import { useEffect } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import FeaturedBuildings from '@/pages/website/FeaturedBuildings';
import Services from '@/pages/website/Services';
import Hero from '@/components/hero';
import FeaturesPreview from '@/components/FeaturesPreview';
import CarouselSection from '@/components/CarouselSection';
import ContactCTA from './Contact';
// import Hero from './Hero';
import NewsletterSection from './NewsletterSection';
import Testimonials from './Testimonials';

const Index = () => {
    // Initialize scroll animations
    useScrollAnimation();

    // Update document title
    useEffect(() => {
        document.title = 'Resteel | Second-Hand Industrial Buildings';
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
                <Hero />
                <FeaturesPreview />
                <CarouselSection />
                <Services />
                <FeaturedBuildings />
                <Testimonials />
                {/* <Career /> */}
                <ContactCTA />
                {/* <NewsLetter /> */}
                <NewsletterSection />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
