
import { ArrowRight, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

const Partners = () => {
  // These would be replaced with actual partner logos in a real implementation
  const partners = [
    { id: 1, name: "Industrial Group A", logo: "/placeholder.svg" },
    { id: 2, name: "Construction Co. B", logo: "/placeholder.svg" },
    { id: 3, name: "Building Solutions C", logo: "/placeholder.svg" },
    { id: 4, name: "Engineering Firm D", logo: "/placeholder.svg" },
    { id: 5, name: "Agricultural Systems E", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-16 bg-white relative">
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-resteel-accent/5 transform rotate-45 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-resteel-primary/5 transform -rotate-12 translate-y-1/4 -translate-x-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 bg-resteel-light border-l-2 border-resteel-accent">
            <span className="text-xs font-bold uppercase tracking-wider text-resteel-primary">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-resteel-primary font-display uppercase tracking-wide">
            Our Partners
          </h2>
          <div className="w-16 h-1 bg-resteel-accent mx-auto mb-6 transform -skew-x-12"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders across Europe to provide 
            comprehensive building solutions for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="flex flex-col items-center justify-center p-6 bg-white border-l-3 border-l-resteel-accent shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-resteel-light w-16 h-16 flex items-center justify-center mb-4">
                <Square className="h-6 w-6 text-resteel-primary" />
              </div>
              <span className="text-resteel-primary font-medium text-center uppercase tracking-wider text-sm">{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/about" 
            className="inline-flex items-center text-resteel-primary hover:text-resteel-accent font-bold uppercase tracking-wider text-sm group relative"
          >
            Learn more about our partnerships 
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-resteel-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;
