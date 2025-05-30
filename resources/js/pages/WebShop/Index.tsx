import { CheckCircle, DollarSign, FileText, Image, Package, Plus, Save, Star, Tag } from 'lucide-react';
import { useState } from 'react';

const WarehouseDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        category: 'insulated',
        description: '',
        rating: 5.0,
        inStock: true,
        features: [''],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { id: 'insulated', name: 'Insulated Buildings' },
        { id: 'non-insulated', name: 'Non-Insulated' },
        { id: 'workshop', name: 'Workshops' },
        { id: 'garage', name: 'Garages' },
        { id: 'agricultural', name: 'Agricultural' },
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData((prev) => ({
            ...prev,
            features: newFeatures,
        }));
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
            features: newFeatures.length > 0 ? newFeatures : [''],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            alert('Product added successfully!');
        }, 2000);
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#656356' }}>
            {/* Header */}
            <div className="border-b" style={{ backgroundColor: '#003d82', borderColor: '#454545' }}>
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex items-center gap-3">
                        <Package className="h-8 w-8 text-white" />
                        <h1 className="text-2xl font-bold text-white">Warehouse Management Dashboard</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-6 py-8">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                    {/* Form Header */}
                    <div className="border-b border-gray-200 px-8 py-6" style={{ backgroundColor: '#003d82' }}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                            <Plus className="h-6 w-6" />
                            Add New Warehouse Product
                        </h2>
                        <p className="mt-1 text-blue-100">Fill in the details to add a new product to the warehouse inventory</p>
                    </div>

                    <div className="p-8">
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
                                        className="w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    />
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
                                        className="w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                        <Package className="h-4 w-4" />
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
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
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        className="w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    />
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="inStock"
                                            checked={formData.inStock}
                                            onChange={handleInputChange}
                                            className="h-5 w-5 rounded focus:ring-2"
                                            style={{ accentColor: '#003d82' }}
                                        />
                                        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                            <CheckCircle className="h-4 w-4" />
                                            Product In Stock
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: '#454545' }}>
                                        <Image className="h-4 w-4" />
                                        Product Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="/assets/product-image.webp"
                                        className="w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    />
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
                                        className="w-full resize-none rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none"
                                        style={{ borderColor: '#003d82' }}
                                    />
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
                                                    className="flex-1 rounded-lg border-2 px-4 py-2 transition-all duration-300 focus:ring-2 focus:outline-none"
                                                    style={{ borderColor: '#003d82' }}
                                                />
                                                {formData.features.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeature(index)}
                                                        className="rounded-lg px-3 py-2 text-white transition-all duration-300 hover:scale-105"
                                                        style={{ backgroundColor: '#ea5504' }}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="w-full rounded-lg border-2 border-dashed px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
                                            style={{ borderColor: '#003d82', color: '#003d82' }}
                                        >
                                            + Add Feature
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <button
                                onClick={handleSubmit}
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
                                        Add Product to Warehouse
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarehouseDashboard;
