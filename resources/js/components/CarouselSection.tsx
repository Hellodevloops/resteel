import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const steelBlue = "#0076A8";
const vibrantOrange = "#FF6600";
const charcoal = "#3C3F48";

const carouselItems = [
  {
    id: 1,
    image: "/assets/1.png",
    title: "Steel Warehouse",
    badge: "New",
    description: "Modular steel structures ready for storage.",
    cta: "Explore More",
  },
  {
    id: 2,
    image: "/assets/3.jpg",
    title: "Agri Shed",
    badge: "Featured",
    description: "Efficient structures for agriculture.",
    cta: "Explore More",
  },
  {
    id: 3,
    image: "/assets/5.jpg",
    title: "Industrial Hall",
    badge: "Hot",
    description: "Large-scale halls for operations.",
    cta: "Explore More",
  },
  {
    id: 4,
    image: "/assets/6.jpg",
    title: "Custom Frame",
    badge: "Limited",
    description: "Tailor your design easily.",
    cta: "Explore More",
  },
  {
    id: 5,
    image: "/assets/7.jpg",
    title: "Used Steel Kit",
    badge: "Stock",
    description: "Reliable second-hand options.",
    cta: "Explore More",
  },
  {
    id: 6,
    image: "/assets/8.jpg",
    title: "Demo Offer",
    badge: "Demo",
    description: "Limited-time offers on display units.",
    cta: "Explore More",
  },
];

const CarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollRef.current) {
        const container = scrollRef.current;
        const scrollAmount = 320;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (Math.ceil(container.scrollLeft + scrollAmount) >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="bg-[#F5F7FA] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl  font-bold" style={{ color:charcoal  }}>
              Discover Our{" "}
              <span style={{ color: steelBlue }}>Latest Structures</span>
            </h2>
            <p className="text-slate-600 mt-2">Innovative, affordable, and ready-to-install units</p>
          </div>
          <Button
            variant="link"
            className="text-lg px-0 font-medium"
            style={{ color: vibrantOrange }}
          >
            Explore All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {carouselItems.map((item) => (
              <Card
                key={item.id}
                className="min-w-[300px] max-w-sm snap-start shrink-0 bg-white border border-slate-200 shadow-md hover:shadow-lg"
              >
                {/* Image Section */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover h-full w-full"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-100 text-orange-600">
                    {item.badge}
                  </Badge>
                </div>

                {/* Text Content */}
                <CardContent className="space-y-3">
                  <CardTitle className="text-base font-semibold text-slate-800">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600">{item.description}</p>

                  {/* CTA Button */}
                  <Button
                    variant="link"
                    className="px-0 text-sm font-medium"
                    style={{ color: steelBlue }}
                  >
                    {item.cta}
                    <ArrowRight className=" h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="absolute right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full border-slate-300 hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full border-slate-300 hover:bg-slate-100"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
