import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Star, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from './Layout';

const steelBlue = '#0076A8';

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

interface PageProps extends Record<string, unknown> {
    productId: string;
}

const WebshopItemDetail = () => {
    const { productId } = usePage<PageProps>().props;
    const [product, setProduct] = useState<WebShopItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/webshop/${productId}`);
                if (response.data?.status === 'success') {
                    setProduct(response.data.data);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <Layout title="Loading Product...">
                <div className="min-h-screen bg-[#f8fbfe] px-4 pt-10 pb-20 md:px-10">
                    <div className="mx-auto flex h-64 max-w-7xl items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2" style={{ borderColor: steelBlue }}></div>
                            <p className="mt-4 text-gray-600">Loading product details...</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout title="Product Not Found">
                <div className="min-h-screen bg-[#f8fbfe] px-4 pt-10 pb-20 md:px-10">
                    <div className="mx-auto flex h-64 max-w-7xl items-center justify-center">
                        <div className="text-center">
                            <p className="mb-4 text-lg text-red-600">{error || 'Product not found'}</p>
                            <Button onClick={() => (window.location.href = '/webshops')} variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Products
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    const renderStars = (rating: string) => {
        const numRating = parseFloat(rating);
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<Star key={i} className={`h-4 w-4 ${i <= numRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />);
        }
        return stars;
    };

    return (
        <Layout title={`${product.name} | Resteel Solutions`}>
            <div className="min-h-screen bg-[#f8fbfe] px-4 pt-20 pb-20 md:px-10">
                {/* Back Button */}
                <div className="mx-auto mb-6 max-w-7xl">
                    <Button variant="ghost" onClick={() => (window.location.href = '/webshops')} className="text-sm" style={{ color: steelBlue }}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Button>
                </div>

                {/* Top Section */}
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
                    {/* Image Section */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="aspect-video overflow-hidden rounded-xl bg-white shadow-md">
                            <img
                                src={product.image?.startsWith('/storage') ? `${location.origin}${product.image}` : product.image}
                                className="h-full w-full object-cover"
                                alt={product.name}
                            />
                        </div>
                    </div>

                    {/* Info Card */}
                    <Card className="h-fit">
                        <CardContent className="space-y-4 py-6">
                            <div className="flex items-start justify-between">
                                <h1 className="text-2xl font-bold" style={{ color: steelBlue }}>
                                    {product.name}
                                </h1>
                                <Badge
                                    className={`${product.status === 'inStock' ? 'text-white' : 'bg-red-100 text-red-600'}`}
                                    style={{ backgroundColor: product.status === 'inStock' ? steelBlue : undefined }}
                                >
                                    {product.status === 'inStock' ? 'In Stock' : 'Sold Out'}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex">{renderStars(product.rating)}</div>
                                <span className="text-sm text-gray-600">({product.rating}/5)</span>
                            </div>

                            <p className="text-3xl font-bold" style={{ color: steelBlue }}>
                                €{product.price}
                            </p>

                            <div className="space-y-3">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant="outline"
                                        className="w-full border-2"
                                        // style={{ borderColor: steelBlue, backgroundColor: steelBlue }}
                                        onClick={() => (window.location.href = `/contact`)}
                                    >
                                        Request Information
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-full border text-white hover:opacity-80"
                                        style={{ borderColor: steelBlue, backgroundColor: steelBlue }}
                                    >
                                        <Video className="mr-1 h-4 w-4" /> Watch Video
                                    </Button>
                                </div>
                            </div>

                            {product.features && product.features.length > 0 && (
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold" style={{ color: steelBlue }}>
                                        Key Features
                                    </h4>
                                    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                                        {product.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Description Section */}
                <div className="mx-auto mt-10 max-w-7xl">
                    <Card>
                        <CardContent className="space-y-4 py-6">
                            <h3 className="text-xl font-semibold" style={{ color: steelBlue }}>
                                Product Description
                            </h3>
                            <p className="leading-relaxed text-slate-600">{product.description}</p>

                            {product.features && product.features.length > 0 && (
                                <div className="mt-4 border-t pt-4" style={{ borderColor: steelBlue }}>
                                    <h4 className="mb-3 text-lg font-semibold" style={{ color: steelBlue }}>
                                        All Features
                                    </h4>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {product.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm text-slate-600">
                                                <span className="mr-3 h-2 w-2 rounded-full" style={{ backgroundColor: steelBlue }}></span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="mx-auto mt-10 max-w-7xl text-center">
                    <Button variant="ghost" className="text-sm" style={{ color: steelBlue }} onClick={() => (window.location.href = '/webshops')}>
                        <ArrowRight className="mr-1 h-4 w-4" /> View More Products
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default WebshopItemDetail;
