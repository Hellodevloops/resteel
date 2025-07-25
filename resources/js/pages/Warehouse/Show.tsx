import AppLayout from '@/layouts/app-layout';
import { Warehouse } from '@/types/warehouse';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Box, Calendar, CheckCircle, Edit, MapPin, Package, Trash2, XCircle, Zap } from 'lucide-react';

interface Props {
    warehouse: Warehouse;
}

export default function Show({ warehouse }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this warehouse?')) {
            destroy(route('admin.warehouses.destroy', warehouse.id), {
                preserveScroll: true,
            });
        }
    };

    // Format status for display
    const formatStatus = (status: string) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <AppLayout>
            <Head title={`${warehouse.name} - Admin`} />
            {/* <AppSidebarHeader /> */}

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                                <Link
                                    href={route('admin.warehouses.index')}
                                    className="inline-flex w-fit items-center text-sm text-slate-500 hover:text-slate-700"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Warehouses
                                </Link>
                                <div className="min-w-0 flex-1">
                                    <h1 className="truncate text-xl font-bold text-[#434B4D] sm:text-2xl lg:text-3xl">{warehouse.name}</h1>
                                    <p className="mt-1 text-sm text-slate-500">Warehouse Details</p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                                <Link
                                    href={route('admin.warehouses.edit', warehouse.id)}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#1E2460] px-3 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-[#1E2460]/30 transition hover:bg-[#30378E] focus:ring focus:outline-none active:bg-[#1E2460] disabled:opacity-25 sm:px-4"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Edit Warehouse</span>
                                    <span className="sm:hidden">Edit</span>
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-red-300 transition hover:bg-red-700 focus:ring focus:outline-none active:bg-red-900 disabled:opacity-25 sm:px-4"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="px-0 py-4 sm:px-0 sm:py-6">
                        <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm">
                            <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-2">
                                {/* Warehouse Overview */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Warehouse Information</h3>
                                        <dl className="mt-4 space-y-4">
                                            <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                    Location
                                                </dt>
                                                <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.location}</dd>
                                            </div>
                                            {warehouse.type && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Package className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                        Type
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.type}</dd>
                                                </div>
                                            )}
                                            {warehouse.year_built && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                        Year Built
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.year_built}</dd>
                                                </div>
                                            )}
                                            {warehouse.last_inspection && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                        Last Inspection
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.last_inspection}</dd>
                                                </div>
                                            )}
                                            <div>
                                                <dt className="mb-2 flex items-center text-sm font-medium text-slate-500">Status</dt>
                                                <dd className="mt-1">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            warehouse.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : warehouse.status === 'leased'
                                                                  ? 'bg-blue-100 text-blue-800'
                                                                  : warehouse.status === 'under_maintenance'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : warehouse.status === 'coming_soon'
                                                                      ? 'bg-purple-100 text-purple-800'
                                                                      : warehouse.status === 'sale'
                                                                        ? 'bg-orange-100 text-orange-800'
                                                                        : warehouse.status === 'sold'
                                                                          ? 'bg-gray-100 text-gray-800'
                                                                          : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {warehouse.status === 'active' || warehouse.status === 'leased' ? (
                                                            <CheckCircle className="mr-1 h-4 w-4" />
                                                        ) : warehouse.status === 'under_maintenance' || warehouse.status === 'coming_soon' ? (
                                                            <CheckCircle className="mr-1 h-4 w-4" />
                                                        ) : warehouse.status === 'sold' ? (
                                                            <CheckCircle className="mr-1 h-4 w-4" />
                                                        ) : (
                                                            <XCircle className="mr-1 h-4 w-4" />
                                                        )}
                                                        {formatStatus(warehouse.status)}
                                                    </span>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Capacity Information</h3>
                                        <dl className="mt-4 space-y-4">
                                            {warehouse.capacity && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Box className="mr-2 h-4 w-4 flex-shrink-0 text-[#1E2460]" />
                                                        Capacity
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.capacity}</dd>
                                                </div>
                                            )}
                                            {warehouse.occupied && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Box className="mr-2 h-4 w-4 flex-shrink-0 text-[#1E2460]" />
                                                        Occupied
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">{warehouse.occupied}</dd>
                                                </div>
                                            )}
                                            {warehouse.total_area && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Box className="mr-2 h-4 w-4 flex-shrink-0 text-[#1E2460]" />
                                                        Total Area
                                                    </dt>
                                                    <dd className="text-sm text-slate-900 sm:ml-0">
                                                        {warehouse.total_area} {warehouse.unit_of_measurement}
                                                    </dd>
                                                </div>
                                            )}
                                            {typeof warehouse.occupancy_rate === 'number' && (
                                                <div>
                                                    <dt className="mb-2 flex items-center text-sm font-medium text-slate-500">
                                                        <Box className="mr-2 h-4 w-4 text-[#1E2460]" />
                                                        Occupancy Rate
                                                    </dt>
                                                    <dd className="mt-1">
                                                        <div className="mb-1 flex items-center justify-between">
                                                            <span className="text-sm font-medium text-slate-700">{warehouse.occupancy_rate}%</span>
                                                        </div>
                                                        <div className="h-2 w-full rounded-full bg-slate-200">
                                                            <div
                                                                className={`h-2 rounded-full ${
                                                                    warehouse.occupancy_rate > 80
                                                                        ? 'bg-red-500'
                                                                        : warehouse.occupancy_rate > 50
                                                                          ? 'bg-yellow-500'
                                                                          : 'bg-green-500'
                                                                }`}
                                                                style={{ width: `${warehouse.occupancy_rate}%` }}
                                                            ></div>
                                                        </div>
                                                    </dd>
                                                </div>
                                            )}
                                            {warehouse.revenue && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Zap className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                        Revenue
                                                    </dt>
                                                    <dd className="text-sm font-semibold text-slate-900 sm:ml-0">{warehouse.revenue}</dd>
                                                </div>
                                            )}
                                            {warehouse.price && (
                                                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                                                    <dt className="flex w-full items-center text-sm font-medium text-slate-500 sm:w-32">
                                                        <Zap className="mr-2 h-4 w-4 flex-shrink-0 text-[#E75B12]" />
                                                        Price
                                                    </dt>
                                                    <dd className="text-sm font-semibold text-slate-900 sm:ml-0">{warehouse.price}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>

                                {/* Warehouse Details */}
                                <div className="space-y-6">
                                    {warehouse.description && (
                                        <div>
                                            <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Description</h3>
                                            <p className="mt-2 text-sm whitespace-pre-wrap text-slate-600">{warehouse.description}</p>
                                        </div>
                                    )}

                                    {warehouse.construction && (
                                        <div>
                                            <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Construction</h3>
                                            <p className="mt-2 text-sm whitespace-pre-wrap text-slate-600">{warehouse.construction}</p>
                                        </div>
                                    )}

                                    {warehouse.features && warehouse.features.length > 0 && (
                                        <div>
                                            <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Features</h3>
                                            <ul className="mt-2 space-y-2">
                                                {warehouse.features
                                                    .filter((feature) => feature && feature.trim() !== '')
                                                    .map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-[#E75B12]" />
                                                            <span className="text-sm text-slate-600">{feature}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}

                                    {warehouse.has_video && warehouse.video_urls && warehouse.video_urls.length > 0 && (
                                        <div>
                                            <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Videos</h3>
                                            <ul className="mt-2 space-y-2">
                                                {warehouse.video_urls
                                                    .filter((url) => url && url.trim() !== '')
                                                    .map((url, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <a
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm text-[#1E2460] underline hover:text-[#30378E]"
                                                            >
                                                                Video {index + 1}
                                                            </a>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Render area dimensions from the array */}
                                    {warehouse.area_dimensions && warehouse.area_dimensions.length > 0 && (
                                        <div>
                                            <h3 className="text-base font-medium text-[#434B4D] sm:text-lg">Area Specifications</h3>
                                            <div className="mt-4 space-y-6">
                                                {warehouse.area_dimensions.map((dimension, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <h4 className="text-sm font-medium text-slate-700">{dimension.name}</h4>
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            {dimension.dimensions && (
                                                                <div>
                                                                    <p className="text-xs text-slate-500">Dimensions</p>
                                                                    <p className="text-sm text-slate-900">{dimension.dimensions}</p>
                                                                </div>
                                                            )}
                                                            {dimension.area && (
                                                                <div>
                                                                    <p className="text-xs text-slate-500">Area</p>
                                                                    <p className="text-sm text-slate-900">
                                                                        {dimension.area} {warehouse.unit_of_measurement}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
