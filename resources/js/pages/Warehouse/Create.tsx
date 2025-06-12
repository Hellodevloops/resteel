import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Building, Sparkles } from 'lucide-react';
import WarehouseForm from './Form';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create Warehouse - Admin" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                {/* Enhanced Header with Breadcrumb */}
                <div className="relative border-b border-gray-100/50 bg-white/80 shadow-sm backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#434B4D]/5 via-[#1E2460]/5 to-[#E75B12]/5"></div>

                    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {/* Breadcrumb Navigation */}
                        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
                            <span className="text-gray-400">Warehouses</span>
                            <span>/</span>
                            <span className="font-medium text-gray-900">Create Warehouse</span>
                        </nav>

                        {/* Header Content */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#434B4D] to-[#565E61] shadow-lg">
                                        <Building className="h-6 w-6 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent">
                                            Create New Warehouse
                                        </h1>
                                        <Sparkles className="h-5 w-5 text-[#E75B12]" />
                                    </div>
                                    <p className="mt-2 leading-relaxed text-gray-600">Add a new warehouse to your inventory and start managing</p>

                                    {/* Status Indicators */}
                                    <div className="mt-4 flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <span>Auto-save enabled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Main Form Section */}
                        <div className="lg:col-span-8">
                            <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-xl shadow-gray-200/50 backdrop-blur-sm">
                                {/* Form Header */}
                                <div className="border-b border-gray-100/50 bg-gradient-to-r from-white to-gray-50/50 px-8 py-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Warehouse Information</h2>
                                    <p className="mt-1 text-gray-600">Fill in the details below to create your warehouse</p>
                                </div>

                                {/* Form Content */}
                                <div className="p-8">
                                    <WarehouseForm />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Sidebar */}
                        <div className="space-y-6 lg:col-span-4">
                            {/* Preview */}
                            <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-lg backdrop-blur-sm">
                                <div className="border-b border-[#1E2460]/10 bg-gradient-to-r from-[#1E2460]/10 to-[#30378E]/10 px-6 py-4">
                                    <h3 className="flex items-center font-semibold text-[#1E2460]">
                                        <div className="mr-2 h-2 w-2 rounded-full bg-[#1E2460]"></div>
                                        Warehouse Preview
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        <div className="text-sm font-medium text-[#1E2460]">Your Inventory › Warehouses</div>
                                        <div className="text-lg font-medium text-[#434B4D]">New Warehouse Details</div>
                                        <div className="text-sm leading-relaxed text-gray-600">
                                            This is how your warehouse will appear in the system. Make sure to add accurate details.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Tips */}
                            <div className="overflow-hidden rounded-2xl border border-[#E75B12]/20 bg-gradient-to-br from-[#E75B12]/5 to-[#FF6A1C]/10 shadow-lg backdrop-blur-sm">
                                <div className="border-b border-[#E75B12]/10 px-6 py-4">
                                    <h3 className="flex items-center font-semibold text-[#E75B12]">
                                        <Sparkles className="mr-2 h-4 w-4 text-[#E75B12]" />
                                        Pro Tips
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3 text-sm text-[#E75B12]/80">
                                        <li className="flex items-start">
                                            <div className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E75B12]"></div>
                                            Specify accurate dimensions for inventory planning
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E75B12]"></div>
                                            Add detailed construction information for maintenance
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E75B12]"></div>
                                            Keep track of occupancy rates for capacity planning
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
