
import { useEffect } from 'react';
import { Users, Building, Globe, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import Map from '@/components/Map';

const About = () => {
  // Initialize scroll animations
  useScrollAnimation();

  // Update document title
  useEffect(() => {
    document.title = 'About Us | Resteel';
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-28">
        {/* Hero Banner */}
        <section className="bg-resteel-primary text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About Resteel</h1>
            <p className="max-w-2xl text-lg text-white/90">
              Learn about our company history, expertise, and commitment to providing
              high-quality second-hand industrial building solutions across Europe.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-6 text-resteel-secondary">Our Company</h2>
                <p className="text-gray-700 mb-6">
                  Based in Helmond, Netherlands, Resteel has been a leading specialist
                  in the trade of second-hand buildings since our establishment. With over 20 years
                  of experience in the industry, we've built a reputation for quality service and
                  expertise in industrial and commercial structures.
                </p>
                <p className="text-gray-700 mb-6">
                  We are broadly oriented and not bound by specific branches or national borders.
                  Our operations extend throughout Europe and beyond, allowing us to serve a diverse
                  range of clients with varying needs and requirements.
                </p>
                <p className="text-gray-700">
                  Our team consists of experienced professionals who understand the complexities
                  of buying, selling, disassembling, transporting, and reassembling industrial
                  buildings. This expertise allows us to handle projects of all sizes efficiently
                  and effectively.
                </p>
              </div>
              
              <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Industrial building" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Facts */}
        <section className="py-16 bg-resteel-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-resteel-secondary">Key Facts</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Resteel has grown to become a trusted name in the second-hand building industry.
                Here are some key facts about our company:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-on-scroll">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-resteel-primary/10 text-resteel-primary mb-4">
                  <Building size={32} />
                </div>
                <h3 className="font-semibold text-xl mb-2">20+ Years</h3>
                <p className="text-gray-600">Experience in the industry since our establishment</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-on-scroll">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-resteel-primary/10 text-resteel-primary mb-4">
                  <Globe size={32} />
                </div>
                <h3 className="font-semibold text-xl mb-2">Europe & Beyond</h3>
                <p className="text-gray-600">Operations extending across international borders</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-on-scroll">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-resteel-primary/10 text-resteel-primary mb-4">
                  <TrendingUp size={32} />
                </div>
                <h3 className="font-semibold text-xl mb-2">1,000 - 60,000 m²</h3>
                <p className="text-gray-600">Range of project sizes we handle expertly</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-on-scroll">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-resteel-primary/10 text-resteel-primary mb-4">
                  <Users size={32} />
                </div>
                <h3 className="font-semibold text-xl mb-2">Diverse Clientele</h3>
                <p className="text-gray-600">Serving industrial, commercial, and agricultural sectors</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-resteel-secondary">Our Approach</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At Resteel, we follow a comprehensive approach to ensure
                high-quality service and customer satisfaction in every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Quality Assessment</h3>
                <p className="text-gray-700 mb-4">
                  We carefully evaluate all buildings before purchase, ensuring they meet our strict
                  quality standards. This thorough assessment allows us to offer only the best structures
                  to our clients.
                </p>
              </div>
              
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Professional Disassembly</h3>
                <p className="text-gray-700 mb-4">
                  Our experienced team handles disassembly with precision, carefully documenting and
                  labeling all components to ensure smooth reassembly at the new location.
                </p>
              </div>
              
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Expert Logistics</h3>
                <p className="text-gray-700 mb-4">
                  We manage all aspects of transportation, handling permits, documentation,
                  and logistics to ensure your building components arrive safely at their destination.
                </p>
              </div>
              
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Skilled Reassembly</h3>
                <p className="text-gray-700 mb-4">
                  Our team's expertise in reassembly ensures that your building is
                  reconstructed efficiently and according to specifications.
                </p>
              </div>
              
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Comprehensive Support</h3>
                <p className="text-gray-700 mb-4">
                  We provide guidance throughout the entire process, offering expert advice on technical,
                  logistical, and regulatory aspects of your project.
                </p>
              </div>
              
              <div className="animate-on-scroll">
                <h3 className="font-semibold text-xl mb-3 text-resteel-primary">Client-Focused Service</h3>
                <p className="text-gray-700 mb-4">
                  We prioritize understanding and meeting our clients' specific needs,
                  ensuring satisfaction and building long-term relationships.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Location */}
        <section className="py-16 bg-resteel-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-6 text-resteel-secondary">Our Location</h2>
                <p className="text-gray-700 mb-6">
                  Resteel is strategically located in Helmond, Netherlands,
                  at Westerbeemd 2B, 5705 DN. Our central European location allows us
                  to efficiently serve clients throughout the continent and beyond.
                </p>
                <p className="text-gray-700 mb-6">
                  From our base in the Netherlands, we coordinate all aspects of our operations,
                  from purchasing and selling buildings to managing transport and logistics across borders.
                </p>
                <p className="text-gray-700">
                  We welcome clients to visit our offices to discuss their needs in person,
                  view documentation of available buildings, and meet with our expert team.
                </p>
              </div>
              
              <div className="h-80 md:h-96 rounded-lg overflow-hidden shadow-lg animate-on-scroll">
                <Map location={{ lat: 51.4769, lng: 5.6547 }} />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-resteel-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8">
              Contact our team today to discuss your specific requirements and learn
              how we can assist with your second-hand building project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="bg-white text-resteel-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors">
                Get In Touch
              </a>
              <a href="/buildings" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                View Available Buildings
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
