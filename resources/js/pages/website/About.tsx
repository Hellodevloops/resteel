import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Map from '@/components/Map';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Building, Globe, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';

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
                <section className="bg-resteel-primary py-12 text-white md:py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="mb-6 text-3xl font-bold md:text-5xl">About Resteel</h1>
                        <p className="max-w-2xl text-lg text-white/90">
                            Learn about our company history, expertise, and commitment to providing high-quality second-hand industrial building
                            solutions across Europe.
                        </p>
                    </div>
                </section>

                {/* Company Overview */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            <div className="animate-on-scroll">
                                <h2 className="text-resteel-secondary mb-6 text-3xl font-bold">Our Company</h2>
                                <p className="mb-6 text-gray-700">
                                    Based in Helmond, Netherlands, Resteel has been a leading specialist in the trade of second-hand buildings since
                                    our establishment. With over 20 years of experience in the industry, we've built a reputation for quality service
                                    and expertise in industrial and commercial structures.
                                </p>
                                <p className="mb-6 text-gray-700">
                                    We are broadly oriented and not bound by specific branches or national borders. Our operations extend throughout
                                    Europe and beyond, allowing us to serve a diverse range of clients with varying needs and requirements.
                                </p>
                                <p className="text-gray-700">
                                    Our team consists of experienced professionals who understand the complexities of buying, selling, disassembling,
                                    transporting, and reassembling industrial buildings. This expertise allows us to handle projects of all sizes
                                    efficiently and effectively.
                                </p>
                            </div>

                            <div className="animate-on-scroll relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Industrial building"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Facts */}
                <section className="bg-resteel-light py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="text-resteel-secondary mb-4 text-3xl font-bold">Key Facts</h2>
                            <p className="mx-auto max-w-2xl text-gray-600">
                                Resteel has grown to become a trusted name in the second-hand building industry. Here are some key facts about our
                                company:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="animate-on-scroll rounded-lg bg-white p-6 text-center shadow-sm">
                                <div className="bg-resteel-primary/10 text-resteel-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                                    <Building size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">20+ Years</h3>
                                <p className="text-gray-600">Experience in the industry since our establishment</p>
                            </div>

                            <div className="animate-on-scroll rounded-lg bg-white p-6 text-center shadow-sm">
                                <div className="bg-resteel-primary/10 text-resteel-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                                    <Globe size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Europe & Beyond</h3>
                                <p className="text-gray-600">Operations extending across international borders</p>
                            </div>

                            <div className="animate-on-scroll rounded-lg bg-white p-6 text-center shadow-sm">
                                <div className="bg-resteel-primary/10 text-resteel-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                                    <TrendingUp size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">1,000 - 60,000 m²</h3>
                                <p className="text-gray-600">Range of project sizes we handle expertly</p>
                            </div>

                            <div className="animate-on-scroll rounded-lg bg-white p-6 text-center shadow-sm">
                                <div className="bg-resteel-primary/10 text-resteel-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                                    <Users size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Diverse Clientele</h3>
                                <p className="text-gray-600">Serving industrial, commercial, and agricultural sectors</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Approach */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="text-resteel-secondary mb-4 text-3xl font-bold">Our Approach</h2>
                            <p className="mx-auto max-w-2xl text-gray-600">
                                At Resteel, we follow a comprehensive approach to ensure high-quality service and customer satisfaction in every
                                project.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Quality Assessment</h3>
                                <p className="mb-4 text-gray-700">
                                    We carefully evaluate all buildings before purchase, ensuring they meet our strict quality standards. This
                                    thorough assessment allows us to offer only the best structures to our clients.
                                </p>
                            </div>

                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Professional Disassembly</h3>
                                <p className="mb-4 text-gray-700">
                                    Our experienced team handles disassembly with precision, carefully documenting and labeling all components to
                                    ensure smooth reassembly at the new location.
                                </p>
                            </div>

                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Expert Logistics</h3>
                                <p className="mb-4 text-gray-700">
                                    We manage all aspects of transportation, handling permits, documentation, and logistics to ensure your building
                                    components arrive safely at their destination.
                                </p>
                            </div>

                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Skilled Reassembly</h3>
                                <p className="mb-4 text-gray-700">
                                    Our team's expertise in reassembly ensures that your building is reconstructed efficiently and according to
                                    specifications.
                                </p>
                            </div>

                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Comprehensive Support</h3>
                                <p className="mb-4 text-gray-700">
                                    We provide guidance throughout the entire process, offering expert advice on technical, logistical, and regulatory
                                    aspects of your project.
                                </p>
                            </div>

                            <div className="animate-on-scroll">
                                <h3 className="text-resteel-primary mb-3 text-xl font-semibold">Client-Focused Service</h3>
                                <p className="mb-4 text-gray-700">
                                    We prioritize understanding and meeting our clients' specific needs, ensuring satisfaction and building long-term
                                    relationships.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="bg-resteel-light py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            <div className="animate-on-scroll">
                                <h2 className="text-resteel-secondary mb-6 text-3xl font-bold">Our Location</h2>
                                <p className="mb-6 text-gray-700">
                                    Resteel is strategically located in Helmond, Netherlands, at Westerbeemd 2B, 5705 DN. Our central European
                                    location allows us to efficiently serve clients throughout the continent and beyond.
                                </p>
                                <p className="mb-6 text-gray-700">
                                    From our base in the Netherlands, we coordinate all aspects of our operations, from purchasing and selling
                                    buildings to managing transport and logistics across borders.
                                </p>
                                <p className="text-gray-700">
                                    We welcome clients to visit our offices to discuss their needs in person, view documentation of available
                                    buildings, and meet with our expert team.
                                </p>
                            </div>

                            <div className="animate-on-scroll h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
                                <Map location={{ lat: 51.4769, lng: 5.6547 }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-resteel-primary py-16 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-4 text-3xl font-bold">Ready to Work With Us?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                            Contact our team today to discuss your specific requirements and learn how we can assist with your second-hand building
                            project.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="/contact"
                                className="text-resteel-primary rounded-md bg-white px-6 py-3 font-medium transition-colors hover:bg-white/90"
                            >
                                Get In Touch
                            </a>
                            <a
                                href="/buildings"
                                className="rounded-md border border-white bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
                            >
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
