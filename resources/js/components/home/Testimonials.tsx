import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
    {
        id: 1,
        quote: 'Resteel helped us find the perfect industrial building for our expanding operations. Their expertise in disassembly and reassembly was invaluable.',
        author: 'Thomas Weber',
        position: 'Operations Director',
        company: 'EuroManufacturing GmbH',
    },
    {
        id: 2,
        quote: "The team's knowledge of cross-border regulations saved us significant time and resources. They managed the entire transport process seamlessly.",
        author: 'Laura Jansen',
        position: 'Logistics Manager',
        company: 'Nordic Industrial Group',
    },
    {
        id: 3,
        quote: "We've worked with Resteel on multiple projects across different countries. Their consistent quality and reliability keeps us coming back.",
        author: 'Markus Voss',
        position: 'Project Lead',
        company: 'Continental Development Ltd.',
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="gradient-bg py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        We've helped businesses across Europe find the perfect second-hand building solutions. Here's what some of our satisfied
                        clients have to say.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="relative">
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={testimonial.id}
                                className={`transform transition-all duration-500 ${
                                    index === activeIndex ? 'translate-y-0 scale-100 opacity-100' : 'absolute top-0 translate-y-4 scale-95 opacity-0'
                                }`}
                            >
                                <CardContent className="p-8 md:p-10">
                                    <Quote className="text-resteel-accent mb-4 h-10 w-10" />
                                    <p className="mb-6 text-lg text-gray-700 italic md:text-xl">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <div className="ml-0">
                                            <p className="text-resteel-primary font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.position}, {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-3 w-3 rounded-full ${index === activeIndex ? 'bg-resteel-primary' : 'bg-gray-300'}`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
