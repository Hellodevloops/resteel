import { AppSidebarHeader } from '@/components/app-sidebar-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Warehouse } from '@/types/warehouse';
import { Head } from '@inertiajs/react';
import WarehouseForm from './Form';

interface Props {
    warehouse: Warehouse;
}

export default function Edit({ warehouse }: Props) {
    // Define breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Warehouses', href: route('admin.warehouses.index') },
        { title: warehouse.name, href: route('admin.warehouses.show', warehouse.id) },
        { title: 'Edit', href: route('admin.warehouses.edit', warehouse.id) },
    ];

    return (
        <AppLayout>
            <Head title={`Edit ${warehouse.name} - Admin`} />
            <AppSidebarHeader breadcrumbs={breadcrumbs} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/30 to-slate-100/20">
                {/* Header */}

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
