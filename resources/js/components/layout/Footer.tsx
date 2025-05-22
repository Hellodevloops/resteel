
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-resteel-secondary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Resteel</h3>
            <p className="mb-6">Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/resteel" target="_blank" rel="noopener noreferrer" className="hover:text-resteel-accent transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.instagram.com/resteel" target="_blank" rel="noopener noreferrer" className="hover:text-resteel-accent transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-resteel-accent transition-colors">Home</Link></li>
                <li><Link to="/buildings" className="hover:text-resteel-accent transition-colors">Buildings</Link></li>
                <li><Link to="/services" className="hover:text-resteel-accent transition-colors">Services</Link></li>
                <li><Link to="/about" className="hover:text-resteel-accent transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-resteel-accent transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-start gap-2">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>Westerbeemd 2B, 5705 DN Helmond, Netherlands</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={20} />
                <a href="tel:+31123456789" className="hover:text-resteel-accent transition-colors">+31 (0) 123 456 789</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={20} />
                <a href="mailto:info@resteel.com" className="hover:text-resteel-accent transition-colors">info@resteel.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Resteel. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><Link to="/terms" className="hover:text-resteel-accent transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-resteel-accent transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
