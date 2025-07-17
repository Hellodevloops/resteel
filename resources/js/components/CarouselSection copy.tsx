import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steelBlue = '#0076A8';
const vibrantOrange = '#FF6600';
const charcoal = '#3C3F48';

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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -320 : 320,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const fetchWebshopItems = async () => {
            try {
                const res = await axios.get('/api/webshop');
                if (res.data?.status === 'success') {
                    setItems(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch webshop items:', error);
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
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section className="overflow-hidden bg-slate-200/70 py-20">
            <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="mt-4 text-4xl font-bold md:text-5xl" style={{ color: charcoal }}>
                            Discover Our <span style={{ color: steelBlue }}>Latest Structures</span>
                        </h2>
                        <p className="mt-2 text-slate-600">New steel halls, warehouses, and frames — ready to relocate.</p>
                    </div>
                    <Button
                        onClick={() => (window.location.href = '/webshops')}
                        size="lg"
                        variant="link"
                        className="px-0 text-lg font-medium"
                        style={{ color: vibrantOrange }}
                    >
                        Explore all <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* Carousel */}
                {/* Carousel Scroll Container */}
                <div
                    ref={scrollRef}
                    className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className="flex h-[340px] max-w-sm min-w-[300px] shrink-0 snap-start flex-col justify-between border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-40 w-full overflow-hidden">
                                <img
                                    src={item.image?.startsWith('/storage') ? `${location.origin}${item.image}` : item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-orange-100 text-xs tracking-wide text-orange-600 uppercase">
                                    {item.status}
                                </Badge>
                            </div>

                            {/* Text Section */}
                            <CardContent className="flex flex-grow flex-col justify-between space-y-3 pt-4">
                                {/* Title & Price */}
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-base font-semibold text-slate-800">{item.name}</CardTitle>
                                    <span className="text-lg font-bold text-slate-800">€ {item.price}</span>
                                </div>

                                {/* Description */}
                                <p className="line-clamp-2 text-sm text-slate-600">{item.description}</p>

                                {/* Features */}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Arrows - Positioned BELOW carousel */}
                <div className="mt-4 flex justify-end gap-4">
                    <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full border-slate-300 hover:bg-slate-100">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll('right')}
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
