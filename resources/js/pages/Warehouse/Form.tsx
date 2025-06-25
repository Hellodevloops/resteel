import { Warehouse } from '@/types/warehouse';
import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    warehouse?: Warehouse;
    isEditing?: boolean;
}

export default function WarehouseForm({ warehouse, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors, setErrors } = useForm({
        name: warehouse?.name || '',
        location: warehouse?.location || '',
        status: warehouse?.status || 'active',
        capacity: warehouse?.capacity || '',
        occupied: warehouse?.occupied || '',
        occupancy_rate: warehouse?.occupancy_rate || 0,
        type: warehouse?.type || '',
        last_inspection: warehouse?.last_inspection ? formatDate(warehouse.last_inspection) : '',
        revenue: warehouse?.revenue || '',
        alerts: warehouse?.alerts || 0,
        description: warehouse?.description || '',
        construction: warehouse?.construction || '',
        year_built: warehouse?.year_built || '',
        price: warehouse?.price || '',
        total_area: warehouse?.total_area || '',
        has_video: warehouse?.has_video || false,
        video_urls: warehouse?.video_urls?.filter((url) => url !== null) || [''],
        features: warehouse?.features?.filter((feature) => feature !== null) || [''],
        main_hall_dimensions: warehouse?.main_hall_dimensions || '',
        main_hall_area: warehouse?.main_hall_area || '',
        office_space_dimensions: warehouse?.office_space_dimensions || '',
        office_space_area: warehouse?.office_space_area || '',
        loading_dock_dimensions: warehouse?.loading_dock_dimensions || '',
        loading_dock_area: warehouse?.loading_dock_area || '',
        category: warehouse?.category || '',
        image: null as File | null,
        images: [] as File[],
        contact_person: warehouse?.contact_person || '',
        contact_email: warehouse?.contact_email || '',
        contact_phone: warehouse?.contact_phone || '',
        address: warehouse?.address || '',
        postal_code: warehouse?.postal_code || '',
        city: warehouse?.city || '',
        country: warehouse?.country || '',
        latitude: warehouse?.latitude || '',
        longitude: warehouse?.longitude || '',
        ceiling_height: warehouse?.ceiling_height || '',
        floor_load_capacity: warehouse?.floor_load_capacity || '',
        number_of_loading_docks: warehouse?.number_of_loading_docks || 0,
        parking_spaces: warehouse?.parking_spaces || 0,
        security_features: warehouse?.security_features?.filter((feature) => feature !== null) || [''],
        utilities: warehouse?.utilities?.filter((utility) => utility !== null) || [''],
        certificates: warehouse?.certificates?.filter((cert) => cert !== null) || [''],
        availability_date: warehouse?.availability_date ? formatDate(warehouse.availability_date) : '',
        lease_terms: warehouse?.lease_terms || '',
        unit_of_measurement: warehouse?.unit_of_measurement || 'm²',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(warehouse?.image_path || null);
    const [imagePreviews, setImagePreviews] = useState<string[]>(warehouse?.additional_images || []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const multipleFileInputRef = useRef<HTMLInputElement>(null);

    // Initialize image previews from warehouse data when editing
    useEffect(() => {
        if (isEditing && warehouse) {
            if (warehouse.image_path) {
                setImagePreview(warehouse.image_path);
            }

            if (warehouse.additional_images && warehouse.additional_images.length > 0) {
                setImagePreviews(warehouse.additional_images);
            }
        }
    }, [isEditing, warehouse]);

    // Format date from ISO to YYYY-MM-DD
    function formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a copy of the data to avoid modifying the original state directly
        const formData = { ...data };

        // Ensure all required fields are properly trimmed and not empty
        formData.name = (formData.name || '').trim();
        formData.location = (formData.location || '').trim();
        formData.status = formData.status || 'active';

        // Clean up array fields
        formData.features = (formData.features || []).filter((f) => f && f.trim());
        formData.video_urls = (formData.video_urls || []).filter((v) => v && v.trim());
        formData.security_features = (formData.security_features || []).filter((f) => f && f.trim());
        formData.utilities = (formData.utilities || []).filter((u) => u && u.trim());
        formData.certificates = (formData.certificates || []).filter((c) => c && c.trim());

        // Ensure empty arrays are properly handled
        if (formData.features.length === 0) formData.features = [''];
        if (formData.video_urls.length === 0) formData.video_urls = [''];
        if (formData.security_features.length === 0) formData.security_features = [''];
        if (formData.utilities.length === 0) formData.utilities = [''];
        if (formData.certificates.length === 0) formData.certificates = [''];

        // Validate required fields manually
        let hasErrors = false;
        const errors: Record<string, string> = {};

        if (!formData.name) {
            errors.name = 'The name field is required.';
            hasErrors = true;
        }

        if (!formData.location) {
            errors.location = 'The location field is required.';
            hasErrors = true;
        }

        if (!formData.status) {
            errors.status = 'The status field is required.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(errors);
            console.error('Form validation errors:', errors);
            return;
        }

        // Create FormData object for file uploads
        const submitFormData = new FormData();

        // Add all text fields to FormData
        Object.keys(formData).forEach((key) => {
            // Skip files for now - we'll add them separately
            if (key !== 'image' && key !== 'images') {
                if (Array.isArray(formData[key])) {
                    // Handle array data
                    formData[key].forEach((value: any, index: number) => {
                        submitFormData.append(`${key}[${index}]`, value);
                    });
                } else if (formData[key] !== null && formData[key] !== undefined) {
                    // Handle regular fields, excluding null/undefined values
                    submitFormData.append(key, String(formData[key]));
                }
            }
        });

        // Add main image if it exists
        if (formData.image) {
            submitFormData.append('image', formData.image);
        }

        // Add additional images if they exist
        if (formData.images && formData.images.length > 0) {
            formData.images.forEach((image, index) => {
                submitFormData.append(`images[${index}]`, image);
            });
        }

        // Log the data being submitted in a readable format
        console.log('Submitting form data:', {
            ...Object.fromEntries(
                Object.entries(formData).map(([key, value]) => {
                    if (key === 'image') {
                        return [key, formData.image ? 'File object present' : null];
                    } else if (key === 'images') {
                        return [key, formData.images.length > 0 ? `${formData.images.length} files present` : []];
                    } else {
                        return [key, value];
                    }
                }),
            ),
        });

        // Prepare options for Inertia submission
        const inertiaOptions = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Clear any previous errors
                setErrors({});
                console.log('Form submitted successfully');
            },
            onError: (errs: Record<string, any>) => {
                console.error('Validation errors from server:', errs);

                // Log detailed information about each error
                Object.entries(errs).forEach(([field, message]) => {
                    console.error(`Error in field '${field}':`, message);
                });
            },
        };

        // Submit the form
        if (isEditing && warehouse) {
            put(route('admin.warehouses.update', warehouse.id), submitFormData, inertiaOptions);
        } else {
            post(route('admin.warehouses.store'), submitFormData, inertiaOptions);
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

    const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        setData('images', [...data.images, ...newFiles]);

        // Create previews for the new images
        const newPreviews: string[] = [];
        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === newFiles.length) {
                    setImagePreviews([...imagePreviews, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const addFeature = () => setData('features', [...(data.features || []), '']);
    const removeFeature = (i: number) =>
        setData(
            'features',
            (data.features || []).filter((_, idx) => idx !== i),
        );
    const updateFeature = (i: number, val: string) => {
        const fs = [...(data.features || [])];
        fs[i] = val;
        setData('features', fs);
    };

    const addVideoUrl = () => setData('video_urls', [...(data.video_urls || []), '']);
    const removeVideoUrl = (i: number) =>
        setData(
            'video_urls',
            (data.video_urls || []).filter((_, idx) => idx !== i),
        );
    const updateVideoUrl = (i: number, val: string) => {
        const urls = [...(data.video_urls || [])];
        urls[i] = val;
        setData('video_urls', urls);
    };

    // Security Features
    const addSecurityFeature = () => setData('security_features', [...(data.security_features || []), '']);
    const removeSecurityFeature = (i: number) =>
        setData(
            'security_features',
            (data.security_features || []).filter((_, idx) => idx !== i),
        );
    const updateSecurityFeature = (i: number, val: string) => {
        const features = [...(data.security_features || [])];
        features[i] = val;
        setData('security_features', features);
    };

    // Utilities
    const addUtility = () => setData('utilities', [...(data.utilities || []), '']);
    const removeUtility = (i: number) =>
        setData(
            'utilities',
            (data.utilities || []).filter((_, idx) => idx !== i),
        );
    const updateUtility = (i: number, val: string) => {
        const utils = [...(data.utilities || [])];
        utils[i] = val;
        setData('utilities', utils);
    };

    // Certificates
    const addCertificate = () => setData('certificates', [...(data.certificates || []), '']);
    const removeCertificate = (i: number) =>
        setData(
            'certificates',
            (data.certificates || []).filter((_, idx) => idx !== i),
        );
    const updateCertificate = (i: number, val: string) => {
        const certs = [...(data.certificates || [])];
        certs[i] = val;
        setData('certificates', certs);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* General Error Message */}
            {errors.general && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{errors.general}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Warehouse Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.name ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location (General Area)
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.location ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                    </div>

                    {/* Category and Status */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.category ? 'border-red-300' : ''
                            }`}
                        >
                            <option value="">Select a category</option>
                            <option value="general">General Storage</option>
                            <option value="cold_storage">Cold Storage</option>
                            <option value="hazardous">Hazardous Materials</option>
                            <option value="e-commerce">E-Commerce Fulfillment</option>
                            <option value="agricultural">Agricultural</option>
                            <option value="pharmaceutical">Pharmaceutical</option>
                            <option value="automotive">Automotive</option>
                            <option value="industrial">Industrial</option>
                            <option value="logistics">Logistics Hub</option>
                            <option value="retail">Retail Distribution</option>
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.status ? 'border-red-300' : ''
                            }`}
                        >
                            <option value="active">Active</option>
                            <option value="leased">Leased</option>
                            <option value="under_maintenance">Under Maintenance</option>
                            <option value="coming_soon">Coming Soon</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Type and Last Inspection */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Warehouse Type
                        </label>
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.type ? 'border-red-300' : ''
                            }`}
                        >
                            <option value="">Select a type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="bonded">Bonded</option>
                            <option value="distribution_center">Distribution Center</option>
                            <option value="cross_dock">Cross-Dock</option>
                            <option value="automated">Automated</option>
                            <option value="climate_controlled">Climate Controlled</option>
                            <option value="fulfillment_center">Fulfillment Center</option>
                        </select>
                        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                    </div>

                    <div>
                        <label htmlFor="last_inspection" className="block text-sm font-medium text-gray-700">
                            Last Inspection Date
                        </label>
                        <input
                            id="last_inspection"
                            type="date"
                            value={data.last_inspection || ''}
                            onChange={(e) => setData('last_inspection', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.last_inspection ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.last_inspection && <p className="mt-1 text-sm text-red-600">{errors.last_inspection}</p>}
                    </div>
                </div>
            </div>

            {/* Capacity and Occupancy */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Capacity and Occupancy</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                            Total Capacity
                        </label>
                        <input
                            id="capacity"
                            type="text"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.capacity ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                    </div>

                    <div>
                        <label htmlFor="occupied" className="block text-sm font-medium text-gray-700">
                            Occupied Space
                        </label>
                        <input
                            id="occupied"
                            type="text"
                            value={data.occupied}
                            onChange={(e) => setData('occupied', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.occupied ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.occupied && <p className="mt-1 text-sm text-red-600">{errors.occupied}</p>}
                    </div>

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
                            onChange={(e) => setData('occupancy_rate', parseFloat(e.target.value) || 0)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.occupancy_rate ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.occupancy_rate && <p className="mt-1 text-sm text-red-600">{errors.occupancy_rate}</p>}
                    </div>
                </div>
            </div>

            {/* Alerts and Monitoring */}
            <div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="alerts" className="block text-sm font-medium text-gray-700">
                            Number of Active Alerts
                        </label>
                        <input
                            id="alerts"
                            type="number"
                            min="0"
                            value={data.alerts}
                            onChange={(e) => setData('alerts', parseInt(e.target.value) || 0)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.alerts ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.alerts && <p className="mt-1 text-sm text-red-600">{errors.alerts}</p>}
                    </div>

                    <div>
                        <label htmlFor="has_video" className="flex items-center">
                            <input
                                id="has_video"
                                type="checkbox"
                                checked={data.has_video}
                                onChange={(e) => setData('has_video', e.target.checked)}
                                className="rounded border-gray-300 text-[#E75B12] shadow-sm focus:border-[#E75B12] focus:ring-[#E75B12]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Has Video Monitoring</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Specifications */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Specifications</h3>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                            errors.description ? 'border-red-300' : ''
                        }`}
                        placeholder="Detailed description of the warehouse..."
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
            </div>

            {/* Year Built and Construction */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label htmlFor="year_built" className="block text-sm font-medium text-gray-700">
                        Year Built
                    </label>
                    <input
                        id="year_built"
                        type="text"
                        value={data.year_built}
                        onChange={(e) => setData('year_built', e.target.value)}
                        className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                            errors.year_built ? 'border-red-300' : ''
                        }`}
                    />
                    {errors.year_built && <p className="mt-1 text-sm text-red-600">{errors.year_built}</p>}
                </div>
                <div>
                    <label htmlFor="construction" className="block text-sm font-medium text-gray-700">
                        Construction Type
                    </label>
                    <input
                        id="construction"
                        type="text"
                        value={data.construction}
                        onChange={(e) => setData('construction', e.target.value)}
                        className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                            errors.construction ? 'border-red-300' : ''
                        }`}
                    />
                    {errors.construction && <p className="mt-1 text-sm text-red-600">{errors.construction}</p>}
                </div>
            </div>

            {/* Financial Information */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Financial Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                id="price"
                                type="text"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className={`mt-1 block w-full border-gray-200 pl-7 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.price ? 'border-red-300' : ''
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>

                    <div>
                        <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">
                            Monthly Revenue
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                id="revenue"
                                type="text"
                                value={data.revenue}
                                onChange={(e) => setData('revenue', e.target.value)}
                                className={`mt-1 block w-full border-gray-200 pl-7 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                    errors.revenue ? 'border-red-300' : ''
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.revenue && <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <button
                        type="button"
                        onClick={addFeature}
                        className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Feature
                    </button>
                </div>
                <div className="space-y-3">
                    {(data.features || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={feature || ''}
                                onChange={(e) => updateFeature(idx, e.target.value)}
                                placeholder={`Feature ${idx + 1}`}
                                className="flex-1 border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                            />
                            {(data.features || []).length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeFeature(idx)}
                                    className="p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
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
                            className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Video URL
                        </button>
                    </div>
                    <div className="space-y-3">
                        {(data.video_urls || []).map((url, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    value={url || ''}
                                    onChange={(e) => updateVideoUrl(idx, e.target.value)}
                                    placeholder={`Video URL ${idx + 1}`}
                                    className="flex-1 border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                                />
                                {(data.video_urls || []).length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVideoUrl(idx)}
                                        className="p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Security Features */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Security Features</label>
                    <button
                        type="button"
                        onClick={addSecurityFeature}
                        className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Security Feature
                    </button>
                </div>
                <div className="space-y-3">
                    {(data.security_features || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={feature || ''}
                                onChange={(e) => updateSecurityFeature(idx, e.target.value)}
                                placeholder={`Security Feature ${idx + 1}`}
                                className="flex-1 border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                            />
                            {(data.security_features || []).length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeSecurityFeature(idx)}
                                    className="p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Utilities */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Utilities</label>
                    <button
                        type="button"
                        onClick={addUtility}
                        className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Utility
                    </button>
                </div>
                <div className="space-y-3">
                    {(data.utilities || []).map((utility, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={utility || ''}
                                onChange={(e) => updateUtility(idx, e.target.value)}
                                placeholder={`Utility ${idx + 1}`}
                                className="flex-1 border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                            />
                            {(data.utilities || []).length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeUtility(idx)}
                                    className="p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificates */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Certificates</label>
                    <button
                        type="button"
                        onClick={addCertificate}
                        className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#E75B12] transition-colors duration-200 hover:bg-orange-100"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Certificate
                    </button>
                </div>
                <div className="space-y-3">
                    {(data.certificates || []).map((certificate, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={certificate || ''}
                                onChange={(e) => updateCertificate(idx, e.target.value)}
                                placeholder={`Certificate ${idx + 1}`}
                                className="flex-1 border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12]"
                            />
                            {(data.certificates || []).length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCertificate(idx)}
                                    className="p-2 text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Area with Unit */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <label htmlFor="total_area" className="block text-sm font-medium text-gray-700">
                        Total Area
                    </label>
                    <div className="mt-1 flex shadow-sm">
                        <input
                            id="total_area"
                            type="text"
                            value={data.total_area}
                            onChange={(e) => setData('total_area', e.target.value)}
                            className={`block w-full flex-1 rounded-none rounded-l-lg border-gray-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.total_area ? 'border-red-300' : ''
                            }`}
                        />
                        <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-3 text-gray-500">
                            <select
                                value={data.unit_of_measurement}
                                onChange={(e) => setData('unit_of_measurement', e.target.value)}
                                className="border-0 bg-transparent focus:ring-0"
                            >
                                <option value="m²">m²</option>
                                <option value="ft²">ft²</option>
                                <option value="sqm">sqm</option>
                            </select>
                        </span>
                    </div>
                    {errors.total_area && <p className="mt-1 text-sm text-red-600">{errors.total_area}</p>}
                </div>
            </div>

            {/* Additional Building Specifications */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Additional Building Specifications</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Ceiling Height */}
                    <div>
                        <label htmlFor="ceiling_height" className="block text-sm font-medium text-gray-700">
                            Ceiling Height
                        </label>
                        <input
                            id="ceiling_height"
                            type="text"
                            value={data.ceiling_height}
                            onChange={(e) => setData('ceiling_height', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.ceiling_height ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.ceiling_height && <p className="mt-1 text-sm text-red-600">{errors.ceiling_height}</p>}
                    </div>

                    {/* Floor Load Capacity */}
                    <div>
                        <label htmlFor="floor_load_capacity" className="block text-sm font-medium text-gray-700">
                            Floor Load Capacity
                        </label>
                        <input
                            id="floor_load_capacity"
                            type="text"
                            value={data.floor_load_capacity}
                            onChange={(e) => setData('floor_load_capacity', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.floor_load_capacity ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.floor_load_capacity && <p className="mt-1 text-sm text-red-600">{errors.floor_load_capacity}</p>}
                    </div>

                    {/* Number of Loading Docks */}
                    <div>
                        <label htmlFor="number_of_loading_docks" className="block text-sm font-medium text-gray-700">
                            Number of Loading Docks
                        </label>
                        <input
                            id="number_of_loading_docks"
                            type="number"
                            min="0"
                            value={data.number_of_loading_docks}
                            onChange={(e) => setData('number_of_loading_docks', parseInt(e.target.value) || 0)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.number_of_loading_docks ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.number_of_loading_docks && <p className="mt-1 text-sm text-red-600">{errors.number_of_loading_docks}</p>}
                    </div>

                    {/* Parking Spaces */}
                    <div>
                        <label htmlFor="parking_spaces" className="block text-sm font-medium text-gray-700">
                            Parking Spaces
                        </label>
                        <input
                            id="parking_spaces"
                            type="number"
                            min="0"
                            value={data.parking_spaces}
                            onChange={(e) => setData('parking_spaces', parseInt(e.target.value) || 0)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.parking_spaces ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.parking_spaces && <p className="mt-1 text-sm text-red-600">{errors.parking_spaces}</p>}
                    </div>

                    {/* Availability Date */}
                    <div>
                        <label htmlFor="availability_date" className="block text-sm font-medium text-gray-700">
                            Availability Date
                        </label>
                        <input
                            id="availability_date"
                            type="date"
                            value={data.availability_date || ''}
                            onChange={(e) => setData('availability_date', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.availability_date ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.availability_date && <p className="mt-1 text-sm text-red-600">{errors.availability_date}</p>}
                    </div>

                    {/* Lease Terms */}
                    <div>
                        <label htmlFor="lease_terms" className="block text-sm font-medium text-gray-700">
                            Lease Terms
                        </label>
                        <input
                            id="lease_terms"
                            type="text"
                            value={data.lease_terms}
                            onChange={(e) => setData('lease_terms', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.lease_terms ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.lease_terms && <p className="mt-1 text-sm text-red-600">{errors.lease_terms}</p>}
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Contact Person */}
                    <div>
                        <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700">
                            Contact Person
                        </label>
                        <input
                            id="contact_person"
                            type="text"
                            value={data.contact_person}
                            onChange={(e) => setData('contact_person', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.contact_person ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.contact_person && <p className="mt-1 text-sm text-red-600">{errors.contact_person}</p>}
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                            Contact Email
                        </label>
                        <input
                            id="contact_email"
                            type="email"
                            value={data.contact_email}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.contact_email ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.contact_email && <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>}
                    </div>

                    {/* Contact Phone */}
                    <div>
                        <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                            Contact Phone
                        </label>
                        <input
                            id="contact_phone"
                            type="tel"
                            value={data.contact_phone}
                            onChange={(e) => setData('contact_phone', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.contact_phone ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.contact_phone && <p className="mt-1 text-sm text-red-600">{errors.contact_phone}</p>}
                    </div>
                </div>
            </div>

            {/* Address Information */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Detailed Address</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Street Address */}
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Street Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.address ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                            Postal Code
                        </label>
                        <input
                            id="postal_code"
                            type="text"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.postal_code ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.postal_code && <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.city ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            id="country"
                            type="text"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.country ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                    </div>

                    {/* Coordinates */}
                    <div>
                        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                            Latitude
                        </label>
                        <input
                            id="latitude"
                            type="text"
                            value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.latitude ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                    </div>

                    <div>
                        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                            Longitude
                        </label>
                        <input
                            id="longitude"
                            type="text"
                            value={data.longitude}
                            onChange={(e) => setData('longitude', e.target.value)}
                            className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                errors.longitude ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                    </div>
                </div>
            </div>

            {/* Image Uploads */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Images</h3>
                <div className="space-y-6">
                    {/* Main Cover Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Cover Image</label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="Preview" className="mb-3 h-40 w-auto rounded-md object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('image', null);
                                                setImagePreview(null);
                                            }}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="cover-image"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-[#E75B12] focus-within:ring-2 focus-within:ring-[#E75B12] focus-within:ring-offset-2 focus-within:outline-none hover:text-[#FF6A1C]"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="cover-image"
                                                    name="cover-image"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Additional Images</label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                {imagePreviews.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {imagePreviews.map((preview, idx) => (
                                            <div key={idx} className="relative">
                                                <img src={preview} alt={`Preview ${idx + 1}`} className="h-32 w-full rounded-md object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = [...data.images];
                                                        newImages.splice(idx, 1);
                                                        setData('images', newImages);

                                                        const newPreviews = [...imagePreviews];
                                                        newPreviews.splice(idx, 1);
                                                        setImagePreviews(newPreviews);
                                                    }}
                                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="flex h-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300">
                                            <label
                                                htmlFor="additional-images"
                                                className="relative flex cursor-pointer flex-col items-center justify-center text-center"
                                            >
                                                <Plus className="h-8 w-8 text-gray-400" />
                                                <span className="mt-2 block text-sm font-medium text-[#E75B12]">Add More</span>
                                                <input
                                                    id="additional-images"
                                                    name="additional-images"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="sr-only"
                                                    ref={multipleFileInputRef}
                                                    onChange={handleMultipleImagesChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="additional-images"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-[#E75B12] focus-within:ring-2 focus-within:ring-[#E75B12] focus-within:ring-offset-2 focus-within:outline-none hover:text-[#FF6A1C]"
                                            >
                                                <span>Upload multiple files</span>
                                                <input
                                                    id="additional-images"
                                                    name="additional-images"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="sr-only"
                                                    ref={multipleFileInputRef}
                                                    onChange={handleMultipleImagesChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hall Dimensions */}
            <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Detailed Area Dimensions</h3>
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
                                    placeholder="e.g. 20m x 30m"
                                    value={data.main_hall_dimensions}
                                    onChange={(e) => setData('main_hall_dimensions', e.target.value)}
                                    className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                        errors.main_hall_dimensions ? 'border-red-300' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label htmlFor="main_hall_area" className="block text-sm font-medium text-gray-700">
                                    Area
                                </label>
                                <div className="mt-1 flex shadow-sm">
                                    <input
                                        id="main_hall_area"
                                        type="text"
                                        value={data.main_hall_area}
                                        onChange={(e) => setData('main_hall_area', e.target.value)}
                                        className={`block w-full flex-1 rounded-none rounded-l-lg border-gray-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.main_hall_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                    <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-3 text-gray-500">
                                        {data.unit_of_measurement}
                                    </span>
                                </div>
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
                                    placeholder="e.g. 5m x 8m"
                                    value={data.office_space_dimensions}
                                    onChange={(e) => setData('office_space_dimensions', e.target.value)}
                                    className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                        errors.office_space_dimensions ? 'border-red-300' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label htmlFor="office_space_area" className="block text-sm font-medium text-gray-700">
                                    Area
                                </label>
                                <div className="mt-1 flex shadow-sm">
                                    <input
                                        id="office_space_area"
                                        type="text"
                                        value={data.office_space_area}
                                        onChange={(e) => setData('office_space_area', e.target.value)}
                                        className={`block w-full flex-1 rounded-none rounded-l-lg border-gray-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.office_space_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                    <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-3 text-gray-500">
                                        {data.unit_of_measurement}
                                    </span>
                                </div>
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
                                    placeholder="e.g. 10m x 15m"
                                    value={data.loading_dock_dimensions}
                                    onChange={(e) => setData('loading_dock_dimensions', e.target.value)}
                                    className={`mt-1 block w-full border-gray-200 shadow-sm transition-colors duration-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                        errors.loading_dock_dimensions ? 'border-red-300' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label htmlFor="loading_dock_area" className="block text-sm font-medium text-gray-700">
                                    Area
                                </label>
                                <div className="mt-1 flex shadow-sm">
                                    <input
                                        id="loading_dock_area"
                                        type="text"
                                        value={data.loading_dock_area}
                                        onChange={(e) => setData('loading_dock_area', e.target.value)}
                                        className={`block w-full flex-1 rounded-none rounded-l-lg border-gray-200 focus:border-[#E75B12] focus:ring-[#E75B12] ${
                                            errors.loading_dock_area ? 'border-red-300' : ''
                                        }`}
                                    />
                                    <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-3 text-gray-500">
                                        {data.unit_of_measurement}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center bg-gradient-to-r from-[#E75B12] to-[#FF6A1C] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#FF6A1C] hover:to-[#E75B12] focus:ring-2 focus:ring-[#E75B12] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving...' : isEditing ? 'Update Warehouse' : 'Create Warehouse'}
                </button>
            </div>
        </form>
    );
}
