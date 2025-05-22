
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 1,
    title: 'Purchase & Sale',
    description: 'We buy and sell second-hand buildings of all types and sizes, from warehouses to commercial premises.',
    icon: '🏢',
    color: 'bg-blue-50 text-resteel-primary border-resteel-primary/20'
  },
  {
    id: 2,
    title: 'Assembly & Disassembly',
    description: 'Our experienced team handles the careful disassembly and reassembly of buildings on your site.',
    icon: '🔨',
    color: 'bg-amber-50 text-resteel-accent border-resteel-accent/20'
  },
  {
    id: 3,
    title: 'Transport',
    description: 'We manage logistics and transportation across Europe and beyond, ensuring safe delivery to your location.',
    icon: '🚚',
    color: 'bg-green-50 text-green-600 border-green-600/20'
  },
  {
    id: 4,
    title: 'Mediation & Guidance',
    description: 'Get expert advice and support throughout the entire process, from selection to installation.',
    icon: '🤝',
    color: 'bg-purple-50 text-purple-600 border-purple-600/20'
  }
];

const Services = () => {
  return (
    <section className="py-20 md:py-28 bg-resteel-light relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1 bg-white rounded-full mb-4 shadow-soft">
            <span className="text-resteel-primary text-sm font-medium">What We Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif text-resteel-secondary">
            Comprehensive <span className="text-resteel-primary">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer end-to-end solutions for buying, selling, and relocating second-hand buildings.
            From disassembly to reassembly, we handle every step of the process with expertise.
          </p>
          
          {/* Decorative Divider */}
          <div className="luxury-divider w-full max-w-xs mx-auto my-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="feature-card hover:translate-y-[-8px] transition-all duration-300 animate-on-scroll border border-gray-100"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`feature-icon ${service.color} border`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-resteel-secondary font-serif">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link 
                to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-resteel-primary hover:text-resteel-accent transition-colors font-medium relative group"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-resteel-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-luxury-gradient hover:bg-resteel-primary/90 rounded-full px-8 py-6 shadow-luxury hover:shadow-glow transition-all duration-300">
            <Link to="/services">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
