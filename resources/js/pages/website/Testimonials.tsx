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
    },
    {
        id: 2,
        quote: "The team's knowledge of cross-border regulations saved us significant time and resources. They managed the entire transport process seamlessly.",
        author: 'Laura Jansen',
        position: 'Logistics Manager',
        company: 'Nordic Industrial Group',
        rating: 5,
    },
    {
        id: 3,
        quote: "We've worked with Resteel on multiple projects across different countries. Their consistent quality and reliability keeps us coming back.",
        author: 'Markus Voss',
        position: 'Project Lead',
        company: 'Continental Development Ltd.',
        rating: 5,
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

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
        <section className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-12">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <div className="relative min-h-[300px]">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                    index === activeIndex
                                        ? 'translate-x-0 opacity-100'
                                        : index < activeIndex
                                          ? '-translate-x-full opacity-0'
                                          : 'translate-x-full opacity-0'
                                }`}
                            >
                                <Card className="border-0 bg-white/10 backdrop-blur-md">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col gap-4">
                                            <Quote className="h-8 w-8 text-orange-500 opacity-70" />
                                            <blockquote className="text-md leading-relaxed text-white">"{testimonial.quote}"</blockquote>

                                            <div className="flex items-center space-x-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                                                ))}
                                            </div>

                                            <div className="mt-2 flex items-center space-x-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                                                    <span className="text-sm font-bold text-white">
                                                        {testimonial.author
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-white">{testimonial.author}</h4>
                                                    <p className="text-xs text-white/70">
                                                        {testimonial.position}, {testimonial.company}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <button
                            onClick={prevTestimonial}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-orange-500' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
