import { Warehouse } from '@/types/warehouse';
import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    warehouse?: Warehouse;
    isEditing?: boolean;
}

export default function WarehouseForm({ warehouse, isEditing = false }: Props) {
    const steelBlue = '#0076A8';
    const { data, setData, post, put, processing, errors, reset, setError } = useForm({
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
        // latitude: warehouse?.latitude || '',
        // longitude: warehouse?.longitude || '',
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
        try {
            if (isEditing && warehouse) {
                if (warehouse.image_path) {
                    setImagePreview(warehouse.image_path);
                }
                if (warehouse.additional_images && warehouse.additional_images.length > 0) {
                    setImagePreviews(warehouse.additional_images);
                }
            }
        } catch (error) {
            console.error('Error initializing image previews:', error);
            toast.error('Failed to load existing images');
        }
    }, [isEditing, warehouse]);

    // Format date from ISO to YYYY-MM-DD
    function formatDate(dateString: string): string {
        try {
            if (!dateString) return '';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) throw new Error('Invalid date');
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    }

    // Validation functions
    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const validateNumber = (value: string | number, field: string): boolean => {
        const num = parseFloat(value.toString());
        if (isNaN(num)) return false;
        if (field === 'occupancy_rate') return num >= 0 && num <= 100;
        return num >= 0;
    };

    const validateDimensions = (dimensions: string): boolean => {
        if (!dimensions.trim()) return true; // Optional field
        // Validate format like "20m x 30m", "20 x 30", "20.5m x 30.2m", etc.
        const dimensionPattern = /^\s*\d+(\.\d+)?\s*[a-zA-Z]*\s*[x×]\s*\d+(\.\d+)?\s*[a-zA-Z]*\s*$/i;
        return dimensionPattern.test(dimensions);
    };

    const validateArea = (area: string): boolean => {
        if (!area.trim()) return true; // Optional field
        const num = parseFloat(area);
        return !isNaN(num) && num > 0;
    };

    const validateDimensionConsistency = (dimensions: string, area: string): boolean => {
        if (!dimensions.trim() || !area.trim()) return true; // Skip if either is empty

        try {
            // Extract numbers from dimensions (e.g., "20m x 30m" -> [20, 30])
            const dimensionNumbers = dimensions.match(/\d+(\.\d+)?/g);
            if (!dimensionNumbers || dimensionNumbers.length !== 2) return true; // Skip validation if can't parse

            const length = parseFloat(dimensionNumbers[0]);
            const width = parseFloat(dimensionNumbers[1]);
            const calculatedArea = length * width;
            const providedArea = parseFloat(area);

            // Allow 5% tolerance for rounding differences
            const tolerance = calculatedArea * 0.05;
            return Math.abs(calculatedArea - providedArea) <= tolerance;
        } catch {
            return true; // Skip validation if parsing fails
        }
    };

    const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
        const newErrors: Record<string, string> = {};

        // Required fields
        if (!data.name.trim()) newErrors.name = 'Warehouse name is required';
        if (!data.location.trim()) newErrors.location = 'Location is required';
        if (!data.status) newErrors.status = 'Status is required';
        if (!data.category) newErrors.category = 'Category is required';
        if (!data.type) newErrors.type = 'Warehouse type is required';

        // Numeric fields
        if (data.capacity && !validateNumber(data.capacity, 'capacity')) {
            newErrors.capacity = 'Capacity must be a valid number';
        }
        if (data.occupied && !validateNumber(data.occupied, 'occupied')) {
            newErrors.occupied = 'Occupied space must be a valid number';
        }
        if (data.occupancy_rate && !validateNumber(data.occupancy_rate, 'occupancy_rate')) {
            newErrors.occupancy_rate = 'Occupancy rate must be between 0 and 100';
        }
        if (data.alerts && !validateNumber(data.alerts, 'alerts')) {
            newErrors.alerts = 'Alerts must be a valid number';
        }
        if (data.number_of_loading_docks && !validateNumber(data.number_of_loading_docks, 'number_of_loading_docks')) {
            newErrors.number_of_loading_docks = 'Number of loading docks must be a valid number';
        }
        if (data.parking_spaces && !validateNumber(data.parking_spaces, 'parking_spaces')) {
            newErrors.parking_spaces = 'Parking spaces must be a valid number';
        }

        // Email validation
        if (data.contact_email && !validateEmail(data.contact_email)) {
            newErrors.contact_email = 'Please enter a valid email address';
        }

        // Phone validation
        if (data.contact_phone && !validatePhone(data.contact_phone)) {
            newErrors.contact_phone = 'Please enter a valid phone number';
        }

        // Coordinate validation
        // if (data.latitude && (isNaN(parseFloat(data.latitude)) || parseFloat(data.latitude) < -90 || parseFloat(data.latitude) > 90)) {
        //     newErrors.latitude = 'Latitude must be between -90 and 90';
        // }
        // if (data.longitude && (isNaN(parseFloat(data.longitude)) || parseFloat(data.longitude) < -180 || parseFloat(data.longitude) > 180)) {
        //     newErrors.longitude = 'Longitude must be between -180 and 180';
        // }

        // File size validation
        if (data.image && data.image.size > 10 * 1024 * 1024) {
            newErrors.image = 'Main image must be less than 10MB';
        }
        if (data.images.some((img) => img.size > 10 * 1024 * 1024)) {
            newErrors.images = 'Additional images must be less than 10MB each';
        }

        // Dimension validation
        if (data.main_hall_dimensions && !validateDimensions(data.main_hall_dimensions)) {
            newErrors.main_hall_dimensions = 'Please enter dimensions in format like "20m x 30m" or "20 x 30"';
        }
        if (data.office_space_dimensions && !validateDimensions(data.office_space_dimensions)) {
            newErrors.office_space_dimensions = 'Please enter dimensions in format like "5m x 8m" or "5 x 8"';
        }
        if (data.loading_dock_dimensions && !validateDimensions(data.loading_dock_dimensions)) {
            newErrors.loading_dock_dimensions = 'Please enter dimensions in format like "10m x 15m" or "10 x 15"';
        }

        // Area validation
        if (data.main_hall_area && !validateArea(data.main_hall_area)) {
            newErrors.main_hall_area = 'Main hall area must be a positive number';
        }
        if (data.office_space_area && !validateArea(data.office_space_area)) {
            newErrors.office_space_area = 'Office space area must be a positive number';
        }
        if (data.loading_dock_area && !validateArea(data.loading_dock_area)) {
            newErrors.loading_dock_area = 'Loading dock area must be a positive number';
        }

        // Dimension-Area consistency validation
        if (data.main_hall_dimensions && data.main_hall_area && !validateDimensionConsistency(data.main_hall_dimensions, data.main_hall_area)) {
            newErrors.main_hall_area = 'Main hall area does not match the provided dimensions (±5% tolerance)';
        }
        if (
            data.office_space_dimensions &&
            data.office_space_area &&
            !validateDimensionConsistency(data.office_space_dimensions, data.office_space_area)
        ) {
            newErrors.office_space_area = 'Office space area does not match the provided dimensions (±5% tolerance)';
        }
        if (
            data.loading_dock_dimensions &&
            data.loading_dock_area &&
            !validateDimensionConsistency(data.loading_dock_dimensions, data.loading_dock_area)
        ) {
            newErrors.loading_dock_area = 'Loading dock area does not match the provided dimensions (±5% tolerance)';
        }

        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors,
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate form
            const { isValid, errors: validationErrors } = validateForm();
            if (!isValid) {
                // Set client-side validation errors to display on form fields
                Object.entries(validationErrors).forEach(([field, message]) => {
                    setError(field, message);
                });
                toast.error('Please fix the form errors before submitting');
                // console.log('Validation errors:', validationErrors);
                return;
            }

            // Create a copy of the data
            const formData = { ...data };

            // Clean up array fields
            formData.features = (formData.features || []).filter((f) => f && f.trim());
            formData.video_urls = (formData.video_urls || []).filter((v) => v && v.trim());
            formData.security_features = (formData.security_features || []).filter((f) => f && f.trim());
            formData.utilities = (formData.utilities || []).filter((u) => u && u.trim());
            formData.certificates = (formData.certificates || []).filter((c) => c && c.trim());

            // Ensure empty arrays
            if (formData.features.length === 0) formData.features = [''];
            if (formData.video_urls.length === 0) formData.video_urls = [''];
            if (formData.security_features.length === 0) formData.security_features = [''];
            if (formData.utilities.length === 0) formData.utilities = [''];
            if (formData.certificates.length === 0) formData.certificates = [''];

            // Create FormData object for file uploads
            const submitFormData = new FormData();

            // Add all text fields to FormData
            Object.keys(formData).forEach((key) => {
                if (key !== 'image' && key !== 'images') {
                    if (Array.isArray(formData[key as keyof typeof formData])) {
                        (formData[key as keyof typeof formData] as string[]).forEach((value: string, index: number) => {
                            submitFormData.append(`${key}[${index}]`, value);
                        });
                    } else if (formData[key as keyof typeof formData] !== null && formData[key as keyof typeof formData] !== undefined) {
                        submitFormData.append(key, String(formData[key as keyof typeof formData]));
                    }
                }
            });

            // Add main image
            if (formData.image) {
                submitFormData.append('image', formData.image);
            }

            // Add additional images
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach((image, index) => {
                    submitFormData.append(`images[${index}]`, image);
                });
            }

            // Prepare options for Inertia submission
            const inertiaOptions = {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    toast.success(isEditing ? 'Warehouse updated successfully' : 'Warehouse created successfully');
                    if (!isEditing) {
                        reset();
                        setImagePreview(null);
                        setImagePreviews([]);
                    }
                },
                onError: (errs: Record<string, string>) => {
                    toast.error('Failed to submit form. Please check the errors.');
                    console.error('Server validation errors:', errs);
                    Object.entries(errs).forEach(([field, message]) => {
                        console.error(`Error in field '${field}':`, message);
                    });
                },
                onFinish: () => {
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    if (multipleFileInputRef.current) multipleFileInputRef.current.value = '';
                },
            };

            // Submit the form
            if (isEditing && warehouse) {
                put(route('admin.warehouses.update', warehouse.id), submitFormData, inertiaOptions);
            } else {
                post(route('admin.warehouses.store'), submitFormData, inertiaOptions);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An unexpected error occurred while submitting the form');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            if (file.size > 10 * 1024 * 1024) {
                toast.error('Main image must be less than 10MB');
                return;
            }

            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.onerror = () => {
                toast.error('Failed to preview image');
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error handling image change:', error);
            toast.error('Error processing image upload');
        }
    };

    const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const newFiles = Array.from(files);
            if (newFiles.some((file) => file.size > 10 * 1024 * 1024)) {
                toast.error('Each additional image must be less than 10MB');
                return;
            }

            setData('images', [...data.images, ...newFiles]);

            const newPreviews: string[] = [];
            let processedFiles = 0;

            newFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    processedFiles++;
                    if (processedFiles === newFiles.length) {
                        setImagePreviews([...imagePreviews, ...newPreviews]);
                    }
                };
                reader.onerror = () => {
                    toast.error('Failed to preview some images');
                };
                reader.readAsDataURL(file);
            });
        } catch (error) {
            console.error('Error handling multiple images change:', error);
            toast.error('Error processing additional images');
        }
    };

    const addFeature = () => {
        try {
            setData('features', [...(data.features || []), '']);
        } catch (error) {
            console.error('Error adding feature:', error);
            toast.error('Failed to add new feature');
        }
    };

    const removeFeature = (i: number) => {
        try {
            setData(
                'features',
                (data.features || []).filter((_, idx) => idx !== i),
            );
        } catch (error) {
            console.error('Error removing feature:', error);
            toast.error('Failed to remove feature');
        }
    };

    const updateFeature = (i: number, val: string) => {
        try {
            const fs = [...(data.features || [])];
            fs[i] = val;
            setData('features', fs);
        } catch (error) {
            console.error('Error updating feature:', error);
            toast.error('Failed to update feature');
        }
    };

    const addVideoUrl = () => {
        try {
            setData('video_urls', [...(data.video_urls || []), '']);
        } catch (error) {
            console.error('Error adding video URL:', error);
            toast.error('Failed to add video URL');
        }
    };

    const removeVideoUrl = (i: number) => {
        try {
            setData(
                'video_urls',
                (data.video_urls || []).filter((_, idx) => idx !== i),
            );
        } catch (error) {
            console.error('Error removing video URL:', error);
            toast.error('Failed to remove video URL');
        }
    };

    const updateVideoUrl = (i: number, val: string) => {
        try {
            const urls = [...(data.video_urls || [])];
            urls[i] = val;
            setData('video_urls', urls);
        } catch (error) {
            console.error('Error updating video URL:', error);
            toast.error('Failed to update video URL');
        }
    };

    const addSecurityFeature = () => {
        try {
            setData('security_features', [...(data.security_features || []), '']);
        } catch (error) {
            console.error('Error adding security feature:', error);
            toast.error('Failed to add security feature');
        }
    };

    const removeSecurityFeature = (i: number) => {
        try {
            setData(
                'security_features',
                (data.security_features || []).filter((_, idx) => idx !== i),
            );
        } catch (error) {
            console.error('Error removing security feature:', error);
            toast.error('Failed to remove security feature');
        }
    };

    const updateSecurityFeature = (i: number, val: string) => {
        try {
            const features = [...(data.security_features || [])];
            features[i] = val;
            setData('security_features', features);
        } catch (error) {
            console.error('Error updating security feature:', error);
            toast.error('Failed to update security feature');
        }
    };

    const addUtility = () => {
        try {
            setData('utilities', [...(data.utilities || []), '']);
        } catch (error) {
            console.error('Error adding utility:', error);
            toast.error('Failed to add utility');
        }
    };

    const removeUtility = (i: number) => {
        try {
            setData(
                'utilities',
                (data.utilities || []).filter((_, idx) => idx !== i),
            );
        } catch (error) {
            console.error('Error removing utility:', error);
            toast.error('Failed to remove utility');
        }
    };

    const updateUtility = (i: number, val: string) => {
        try {
            const utils = [...(data.utilities || [])];
            utils[i] = val;
            setData('utilities', utils);
        } catch (error) {
            console.error('Error updating utility:', error);
            toast.error('Failed to update utility');
        }
    };

    const addCertificate = () => {
        try {
            setData('certificates', [...(data.certificates || []), '']);
        } catch (error) {
            console.error('Error adding certificate:', error);
            toast.error('Failed to add certificate');
        }
    };

    const removeCertificate = (i: number) => {
        try {
            setData(
                'certificates',
                (data.certificates || []).filter((_, idx) => idx !== i),
            );
        } catch (error) {
            console.error('Error removing certificate:', error);
            toast.error('Failed to remove certificate');
        }
    };

    const updateCertificate = (i: number, val: string) => {
        try {
            const certs = [...(data.certificates || [])];
            certs[i] = val;
            setData('certificates', certs);
        } catch (error) {
            console.error('Error updating certificate:', error);
            toast.error('Failed to update certificate');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'Edit Warehouse' : 'Create New Warehouse'}</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        {isEditing ? 'Update warehouse information and settings' : 'Add a new warehouse to your inventory management system'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Error Message */}
                    {Object.keys(errors).length > 0 && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-base font-semibold text-red-800">Form Validation Errors</h3>
                                    <p className="mt-1 text-sm text-red-700">
                                        {errors.general || 'Please correct the errors in the form before proceeding'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Basic Information Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0H5m14 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5M7 7h10M7 11h10M7 15h6"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Warehouse Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.name
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter warehouse name"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="location" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Location (General Area) *
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.location
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter location"
                                    />
                                    {errors.location && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                                            errors.category
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
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
                                    {errors.category && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="status" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                                            errors.status
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                    >
                                        <option value="active">Active</option>
                                        <option value="leased">Leased</option>
                                        <option value="under_maintenance">Under Maintenance</option>
                                        <option value="coming_soon">Coming Soon</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="type" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Warehouse Type *
                                    </label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                                            errors.type
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
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
                                    {errors.type && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="last_inspection" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Last Inspection Date
                                    </label>
                                    <input
                                        id="last_inspection"
                                        type="date"
                                        value={data.last_inspection || ''}
                                        onChange={(e) => setData('last_inspection', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 transition-all duration-200 focus:outline-none ${
                                            errors.last_inspection
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                    />
                                    {errors.last_inspection && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.last_inspection}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Capacity and Occupancy Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Capacity and Occupancy</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label htmlFor="capacity" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Total Capacity
                                </label>
                                <input
                                    id="capacity"
                                    type="text"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.capacity
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter total capacity"
                                />
                                {errors.capacity && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.capacity}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="occupied" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Occupied Space
                                </label>
                                <input
                                    id="occupied"
                                    type="text"
                                    value={data.occupied}
                                    onChange={(e) => setData('occupied', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.occupied
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter occupied space"
                                />
                                {errors.occupied && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.occupied}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="occupancy_rate" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Occupancy Rate (%)
                                </label>
                                <input
                                    id="occupancy_rate"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.occupancy_rate}
                                    onChange={(e) => setData('occupancy_rate', parseFloat(e.target.value) || 0)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.occupancy_rate
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="0-100"
                                />
                                {errors.occupancy_rate && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.occupancy_rate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="alerts" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Number of Active Alerts
                                </label>
                                <input
                                    id="alerts"
                                    type="number"
                                    min="0"
                                    value={data.alerts}
                                    onChange={(e) => setData('alerts', parseInt(e.target.value) || 0)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.alerts
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter number of alerts"
                                />
                                {errors.alerts && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.alerts}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center pt-8">
                                <label htmlFor="has_video" className="flex items-center">
                                    <input
                                        id="has_video"
                                        type="checkbox"
                                        checked={data.has_video}
                                        onChange={(e) => setData('has_video', e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-[#0076A8] shadow-sm focus:border-[#0076A8] focus:ring-[#0076A8]"
                                    />
                                    <span className="ml-3 text-sm font-semibold text-gray-700">Has Video Monitoring</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Specifications and Details Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Specifications</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.description
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Detailed description of the warehouse..."
                                />
                                {errors.description && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="year_built" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Year Built
                                    </label>
                                    <input
                                        id="year_built"
                                        type="text"
                                        value={data.year_built}
                                        onChange={(e) => setData('year_built', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.year_built
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter year built"
                                    />
                                    {errors.year_built && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.year_built}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="construction" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Construction Type
                                    </label>
                                    <input
                                        id="construction"
                                        type="text"
                                        value={data.construction}
                                        onChange={(e) => setData('construction', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.construction
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter construction type"
                                    />
                                    {errors.construction && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.construction}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Information Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Financial Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Price
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <span className="text-sm text-gray-500">$</span>
                                    </div>
                                    <input
                                        id="price"
                                        type="text"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className={`block w-full rounded-xl border-2 py-3 pr-4 pl-8 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.price
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="revenue" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Monthly Revenue
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <span className="text-sm text-gray-500">$</span>
                                    </div>
                                    <input
                                        id="revenue"
                                        type="text"
                                        value={data.revenue}
                                        onChange={(e) => setData('revenue', e.target.value)}
                                        className={`block w-full rounded-xl border-2 py-3 pr-4 pl-8 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.revenue
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.revenue && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.revenue}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="md:col-span-2 lg:col-span-1">
                                <label htmlFor="total_area" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Total Area
                                </label>
                                <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-[#0076A8] focus-within:ring-4 focus-within:ring-blue-100">
                                    <input
                                        id="total_area"
                                        type="text"
                                        value={data.total_area}
                                        onChange={(e) => setData('total_area', e.target.value)}
                                        className="block w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                        placeholder="Enter area"
                                    />
                                    <div className="flex items-center rounded-r-xl border-l border-gray-200 bg-gray-50 px-3">
                                        <select
                                            value={data.unit_of_measurement}
                                            onChange={(e) => setData('unit_of_measurement', e.target.value)}
                                            className="border-0 bg-transparent text-gray-500 focus:ring-0"
                                        >
                                            <option value="m²">m²</option>
                                            <option value="ft²">ft²</option>
                                            <option value="sqm">sqm</option>
                                        </select>
                                    </div>
                                </div>
                                {errors.total_area && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.total_area}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features and Arrays Section */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Features & Properties</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-gray-700">Features</label>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                                                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
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

                            {data.has_video && (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <label className="block text-sm font-semibold text-gray-700">Video URLs</label>
                                        <button
                                            type="button"
                                            onClick={addVideoUrl}
                                            className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                                                    className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
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

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-gray-700">Security Features</label>
                                    <button
                                        type="button"
                                        onClick={addSecurityFeature}
                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                                                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
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

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-gray-700">Utilities</label>
                                    <button
                                        type="button"
                                        onClick={addUtility}
                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                                                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
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

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-gray-700">Certificates</label>
                                    <button
                                        type="button"
                                        onClick={addCertificate}
                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                                                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
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
                        </div>
                    </div>

                    {/* Detailed Area Dimensions Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 8V4a1 1 0 011-1h4M4 8l4 4 4-4m6 0a1 1 0 011-1h4v4M16 8v8a1 1 0 01-1 1H9a1 1 0 01-1-1V8"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Detailed Area Dimensions</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-700">Main Hall</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="main_hall_dimensions" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Dimensions
                                        </label>
                                        <input
                                            id="main_hall_dimensions"
                                            type="text"
                                            placeholder="e.g. 20m x 30m"
                                            value={data.main_hall_dimensions}
                                            onChange={(e) => setData('main_hall_dimensions', e.target.value)}
                                            className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                                errors.main_hall_dimensions
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                            }`}
                                        />
                                        {errors.main_hall_dimensions && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.main_hall_dimensions}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="main_hall_area" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Area
                                        </label>
                                        <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-[#0076A8] focus-within:ring-4 focus-within:ring-blue-100">
                                            <input
                                                id="main_hall_area"
                                                type="text"
                                                value={data.main_hall_area}
                                                onChange={(e) => setData('main_hall_area', e.target.value)}
                                                className="block w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                                placeholder="Enter area"
                                            />
                                            <div className="flex items-center rounded-r-xl border-l border-gray-200 bg-gray-50 px-3">
                                                <span className="text-sm text-gray-500">{data.unit_of_measurement}</span>
                                            </div>
                                        </div>
                                        {errors.main_hall_area && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.main_hall_area}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-700">Office Space</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="office_space_dimensions" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Dimensions
                                        </label>
                                        <input
                                            id="office_space_dimensions"
                                            type="text"
                                            placeholder="e.g. 5m x 8m"
                                            value={data.office_space_dimensions}
                                            onChange={(e) => setData('office_space_dimensions', e.target.value)}
                                            className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                                errors.office_space_dimensions
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                            }`}
                                        />
                                        {errors.office_space_dimensions && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.office_space_dimensions}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="office_space_area" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Area
                                        </label>
                                        <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-[#0076A8] focus-within:ring-4 focus-within:ring-blue-100">
                                            <input
                                                id="office_space_area"
                                                type="text"
                                                value={data.office_space_area}
                                                onChange={(e) => setData('office_space_area', e.target.value)}
                                                className="block w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                                placeholder="Enter area"
                                            />
                                            <div className="flex items-center rounded-r-xl border-l border-gray-200 bg-gray-50 px-3">
                                                <span className="text-sm text-gray-500">{data.unit_of_measurement}</span>
                                            </div>
                                        </div>
                                        {errors.office_space_area && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.office_space_area}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-700">Loading Dock</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="loading_dock_dimensions" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Dimensions
                                        </label>
                                        <input
                                            id="loading_dock_dimensions"
                                            type="text"
                                            placeholder="e.g. 10m x 15m"
                                            value={data.loading_dock_dimensions}
                                            onChange={(e) => setData('loading_dock_dimensions', e.target.value)}
                                            className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                                errors.loading_dock_dimensions
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                            }`}
                                        />
                                        {errors.loading_dock_dimensions && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.loading_dock_dimensions}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="loading_dock_area" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Area
                                        </label>
                                        <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-[#0076A8] focus-within:ring-4 focus-within:ring-blue-100">
                                            <input
                                                id="loading_dock_area"
                                                type="text"
                                                value={data.loading_dock_area}
                                                onChange={(e) => setData('loading_dock_area', e.target.value)}
                                                className="block w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                                placeholder="Enter area"
                                            />
                                            <div className="flex items-center rounded-r-xl border-l border-gray-200 bg-gray-50 px-3">
                                                <span className="text-sm text-gray-500">{data.unit_of_measurement}</span>
                                            </div>
                                        </div>
                                        {errors.loading_dock_area && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.loading_dock_area}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Contact Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label htmlFor="contact_person" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Contact Person
                                </label>
                                <input
                                    id="contact_person"
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.contact_person
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter contact person name"
                                />
                                {errors.contact_person && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.contact_person}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contact_email" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Contact Email
                                </label>
                                <input
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.contact_email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter contact email"
                                />
                                {errors.contact_email && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.contact_email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contact_phone" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Contact Phone
                                </label>
                                <input
                                    id="contact_phone"
                                    type="tel"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.contact_phone
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter contact phone"
                                />
                                {errors.contact_phone && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.contact_phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Information Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Address Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="address" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Street Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.address
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter street address"
                                />
                                {errors.address && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label htmlFor="postal_code" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Postal Code
                                    </label>
                                    <input
                                        id="postal_code"
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.postal_code
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter postal code"
                                    />
                                    {errors.postal_code && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.postal_code}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="city" className="mb-2 block text-sm font-semibold text-gray-700">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.city
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter city"
                                    />
                                    {errors.city && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="country" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.country
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                        placeholder="Enter country"
                                    />
                                    {errors.country && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.country}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Images</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Main Cover Image</h3>
                                <div className="flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-[#0076A8] focus-within:ring-2 focus-within:ring-[#0076A8] focus-within:ring-offset-2 focus-within:outline-none hover:text-[#FF6A1C]"
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
                                {errors.image && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Images</h3>
                                <div className="flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {imagePreviews.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                                {imagePreviews.map((preview, idx) => (
                                                    <div key={idx} className="relative">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${idx + 1}`}
                                                            className="h-32 w-full rounded-md object-cover"
                                                        />
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
                                                        <span className="mt-2 block text-sm font-medium text-[#0076A8]">Add More</span>
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
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-[#0076A8] focus-within:ring-2 focus-within:ring-[#0076A8] focus-within:ring-offset-2 focus-within:outline-none hover:text-[#FF6A1C]"
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
                                {errors.images && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.images}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Building Specifications Card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0H5m14 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5M7 7h10M7 11h10M7 15h6"
                                    />
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-bold text-gray-900">Additional Building Specifications</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label htmlFor="ceiling_height" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Ceiling Height
                                </label>
                                <input
                                    id="ceiling_height"
                                    type="text"
                                    value={data.ceiling_height}
                                    onChange={(e) => setData('ceiling_height', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.ceiling_height
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter ceiling height"
                                />
                                {errors.ceiling_height && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.ceiling_height}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="floor_load_capacity" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Floor Load Capacity
                                </label>
                                <input
                                    id="floor_load_capacity"
                                    type="text"
                                    value={data.floor_load_capacity}
                                    onChange={(e) => setData('floor_load_capacity', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.floor_load_capacity
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter floor load capacity"
                                />
                                {errors.floor_load_capacity && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.floor_load_capacity}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="number_of_loading_docks" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Number of Loading Docks
                                </label>
                                <input
                                    id="number_of_loading_docks"
                                    type="number"
                                    min="0"
                                    value={data.number_of_loading_docks}
                                    onChange={(e) => setData('number_of_loading_docks', parseInt(e.target.value) || 0)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.number_of_loading_docks
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter number of loading docks"
                                />
                                {errors.number_of_loading_docks && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.number_of_loading_docks}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="parking_spaces" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Parking Spaces
                                </label>
                                <input
                                    id="parking_spaces"
                                    type="number"
                                    min="0"
                                    value={data.parking_spaces}
                                    onChange={(e) => setData('parking_spaces', parseInt(e.target.value) || 0)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.parking_spaces
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter parking spaces"
                                />
                                {errors.parking_spaces && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.parking_spaces}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="availability_date" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Availability Date
                                </label>
                                <input
                                    id="availability_date"
                                    type="date"
                                    value={data.availability_date || ''}
                                    onChange={(e) => setData('availability_date', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.availability_date
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                />
                                {errors.availability_date && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.availability_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lease_terms" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Lease Terms
                                </label>
                                <input
                                    id="lease_terms"
                                    type="text"
                                    value={data.lease_terms}
                                    onChange={(e) => setData('lease_terms', e.target.value)}
                                    className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                        errors.lease_terms
                                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter lease terms"
                                />
                                {errors.lease_terms && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.lease_terms}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            style={{ backgroundColor: steelBlue }}
                            className="inline-flex items-center rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005a87')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = steelBlue)}
                        >
                            {processing ? (
                                <>
                                    <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : isEditing ? (
                                'Update Warehouse'
                            ) : (
                                'Create Warehouse'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
