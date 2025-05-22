import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero-pattern relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-28">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 z-0 h-full w-1/3 bg-gradient-to-l from-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full bg-gradient-to-t from-white/30 to-transparent"></div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div className="animate-fade-in space-y-8">
                        <div className="shadow-soft border-resteel-border mb-4 inline-flex items-center rounded-full border bg-white/80 px-4 py-2 backdrop-blur-sm">
                            <span className="text-resteel-primary text-sm font-medium">Specialists in Industrial Buildings</span>
                        </div>

                        <h1 className="font-serif">
                            <span className="text-resteel-secondary mb-3 block text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Second-Hand
                            </span>
                            <span className="text-resteel-primary mb-3 block text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Industrial Buildings
                            </span>
                            <span className="text-resteel-accent mt-2 block text-2xl md:text-3xl">Expert Solutions for Your Business</span>
                        </h1>

                        <p className="mb-8 max-w-xl text-lg text-gray-700 md:text-xl">
                            With over 20 years of experience, we handle buying, selling, assembling, disassembling, and transporting second-hand
                            buildings across Europe.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Button
                                asChild
                                size="lg"
                                className="bg-luxury-gradient hover:bg-resteel-primary/90 shadow-soft hover:shadow-glow rounded-full px-8 transition-all duration-300"
                            >
                                <Link href="/buildings" className="py-6">
                                    View Buildings
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-resteel-primary text-resteel-primary hover:bg-resteel-primary/5 rounded-full px-8 py-6"
                            >
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="animate-fade-in relative hidden h-[500px] lg:block">
                        <div className="shadow-luxury absolute inset-0 overflow-hidden rounded-2xl border border-white bg-white/70 backdrop-blur-sm">
                            <div className="from-resteel-lightgrey/10 to-resteel-primary/5 absolute inset-0 z-0 bg-gradient-to-br"></div>

                            <div className="absolute top-1/2 left-1/2 flex h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
                                <img
                                    src="/lovable-uploads/c5b71130-a4d0-4f9a-8202-61952b2f0f01.png"
                                    alt="Resteel Logo"
                                    className="animate-float h-auto w-full max-w-md object-contain"
                                />
                            </div>

                            <div className="shadow-luxury absolute -right-4 bottom-8 z-10 w-64 rounded-xl border border-white bg-white p-5">
                                <h3 className="text-resteel-primary mb-2 text-left font-semibold">Trusted By Businesses</h3>
                                <p className="text-left text-sm text-gray-600">
                                    Industrial, commercial and agricultural building solutions across Europe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-16 px-4">
                <div className="glass-card shadow-luxury relative overflow-hidden p-8">
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/50 via-transparent to-white/50"></div>
                    <div className="relative z-10 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                        <div className="hover-lift p-4">
                            <h4 className="text-resteel-primary font-serif text-3xl font-bold md:text-4xl">
                                20<span className="text-resteel-accent">+</span>
                            </h4>
                            <div className="bg-resteel-accent/30 mx-auto my-3 h-0.5 w-12"></div>
                            <p className="font-medium text-gray-600">Years Experience</p>
                        </div>
                        <div className="hover-lift p-4">
                            <h4 className="text-resteel-primary font-serif text-3xl font-bold md:text-4xl">
                                500<span className="text-resteel-accent">+</span>
                            </h4>
                            <div className="bg-resteel-accent/30 mx-auto my-3 h-0.5 w-12"></div>
                            <p className="font-medium text-gray-600">Projects Completed</p>
                        </div>
                        <div className="hover-lift p-4">
                            <h4 className="text-resteel-primary font-serif text-3xl font-bold md:text-4xl">
                                25<span className="text-resteel-accent">+</span>
                            </h4>
                            <div className="bg-resteel-accent/30 mx-auto my-3 h-0.5 w-12"></div>
                            <p className="font-medium text-gray-600">Countries Served</p>
                        </div>
                        <div className="hover-lift p-4">
                            <h4 className="text-resteel-primary font-serif text-3xl font-bold md:text-4xl">
                                60<span className="text-resteel-accent">k</span> m²
                            </h4>
                            <div className="bg-resteel-accent/30 mx-auto my-3 h-0.5 w-12"></div>
                            <p className="font-medium text-gray-600">Largest Project</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
