import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePage } from '@inertiajs/react';
import { Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
    category?: string;
    description: string;
    rating: number;
    status?: string;
    inStock?: boolean;
    features: string[];
};

type Filters = {
    search?: string;
    status?: string;
    sort?: string;
};

const WebShop = () => {
    const { products = [], filters = {} } = usePage().props as { products: Product[]; filters: Filters };

    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Derive categories from products
    const allCategories = Array.from(new Set(products.flatMap((p) => (p.category ? [p.category] : []))));
    const categories = [
        { id: 'all', name: 'All Products', count: products.length },
        ...allCategories.map((cat) => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
            count: products.filter((p) => p.category === cat).length,
        })),
    ];

    // Add inStock property if not present, based on status
    const normalizedProducts = products.map((product) => ({
        ...product,
        inStock: typeof product.inStock === 'boolean' ? product.inStock : product.status ? product.status === 'inStock' : true,
    }));

    const filteredProducts = normalizedProducts.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Remove sorting, just use filteredProducts
    const sortedProducts = filteredProducts;

    const addToCart = (productId: number) => {
        setCartItems((prev) => prev + 1);
        // Add animation or notification logic here
    };

    return (
        <>
            <div className="min-h-screen bg-slate-50">
                {/* Main Content */}
                <Header />
                <div className="mx-auto max-w-7xl px-4 py-25">
                    {/* Search and Filter Bar */}
                    <div
                        className={`mb-12 transition-all delay-200 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search buildings..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-700 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                                />
                            </div>

                            {/* Cart only, removed sort */}
                            <div className="flex items-center gap-4"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Sidebar Categories */}
                        <div
                            className={`transition-all delay-400 duration-1000 lg:col-span-1 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                        >
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-6 text-xl font-bold text-cyan-600">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full rounded-xl p-3 text-left transition-all duration-300 ${
                                                selectedCategory === category.id
                                                    ? 'bg-orange-500 text-white shadow-lg'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{category.name}</span>
                                                <span className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-slate-400'}`}>
                                                    {category.count}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-cyan-600">
                                    {selectedCategory === 'all' ? 'All Products' : categories.find((c) => c.id === selectedCategory)?.name}
                                    <span className="ml-2 text-lg text-orange-500">({sortedProducts.length})</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {sortedProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`group rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                                    >
                                        {/* Product Image */}
                                        <div className="relative overflow-hidden rounded-t-2xl">
                                            <div className="relative overflow-hidden rounded-t-2xl">
                                                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                            <div className="text-center">
                                                                <div className="mb-2 text-4xl">🏗️</div>
                                                                <div className="text-sm">Product Image</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Overlay Actions */}

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
                                                        <span key={idx} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
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
                                                <div className="text-2xl font-bold text-slate-700">€{product.price.toLocaleString()}</div>
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
                            {sortedProducts.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mb-4 text-6xl">🔍</div>
                                    <h3 className="mb-2 text-xl font-semibold text-slate-700">No products found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
            </div>
            <Footer />
        </>
    );
};

export default WebShop;
