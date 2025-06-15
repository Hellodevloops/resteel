import { AppSidebarHeader } from '@/components/app-sidebar-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WarehouseForm from './Form';

export default function Create() {
    // Define breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        // { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Warehouses', href: route('admin.warehouses.index') },
        { title: 'Create', href: route('admin.warehouses.create') },
    ];

    return (
        <AppLayout>
            <Head title="Create Warehouse - Admin" />
            <AppSidebarHeader breadcrumbs={breadcrumbs} />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b bg-background">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary">
                                <Building2 className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Create Warehouse</h1>
                                <p className="text-sm text-muted-foreground">
                                    Add a new warehouse to your inventory system
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Full Screen */}
                <div className="container mx-auto px-6 py-6">
                    <div className="h-full">
                        <Card className="h-full rounded-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-medium">Warehouse Information</CardTitle>
                                <CardDescription>
                                    Fill in the details below to create your new warehouse
                                </CardDescription>
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-6">
                                <WarehouseForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}