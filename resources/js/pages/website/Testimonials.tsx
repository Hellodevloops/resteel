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
        setTimeout(() => setIsVisible(true), 100);

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
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-12 md:py-20 lg:py-24">
            {/* Simplified Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                        <Star className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
                        Client Success Stories
                    </div>
                    <h2 className="mb-4 text-3xl font-light text-cyan-600 sm:text-4xl lg:text-5xl">
                        What Our
                        <span className="ml-2 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Clients Say</span>
                    </h2>
                    <p className="text-lg font-light text-white/80">Trusted by businesses across Europe for quality building solutions</p>
                </div>

                {/* Testimonial Cards */}
                <div className="relative mx-auto max-w-4xl">
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <Card className="border-0 bg-white/10 shadow-xl backdrop-blur-lg">
                                        <CardContent className="p-8 sm:p-10 lg:p-12">
                                            {/* Quote */}
                                            <div className="mb-8">
                                                <Quote className="mb-6 h-8 w-8 text-orange-500" />
                                                <blockquote className="text-xl leading-relaxed font-light text-white sm:text-2xl">
                                                    "{testimonial.quote}"
                                                </blockquote>
                                            </div>

                                            {/* Rating */}
                                            <div className="mb-6 flex items-center">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="mr-1 h-4 w-4 fill-orange-500 text-orange-500" />
                                                ))}
                                            </div>

                                            {/* Author Section */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div className="mb-4 sm:mb-0">
                                                    <div className="text-lg font-medium text-white">{testimonial.author}</div>
                                                    <div className="text-sm text-white/70">{testimonial.position}</div>
                                                    <div className="text-sm font-medium text-orange-400">{testimonial.company}</div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-sm text-white/60">{testimonial.location}</div>
                                                    <div className="text-sm font-medium text-cyan-400">{testimonial.projectValue}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-center space-x-6">
                        {/* Previous Button */}
                        <button
                            onClick={prevTestimonial}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                        index === activeIndex ? 'w-6 bg-orange-500' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextTestimonial}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Swipe Indicator */}
                <div className="mt-6 text-center sm:hidden">
                    <p className="text-sm text-white/50">Swipe or use arrows to navigate</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
