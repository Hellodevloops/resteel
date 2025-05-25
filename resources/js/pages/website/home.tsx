import AboutSection from '@/components/home/About';
import ContactCTA from '@/components/home/ContactCTA';
import FeaturedBuildings from '@/components/home/FeaturedBuildings';
import Hero from '@/components/home/Hero';
import Partners from '@/components/home/Partners';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

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
                <FeaturedBuildings />
                <Services />
                <AboutSection />
                <Testimonials />
                <Partners />
                <ContactCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
