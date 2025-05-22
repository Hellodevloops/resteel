
import { Link } from 'react-router-dom';
import { Check, ArrowRight, MapPin, Globe2, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const advantages = [
    'Over 20 years of industry experience',
    'Projects from 1,000 m² to 60,000 m²',
    'Operations across Europe and beyond',
    'Complete service from purchase to assembly',
    'Expertise in industrial and agricultural sectors'
  ];

  const statCards = [
    {
      title: 'Worldwide Operations',
      description: 'Serving clients in over 25 European countries and beyond',
      icon: Globe2,
      color: 'bg-blue-50'
    },
    {
      title: 'Expert Team',
      description: 'Skilled professionals with decades of industry experience',
      icon: Users,
      color: 'bg-green-50'
    },
    {
      title: 'Project Scale',
      description: 'From small 1,000m² buildings to massive 60,000m² complexes',
      icon: BarChart3,
      color: 'bg-amber-50'
    },
    {
      title: 'Local Knowledge',
      description: 'Based in Helmond, Netherlands with Europe-wide expertise',
      icon: MapPin,
      color: 'bg-red-50'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-on-scroll">
            <div className="inline-flex items-center px-4 py-1 bg-resteel-light rounded-full mb-4">
              <span className="text-resteel-primary text-sm font-medium">Who We Are</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-resteel-secondary">About 2nd Hand Trading BV</h2>
            <p className="text-gray-700 mb-6">
              Based in Helmond, Netherlands, 2nd Hand Trading BV specializes in buying and selling 
              second-hand buildings and construction materials. With over two decades of experience, 
              we've established ourselves as experts in the field of demountable industrial buildings.
            </p>
            <p className="text-gray-700 mb-8">
              We're broadly oriented and not bound by specific branches or national borders. 
              Our services extend to purchasing, selling, assembling, disassembling, and 
              transporting second-hand buildings, as well as machines, forklifts, and construction materials.
            </p>
            
            <ul className="space-y-3 mb-8">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start">
                  <div className="p-1 bg-resteel-light rounded-full mr-2 mt-0.5">
                    <Check className="h-4 w-4 text-resteel-primary" />
                  </div>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="bg-resteel-primary hover:bg-resteel-primary/80 rounded-full px-6 shadow-md">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="relative order-1 lg:order-2 animate-on-scroll">
            <div className="grid grid-cols-2 gap-4">
              {statCards.map((card, index) => (
                <div 
                  key={index} 
                  className={`${card.color} p-6 rounded-xl shadow-sm ${
                    index % 2 === 0 ? 'transform translate-y-4' : ''
                  }`}
                >
                  <card.icon className="h-8 w-8 text-resteel-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
            
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-resteel-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 -top-10 -left-10 w-48 h-48 bg-resteel-accent/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
