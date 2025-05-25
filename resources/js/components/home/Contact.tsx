import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Map from '@/components/Map';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Contact = () => {
  useScrollAnimation();
  const location = useLocation();
  const { toast } = useToast();
  const [formType, setFormType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    buildingType: '',
    buildingSize: '',
    location: ''
  });

  // Check if URL has a type parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    if (type === 'sell') {
      setFormType('sell');
    } else if (type === 'buy') {
      setFormType('buy');
    }
  }, [location]);

  // Update document title
  useEffect(() => {
    document.title = 'Contact Us | Resteel';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thanks for contacting us. We'll respond to your inquiry soon.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      buildingType: '',
      buildingSize: '',
      location: ''
    });
  };

  return (
    <>
      <Header />
      
      <main className="pt-28">
        {/* Hero Banner */}
        <section className="bg-luxury-gradient text-white py-16 md:py-24 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22 fill-rule=%22evenodd%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%223%22/%3E%3Ccircle cx=%2213%22 cy=%2213%22 r=%223%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-resteel-accent rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">Contact <span className="text-resteel-accent">Us</span></h1>
              <p className="max-w-2xl text-lg text-white/90">
                Have questions or ready to discuss your building requirements?
                Get in touch with our team for personalized assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 md:py-24 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-luxury overflow-hidden animate-on-scroll">
                  <div className="h-2 bg-luxury-gradient w-full"></div>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-resteel-primary font-serif">Contact Information</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="rounded-full bg-resteel-light p-3 mr-4">
                          <MapPin className="h-6 w-6 text-resteel-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-resteel-secondary">Address</h3>
                          <address className="not-italic text-gray-600">
                            Westerbeemd 2B<br />
                            5705 DN Helmond<br />
                            Netherlands
                          </address>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="rounded-full bg-resteel-light p-3 mr-4">
                          <Phone className="h-6 w-6 text-resteel-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-resteel-secondary">Phone</h3>
                          <p className="text-gray-600">
                            <a href="tel:+31123456789" className="hover:text-resteel-accent transition-colors">
                              +31 (0) 123 456 789
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="rounded-full bg-resteel-light p-3 mr-4">
                          <Mail className="h-6 w-6 text-resteel-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-resteel-secondary">Email</h3>
                          <p className="text-gray-600">
                            <a href="mailto:info@resteel.com" className="hover:text-resteel-accent transition-colors">
                              info@resteel.com
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="rounded-full bg-resteel-light p-3 mr-4">
                          <Clock className="h-6 w-6 text-resteel-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-resteel-secondary">Business Hours</h3>
                          <p className="text-gray-600">
                            Monday - Friday: 9:00 AM - 5:00 PM<br />
                            Saturday - Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-gray-100">
                      <h3 className="font-semibold text-lg mb-4 text-resteel-secondary">Connect With Us</h3>
                      <div className="flex space-x-4">
                        <a href="https://twitter.com/resteel" target="_blank" rel="noopener noreferrer" 
                           className="w-10 h-10 rounded-full bg-resteel-light flex items-center justify-center text-resteel-primary hover:bg-resteel-primary hover:text-white transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="https://www.instagram.com/resteel" target="_blank" rel="noopener noreferrer" 
                           className="w-10 h-10 rounded-full bg-resteel-light flex items-center justify-center text-resteel-primary hover:bg-resteel-primary hover:text-white transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/resteel" target="_blank" rel="noopener noreferrer" 
                           className="w-10 h-10 rounded-full bg-resteel-light flex items-center justify-center text-resteel-primary hover:bg-resteel-primary hover:text-white transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-luxury border-0 overflow-hidden animate-on-scroll">
                  <div className="h-2 bg-accent-gradient w-full"></div>
                  <CardContent className="p-8">
                    <div className="flex mb-8 border-b border-gray-200">
                      <button 
                        className={`py-4 px-6 font-medium ${formType === 'general' ? 'text-resteel-primary border-b-2 border-resteel-accent' : 'text-gray-500 hover:text-resteel-primary'}`}
                        onClick={() => setFormType('general')}
                      >
                        General Inquiry
                      </button>
                      <button 
                        className={`py-4 px-6 font-medium ${formType === 'buy' ? 'text-resteel-primary border-b-2 border-resteel-accent' : 'text-gray-500 hover:text-resteel-primary'}`}
                        onClick={() => setFormType('buy')}
                      >
                        Buy a Building
                      </button>
                      <button 
                        className={`py-4 px-6 font-medium ${formType === 'sell' ? 'text-resteel-primary border-b-2 border-resteel-accent' : 'text-gray-500 hover:text-resteel-primary'}`}
                        onClick={() => setFormType('sell')}
                      >
                        Sell a Building
                      </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="luxury-input"
                            placeholder="Your name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="luxury-input"
                            placeholder="Your email address"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="luxury-input"
                            placeholder="Your phone number"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="luxury-input"
                            placeholder="What's this about?"
                          />
                        </div>
                      </div>
                      
                      {/* Conditional fields based on form type */}
                      {(formType === 'buy' || formType === 'sell') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label htmlFor="buildingType" className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
                            <select
                              id="buildingType"
                              name="buildingType"
                              value={formData.buildingType}
                              onChange={handleChange}
                              className="luxury-input"
                            >
                              <option value="">Select a building type</option>
                              <option value="warehouse">Warehouse</option>
                              <option value="hall">Hall</option>
                              <option value="commercial">Commercial Building</option>
                              <option value="agricultural">Agricultural Building</option>
                              <option value="steel">Steel Structure</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="buildingSize" className="block text-sm font-medium text-gray-700 mb-2">Building Size (m²)</label>
                            <input
                              type="text"
                              id="buildingSize"
                              name="buildingSize"
                              value={formData.buildingSize}
                              onChange={handleChange}
                              className="luxury-input"
                              placeholder="e.g. 1000"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                              {formType === 'buy' ? 'Delivery Location' : 'Building Location'}
                            </label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              className="luxury-input"
                              placeholder="Country, city, etc."
                            />
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="luxury-input"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-luxury-gradient hover:bg-resteel-primary/90 rounded-md px-8 py-6 shadow-soft hover:shadow-glow transition-all duration-300">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 md:py-16 bg-resteel-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-resteel-secondary">Our <span className="text-resteel-primary">Location</span></h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Visit our headquarters in the Netherlands. We're conveniently located and ready to welcome you.
              </p>
            </div>
            <div className="h-80 md:h-96 rounded-lg overflow-hidden shadow-luxury border border-gray-100 animate-on-scroll">
              <Map location={{ lat: 51.4769, lng: 5.6547 }} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
