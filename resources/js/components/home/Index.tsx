import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedBuildings from "@/components/home/FeaturedBuildings";
import Services from "@/components/home/Services";
import AboutSection from "@/components/home/AboutSection";
import ContactCTA from "@/components/home/ContactCTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  // Update document title
  useEffect(() => {
    document.title = "Resteel | Second-Hand Industrial Buildings";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
