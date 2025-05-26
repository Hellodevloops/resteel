
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Resteel';
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-28">
        {/* Hero Banner */}
        <section className="bg-resteel-primary text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/90">
              Last updated: May 21, 2025
            </p>
          </div>
        </section>
        
        {/* Privacy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">1. Introduction</h2>
                <p className="mb-6">
                  At Resteel, we respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when you 
                  visit our website or use our services.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">2. Information We Collect</h2>
                <p className="mb-2">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    <span className="font-medium">Personal Identification Information:</span> 
                    Name, email address, phone number, postal address, and business information when you 
                    contact us or submit an inquiry.
                  </li>
                  <li>
                    <span className="font-medium">Technical Information:</span> 
                    IP address, browser type, device information, and cookies.
                  </li>
                  <li>
                    <span className="font-medium">Usage Information:</span> 
                    How you use our website, services, and the pages you visit.
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">3. How We Use Your Information</h2>
                <p className="mb-2">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>To provide and manage our services</li>
                  <li>To respond to your inquiries and fulfill your requests</li>
                  <li>To send you important information about our services</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">4. Data Security</h2>
                <p className="mb-6">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized or unlawful processing, accidental loss, destruction, or damage. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">5. Data Retention</h2>
                <p className="mb-6">
                  We will retain your personal data only for as long as necessary to fulfill the purposes 
                  for which it was collected, including for the purposes of satisfying any legal, accounting, 
                  or reporting requirements.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">6. Your Rights</h2>
                <p className="mb-2">Under applicable data protection laws, you may have the following rights:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>The right to access your personal data</li>
                  <li>The right to rectification of inaccurate data</li>
                  <li>The right to erasure of your data</li>
                  <li>The right to restrict processing of your data</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">7. Cookies</h2>
                <p className="mb-6">
                  We use cookies to enhance your experience on our website. You can set your browser to refuse 
                  all or some browser cookies, or to alert you when websites set or access cookies. If you disable 
                  or refuse cookies, please note that some parts of this website may become inaccessible or not 
                  function properly.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">8. Third-Party Links</h2>
                <p className="mb-6">
                  Our website may include links to third-party websites. Clicking on those links may allow third 
                  parties to collect or share data about you. We do not control these third-party websites and are 
                  not responsible for their privacy policies.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">9. Changes to this Policy</h2>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with 
                  an updated revision date.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-resteel-primary">10. Contact Us</h2>
                <p className="mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mb-6">
                  Resteel<br />
                  Westerbeemd 2B<br />
                  5705 DN Helmond<br />
                  Netherlands<br />
                  Email: privacy@resteel.com<br />
                  Phone: +31 (0) 123 456 789
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Privacy;
