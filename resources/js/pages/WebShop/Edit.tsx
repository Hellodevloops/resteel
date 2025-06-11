import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProductForm from './Form';
import { Product } from '@/types/webshop';

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit ${product.name} - WebShop Admin`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update product information and details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white rounded-lg shadow-sm">
                            <ProductForm product={product} isEditing />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 