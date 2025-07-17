'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
    quote: string;
    author: string;
    position?: string | null;
    company?: string | null;
    rating?: number;
}

const TestimonialsCarousel = () => {
    const { t } = useTranslation();
    const { testimonials: dynamicTestimonials } = usePage().props as unknown as { testimonials: Testimonial[] };

    // Use dynamic testimonials from database, or fall back to defaults
    const testimonials =
        dynamicTestimonials?.length > 0
            ? dynamicTestimonials
            : [
                  {
                      quote: 'Resteel made our entire site relocation process seamless...',
                      author: 'Stefan Döring',
                      position: null,
                      company: 'RheinBuild GmbH',
                      rating: 5,
                  },
                  {
                      quote: 'We saved over 40% on our structural build...',
                      author: 'Anita Kovács',
                      position: null,
                      company: 'Danube Construction',
                      rating: 5,
                  },
                  {
                      quote: 'International coordination is always a challenge...',
                      author: 'Gilles Moreau',
                      position: null,
                      company: 'ProStruct Industries',
                      rating: 5,
                  },
                  {
                      quote: 'Resteel proved to be a reliable partner...',
                      author: 'Jakub Nowak',
                      position: null,
                      company: 'AgroFab Polska',
                      rating: 5,
                  },
                  {
                      quote: 'When we urgently needed a large-scale steel hall...',
                      author: 'Luca Bianchi',
                      position: null,
                      company: 'Infrastrutture SRL',
                      rating: 5,
                  },
              ];
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Determine if we should duplicate testimonials for infinite scroll
    const shouldDuplicate = testimonials.length >= 4;

    // Create display array - only duplicate if we have enough testimonials
    const displayTestimonials = shouldDuplicate ? [...testimonials, ...testimonials] : testimonials;

    const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 360;

    const scrollNext = () => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        // Only do infinite scroll if we have duplicated testimonials
        if (shouldDuplicate && container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
            setTimeout(() => {
                container.scrollTo({ left: 0, behavior: 'auto' });
            }, 600);
        }
    };

    const scrollPrev = () => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        // Only auto-scroll if we have enough testimonials
        if (!isHovered && shouldDuplicate) {
            intervalRef.current = setInterval(scrollNext, 5000);
        }
        return () => clearInterval(intervalRef.current!);
    }, [isHovered, shouldDuplicate]);

    // Don't render the section if there are no testimonials
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="bg-slate-100 py-12">
            {/* Inline Scrollbar Hide Styles */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
            <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-10 px-4 text-center">
                    <h2 className="text-4xl font-bold text-[#3C3F48] md:text-5xl">
                        {t('what_our_clients_say').split(' ').slice(0, -1).join(' ')}{' '}
                        <span className="text-[#0076A8]">{t('what_our_clients_say').split(' ').slice(-1)[0]}</span>
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">{t('real_results_subtitle')}</p>
                </div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Carousel Track */}
                    <div
                        ref={containerRef}
                        className={`no-scrollbar flex gap-6 overflow-y-hidden scroll-smooth pb-6 ${
                            testimonials.length <= 3 ? 'justify-center overflow-x-visible' : 'overflow-x-auto'
                        }`}
                    >
                        {displayTestimonials.map((t, idx) => (
                            <Card
                                key={shouldDuplicate ? `${t.author}-${idx}` : `${t.author}-${t.company || t.position || idx}`}
                                className="w-[85vw] max-w-[350px] flex-shrink-0 border border-gray-200 shadow-sm sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
                            >
                                <CardContent className="flex h-full flex-col justify-between p-6">
                                    <p className="text-base leading-relaxed text-[#3C3F48]">"{t.quote}"</p>
                                    <div className="mt-4 font-semibold text-[#0076A8]">{t.author}</div>
                                    {(t.position || t.company) && (
                                        <div className="text-sm text-gray-500">
                                            {t.position && t.company ? `${t.position} at ${t.company}` : t.company || t.position}
                                        </div>
                                    )}
                                    {t.rating && (
                                        <div className="mt-2 flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < (t.rating || 0) ? 'fill-[#FF6600] text-[#FF6600]' : 'fill-gray-300 text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Navigation Buttons - Only show if we have enough testimonials to scroll */}
                    {testimonials.length > 2 && (
                        <div className="absolute right-4 flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={scrollPrev}
                                className="h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={scrollNext}
                                className="h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
