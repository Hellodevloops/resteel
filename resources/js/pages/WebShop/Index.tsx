import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import { CheckCircle, DollarSign, FileText, Heart, Eye, Package, Plus, Save, Star, Tag, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const WebShop = ({ products = [] }) => {
    const [activeTab, setActiveTab] = useState('list');
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: null,
        description: '',
        rating: '5.0',
        status: 'inStock',
        features: [''],
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { flash } = usePage().props;

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file || null,
        }));
        setErrors((prev) => ({ ...prev, image: '' }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData((prev) => ({
            ...prev,
            features: newFeatures,
        }));
        setErrors((prev) => ({ ...prev, features: '' }));
    };

    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, ''],
        }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            features: newFeatures.length ? newFeatures : [''],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', parseFloat(formData.price).toString());
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        formDataToSend.append('description', formData.description);
        formDataToSend.append('rating', parseFloat(formData.rating).toString());
        formDataToSend.append('status', formData.status);
        formData.features.forEach((feature, index) => {
            formDataToSend.append(`features[${index}]`, feature);
        });

        Inertia.post('/webshops', formDataToSend, {
            onSuccess: () => {
                setIsSubmitting(false);
                setErrors({});
                setFormData({
                    name: '',
                    price: '',
                    image: null,
                    description: '',
                    rating: '5.0',
                    status: 'inStock',
                    features: [''],
                });
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
                console.log('Validation errors:', errors);
            },
        });
    };

    const addToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
    };

    return (
        <AppLayout>
            <Head title="WebShop Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <Package className="h-8 w-8 text-orange-500" />
                                    <h1 className="text-3xl font-bold text-slate-800">WebShop Management</h1>
                                </div>
                                <p className="mt-1 text-slate-600">Manage your products and inventory</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className="flex items-center rounded-xl bg-orange-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex gap-4 border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`px-6 py-3 font-semibold transition-all duration-300 ${
                                activeTab === 'list'
                                    ? 'border-b-2 border-orange-500 text-orange-500'
                                    : 'text-slate-600 hover:text-orange-500'
                            }`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`px-6 py-3 font-semibold transition-all duration-300 ${
                                activeTab === 'create'
                                    ? 'border-b-2 border-orange-500 text-orange-500'
                                    : 'text-slate-600 hover:text-orange-500'
                            }`}
                        >
                            Create Product
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {flash?.message && (
                        <div className="mb-6 rounded-xl bg-teal-100 p-4 text-teal-800">{flash.message}</div>
                    )}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-800">
                            <p>Please fix the following errors:</p>
                            <ul className="list-disc pl-5">
                                {Object.entries(errors).map(([field, message]) => (
                                    message && <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'list' && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-slate-700">Our Products</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <div
                                            key={product.id}
                                            className={`group rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                            style={{ transitionDelay: `${600 + index * 100}ms` }}
                                        >
                                            {/* Product Image */}
                                            <div className="relative overflow-hidden rounded-t-2xl">
                                                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                            <div className="text-center">
                                                                <div className="mb-2 text-4xl">🏗️</div>
                                                                <div className="text-sm">Product Image</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Overlay Actions */}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                    <div className="absolute top-4 right-4 flex gap-2">
                                                        <button className="rounded-full bg-white/90 p-2 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-white">
                                                            <Heart className="h-5 w-5" />
                                                        </button>
                                                        <button className="rounded-full bg-white/90 p-2 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-white">
                                                            <Eye className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* Stock Status */}
                                                <div className="absolute top-4 left-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            product.status === 'inStock'
                                                                ? 'bg-teal-500 text-white'
                                                                : 'bg-red-500 text-white'
                                                        }`}
                                                    >
                                                        {product.status === 'inStock' ? 'In Stock' : 'soldOut'}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Product Info */}
                                            <div className="p-6">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <h3 className="text-lg font-bold text-slate-700 transition-colors duration-300 group-hover:text-orange-500">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-sm text-amber-500">
                                                        <Star className="h-4 w-4 fill-current" />
                                                        <span className="text-slate-600">{product.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="mb-4 line-clamp-2 text-sm text-slate-600">{product.description}</p>
                                                {/* Features */}
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {product.features.slice(0, 2).map((feature, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                        {product.features.length > 2 && (
                                                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                                                                +{product.features.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Price and Action */}
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-slate-700">
                                                        €{parseFloat(product.price).toLocaleString()}
                                                    </div>
                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        disabled={product.status !== 'inStock'}
                                                        className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                                                            product.status === 'inStock'
                                                                ? 'bg-orange-500 text-white shadow-lg hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/25'
                                                                : 'cursor-not-allowed bg-slate-200 text-slate-400'
                                                        }`}
                                                    >
                                                        {product.status === 'inStock' ? 'Add to Cart' : 'soldOut'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                                        <Package className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                                        <h3 className="mb-2 text-lg font-medium text-slate-600">No products found</h3>
                                        <p className="text-slate-500">No products available at the moment</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'create' && (
                        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="border-b border-gray-200 px-8 py-6" style={{ backgroundColor: '#003d82' }}>
                                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                                    <Plus className="h-6 w-6" />
                                    Create New Product
                                </h2>
                                <p className="mt-1 text-blue-100">Fill in the details to add a new product to the webshop</p>
                            </div>
                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <Tag className="h-4 w-4" />
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Storage Building 6m x 12m Insulated"
                                                className={`w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.name ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <DollarSign className="h-4 w-4" />
                                                Price (€)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                placeholder="26995.00"
                                                step="0.01"
                                                min="0"
                                                className={`w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.price ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            />
                                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <Package className="h-4 w-4" />
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className={`w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.status ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            >
                                                <option value="inStock">In Stock</option>
                                                <option value="soldOut">soldOut</option>
                                            </select>
                                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <Star className="h-4 w-4" />
                                                Rating
                                            </label>
                                            <input
                                                type="number"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleInputChange}
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                className={`w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.rating ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            />
                                            {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                                        </div>
                                    </div>
                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <ImageIcon className="h-4 w-4" />
                                                Product Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className={`w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.image ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            />
                                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <FileText className="h-4 w-4" />
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Complete building package storage building with premium insulation for temperature control."
                                                rows="4"
                                                className={`w-full resize-none rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                    errors.description ? 'border-red-500' : 'border-[#003d82]'
                                                }`}
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                                <Star className="h-4 w-4" />
                                                Product Features
                                            </label>
                                            <div className="space-y-3">
                                                {formData.features.map((feature, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={feature}
                                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                            placeholder="e.g., Premium Insulation"
                                                            className={`flex-1 rounded-xl border-2 px-4 py-2 transition-all duration-300 focus:ring-2 focus:outline-none ${
                                                                errors.features ? 'border-red-500' : 'border-[#003d82]'
                                                            }`}
                                                        />
                                                        {formData.features.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFeature(index)}
                                                                className="rounded-xl px-3 py-2 text-white transition-all duration-300 hover:scale-105"
                                                                style={{ backgroundColor: '#ea5504' }}
                                                            >
                                                                ×
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                {errors.features && <p className="mt-1 text-sm text-red-600">{errors.features}</p>}
                                                <button
                                                    type="button"
                                                    onClick={addFeature}
                                                    className="w-full rounded-xl border-2 border-dashed px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
                                                    style={{ borderColor: '#003d82', color: '#003d82' }}
                                                >
                                                    + Add Feature
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 border-t border-slate-200 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                        style={{ backgroundColor: '#003d82' }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                Adding Product...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-5 w-5" />
                                                Add Product to WebShop
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </AppLayout>
    );
};

export default WebShop;
