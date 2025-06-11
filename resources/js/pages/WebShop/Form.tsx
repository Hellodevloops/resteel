import { useForm } from '@inertiajs/react';
import { Product } from '@/types/webshop';
import { useState, useRef } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  product?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ product, isEditing = false }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: product?.name || '',
    price: product?.price || '',
    description: product?.description || '',
    rating: product?.rating || '0',
    status: product?.status || 'inStock',
    features: product?.features || [''],
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strip out any blank features
    setData('features', data.features.filter(f => f.trim()));

    const inertiaOptions = {
      preserveScroll: true,
      forceFormData: true,
      onError: (errs: Record<string, any>) => {
        console.error('Validation errors:', errs);
      },
    };

    if (isEditing && product) {
      put(route('admin.webshops.update', product.id), inertiaOptions);
    } else {
      post(route('admin.webshops.store'), inertiaOptions);
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
    setData('features', data.features.filter((_, idx) => idx !== i));
  const updateFeature = (i: number, val: string) => {
    const fs = [...data.features];
    fs[i] = val;
    setData('features', fs);
  };

  return (
    <>
      <Head title={isEditing ? 'Edit Product' : 'Create Product'} />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a
            href={route('admin.webshops.index')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                      errors.name ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (€)
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.price}
                      onChange={e => setData('price', e.target.value)}
                      className={`block w-full pl-7 pr-12 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                        errors.price ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={e => setData('status', e.target.value as 'inStock' | 'soldOut')}
                    className={`mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                      errors.status ? 'border-red-300' : ''
                    }`}
                  >
                    <option value="inStock">In Stock</option>
                    <option value="soldOut">Sold Out</option>
                  </select>
                  {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={data.rating}
                    onChange={e => setData('rating', e.target.value)}
                    className={`mt-1 block w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                      errors.rating ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-lg border-2 border-dashed border-gray-200 p-6 text-center hover:border-orange-500 transition-colors duration-200 cursor-pointer ${
                      errors.image ? 'border-red-300' : ''
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-48 w-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setData('image', null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-orange-500 hover:text-orange-600">
                            Click to upload
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className={`mt-1 block w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                      errors.description ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>
              <div className="space-y-3">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={e => updateFeature(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
                      className={`flex-1 rounded-lg border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 ${
                        errors[`features.${idx}`] ? 'border-red-300' : ''
                      }`}
                    />
                    {data.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="p-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.features && <p className="mt-2 text-sm text-red-600">{errors.features}</p>}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
