import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye, Search, Filter, Grid, List, Package, TrendingUp, Star } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    rating: string;
    status: 'inStock' | 'soldOut';
    features: string[];
    image: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    products: Product[];
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index(props: Props) {
    // Ensure we have valid props with defaults
    const initialProducts = Array.isArray(props.products) ? props.products : [];
    const initialFilters = props.filters || {};
    
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
    const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<Product[]>([]);

    // Initialize products after mount
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('admin.webshops.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    // Filter products using useMemo to prevent unnecessary recalculations
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (!product || typeof product !== 'object') return false;
            
            const matchesSearch = (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                                (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [products, searchTerm, statusFilter]);

    // Calculate stats
    const stats = useMemo(() => {
        const totalProducts = products.length;
        const inStock = products.filter(p => p.status === 'inStock').length;
        const soldOut = products.filter(p => p.status === 'soldOut').length;
        const avgRating = products.length > 0 
            ? (products.reduce((sum, p) => sum + parseFloat(p.rating || '0'), 0) / products.length).toFixed(1)
            : '0.0';
        
        return { totalProducts, inStock, soldOut, avgRating };
    }, [products]);

    return (
        <AppLayout>
            <Head title="WebShop Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Package className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        Product Management
                                    </h1>
                                    <p className="mt-2 text-slate-600 font-medium">
                                        Streamline your inventory with intelligent controls
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route('admin.webshops.create')}
                                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out"
                                >
                                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                    Create Product
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">Total Products</p>
                                        <p className="text-2xl font-bold text-slate-900">{stats.totalProducts}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">In Stock</p>
                                        <p className="text-2xl font-bold text-emerald-600">{stats.inStock}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">Sold Out</p>
                                        <p className="text-2xl font-bold text-red-500">{stats.soldOut}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5 text-red-500" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                                        <p className="text-2xl font-bold text-amber-500">{stats.avgRating}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                        <Star className="w-5 h-5 text-amber-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            {/* Search */}
                            <div className="lg:col-span-6 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products by name or description..."
                                    className="block w-full pl-12 pr-4 py-3 border-0 rounded-2xl bg-slate-50/80 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 text-slate-900 font-medium"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="lg:col-span-3 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Filter className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="block w-full pl-12 pr-10 py-3 border-0 rounded-2xl bg-slate-50/80 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white appearance-none transition-all duration-200 text-slate-900 font-medium"
                                >
                                    <option value="all">All Status</option>
                                    <option value="inStock">In Stock</option>
                                    <option value="soldOut">Sold Out</option>
                                </select>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="lg:col-span-3 flex justify-end">
                                <div className="inline-flex bg-slate-100 rounded-2xl p-1 shadow-inner">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                                            viewMode === 'grid'
                                                ? 'bg-white text-indigo-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                                            viewMode === 'list'
                                                ? 'bg-white text-indigo-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Display */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
                    {filteredProducts.length > 0 ? (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            : "space-y-6"
                        }>
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
                                        viewMode === 'list' ? 'flex' : ''
                                    }`}
                                >
                                    {/* Product Image */}
                                    <div className={`${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-w-4 aspect-h-3'} bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden`}>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-center">
                                                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                                    <span className="text-slate-400 font-medium">No image</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                                                    product.status === 'inStock'
                                                        ? 'bg-emerald-100/80 text-emerald-700 border-emerald-200'
                                                        : 'bg-red-100/80 text-red-700 border-red-200'
                                                }`}
                                            >
                                                {product.status === 'inStock' ? 'In Stock' : 'Sold Out'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className={`text-slate-600 leading-relaxed ${viewMode === 'list' ? '' : 'line-clamp-2'}`}>
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                        €{parseFloat(product.price).toLocaleString()}
                                                    </p>
                                                    <div className="flex items-center mt-2">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${
                                                                        i < Math.floor(parseFloat(product.rating))
                                                                            ? 'text-amber-400 fill-current'
                                                                            : 'text-slate-300'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-sm font-semibold text-slate-600">
                                                            {product.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={route('admin.webshops.show', product.id)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200 group/btn"
                                            >
                                                <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                                                View
                                            </Link>
                                            <Link
                                                href={route('admin.webshops.edit', product.id)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 group/btn shadow-lg hover:shadow-xl"
                                            >
                                                <Pencil className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id!)}
                                                className="inline-flex items-center justify-center p-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 group/btn shadow-lg hover:shadow-xl"
                                            >
                                                <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6">
                                <Package className="h-10 w-10 text-indigo-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">No products found</h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your search criteria or filters to find what you\'re looking for'
                                    : 'Start building your product catalog by creating your first item'}
                            </p>
                            <Link
                                href={route('admin.webshops.create')}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5 mr-3" />
                                Create Your First Product
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}