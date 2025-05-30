import Footer from '@/components/layout/Footer';
import { Heart, Eye, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const WebShop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const products = [
        {
            id: 1,
            name: 'Storage Building 6m x 12m Insulated',
            price: 26995.0,
            image: '/assets/Measurements_6m_x_12m_insulated.webp',
            description: 'Complete building package storage building with premium insulation for temperature control.',
            rating: 4.8,
            inStock: true,
            features: ['Premium Insulation', 'Galvanized Steel', 'Weather Resistant', '25 Year Warranty'],
        },
        {
            id: 2,
            name: 'Storage Building 6m x 12m Non-Insulated',
            price: 18995.0,
            image: '/assets/Measurements_6m_x_12m_insulated.webp',
            description: 'Complete building package storage building with durable construction.',
            rating: 4.6,
            inStock: true,
            features: ['Galvanized Steel', 'Weather Resistant', 'Easy Assembly', '20 Year Warranty'],
        },
        {
            id: 3,
            name: 'Storage Building 6m x 6m Insulated',
            price: 18795.0,
            image: '/assets/Measurements_6m_x_12m_insulated.webp',
            description: 'Complete building package storage building perfect for smaller spaces.',
            rating: 4.7,
            inStock: true,
            features: ['Compact Design', 'Premium Insulation', 'Galvanized Steel', '25 Year Warranty'],
        },
    ];

    const addToCart = (productId) => {
        // Placeholder for add-to-cart logic; no cart count tracking in this version
        console.log(`Added product ${productId} to cart`);
    };

    return (
        <>
            <div className="min-h-screen bg-slate-50">
                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Products Grid */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-slate-700">Our Products</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`group rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden rounded-t-2xl">
                                        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                    <div className="text-center">
                                                        <div className="mb-2 text-4xl">🏗️</div>
                                                        <div className="text-sm">Product Image</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button className="rounded-full bg-white/90 p-2 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-white">
                                                    <Heart className="h-5 w-5" />
                                                </button>
                                                <button className="rounded-full bg-white/90 p-2 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-white">
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Stock Status */}
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    product.inStock ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'
                                                }`}
                                            >
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <div className="mb-3 flex items-start justify-between">
                                            <h3 className="text-lg font-bold text-slate-700 transition-colors duration-300 group-hover:text-orange-500">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm text-amber-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="text-slate-600">{product.rating}</span>
                                            </div>
                                        </div>

                                        <p className="mb-4 line-clamp-2 text-sm text-slate-600">{product.description}</p>

                                        {/* Features */}
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-1">
                                                {product.features.slice(0, 2).map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {product.features.length > 2 && (
                                                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                                                        +{product.features.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price and Action */}
                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-slate-700">
                                                €{product.price.toLocaleString()}
                                            </div>
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                disabled={!product.inStock}
                                                className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                                                    product.inStock
                                                        ? 'bg-orange-500 text-white shadow-lg hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/25'
                                                        : 'cursor-not-allowed bg-slate-200 text-slate-400'
                                                }`}
                                            >
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="py-12 text-center">
                                <div className="mb-4 text-6xl">🔍</div>
                                <h3 className="mb-2 text-xl font-semibold text-slate-700">No products found</h3>
                                <p className="text-slate-500">No products available at the moment</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WebShop;
