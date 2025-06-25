import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AlertCircle, Package, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductForm from './Form';

export default function Create({ errors: serverErrors = {}, flash = {} }) {
    const [clientErrors, setClientErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Handle server-side validation errors
    const hasServerErrors = Object.keys(serverErrors).length > 0;

    // Handle flash messages
    useEffect(() => {
        if (flash.success) {
            setShowSuccessAlert(true);
            // Auto-hide success message after 5 seconds
            const timer = setTimeout(() => setShowSuccessAlert(false), 5000);
            return () => clearTimeout(timer);
        }
        if (flash.error) {
            setShowErrorAlert(true);
        }
    }, [flash]);

    // Handle form submission errors
    const handleFormError = (error) => {
        setIsLoading(false);

        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 422:
                    // Validation errors - handled by Inertia automatically
                    break;
                case 413:
                    setClientErrors(['File size too large. Please upload smaller images.']);
                    break;
                case 429:
                    setClientErrors(['Too many requests. Please wait a moment before trying again.']);
                    break;
                case 500:
                    setClientErrors(['Server error occurred. Please try again later.']);
                    break;
                default:
                    setClientErrors([data?.message || 'An unexpected error occurred.']);
            }
        } else if (error.request) {
            // Network error
            setClientErrors(['Network error. Please check your connection and try again.']);
        } else {
            // Other error
            setClientErrors(['An unexpected error occurred. Please try again.']);
        }

        setShowErrorAlert(true);
    };

    // Handle form submission start
    const handleFormStart = () => {
        setIsLoading(true);
        setClientErrors([]);
        setShowErrorAlert(false);
    };

    // Clear specific error
    const clearError = (index) => {
        setClientErrors((prev) => prev.filter((_, i) => i !== index));
        if (clientErrors.length === 1) {
            setShowErrorAlert(false);
        }
    };

    // Get all errors (server + client)
    const allErrors = [
        ...Object.values(serverErrors || {})
            .flat()
            .filter(Boolean),
        ...clientErrors.filter(Boolean),
    ];

    return (
        <AppLayout>
            <Head title="Create Product - WebShop Admin" />

            <div className="min-h-screen bg-slate-50">
                {/* Success Alert */}
                {showSuccessAlert && flash.success && (
                    <div className="fixed top-4 right-4 z-50 max-w-md">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-green-800">{flash.success}</p>
                                </div>
                                <button onClick={() => setShowSuccessAlert(false)} className="ml-3 flex-shrink-0 text-green-400 hover:text-green-600">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Alert */}
                {(showErrorAlert || hasServerErrors) && allErrors.length > 0 && (
                    <div className="fixed top-4 right-4 z-50 max-w-md">
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3 flex-1">
                                    <h3 className="text-sm font-medium text-red-800">
                                        {allErrors.length === 1 ? 'Error' : `${allErrors.length} Errors`}
                                    </h3>
                                    <div className="mt-2 space-y-1">
                                        {allErrors.map((error, index) => (
                                            <div key={index} className="flex items-start justify-between">
                                                <p className="text-sm text-red-700">{String(error)}</p>
                                                <button
                                                    onClick={() => clearError(index)}
                                                    className="ml-2 flex-shrink-0 text-red-400 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowErrorAlert(false);
                                        setClientErrors([]);
                                    }}
                                    className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow">
                                    <Package className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                                    Create New Product <Sparkles className="h-5 w-5 text-amber-500" />
                                </h1>
                                <p className="mt-1 text-slate-600">Add a new product to your inventory.</p>
                                <div className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                                    <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                                    Auto-save enabled
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-12">
                    {/* Form */}
                    <div className="lg:col-span-8">
                        <div className="rounded-2xl bg-white p-8 shadow">
                            <h2 className="mb-1 text-xl font-semibold text-slate-800">Product Information</h2>
                            <p className="mb-6 text-sm text-slate-600">Fill in the form to create your product.</p>

                            {/* Form Error Summary */}
                            {hasServerErrors && (
                                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                                    <div className="flex">
                                        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
                                            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-700">
                                                {Object.entries(serverErrors || {})
                                                    .map(([field, fieldErrors]) =>
                                                        Array.isArray(fieldErrors) ? (
                                                            fieldErrors.map((error, index) => (
                                                                <li key={`${field}-${index}`}>
                                                                    <span className="font-medium capitalize">{field.replace('_', ' ')}:</span>{' '}
                                                                    {String(error)}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li key={field}>
                                                                <span className="font-medium capitalize">{field.replace('_', ' ')}:</span>{' '}
                                                                {String(fieldErrors)}
                                                            </li>
                                                        ),
                                                    )
                                                    .flat()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <ProductForm onError={handleFormError} onStart={handleFormStart} isLoading={isLoading} errors={serverErrors} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-4">
                        <div className="rounded-2xl border bg-white p-6 shadow">
                            <h3 className="flex items-center text-sm font-medium text-purple-900">
                                <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                                SEO Preview
                            </h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-xs font-medium text-blue-600">Your Store › Products</p>
                                <p className="text-lg font-medium text-slate-800">New Product Title</p>
                                <p className="text-sm text-slate-600">This is how your product may appear in search results.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 shadow">
                            <h3 className="flex items-center text-sm font-semibold text-amber-800">
                                <Sparkles className="mr-2 h-4 w-4 text-amber-600" />
                                Pro Tips
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-amber-700">
                                <li className="flex items-start">
                                    <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    Use high-quality images for better conversions.
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    Write detailed descriptions with keywords.
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    Set competitive pricing for your market.
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    Double-check all fields before submitting.
                                </li>
                            </ul>
                        </div>

                        {/* Error Prevention Tips */}
                        {(hasServerErrors || clientErrors.length > 0) && (
                            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 shadow">
                                <h3 className="flex items-center text-sm font-semibold text-red-800">
                                    <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                                    Common Issues
                                </h3>
                                <ul className="mt-4 space-y-3 text-sm text-red-700">
                                    <li className="flex items-start">
                                        <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                        Ensure all required fields are filled.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                        Upload high-quality images for better presentation.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                        Verify price format (numbers only).
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
