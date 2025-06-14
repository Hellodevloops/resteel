import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProductForm from './Form';
import { Package, ArrowLeft, Sparkles } from 'lucide-react';

export default function Create() {
  return (
    <AppLayout>
      <Head title="Create Product - WebShop Admin" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        {/* Enhanced Header with Breadcrumb */}
        <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-100/50 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
          
          <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <span className="text-gray-400">Products</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Create Product</span>
            </nav>

            {/* Header Content */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Create New Product
                    </h1>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Add a new product to your webshop inventory and start selling
                  </p>
                  
                  {/* Status Indicators */}
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Auto-save enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Form Section */}
            <div className="lg:col-span-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-white to-gray-50/50 px-8 py-6 border-b border-gray-100/50">
                  <h2 className="text-xl font-semibold text-gray-900">Product Information</h2>
                  <p className="text-gray-600 mt-1">Fill in the details below to create your product</p>
                </div>
                
                {/* Form Content */}
                <div className="p-8">
                  <ProductForm />
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* SEO Preview */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50/50 px-6 py-4 border-b border-purple-100/50">
                  <h3 className="font-semibold text-purple-900 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    SEO Preview
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="text-blue-600 text-sm font-medium">Your Store › Products</div>
                    <div className="text-lg text-purple-700 font-medium">New Product Title</div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      This is how your product will appear in search results. Make sure to add a compelling description.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-amber-200/50">
                  <h3 className="font-semibold text-amber-900 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                    Pro Tips
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-sm text-amber-800">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Use high-quality images for better conversions
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Write detailed descriptions with keywords
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Set competitive pricing for your market
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}