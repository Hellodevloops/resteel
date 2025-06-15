'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const steelBlue = "#0076A8";
// const charcoal = "#3C3F48";
// const vibrantOrange = "#FF6600";

const testimonials = [
  {
    quote: "Resteel made our entire site relocation process seamless. From disassembly to customs clearance and reassembly abroad, their technical and logistical precision was unmatched.",
    author: "Stefan Döring",
    position: "RheinBuild GmbH",
  },
  {
    quote: "We saved over 40% on our structural build by opting for repurposed steel through Resteel. Their team was transparent, timely, and incredibly well-organized throughout the transaction.",
    author: "Anita Kovács",
    position: "Danube Construction",
  },
  {
    quote: "International coordination is always a challenge, but Resteel handled every moving piece — permits, transport, and compliance — with speed and accuracy. Highly recommended for any cross-border project.",
    author: "Gilles Moreau",
    position: "ProStruct Industries",
  },
  {
    quote: "Resteel proved to be a reliable partner for second-hand infrastructure. They ensured we met all national safety standards while significantly reducing our steel procurement timeline.",
    author: "Jakub Nowak",
    position: "AgroFab Polska",
  },
  {
    quote: "When we urgently needed a large-scale steel hall for expansion, Resteel sourced, inspected, and delivered it within 10 days. Their access to stock and technical insight are unparalleled.",
    author: "Luca Bianchi",
    position: "Infrastrutture SRL",
  },
];

const MarqueeTestimonials = () => {
  return (
    <section className="bg-slate-100 py-12 overflow-hidden relative">
      <div className="text-center mb-10">
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#3C3F48]">
          What Our Clients <span style={{ color: steelBlue }}>Say</span>
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Real results from real businesses across Europe and beyond
        </p>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-row {
            display: flex;
            white-space: nowrap;
            flex-wrap: nowrap;
          }
          .marquee-animate {
            animation: marquee 50s linear infinite;
          }
          .pause-on-hover:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="overflow-hidden">
        <div className="marquee-row marquee-animate pause-on-hover">
          {[...testimonials, ...testimonials].map((t, idx) => (
            <Card
              key={idx}
              className="mx-4 w-[28rem] max-w-[90vw] flex-shrink-0 border border-gray-100 shadow-sm"
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <p className="text-base text-[#3C3F48] leading-relaxed break-words whitespace-normal overflow-hidden">
                  “{t.quote}”
                </p>
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
      </div>
    </section>
  );
};

export default MarqueeTestimonials;
