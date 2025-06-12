import { Warehouse } from '@/types/warehouse';
import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
    warehouse?: Warehouse;
    isEditing?: boolean;
}

export default function WarehouseForm({ warehouse, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: warehouse?.name || '',
        location: warehouse?.location || '',
        status: warehouse?.status || 'active',
        capacity: warehouse?.capacity || '',
        occupied: warehouse?.occupied || '',
        occupancy_rate: warehouse?.occupancy_rate || 0,
        type: warehouse?.type || '',
        last_inspection: warehouse?.last_inspection || '',
        revenue: warehouse?.revenue || '',
        alerts: warehouse?.alerts || 0,
        description: warehouse?.description || '',
        construction: warehouse?.construction || '',
        year_built: warehouse?.year_built || '',
        price: warehouse?.price || '',
        total_area: warehouse?.total_area || '',
        has_video: warehouse?.has_video || false,
        video_urls: warehouse?.video_urls || [''],
        features: warehouse?.features || [''],
        main_hall_dimensions: warehouse?.main_hall_dimensions || '',
        main_hall_area: warehouse?.main_hall_area || '',
        office_space_dimensions: warehouse?.office_space_dimensions || '',
        office_space_area: warehouse?.office_space_area || '',
        loading_dock_dimensions: warehouse?.loading_dock_dimensions || '',
        loading_dock_area: warehouse?.loading_dock_area || '',
        category: warehouse?.category || '',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Strip out any blank features and video URLs
        setData(
            'features',
            data.features.filter((f) => f.trim()),
        );
        setData(
            'video_urls',
            data.video_urls.filter((v) => v.trim()),
        );

        const inertiaOptions = {
            preserveScroll: true,
            forceFormData: true,
            onError: (errs: Record<string, any>) => {
                console.error('Validation errors:', errs);
            },
        };

        if (isEditing && warehouse) {
            put(route('admin.warehouses.update', warehouse.id), inertiaOptions);
        } else {
            post(route('admin.warehouses.store'), inertiaOptions);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('image', file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const addFeature = () => setData('features', [...data.features, '']);
    const removeFeature = (i: number) =>
        setData(
            'features',
            data.features.filter((_, idx) => idx !== i),
        );
    const updateFeature = (i: number, val: string) => {
        const fs = [...data.features];
        fs[i] = val;
        setData('features', fs);
    };

    const addVideoUrl = () => setData('video_urls', [...data.video_urls, '']);
    const removeVideoUrl = (i: number) =>
        setData(
            'video_urls',
            data.video_urls.filter((_, idx) => idx !== i),
        );
    const updateVideoUrl = (i: number, val: string) => {
        const urls = [...data.video_urls];
        urls[i] = val;
        setData('video_urls', urls);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Warehouse Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Warehouse Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.name ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.location ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'active' | 'maintenance' | 'inactive')}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.status ? 'border-red-300' : ''
                                }`}
                            >
                                <option value="active">Active</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>

                        {/* Year Built */}
                        <div>
                            <label htmlFor="year_built" className="block text-sm font-medium text-gray-700">
                                Year Built
                            </label>
                            <input
                                id="year_built"
                                type="text"
                                value={data.year_built}
                                onChange={(e) => setData('year_built', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.year_built ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.year_built && <p className="mt-1 text-sm text-red-600">{errors.year_built}</p>}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <input
                                id="type"
                                type="text"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.type ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                id="category"
                                type="text"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.category ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        {/* Last Inspection */}
                        <div>
                            <label htmlFor="last_inspection" className="block text-sm font-medium text-gray-700">
                                Last Inspection
                            </label>
                            <input
                                id="last_inspection"
                                type="date"
                                value={data.last_inspection}
                                onChange={(e) => setData('last_inspection', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.last_inspection ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.last_inspection && <p className="mt-1 text-sm text-red-600">{errors.last_inspection}</p>}
                        </div>

                        {/* Has Video */}
                        <div className="flex items-center">
                            <input
                                id="has_video"
                                type="checkbox"
                                checked={data.has_video}
                                onChange={(e) => setData('has_video', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#E75B12] focus:ring-[#E75B12]"
                            />
                            <label htmlFor="has_video" className="ml-2 block text-sm text-gray-900">
                                Has Video
                            </label>
                        </div>
                    </div>
                </div>

                {/* Capacity Section */}
                <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-900">Capacity & Occupancy</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Capacity */}
                        <div>
                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                type="text"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.capacity ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                        </div>

                        {/* Occupied */}
                        <div>
                            <label htmlFor="occupied" className="block text-sm font-medium text-gray-700">
                                Occupied
                            </label>
                            <input
                                id="occupied"
                                type="text"
                                value={data.occupied}
                                onChange={(e) => setData('occupied', e.target.value)}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.occupied ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.occupied && <p className="mt-1 text-sm text-red-600">{errors.occupied}</p>}
                        </div>

                        {/* Occupancy Rate */}
                        <div>
                            <label htmlFor="occupancy_rate" className="block text-sm font-medium text-gray-700">
                                Occupancy Rate (%)
                            </label>
                            <input
                                id="occupancy_rate"
                                type="number"
                                min="0"
                                max="100"
                                value={data.occupancy_rate}
                                onChange={(e) => setData('occupancy_rate', parseInt(e.target.value))}
                                className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.occupancy_rate ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.occupancy_rate && <p className="mt-1 text-sm text-red-600">{errors.occupancy_rate}</p>}
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-900">Specifications</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Main Hall */}
                        <div>
                            <h4 className="mb-3 text-sm font-medium text-gray-700">Main Hall</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="main_hall_dimensions" className="block text-sm font-medium text-gray-700">
                                        Dimensions
                                    </label>
                                    <input
                                        id="main_hall_dimensions"
                                        type="text"
                                        value={data.main_hall_dimensions}
                                        onChange={(e) => setData('main_hall_dimensions', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.main_hall_dimensions ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="main_hall_area" className="block text-sm font-medium text-gray-700">
                                        Area
                                    </label>
                                    <input
                                        id="main_hall_area"
                                        type="text"
                                        value={data.main_hall_area}
                                        onChange={(e) => setData('main_hall_area', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.main_hall_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Office Space */}
                        <div>
                            <h4 className="mb-3 text-sm font-medium text-gray-700">Office Space</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="office_space_dimensions" className="block text-sm font-medium text-gray-700">
                                        Dimensions
                                    </label>
                                    <input
                                        id="office_space_dimensions"
                                        type="text"
                                        value={data.office_space_dimensions}
                                        onChange={(e) => setData('office_space_dimensions', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.office_space_dimensions ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="office_space_area" className="block text-sm font-medium text-gray-700">
                                        Area
                                    </label>
                                    <input
                                        id="office_space_area"
                                        type="text"
                                        value={data.office_space_area}
                                        onChange={(e) => setData('office_space_area', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.office_space_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Loading Dock */}
                        <div>
                            <h4 className="mb-3 text-sm font-medium text-gray-700">Loading Dock</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="loading_dock_dimensions" className="block text-sm font-medium text-gray-700">
                                        Dimensions
                                    </label>
                                    <input
                                        id="loading_dock_dimensions"
                                        type="text"
                                        value={data.loading_dock_dimensions}
                                        onChange={(e) => setData('loading_dock_dimensions', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.loading_dock_dimensions ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="loading_dock_area" className="block text-sm font-medium text-gray-700">
                                        Area
                                    </label>
                                    <input
                                        id="loading_dock_area"
                                        type="text"
                                        value={data.loading_dock_area}
                                        onChange={(e) => setData('loading_dock_area', e.target.value)}
                                        className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.loading_dock_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Construction */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.description ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Construction */}
                    <div>
                        <label htmlFor="construction" className="block text-sm font-medium text-gray-700">
                            Construction
                        </label>
                        <textarea
                            id="construction"
                            rows={4}
                            value={data.construction}
                            onChange={(e) => setData('construction', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.construction ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.construction && <p className="mt-1 text-sm text-red-600">{errors.construction}</p>}
                    </div>
                </div>

                {/* Financial */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Revenue */}
                    <div>
                        <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">
                            Revenue
                        </label>
                        <input
                            id="revenue"
                            type="text"
                            value={data.revenue}
                            onChange={(e) => setData('revenue', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.revenue ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.revenue && <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            id="price"
                            type="text"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.price ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Features</label>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Feature
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateFeature(idx, e.target.value)}
                                    placeholder={`Feature ${idx + 1}`}
                                    className="flex-1 rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                                />
                                {data.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(idx)}
                                        className="rounded-lg p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video URLs */}
                {data.has_video && (
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Video URLs</label>
                            <button
                                type="button"
                                onClick={addVideoUrl}
                                className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                Add Video URL
                            </button>
                        </div>
                        <div className="space-y-3">
                            {data.video_urls.map((url, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => updateVideoUrl(idx, e.target.value)}
                                        placeholder={`Video URL ${idx + 1}`}
                                        className="flex-1 rounded-lg border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                                    />
                                    {data.video_urls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVideoUrl(idx)}
                                            className="rounded-lg p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#E75B12] to-[#FF6A1C] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#FF6A1C] hover:to-[#E75B12] focus:ring-2 focus:ring-[#E75B12] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : isEditing ? 'Update Warehouse' : 'Create Warehouse'}
                    </button>
                </div>
            </div>
        </form>
    );
}
