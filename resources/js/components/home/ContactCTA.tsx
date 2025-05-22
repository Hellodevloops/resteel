
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-resteel-primary to-resteel-dark relative overflow-hidden text-white">
      {/* Angular Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-0 w-96 h-96 bg-resteel-secondary/30 rotate-12"></div>
        <div className="absolute -left-32 bottom-0 w-96 h-96 bg-resteel-accent/20 -rotate-12"></div>
        
        {/* Angular Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%200h4v4H0V0zm0%2012h4v4H0v-4zm12%200h4v4h-4v-4z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-1 bg-white/10 rounded-sm mb-6 border-l-2 border-resteel-accent uppercase tracking-wide">
              <span className="text-white/90 text-xs font-bold">Expert Consultation</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-display leading-tight">
              Elevate Your Space With <span className="text-resteel-accent">Expert Solutions</span>
            </h2>
            <p className="text-lg mb-10 text-white/80 max-w-xl leading-relaxed">
              Whether you're looking to acquire a second-hand building, sell your existing structure,
              or need guidance on assembly and transport, our specialized team is ready to deliver exceptional service.
            </p>
            <div className="flex flex-wrap gap-5">
              <Button asChild size="lg" variant="secondary" className="bg-white text-resteel-primary hover:bg-white/90 rounded-none px-8 py-6 uppercase tracking-wide font-bold angular-border">
                <Link to="/contact">
                  Request Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white rounded-none px-8 py-6 backdrop-blur-sm uppercase tracking-wide font-bold">
                <a href="tel:+31123456789">Call Our Experts</a>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6 animate-on-scroll">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-sm border-l-4 border-l-resteel-accent hover:border-l-white transition-all duration-500 group transform hover:-translate-y-1 hover:shadow-lg">
              <Mail className="h-10 w-10 text-resteel-accent mb-5" />
              <h3 className="font-bold text-2xl mb-3 font-display uppercase tracking-wider">Email Inquiries</h3>
              <p className="text-white/80 mb-5">For detailed information and personalized quotations</p>
              <a 
                href="mailto:info@resteel.com?subject=Premium Inquiry" 
                className="inline-flex items-center text-white font-medium hover:text-resteel-accent transition-colors relative group"
              >
                info@resteel.com <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-resteel-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-sm border-l-4 border-l-resteel-accent hover:border-l-white transition-all duration-500 group transform hover:-translate-y-1 hover:shadow-lg">
              <Phone className="h-10 w-10 text-resteel-accent mb-5" />
              <h3 className="font-bold text-2xl mb-3 font-display uppercase tracking-wider">Direct Contact</h3>
              <p className="text-white/80 mb-5">Speak with our consultants for immediate assistance</p>
              <a 
                href="tel:+31123456789" 
                className="inline-flex items-center text-white font-medium hover:text-resteel-accent transition-colors relative group"
              >
                +31 (0) 123 456 789 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-resteel-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-sm border-l-4 border-l-resteel-accent hover:border-l-white transition-all duration-500 group transform hover:-translate-y-1 hover:shadow-lg">
              <MapPin className="h-10 w-10 text-resteel-accent mb-5" />
              <h3 className="font-bold text-2xl mb-3 font-display uppercase tracking-wider">Visit Our Office</h3>
              <p className="text-white/80 mb-5">Westerbeemd 2B, 5705 DN Helmond, Netherlands</p>
              <Link 
                to="/contact" 
                className="inline-flex items-center text-white font-medium hover:text-resteel-accent transition-colors relative group"
              >
                View Location <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-resteel-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
