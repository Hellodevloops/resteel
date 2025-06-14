import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
  Plus, Pencil, Trash2, Eye, Search, Filter, Grid, List,
  Package, TrendingUp, Star
} from 'lucide-react';
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

  const filteredProducts = useMemo(() =>
    products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    }),
    [products, searchTerm, statusFilter]
  );

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter(p => p.status === 'inStock').length;
    const soldOut = products.filter(p => p.status === 'soldOut').length;
    const avgRating = (products.reduce((acc, p) => acc + parseFloat(p.rating || '0'), 0) / total).toFixed(1);
    return { total, inStock, soldOut, avgRating };
  }, [products]);

  return (
    <AppLayout>
      <Head title="WebShop Management" />

      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
                <p className="text-slate-600">Manage your product listings</p>
              </div>
              <Link
                href={route('admin.webshops.create')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow"
              >
                <Plus className="w-5 h-5" />
                Create Product
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <StatCard icon={<Package className="text-blue-600" />} label="Total" value={stats.total} />
              <StatCard icon={<TrendingUp className="text-green-600" />} label="In Stock" value={stats.inStock} />
              <StatCard icon={<Package className="text-red-600" />} label="Sold Out" value={stats.soldOut} />
              <StatCard icon={<Star className="text-amber-500" />} label="Avg Rating" value={stats.avgRating} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="grid lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="pl-10 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                />
              </div>
              <div className="lg:col-span-3 relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  className="pl-10 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="soldOut">Sold Out</option>
                </select>
              </div>
              <div className="lg:col-span-3 flex justify-end">
                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    className={`w-10 h-10 flex items-center justify-center rounded-xl ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    className={`w-10 h-10 flex items-center justify-center rounded-xl ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={() => handleDelete(product.id)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-2xl shadow">
                <Package className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-800">No products found</h2>
                <p className="text-slate-600 mt-2">Try adjusting your filters or add new products.</p>
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
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-xl font-semibold text-slate-800">{value}</p>
      </div>
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function ProductCard({ product, onDelete, viewMode }: { product: Product; onDelete: () => void; viewMode: 'grid' | 'list' }) {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
      <div className={viewMode === 'list' ? 'w-48 h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden' : 'aspect-w-4 aspect-h-3 bg-slate-100 rounded-xl overflow-hidden'}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-100 object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-400">
            <Package className="w-10 h-10" />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm">{product.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-indigo-600 font-bold">€{parseFloat(product.price).toLocaleString()}</p>
          <div className="flex items-center space-x-2">
            <Link href={route('admin.webshops.edit', product.id)} className="text-blue-600 hover:underline">
              <Pencil className="w-4 h-4" />
            </Link>
            <button onClick={onDelete} className="text-red-600 hover:underline">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
