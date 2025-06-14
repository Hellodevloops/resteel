import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      'Resteel coordinated the deconstruction and export of our pre-owned steel warehouse with unmatched precision. They handled permits & customs effortlessly.',
    author: 'Stefan Döring',
    position: 'Site Engineer',
    company: 'RheinBuild GmbH',
    rating: 5,
    projectValue: '€2.1M',
    location: 'Cologne, Germany',
  },
  {
    id: 2,
    quote:
      'Thanks to Resteel, we acquired a 3,000 sqm plant at a fraction of new build costs. Their speed and transparency made them our go-to for repurposed assets.',
    author: 'Anita Kovács',
    position: 'Procurement Lead',
    company: 'Danube Construction Ltd.',
    rating: 5,
    projectValue: '€1.6M',
    location: 'Budapest, Hungary',
  },
  {
    id: 3,
    quote:
      'Cross-border site relocation is tricky, but Resteel nailed every detail. Their team understood local regulations and optimized transport without delays.',
    author: 'Gilles Moreau',
    position: 'Operations Manager',
    company: 'ProStruct Industries',
    rating: 5,
    projectValue: '€3.4M',
    location: 'Lyon, France',
  },
    {
    id: 4,
    quote:
      'Resteel coordinated the deconstruction and export of our pre-owned steel warehouse with unmatched precision. They handled permits & customs effortlessly.',
    author: 'Stefan Döring',
    position: 'Site Engineer',
    company: 'RheinBuild GmbH',
    rating: 5,
    projectValue: '€2.1M',
    location: 'Cologne, Germany',
  },
  {
    id: 5,
    quote:
      'Thanks to Resteel, we acquired a 3,000 sqm plant at a fraction of new build costs. Their speed and transparency made them our go-to for repurposed assets.',
    author: 'Anita Kovács',
    position: 'Procurement Lead',
    company: 'Danube Construction Ltd.',
    rating: 5,
    projectValue: '€1.6M',
    location: 'Budapest, Hungary',
  },
  {
    id: 6,
    quote:
      'Cross-border site relocation is tricky, but Resteel nailed every detail. Their team understood local regulations and optimized transport without delays.',
    author: 'Gilles Moreau',
    position: 'Operations Manager',
    company: 'ProStruct Industries',
    rating: 5,
    projectValue: '€3.4M',
    location: 'Lyon, France',
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-600/10 opacity-20 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
          className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <Star className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
            Real Client Feedback
          </div>
          <h2 className="mb-4 text-4xl font-semibold text-white">
            Voices from the <span className="text-orange-500">Construction Field</span>
          </h2>
          <p className="text-lg font-light text-white/70">
            Trusted partners for industrial asset relocation and reuse.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="border-0 bg-white/5 shadow-xl backdrop-blur-md">
                  <CardContent className="p-8 sm:p-10 lg:p-5">
                    <Quote className="mb-6 h-6 w-6 text-orange-500" />
                    <blockquote className="text-lg font-light leading-relaxed text-white sm:text-xl">
                      “{testimonial.quote}”
                    </blockquote>

                    <div className="mt-6 mb-4 flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="mr-1 h-4 w-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-lg font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-white/70">{testimonial.position}</div>
                        <div className="text-sm font-medium text-orange-300">{testimonial.company}</div>
                      </div>
                      <div className="mt-4 sm:mt-0 text-right">
                        <div className="text-sm text-white/50">{testimonial.location}</div>
                        <div className="text-sm font-semibold text-cyan-400">{testimonial.projectValue}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center space-x-6">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 bg-orange-500' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 text-center sm:hidden">
            <p className="text-sm text-white/50">Swipe or use arrows to navigate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
