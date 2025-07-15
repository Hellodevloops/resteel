import { AreaDimension, Warehouse } from '@/types/warehouse';
import { router, useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    warehouse?: Warehouse;
    isEditing?: boolean;
}

type FormData = {
    name: string;
    location: string;
    status: 'active' | 'leased' | 'under_maintenance' | 'coming_soon' | 'inactive' | 'sale' | 'sold';
    capacity: string;
    occupied: string;
    occupancy_rate: number;
    type: string;
    last_inspection: string;
    revenue: string;
    alerts: number;
    description: string;
    construction: string;
    year_built: string;
    price: string;
    total_area: string;
    has_video: boolean;
    video_urls: string[];
    features: string[];
    area_dimensions: { name: string; dimensions: string; area: string }[];
    category: string;
    image: File | null;
    images: File[];
    contact_person: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    ceiling_height: string;
    floor_load_capacity: string;
    number_of_loading_docks: number;
    parking_spaces: number;
    security_features: string[];
    utilities: string[];
    certificates: string[];
    availability_date: string;
    lease_terms: string;
    unit_of_measurement: string;
};

export default function WarehouseForm({ warehouse, isEditing = false }: Props) {
    const steelBlue = '#0076A8';
    const { data, setData, processing, errors, reset, setError } = useForm<FormData>({
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
        video_urls: warehouse?.video_urls?.filter((url): url is string => url !== null) || [''],
        features: warehouse?.features?.filter((feature): feature is string => feature !== null) || [''],
        area_dimensions: warehouse?.area_dimensions || [{ name: 'Main Hall', dimensions: '', area: '' }],
        category: warehouse?.category || '',
        image: null,
        images: [],
        contact_person: warehouse?.contact_person || '',
        contact_email: warehouse?.contact_email || '',
        contact_phone: warehouse?.contact_phone || '',
        address: warehouse?.address || '',
        postal_code: warehouse?.postal_code || '',
        city: warehouse?.city || '',
        country: warehouse?.country || '',
        ceiling_height: warehouse?.ceiling_height || '',
        floor_load_capacity: warehouse?.floor_load_capacity || '',
        number_of_loading_docks: warehouse?.number_of_loading_docks || 0,
        parking_spaces: warehouse?.parking_spaces || 0,
        security_features: warehouse?.security_features?.filter((feature): feature is string => feature !== null) || [''],
        utilities: warehouse?.utilities?.filter((utility): utility is string => utility !== null) || [''],
        certificates: warehouse?.certificates?.filter((cert): cert is string => cert !== null) || [''],
        availability_date: warehouse?.availability_date ? formatDate(warehouse.availability_date) : '',
        lease_terms: warehouse?.lease_terms || '',
        unit_of_measurement: warehouse?.unit_of_measurement || 'm²',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(warehouse?.image_path || null);
    const [imagePreviews, setImagePreviews] = useState<string[]>(warehouse?.additional_images || []);
    const [removeMainImage, setRemoveMainImage] = useState<boolean>(false);
    const [removeAdditionalImages, setRemoveAdditionalImages] = useState<boolean>(false);
    const [existingImagesToRemove, setExistingImagesToRemove] = useState<number[]>([]);
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
                // Reset existing images to remove when component initializes
                setExistingImagesToRemove([]);
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

    const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
        const newErrors: Record<string, string> = {};

        // Required fields
        if (!data.name.trim()) newErrors.name = 'Warehouse name is required';
        if (!data.location.trim()) newErrors.location = 'Location is required';
        if (!data.status) newErrors.status = 'Status is required';

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

        // File size validation
        if (data.image && data.image.size > 10 * 1024 * 1024) {
            newErrors.image = 'Main image must be less than 10MB';
        }
        if (data.images.some((img) => img.size > 10 * 1024 * 1024)) {
            newErrors.images = 'Additional images must be less than 10MB each';
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
                    if (field in data) {
                        setError(field as keyof FormData, message);
                    }
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

            // Clean up area dimensions
            formData.area_dimensions = (formData.area_dimensions || []).filter((dim) => dim.name && dim.name.trim());

            // Ensure empty arrays
            if (formData.features.length === 0) formData.features = [''];
            if (formData.video_urls.length === 0) formData.video_urls = [''];
            if (formData.security_features.length === 0) formData.security_features = [''];
            if (formData.utilities.length === 0) formData.utilities = [''];
            if (formData.certificates.length === 0) formData.certificates = [''];
            if (formData.area_dimensions.length === 0) formData.area_dimensions = [];

            // Create FormData object for file uploads
            const submitFormData = new FormData();

            // Add all text fields to FormData
            Object.keys(formData).forEach((key) => {
                if (key !== 'image' && key !== 'images') {
                    if (key === 'area_dimensions') {
                        // Handle area_dimensions as array of objects
                        const areaDimensions = formData[key as keyof typeof formData] as { name: string; dimensions: string; area: string }[];
                        areaDimensions.forEach((dimension, index) => {
                            submitFormData.append(`${key}[${index}][name]`, dimension.name || '');
                            submitFormData.append(`${key}[${index}][dimensions]`, dimension.dimensions || '');
                            submitFormData.append(`${key}[${index}][area]`, dimension.area || '');
                        });
                    } else if (Array.isArray(formData[key as keyof typeof formData])) {
                        (formData[key as keyof typeof formData] as string[]).forEach((value: string, index: number) => {
                            submitFormData.append(`${key}[${index}]`, value);
                        });
                    } else if (formData[key as keyof typeof formData] !== null && formData[key as keyof typeof formData] !== undefined) {
                        const value = formData[key as keyof typeof formData];
                        // Handle boolean values properly for Laravel
                        if (typeof value === 'boolean') {
                            submitFormData.append(key, value ? '1' : '0');
                        } else {
                            submitFormData.append(key, String(value));
                        }
                    }
                }
            });

            // Add main image only if it's a valid File
            if (formData.image && formData.image instanceof File && formData.image.size > 0) {
                submitFormData.append('image', formData.image);
                // Reset removal flag when new image is uploaded
                setRemoveMainImage(false);
            } else if (removeMainImage && isEditing) {
                // Mark main image for removal
                submitFormData.append('remove_main_image', '1');
            }

            // Add additional images only if they are valid Files
            if (formData.images && formData.images.length > 0) {
                const validImages = formData.images.filter((image) => image instanceof File && image.size > 0);
                console.log('Valid additional images found:', validImages.length);
                if (validImages.length > 0) {
                    validImages.forEach((image, index) => {
                        submitFormData.append(`images[${index}]`, image);
                        console.log(`Added image ${index}:`, image.name, image.size);
                    });
                    // Reset removal flag when new images are uploaded
                    setRemoveAdditionalImages(false);
                }
            } else if (removeAdditionalImages && isEditing) {
                // Mark additional images for removal
                submitFormData.append('remove_additional_images', '1');
                console.log('Marked additional images for removal');
            } else if (isEditing && warehouse?.additional_images && warehouse.additional_images.length > 0) {
                // If we're editing and there are existing images, but no new images uploaded and no removal requested,
                // we need to preserve the existing images by not sending any images field
                console.log('Preserving existing additional images:', warehouse.additional_images.length);
            } else {
                console.log('No additional images to process');
            }

            // Add existing images to remove if any
            if (existingImagesToRemove.length > 0) {
                existingImagesToRemove.forEach((index) => {
                    submitFormData.append('existing_images_to_remove[]', index.toString());
                });
                console.log('Marked existing images for removal:', existingImagesToRemove);
            }

            console.log('Current data.images:', data.images);
            console.log('Current imagePreviews:', imagePreviews);

            // Debug: Log FormData contents for troubleshooting
            console.log('FormData contents:');
            for (const [key, value] of submitFormData.entries()) {
                console.log(`${key}:`, value);
            }
            console.log('Image removal flags:', { removeMainImage, removeAdditionalImages });

            // Submit the form
            if (isEditing && warehouse) {
                // For file uploads with PUT requests, use POST with _method field
                // This is more reliable than using put() directly with FormData
                submitFormData.append('_method', 'PUT');
                router.post(route('admin.warehouses.update', warehouse.id), submitFormData, {
                    preserveScroll: true,
                    forceFormData: true,
                    onSuccess: () => {
                        toast.success('Warehouse updated successfully');
                    },
                    onError: (errs: Record<string, string>) => {
                        toast.error('Failed to submit form. Please check the errors.');
                        console.error('Server validation errors:', errs);
                    },
                    onFinish: () => {
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        if (multipleFileInputRef.current) multipleFileInputRef.current.value = '';
                    },
                });
            } else {
                router.post(route('admin.warehouses.store'), submitFormData, {
                    preserveScroll: true,
                    forceFormData: true,
                    onSuccess: () => {
                        toast.success('Warehouse created successfully');
                        reset();
                        setImagePreview(null);
                        setImagePreviews([]);
                    },
                    onError: (errs: Record<string, string>) => {
                        toast.error('Failed to submit form. Please check the errors.');
                        console.error('Server validation errors:', errs);
                    },
                    onFinish: () => {
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        if (multipleFileInputRef.current) multipleFileInputRef.current.value = '';
                    },
                });
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
            setRemoveMainImage(false); // Reset removal flag when new image is selected
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

    const handleRemoveMainImage = () => {
        setData('image', null);
        setImagePreview(null);
        setRemoveMainImage(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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

            // Add new files to existing images array
            setData('images', [...data.images, ...newFiles]);
            setRemoveAdditionalImages(false); // Reset removal flag when new images are selected

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

    const handleRemoveAdditionalImages = () => {
        setData('images', []);
        setImagePreviews([]);
        setRemoveAdditionalImages(true);
        setExistingImagesToRemove([]);
        if (multipleFileInputRef.current) {
            multipleFileInputRef.current.value = '';
        }
    };

    const handleRemoveIndividualImage = (index: number) => {
        // Check if this is an existing image (from warehouse data) or a new image
        const existingImagesCount = warehouse?.additional_images?.length || 0;

        if (index < existingImagesCount) {
            // This is an existing image - mark it for removal
            setExistingImagesToRemove((prev) => [...prev, index]);
        } else {
            // This is a new image - remove it from the new images array
            const newImages = [...data.images];
            const newImageIndex = index - existingImagesCount;
            newImages.splice(newImageIndex, 1);
            setData('images', newImages);
        }

        // Remove from previews
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
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

    // Area Dimensions Management Functions
    const addAreaDimension = () => {
        try {
            setData('area_dimensions', [...data.area_dimensions, { name: '', dimensions: '', area: '' }]);
        } catch (error) {
            console.error('Error adding area dimension:', error);
            toast.error('Failed to add area dimension');
        }
    };

    const removeAreaDimension = (index: number) => {
        try {
            setData(
                'area_dimensions',
                data.area_dimensions.filter((_, idx) => idx !== index),
            );
        } catch (error) {
            console.error('Error removing area dimension:', error);
            toast.error('Failed to remove area dimension');
        }
    };

    const updateAreaDimension = (index: number, field: keyof AreaDimension, value: string) => {
        try {
            const dimensions = [...data.area_dimensions];
            dimensions[index] = { ...dimensions[index], [field]: value };
            setData('area_dimensions', dimensions);
        } catch (error) {
            console.error('Error updating area dimension:', error);
            toast.error('Failed to update area dimension');
        }
    };

    // Add status options including all available statuses
    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'leased', label: 'Leased' },
        { value: 'under_maintenance', label: 'Under Maintenance' },
        { value: 'coming_soon', label: 'Coming Soon' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'sale', label: 'For Sale' },
        { value: 'sold', label: 'Sold' },
    ];

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
                                    <p className="mt-1 text-sm text-red-700">{'Please correct the errors in the form before proceeding'}</p>
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
                                        onChange={(e) => setData('status', e.target.value as FormData['status'])}
                                        className={`block w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none ${
                                            errors.status
                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100'
                                        }`}
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="has_video" className="flex items-center">
                                        <input
                                            id="has_video"
                                            type="checkbox"
                                            checked={data.has_video}
                                            onChange={(e) => setData('has_video', e.target.checked)}
                                            className="rounded border-gray-300 text-[#0076A8] shadow-sm focus:border-[#0076A8] focus:ring-[#0076A8]"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Has Video Content</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
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

                    {/* Video URLs section - only shown when has_video is true */}
                    {data.has_video && (
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                            <div className="mb-6 flex items-center">
                                <div className="rounded-lg p-2" style={{ backgroundColor: `${steelBlue}15` }}>
                                    <svg className="h-6 w-6" style={{ color: steelBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="ml-4 text-xl font-bold text-gray-900">Video Content</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-700">Video URLs</label>
                                    <button
                                        type="button"
                                        onClick={addVideoUrl}
                                        className="inline-flex items-center bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#0076A8] transition-colors duration-200 hover:bg-orange-100"
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
                        </div>
                    )}

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

                    {/* Detailed Area Dimensions Card - Now Repeatable */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center">
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
                            <button
                                type="button"
                                onClick={addAreaDimension}
                                className="flex items-center rounded-lg bg-[#0076A8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005a85]"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Area
                            </button>
                        </div>

                        <div className="space-y-6">
                            {data.area_dimensions.map((dimension, index) => (
                                <div key={index} className="relative rounded-xl border border-gray-200 p-6">
                                    {data.area_dimensions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAreaDimension(index)}
                                            className="absolute top-4 right-4 rounded-full bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div>
                                            <label htmlFor={`area-name-${index}`} className="mb-2 block text-sm font-semibold text-gray-700">
                                                Area Name
                                            </label>
                                            <input
                                                id={`area-name-${index}`}
                                                type="text"
                                                placeholder="e.g. Main Hall"
                                                value={dimension.name}
                                                onChange={(e) => updateAreaDimension(index, 'name', e.target.value)}
                                                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor={`area-dimensions-${index}`} className="mb-2 block text-sm font-semibold text-gray-700">
                                                Dimensions
                                            </label>
                                            <input
                                                id={`area-dimensions-${index}`}
                                                type="text"
                                                placeholder="e.g. 20m x 30m"
                                                value={dimension.dimensions}
                                                onChange={(e) => updateAreaDimension(index, 'dimensions', e.target.value)}
                                                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-[#0076A8] focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor={`area-area-${index}`} className="mb-2 block text-sm font-semibold text-gray-700">
                                                Area
                                            </label>
                                            <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-[#0076A8] focus-within:ring-4 focus-within:ring-blue-100">
                                                <input
                                                    id={`area-area-${index}`}
                                                    type="text"
                                                    value={dimension.area}
                                                    onChange={(e) => updateAreaDimension(index, 'area', e.target.value)}
                                                    className="block w-full rounded-l-xl border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                                    placeholder="Enter area"
                                                />
                                                <div className="flex items-center rounded-r-xl border-l border-gray-200 bg-gray-50 px-3">
                                                    <span className="text-sm text-gray-500">{data.unit_of_measurement}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {data.area_dimensions.length === 0 && (
                                <div className="py-8 text-center text-gray-500">
                                    <p>No area dimensions added yet. Click "Add Area" to get started.</p>
                                </div>
                            )}
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
                                                    onClick={handleRemoveMainImage}
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
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF, AVIF up to 10MB</p>
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
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Additional Images</h3>
                                    {(imagePreviews.length > 0 ||
                                        (isEditing && warehouse?.additional_images && warehouse.additional_images.length > 0)) && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveAdditionalImages}
                                            className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-red-600"
                                        >
                                            Remove All
                                        </button>
                                    )}
                                </div>
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
                                                            onClick={() => handleRemoveIndividualImage(idx)}
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
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF, AVIF up to 10MB each</p>
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
