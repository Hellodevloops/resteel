import { Link } from '@inertiajs/react';
import { ArrowRight, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Top shimmer gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 mb-4">
              Resteel Solutions
            </h3>
            <p className="text-slate-300 mb-6 max-w-md">
              Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Twitter size={20} />, href: 'https://twitter.com/resteel', hover: 'hover:text-blue-400' },
                { icon: <Instagram size={20} />, href: 'https://instagram.com/resteel', hover: 'hover:text-pink-400' },
                { icon: <Youtube size={20} />, href: 'https://youtube.com', hover: 'hover:text-red-500' },
              ].map(({ icon, href, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-all duration-300 hover:bg-white/20 ${hover}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Browse Structures', href: '/buildings' },
                // { label: 'Services', href: '/services' },
                { label: 'Contact Us', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center transition-colors hover:text-orange-400"
                  >
                    <span className="transition-transform group-hover:translate-x-1">{label}</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <address className="space-y-4 not-italic text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-slate-400 mt-1" />
                <span>
                  <span className="block md:hidden">Helmond, Netherlands</span>
                  <span className="hidden md:block">Westerbeemd 2B, 5705 DN Helmond, Netherlands</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-slate-400" />
                <a href="tel:+31123456789" className="hover:text-orange-400 transition-colors">
                  +31 (0) 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-slate-400" />
                <a
                  href="mailto:Info@2ndhandholding.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  Info@2ndhandholding.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm space-y-4 md:space-y-0">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Resteel. All rights reserved. Engineering Excellence Since 1985.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom shimmer gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />
    </footer>
  );
};

export default Footer;
