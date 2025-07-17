import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Building2, Eye, MapPin, Package, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface Warehouse {
    id: number;
    name: string;
    location: string;
    status: string;
    capacity: string;
    occupied: string;
    occupancy_rate: number;
    type: string;
    last_inspection: string;
    revenue: string;
    alerts: number;
    total_area?: string;
    unit_of_measurement?: string;
    image_path?: string;
}

interface Activity {
    id: number;
    action: string;
    warehouse: string;
    time: string;
    type: string;
}

interface Overview {
    totalWarehouses: number;
    activeWarehouses: number;
    totalCapacity: string;
    occupancyRate: number;
    monthlyRevenue: string;
    growthRate: number;
}

interface WarehouseData {
    overview: Overview;
    warehouses: Warehouse[];
    recentActivity: Activity[];
}

interface Props {
    warehouseData: WarehouseData;
}

export default function Index({ warehouseData }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredWarehouses = warehouseData.warehouses.filter((warehouse) => {
        const matchesSearch =
            warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || warehouse.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
            case 'maintenance':
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
            case 'inactive':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <AppLayout>
            <Head title="Warehouses - Admin" />
            {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                                <div className="bg-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm">
                                    <Building2 className="text-primary-foreground h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg font-semibold sm:text-xl">Warehouses</h1>
                                    <p className="text-muted-foreground text-sm">Manage your warehouse inventory</p>
                                </div>
                            </div>
                            <Button asChild className="w-full rounded-sm sm:w-auto">
                                <Link href={route('admin.warehouses.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Warehouse
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Main Content */}
                        <div className="lg:col-span-4">
                            {/* Search and Filter */}
                            <div className="mb-6 rounded-sm border border-none">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="relative flex-1">
                                            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                            <Input
                                                placeholder="Search warehouses..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="rounded-sm pl-10 sm:w-full lg:w-4/12"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </div>

                            {/* Warehouses Grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredWarehouses.map((warehouse) => (
                                    <Card key={warehouse.id} className="flex flex-col rounded-sm">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <CardTitle className="truncate text-base sm:text-lg">{warehouse.name}</CardTitle>
                                                    <CardDescription className="mt-1 flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                                                        <span className="truncate">{warehouse.location}</span>
                                                    </CardDescription>
                                                </div>
                                                <div className="ml-2 flex-shrink-0">{getStatusBadge(warehouse.status)}</div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex flex-1 flex-col">
                                            <div className="flex flex-1 flex-col space-y-4">
                                                {/* Main Cover Image */}
                                                {warehouse.image_path && (
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={warehouse.image_path}
                                                            alt="Main Cover"
                                                            className="h-20 w-auto rounded object-cover sm:h-24"
                                                        />
                                                    </div>
                                                )}
                                                {/* Total Area */}
                                                <div className="mt-2 text-sm">
                                                    <span className="text-muted-foreground">Total Area: </span>
                                                    <span className="font-medium">
                                                        {warehouse.total_area} {warehouse.unit_of_measurement || 'm²'}
                                                    </span>
                                                </div>
                                                {/* Building Type */}
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Building Type: </span>
                                                    <span className="truncate font-medium capitalize">{warehouse.type || 'Not specified'}</span>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Button asChild size="sm" className="flex-1 rounded-sm">
                                                    <Link href={route('admin.warehouses.show', { warehouse: warehouse.id })}>
                                                        <Eye className="mr-2 h-3 w-3" />
                                                        <span className="hidden sm:inline">View Details</span>
                                                        <span className="sm:hidden">View</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* No results */}
                            {filteredWarehouses.length === 0 && (
                                <Card className="rounded-sm">
                                    <CardContent className="py-8 text-center sm:py-12">
                                        <Package className="text-muted-foreground mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12" />
                                        <h3 className="mb-2 text-base font-medium sm:text-lg">No warehouses found</h3>
                                        <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
