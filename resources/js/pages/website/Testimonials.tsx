'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const testimonials = [
    {
        quote: 'Resteel made our entire site relocation process seamless...',
        author: 'Stefan Döring',
        position: 'RheinBuild GmbH',
    },
    {
        quote: 'We saved over 40% on our structural build...',
        author: 'Anita Kovács',
        position: 'Danube Construction',
    },
    {
        quote: 'International coordination is always a challenge...',
        author: 'Gilles Moreau',
        position: 'ProStruct Industries',
    },
    {
        quote: 'Resteel proved to be a reliable partner...',
        author: 'Jakub Nowak',
        position: 'AgroFab Polska',
    },
    {
        quote: 'When we urgently needed a large-scale steel hall...',
        author: 'Luca Bianchi',
        position: 'Infrastrutture SRL',
    },
];

const TestimonialsCarousel = () => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 360;

    const scrollNext = () => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
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
        if (!isHovered) {
            intervalRef.current = setInterval(scrollNext, 5000);
        }
        return () => clearInterval(intervalRef.current!);
    }, [isHovered]);

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
                    <div ref={containerRef} className="no-scrollbar flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-6">
                        {[...testimonials, ...testimonials].map((t, idx) => (
                            <Card
                                key={idx}
                                className="w-[85vw] max-w-[350px] flex-shrink-0 border border-gray-200 shadow-sm sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
                            >
                                <CardContent className="flex h-full flex-col justify-between p-6">
                                    <p className="text-base leading-relaxed text-[#3C3F48]">"{t.quote}"</p>
                                    <div className="mt-4 font-semibold text-[#0076A8]">{t.author}</div>
                                    <div className="text-sm text-gray-500">{t.position}</div>
                                    <div className="mt-2 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#FF6600] text-[#FF6600]" />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute right-4 flex gap-2">
                        <Button variant="ghost" size="icon" onClick={scrollPrev} className="h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={scrollNext} className="h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100">
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
