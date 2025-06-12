import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { Product } from '@/types/webshop';

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('admin.webshops.destroy', product.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title={`${product.name} - WebShop Admin`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('admin.webshops.index')}
                                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Products
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Product Details
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route('admin.webshops.edit', product.id)}
                                    className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 active:bg-orange-900 focus:outline-none focus:border-orange-900 focus:ring ring-orange-300 disabled:opacity-25 transition"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                {/* Product Image */}
                                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <span className="text-gray-400">No image available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Product Information</h3>
                                        <dl className="mt-4 space-y-4">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Price</dt>
                                                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                                                    €{parseFloat(product.price).toLocaleString()}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                                <dd className="mt-1">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            product.status === 'inStock'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {product.status === 'inStock' ? (
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4 mr-1" />
                                                        )}
                                                        {product.status}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Rating</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{product.rating}/5.0</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Description</h3>
                                        <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Features</h3>
                                        <ul className="mt-2 space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                                    <span className="text-sm text-gray-500">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                                        <dl className="mt-2 space-y-2">
                                            <div className="flex justify-between">
                                                <dt className="text-sm font-medium text-gray-500">Created</dt>
                                                <dd className="text-sm text-gray-900">{product.created_at}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                                <dd className="text-sm text-gray-900">{product.updated_at}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 