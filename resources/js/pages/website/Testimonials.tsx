import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
    {
        id: 1,
        quote: 'Resteel helped us find the perfect industrial building for our expanding operations. Their expertise in disassembly and reassembly was invaluable.',
        author: 'Thomas Weber',
        position: 'Operations Director',
        company: 'EuroManufacturing GmbH',
        rating: 5,
        projectValue: '€2.3M',
        location: 'Munich, Germany',
    },
    {
        id: 2,
        quote: "The team's knowledge of cross-border regulations saved us significant time and resources. They managed the entire transport process seamlessly.",
        author: 'Laura Jansen',
        position: 'Logistics Manager',
        company: 'Nordic Industrial Group',
        rating: 5,
        projectValue: '€1.8M',
        location: 'Stockholm, Sweden',
    },
    {
        id: 3,
        quote: "We've worked with Resteel on multiple projects across different countries. Their consistent quality and reliability keeps us coming back.",
        author: 'Markus Voss',
        position: 'Project Lead',
        company: 'Continental Development Ltd.',
        rating: 5,
        projectValue: '€3.1M',
        location: 'Amsterdam, Netherlands',
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations on mount
        setTimeout(() => setIsVisible(true), 100);

        // Auto-rotate testimonials
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-16 md:py-16">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-600/10"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.08) 0%, transparent 50%)`,
                    }}
                ></div>
            </div>

            {/* Floating Elements */}
            <div
                className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-full bg-orange-500/20"
                style={{ animationDuration: '8s', animationDelay: '0s' }}
            ></div>
            <div
                className="absolute top-40 right-20 h-12 w-12 animate-bounce rounded-full bg-blue-600/20"
                style={{ animationDuration: '8s', animationDelay: '-3s' }}
            ></div>
            <div
                className="absolute bottom-40 left-20 h-20 w-20 animate-bounce rounded-full bg-orange-500/15"
                style={{ animationDuration: '8s', animationDelay: '-6s' }}
            ></div>

            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div
                    className={`mb-16 text-center transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm">
                        <Star className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
                        Client Success Stories
                    </div>
                    <h2 className="mb-6 text-4xl font-bold text-cyan-600 md:text-6xl">
                        What Our
                        <span className="ms-4 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Clients Say</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-white/80">
                        We've helped businesses across Europe find the perfect second-hand building solutions. Here's what some of our satisfied
                        clients have to say about their experience.
                    </p>
                </div>

                {/* Main Testimonial Display */}
                <div className="mx-auto max-w-5xl">
                    <div className="relative min-h-[400px]">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                    index === activeIndex
                                        ? 'translate-x-0 scale-100 opacity-100'
                                        : index < activeIndex
                                          ? '-translate-x-full scale-95 opacity-0'
                                          : 'translate-x-full scale-95 opacity-0'
                                }`}
                            >
                                <Card className="border-0 bg-white/10 shadow-2xl backdrop-blur-xl">
                                    <CardContent className="p-8 md:p-12">
                                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                            {/* Quote Section */}
                                            <div className="lg:col-span-2">
                                                <Quote className="mb-6 h-12 w-12 text-orange-500" />
                                                <blockquote className="mb-8 text-2xl leading-relaxed font-medium text-white md:text-3xl">
                                                    "{testimonial.quote}"
                                                </blockquote>

                                                {/* Rating */}
                                                <div className="mb-6 flex items-center space-x-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                                                    ))}
                                                </div>

                                                {/* Author Info */}
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                                                        <span className="text-2xl font-bold text-white">
                                                            {testimonial.author
                                                                .split(' ')
                                                                .map((n) => n[0])
                                                                .join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-semibold text-white">{testimonial.author}</h4>
                                                        <p className="text-white/70">{testimonial.position}</p>
                                                        <p className="font-semibold text-orange-400">{testimonial.company}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Project Details */}
                                            <div className="space-y-6">
                                                <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
                                                    <h5 className="mb-4 text-lg font-semibold text-white">Project Details</h5>
                                                    <div className="space-y-3">
                                                        {/* <div className="flex items-center justify-between">
                                                            <span className="text-white/70">Project Value</span>
                                                            <span className="font-semibold text-orange-400">{testimonial.projectValue}</span>
                                                        </div> */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white/70">Location</span>
                                                            <span className="font-semibold text-white">{testimonial.location}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white/70">Rating</span>
                                                            <div className="flex items-center space-x-1">
                                                                <span className="font-semibold text-white">{testimonial.rating}.0</span>
                                                                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-6 backdrop-blur-sm">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-white">100%</div>
                                                        <div className="text-sm text-white/80">Project Success Rate</div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls */}
                    <div className="mt-12 flex items-center justify-center space-x-8">
                        {/* Previous Button */}
                        <button
                            onClick={prevTestimonial}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex space-x-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                        index === activeIndex ? 'w-8 bg-orange-500' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`View testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextTestimonial}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div
                    className={`mt-30 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {[
                            { number: '500+', label: 'Happy Clients', icon: '👥' },
                            { number: '38', label: 'Years Experience', icon: '🏗️' },
                            { number: '99%', label: 'Success Rate', icon: '⭐' },
                            { number: '€50M+', label: 'Projects Value', icon: '💰' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-2 text-4xl">{stat.icon}</div>
                                <div className="mb-1 text-3xl font-bold text-orange-500">{stat.number}</div>
                                <div className="text-sm text-white/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
