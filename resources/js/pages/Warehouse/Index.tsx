import { AppSidebarHeader } from '@/components/app-sidebar-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Box,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Filter,
    MapPin,
    Package,
    Plus,
    Search,
    Settings,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Note: The `route()` function is globally available in Inertia applications
// when using the @inertiajs/inertia-laravel package, so we don't need to import it

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
    // Add any other fields that are returned from the backend
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

interface MetricCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: number;
}

interface WarehouseCardProps {
    warehouse: Warehouse;
    index: number;
}

interface ActivityItemProps {
    activity: Activity;
}

export default function Index({ warehouseData }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const filteredWarehouses = warehouseData.warehouses.filter((warehouse) => {
        const matchesSearch =
            warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || warehouse.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Define breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Warehouses', href: route('admin.warehouses.index') },
    ];

    const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }: MetricCardProps) => (
        <div
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-white/80">{title}</p>
                    <p className="mb-1 text-3xl font-bold">{value}</p>
                    <p className="text-sm text-white/90">{subtitle}</p>
                    {trend && (
                        <div className="mt-2 flex items-center">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span className="text-sm">+{trend}% this month</span>
                        </div>
                    )}
                </div>
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="absolute -right-2 -bottom-2 h-20 w-20 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110"></div>
        </div>
    );

    const WarehouseCard = ({ warehouse, index }: WarehouseCardProps) => (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 z-10">
                <div
                    className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        warehouse.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : warehouse.status === 'maintenance'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                    }`}
                >
                    <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                            warehouse.status === 'active'
                                ? 'animate-pulse bg-green-500'
                                : warehouse.status === 'maintenance'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                        }`}
                    ></div>
                    {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                </div>
            </div>

            {/* Alerts Badge */}
            {warehouse.alerts > 0 && (
                <div className="absolute top-4 left-4 z-0">
                    <div className="flex items-center rounded-full bg-white px-2 py-1 text-xs font-bold text-white">
                        {/* <AlertTriangle className="mr-1 h-3 w-3" />
                        {warehouse.alerts} */}
                    </div>
                </div>
            )}

            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="mb-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-[#E75B12]">{warehouse.name}</h3>
                    <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="mr-1 h-4 w-4" />
                        {warehouse.location}
                    </div>
                </div>

                {/* Occupancy Progress */}
                <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">Occupancy Rate</span>
                        <span className="text-sm font-bold text-slate-800">{warehouse.occupancy_rate}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                                warehouse.occupancy_rate >= 80 ? 'bg-red-500' : warehouse.occupancy_rate >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${warehouse.occupancy_rate}%` }}
                        ></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-3">
                        <div className="mb-1 flex items-center">
                            <Box className="mr-2 h-4 w-4 text-blue-500" />
                            <span className="text-xs font-medium text-slate-600">Capacity</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{warehouse.capacity}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                        <div className="mb-1 flex items-center">
                            <Zap className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-slate-600">Revenue</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{warehouse.revenue}</p>
                    </div>
                </div>

                {/* Type and Inspection */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Package className="mr-2 h-4 w-4 text-[#E75B12]" />
                        <span className="text-sm font-medium text-slate-600">{warehouse.type}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        Last: {warehouse.last_inspection}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Link
                        href={route('admin.warehouses.show', { warehouse: warehouse.id })}
                        className="flex flex-1 items-center justify-center rounded-xl bg-[#E75B12] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#FF6A1C]"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Link>
                    <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ActivityItem = ({ activity }: ActivityItemProps) => (
        <div className="flex items-start space-x-3 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50">
            <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    activity.type === 'success'
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                }`}
            >
                {activity.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                ) : activity.type === 'warning' ? (
                    <Clock className="h-4 w-4" />
                ) : (
                    <AlertTriangle className="h-4 w-4" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                <p className="text-sm text-slate-600">{activity.warehouse}</p>
                <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <Head title="Warehouses - Admin" />
            <AppSidebarHeader breadcrumbs={breadcrumbs} />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#434B4D]">Warehouses</h1>
                                <p className="mt-1 text-sm text-slate-500">Manage your warehouse inventory</p>
                            </div>
                            <Link
                                href={route('admin.warehouses.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-[#1E2460] px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-[#1E2460]/30 transition hover:bg-[#30378E] focus:ring focus:outline-none active:bg-[#1E2460] disabled:opacity-25"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Warehouse
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Overview Metrics */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            title="Total Warehouses"
                            value={warehouseData.overview.totalWarehouses}
                            subtitle={`${warehouseData.overview.activeWarehouses} active`}
                            icon={Building}
                            color="from-[#434B4D] to-[#565E61]" /* RAL 7015 - Slate Grey */
                        />
                        <MetricCard
                            title="Total Capacity"
                            value={warehouseData.overview.totalCapacity}
                            subtitle={`${warehouseData.overview.occupancyRate}% occupied`}
                            icon={Package}
                            color="from-[#1E2460] to-[#30378E]" /* RAL 5005 - Signal Blue */
                        />
                        <MetricCard
                            title="Monthly Revenue"
                            value={warehouseData.overview.monthlyRevenue}
                            subtitle="Current month"
                            icon={TrendingUp}
                            color="from-[#565E61] to-[#434B4D]" /* RAL 7015 - Slate Grey (reversed) */
                            trend={warehouseData.overview.growthRate}
                        />
                        <MetricCard
                            title="Active Operations"
                            value={warehouseData.overview.activeWarehouses}
                            subtitle="Running smoothly"
                            icon={Activity}
                            color="from-[#E75B12] to-[#FF6A1C]" /* RAL 2004 - Pure Orange */
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
                        {/* Main Content */}
                        <div className="xl:col-span-3">
                            {/* Search and Filter Bar */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search warehouses..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-[#E75B12]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Filter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-8 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-[#E75B12]"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="maintenance">Maintenance</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Warehouses Grid */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {filteredWarehouses.map((warehouse, index) => (
                                    <WarehouseCard key={warehouse.id} warehouse={warehouse} index={index} />
                                ))}
                            </div>

                            {filteredWarehouses.length === 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                                    <Package className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                                    <h3 className="mb-2 text-lg font-medium text-slate-600">No warehouses found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="xl:col-span-1">
                            {/* Recent Activity */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-lg">
                                <div className="border-b border-slate-200 p-6">
                                    <h3 className="flex items-center text-lg font-semibold text-slate-800">
                                        <Activity className="mr-2 h-5 w-5 text-[#E75B12]" />
                                        Recent Activity
                                    </h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {warehouseData.recentActivity.map((activity) => (
                                        <ActivityItem key={activity.id} activity={activity} />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg">
                                <div className="border-b border-slate-200 p-6">
                                    <h3 className="flex items-center text-lg font-semibold text-slate-800">
                                        <BarChart3 className="mr-2 h-5 w-5 text-[#E75B12]" />
                                        Quick Stats
                                    </h3>
                                </div>
                                <div className="space-y-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Average Occupancy</span>
                                        <span className="text-lg font-bold text-slate-800">{warehouseData.overview.occupancyRate}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Total Alerts</span>
                                        <span className="text-lg font-bold text-red-600">
                                            {warehouseData.warehouses.reduce((total, warehouse) => total + warehouse.alerts, 0)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Pending Inspections</span>
                                        <span className="text-lg font-bold text-yellow-600">
                                            {warehouseData.warehouses.filter((w) => w.status === 'maintenance').length}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Monthly Growth</span>
                                        <span className="text-lg font-bold text-green-600">+{warehouseData.overview.growthRate}%</span>
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
