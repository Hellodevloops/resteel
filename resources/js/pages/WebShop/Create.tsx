import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProductForm from './Form';
import { Package, Sparkles } from 'lucide-react';

export default function Create() {
  return (
    <AppLayout>
      <Head title="Create Product - WebShop Admin" />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  Create New Product <Sparkles className="w-5 h-5 text-amber-500" />
                </h1>
                <p className="text-slate-600 mt-1">Add a new product to your inventory.</p>
                <div className="mt-3 inline-flex items-center text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  Auto-save enabled
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-slate-800 mb-1">Product Information</h2>
              <p className="text-slate-600 mb-6 text-sm">Fill in the form to create your product.</p>
              <ProductForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="text-sm font-medium text-purple-900 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                SEO Preview
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-blue-600 font-medium">Your Store › Products</p>
                <p className="text-lg font-medium text-slate-800">New Product Title</p>
                <p className="text-sm text-slate-600">This is how your product may appear in search results.</p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl shadow border border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                Pro Tips
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-amber-700">
                <li className="flex items-start">
                  <span className="mt-1 mr-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  Use high-quality images for better conversions.
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  Write detailed descriptions with keywords.
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  Set competitive pricing for your market.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
