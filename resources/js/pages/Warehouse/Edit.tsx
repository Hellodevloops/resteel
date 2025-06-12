import AppLayout from '@/layouts/app-layout';
import { Warehouse } from '@/types/warehouse';
import { Head } from '@inertiajs/react';
import WarehouseForm from './Form';

interface Props {
    warehouse: Warehouse;
}

export default function Edit({ warehouse }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit ${warehouse.name} - Admin`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/30 to-slate-100/20">
                {/* Header */}
                <div className="border-b border-slate-200/80 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#434B4D]">Edit Warehouse</h1>
                                <p className="mt-1 text-sm text-slate-500">Update warehouse information and details</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm">
                            <div className="p-6">
                                <WarehouseForm warehouse={warehouse} isEditing />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
