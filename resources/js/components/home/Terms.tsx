import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';

const Terms = () => {
    useEffect(() => {
        document.title = 'Terms of Service | Resteel';
    }, []);

    return (
        <>
            <Header />

            <main className="pt-28">
                {/* Hero Banner */}
                <section className="bg-resteel-primary py-12 text-white md:py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="mb-4 text-3xl font-bold md:text-5xl">Terms of Service</h1>
                        <p className="text-lg text-white/90">Last updated: May 21, 2025</p>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">1. Introduction</h2>
                                <p className="mb-6">
                                    Welcome to Resteel. These Terms of Service govern your use of our website and the services we provide. By
                                    accessing or using our website, you agree to be bound by these Terms.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">2. Definitions</h2>
                                <p className="mb-2">The following definitions apply to these Terms:</p>
                                <ul className="mb-6 list-disc pl-6">
                                    <li>"Company," "We," "Us," and "Our" refer to Resteel.</li>
                                    <li>"Website" refers to resteel.com and all its subdomains.</li>
                                    <li>
                                        "Services" refers to the second-hand building trading, disassembly, transport, and assembly services we
                                        provide.
                                    </li>
                                    <li>"User," "You," and "Your" refer to individuals or entities accessing or using our website or services.</li>
                                </ul>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">3. Use of Services</h2>
                                <p className="mb-6">
                                    Our services are designed to facilitate the buying, selling, disassembly, transport, and assembly of second-hand
                                    buildings and related materials. By using our services, you confirm that you understand the nature of these
                                    services and the applicable legal requirements in your jurisdiction.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">4. Inquiries and Communication</h2>
                                <p className="mb-6">
                                    When you submit inquiries through our website, you agree to provide accurate and complete information. We may use
                                    this information to contact you regarding our services. You can opt out of communications from us at any time by
                                    contacting us directly.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">5. Intellectual Property</h2>
                                <p className="mb-6">
                                    All content on this website, including text, graphics, logos, and images, is the property of Resteel and is
                                    protected by intellectual property laws. You may not reproduce, distribute, or use our content without our express
                                    permission.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">6. Limitation of Liability</h2>
                                <p className="mb-6">
                                    To the extent permitted by law, Resteel shall not be liable for any indirect, incidental, special, consequential,
                                    or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of
                                    data, use, goodwill, or other intangible losses resulting from your use of our website or services.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">7. Governing Law</h2>
                                <p className="mb-6">
                                    These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to
                                    its conflict of law provisions. Any disputes relating to these Terms shall be subject to the exclusive
                                    jurisdiction of the courts of the Netherlands.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">8. Changes to Terms</h2>
                                <p className="mb-6">
                                    We reserve the right to modify these Terms at any time. When we make changes, we will revise the "Last updated"
                                    date at the top of these Terms. We encourage you to review these Terms periodically to stay informed of any
                                    updates.
                                </p>

                                <h2 className="text-resteel-primary mb-4 text-2xl font-bold">9. Contact Us</h2>
                                <p className="mb-6">If you have any questions about these Terms, please contact us at:</p>
                                <p className="mb-6">
                                    Resteel
                                    <br />
                                    Westerbeemd 2B
                                    <br />
                                    5705 DN Helmond
                                    <br />
                                    Netherlands
                                    <br />
                                    Email: info@resteel-solutions.com
                                    <br />
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

export default Terms;
