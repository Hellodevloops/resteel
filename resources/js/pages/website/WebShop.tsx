import { Eye, Heart, Search, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const WebShop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const products = [
        {
            id: 1,
            name: 'Storage Building 6m x 12m Insulated',
            price: 26995.0,
            image: '/assets/Measurements_6m_x_12m_insulated.webp',
            category: 'insulated',
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
            category: 'non-insulated',
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
            category: 'insulated',
            description: 'Complete building package storage building perfect for smaller spaces.',
            rating: 4.7,
            inStock: true,
            features: ['Compact Design', 'Premium Insulation', 'Galvanized Steel', '25 Year Warranty'],
        },
    ];

    const categories = [
        { id: 'all', name: 'All Products', count: products.length },
        { id: 'insulated', name: 'Insulated Buildings', count: products.filter((p) => p.category === 'insulated').length },
        { id: 'non-insulated', name: 'Non-Insulated', count: products.filter((p) => p.category === 'non-insulated').length },
        { id: 'workshop', name: 'Workshops', count: products.filter((p) => p.category === 'workshop').length },
        { id: 'garage', name: 'Garages', count: products.filter((p) => p.category === 'garage').length },
        { id: 'agricultural', name: 'Agricultural', count: products.filter((p) => p.category === 'agricultural').length },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    const addToCart = (productId) => {
        setCartItems((prev) => prev + 1);
        // Add animation or notification logic here
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.1) 0%, transparent 50%)`,
                        }}
                    ></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`text-center text-white transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <h1 className="mb-6 text-5xl font-bold lg:text-6xl">
                            Steel Building
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Solutions</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-white/80 lg:text-2xl">
                            Discover our comprehensive range of premium steel buildings designed for durability, functionality, and excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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

                        {/* Sort and Cart */}
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>

                            <button className="relative rounded-xl bg-orange-500 p-3 text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                                <ShoppingCart className="h-6 w-6" />
                                {cartItems > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                        {cartItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar Categories */}
                    <div
                        className={`transition-all delay-400 duration-1000 lg:col-span-1 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                    >
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 text-xl font-bold text-slate-700">Categories</h3>
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
                            <h2 className="text-2xl font-bold text-slate-700">
                                {selectedCategory === 'all' ? 'All Products' : categories.find((c) => c.id === selectedCategory)?.name}
                                <span className="ml-2 text-lg text-slate-500">({sortedProducts.length})</span>
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
            <section className="bg-gradient-to-r from-slate-600 to-blue-800 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-bold text-white">Need a Custom Solution?</h2>
                    <p className="mb-8 text-xl text-white/80">
                        Our engineering team can design and build custom steel structures to meet your specific requirements.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                            Request Custom Quote
                        </button>
                        <button className="rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10">
                            View Our Process
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebShop;
