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
import axios from "axios";

const steelBlue = "#0076A8";
const vibrantOrange = "#FF6600";
const charcoal = "#3C3F48";

interface WebShopItem {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: string;
  status: string;
  features: string[];
}

const CarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState<WebShopItem[]>([]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchWebshopItems = async () => {
      try {
        const res = await axios.get("/api/webshop");
        if (res.data?.status === "success") {
          setItems(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch webshop items:", error);
      }
    };
    fetchWebshopItems();
  }, []);

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
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="bg-slate-200/70 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold" style={{ color: charcoal }}>
              Discover Our{" "}
              <span style={{ color: steelBlue }}>Latest Structures</span>
            </h2>
            <p className="text-slate-600 mt-2">
             New steel halls, warehouses, and frames — ready to relocate.
            </p>
          </div>
          <Button
            variant="link"
            className="text-lg px-0 font-medium"
            style={{ color: vibrantOrange }}
          >
            Explore all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Carousel */}
       {/* Carousel Scroll Container */}
<div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {items.map((item) => (
    <Card
      key={item.id}
      className="min-w-[300px] max-w-sm h-[380px] flex flex-col justify-between snap-start shrink-0 bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={
            item.image?.startsWith("/storage")
              ? `${location.origin}${item.image}`
              : item.image
          }
          alt={item.name}
          className="object-cover h-full w-full"
        />
        <Badge className="absolute top-3 right-3 bg-orange-100 text-orange-600 uppercase tracking-wide text-xs">
          {item.status}
        </Badge>
      </div>

      {/* Text Section */}
      <CardContent className="flex flex-col justify-between flex-grow space-y-3 pt-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-slate-800">
            {item.name}
          </CardTitle>
          <span className="text-lg font-bold text-slate-800">€ {item.price}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2">
          {item.description}
        </p>

        {/* Features */}
        {/* <div className="flex gap-2 flex-wrap">
          {item.features?.slice(0, 2).map((feat, i) => (
            <Badge
              key={i}
              className="bg-slate-100 text-slate-600 border border-slate-200 text-xs"
            >
              {feat}
            </Badge>
          ))}
        </div> */}

        {/* CTA */}
        <div className="flex justify-end mt-4 gap-4">
          <Button
            variant="link"
            className="px-0 text-sm font-medium "
            style={{ color: steelBlue }}
          >
            Explore More <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

{/* Arrows - Positioned BELOW carousel */}
<div className="flex justify-end mt-4 gap-4">
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
    </section>
  );
};

export default CarouselSection;
