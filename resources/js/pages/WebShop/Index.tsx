import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, Filter, Grid, List, Package, Pencil, Plus, Search, Star, Trash2, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Warehouses', href: route('admin.warehouses.index') }];

const steelBlue = '#0076A8';
const vibrantOrange = '#FF6600';
const charcoal = '#3C3F48';

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

export default function Index({ products: initialProducts = [], filters: initialFilters = {} }: Props) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
    const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('admin.webshops.destroy', id), { preserveScroll: true });
        }
    };

    const filteredProducts = useMemo(
        () =>
            products.filter((p) => {
                const matchSearch =
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchStatus = statusFilter === 'all' || p.status === statusFilter;
                return matchSearch && matchStatus;
            }),
        [products, searchTerm, statusFilter],
    );

    const stats = useMemo(() => {
        const total = products.length;
        const inStock = products.filter((p) => p.status === 'inStock').length;
        const soldOut = products.filter((p) => p.status === 'soldOut').length;
        const avgRating = (products.reduce((acc, p) => acc + parseFloat(p.rating || '0'), 0) / total).toFixed(1);
        return { total, inStock, soldOut, avgRating };
    }, [products]);

    return (
        <AppLayout>
            <Head title="WebShop Management" />
            {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}

            <div className="min-h-screen bg-slate-50">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Structure Management</h1>
                                <p className="text-slate-600">Manage your structure listings</p>
                            </div>
                            <Link
                                href={route('admin.webshops.create')}
                                className="inline-flex items-center gap-2 rounded-xl p-2 text-white shadow"
                                style={{ backgroundColor: steelBlue }}
                            >
                                <Plus className="h-5 w-5" />
                                Create Product
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <StatCard icon={<Package className="text-blue-600" />} label="Total" value={stats.total} />
                            <StatCard icon={<TrendingUp className="text-green-600" />} label="In Stock" value={stats.inStock} />
                            <StatCard icon={<BookCheck className="text-red-600" />} label="Sold Out" value={stats.soldOut} />
                            <StatCard icon={<Star className="text-amber-500" />} label="Avg Rating" value={stats.avgRating} />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8">
                    <div className="rounded-2xl bg-white p-6 shadow">
                        <div className="grid items-center gap-4 lg:grid-cols-12">
                            <div className="relative lg:col-span-6">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-10 focus:ring-2 focus:ring-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                />
                            </div>
                            <div className="relative lg:col-span-3">
                                <Filter className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <select
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-10 focus:ring-2 focus:ring-indigo-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="inStock">In Stock</option>
                                    <option value="soldOut">Sold Out</option>
                                </select>
                            </div>
                            <div className="flex justify-end lg:col-span-3">
                                <div className="flex rounded-xl bg-slate-100 p-1">
                                    <button
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow' : 'text-slate-500'}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid className="h-5 w-5" />
                                    </button>
                                    <button
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow' : 'text-slate-500'}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        {filteredProducts.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onDelete={() => handleDelete(product.id)} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-white p-12 text-center shadow">
                                <Package className="mx-auto mb-4 h-12 w-12 text-indigo-400" />
                                <h2 className="text-xl font-semibold text-slate-800">No products found</h2>
                                <p className="mt-2 text-slate-600">Try adjusting your filters or add new products.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-semibold text-slate-800">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">{icon}</div>
        </div>
    );
}

function ProductCard({ product, onDelete, viewMode }: { product: Product; onDelete: () => void; viewMode: 'grid' | 'list' }) {
    return (
        <div className={`rounded-2xl bg-white p-4 shadow ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
            <div
                className={
                    viewMode === 'list'
                        ? 'h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'
                        : 'aspect-w-4 aspect-h-3 overflow-hidden rounded-xl bg-slate-100'
                }
            >
                {product.image ? (
                    <img src={product.image} alt={product.name} className="h-100 w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Package className="h-10 w-10" />
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="mt-4 mb-2 text-lg font-semibold text-slate-800">{product.name}</h3>
                    <p className="text-sm text-slate-600">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="font-bold text-indigo-600">€{parseFloat(product.price).toLocaleString()}</p>
                    <div className="flex items-center space-x-2">
                        <Link href={route('admin.webshops.edit', product.id)} className="text-blue-600 hover:underline">
                            <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={onDelete} className="text-red-600 hover:underline">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
