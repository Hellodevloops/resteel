import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
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

export default function Index() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Sample warehouse data - replace with actual data from your Laravel backend via props
    const warehouseData = {
        overview: {
            totalWarehouses: 12,
            activeWarehouses: 10,
            totalCapacity: '125,000 m²',
            occupancyRate: 78,
            monthlyRevenue: '$284,500',
            growthRate: 12.5,
        },
        warehouses: [
            {
                id: 1,
                name: 'Central Distribution Hub',
                location: 'Mumbai, Maharashtra',
                status: 'active',
                capacity: '15,000 m²',
                occupied: '12,500 m²',
                occupancyRate: 83,
                type: 'Distribution',
                lastInspection: '2024-05-15',
                revenue: '$45,200',
                alerts: 2,
            },
            {
                id: 2,
                name: 'North Logistics Center',
                location: 'Delhi, NCR',
                status: 'active',
                capacity: '20,000 m²',
                occupied: '16,800 m²',
                occupancyRate: 84,
                type: 'Storage',
                lastInspection: '2024-05-20',
                revenue: '$52,800',
                alerts: 0,
            },
            {
                id: 3,
                name: 'South Processing Facility',
                location: 'Bangalore, Karnataka',
                status: 'maintenance',
                capacity: '12,000 m²',
                occupied: '8,400 m²',
                occupancyRate: 70,
                type: 'Processing',
                lastInspection: '2024-05-10',
                revenue: '$28,600',
                alerts: 5,
            },
            {
                id: 4,
                name: 'West Coast Storage',
                location: 'Pune, Maharashtra',
                status: 'active',
                capacity: '18,500 m²',
                occupied: '14,200 m²',
                occupancyRate: 77,
                type: 'Storage',
                lastInspection: '2024-05-22',
                revenue: '$41,300',
                alerts: 1,
            },
        ],
        recentActivity: [
            { id: 1, action: 'New warehouse added', warehouse: 'East Regional Hub', time: '2 hours ago', type: 'success' },
            { id: 2, action: 'Maintenance scheduled', warehouse: 'South Processing Facility', time: '4 hours ago', type: 'warning' },
            { id: 3, action: 'Inspection completed', warehouse: 'North Logistics Center', time: '1 day ago', type: 'success' },
            { id: 4, action: 'Capacity threshold reached', warehouse: 'Central Distribution Hub', time: '2 days ago', type: 'alert' },
        ],
    };

    const filteredWarehouses = warehouseData.warehouses.filter((warehouse) => {
        const matchesSearch =
            warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || warehouse.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
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

    const WarehouseCard = ({ warehouse, index }) => (
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
                    <h3 className="mb-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-500">{warehouse.name}</h3>
                    <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="mr-1 h-4 w-4" />
                        {warehouse.location}
                    </div>
                </div>

                {/* Occupancy Progress */}
                <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">Occupancy Rate</span>
                        <span className="text-sm font-bold text-slate-800">{warehouse.occupancyRate}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                                warehouse.occupancyRate >= 80 ? 'bg-red-500' : warehouse.occupancyRate >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${warehouse.occupancyRate}%` }}
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
                        <Package className="mr-2 h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-slate-600">{warehouse.type}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        Last: {warehouse.lastInspection}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </button>
                    <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ActivityItem = ({ activity }) => (
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
            <Head title="Warehouse Management Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Warehouse Management</h1>
                                <p className="mt-1 text-slate-600">Monitor and manage your warehouse operations</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center rounded-xl bg-orange-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Warehouse
                                </button>
                            </div>
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
                            color="from-blue-500 to-blue-600"
                        />
                        <MetricCard
                            title="Total Capacity"
                            value={warehouseData.overview.totalCapacity}
                            subtitle={`${warehouseData.overview.occupancyRate}% occupied`}
                            icon={Package}
                            color="from-green-500 to-green-600"
                        />
                        <MetricCard
                            title="Monthly Revenue"
                            value={warehouseData.overview.monthlyRevenue}
                            subtitle="Current month"
                            icon={TrendingUp}
                            color="from-purple-500 to-purple-600"
                            trend={warehouseData.overview.growthRate}
                        />
                        <MetricCard
                            title="Active Operations"
                            value={warehouseData.overview.activeWarehouses}
                            subtitle="Running smoothly"
                            icon={Activity}
                            color="from-orange-500 to-orange-600"
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
                                            className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Filter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-8 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
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
                                        <Activity className="mr-2 h-5 w-5 text-orange-500" />
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
                                        <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                                        Quick Stats
                                    </h3>
                                </div>
                                <div className="space-y-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Average Occupancy</span>
                                        <span className="text-lg font-bold text-slate-800">78.5%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Total Alerts</span>
                                        <span className="text-lg font-bold text-red-600">8</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Pending Inspections</span>
                                        <span className="text-lg font-bold text-yellow-600">3</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Monthly Growth</span>
                                        <span className="text-lg font-bold text-green-600">+12.5%</span>
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
