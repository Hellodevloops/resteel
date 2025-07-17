import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types/webshop';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

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
        setData(
            'features',
            data.features.filter((f) => f.trim()),
        );
        const inertiaOptions = {
            preserveScroll: true,
            forceFormData: true,
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
        setData(
            'features',
            data.features.filter((_, idx) => idx !== i),
        );
    const updateFeature = (i: number, val: string) => {
        const fs = [...data.features];
        fs[i] = val;
        setData('features', fs);
    };

    return (
        <>
            <Head title={isEditing ? 'Edit Product' : 'Create Product'} />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-6">
                    <a href={route('admin.webshops.index')} className="text-muted-foreground inline-flex items-center text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-destructive mt-1 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="price">Price (€)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                {errors.price && <p className="text-destructive mt-1 text-sm">{errors.price}</p>}
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value as 'inStock' | 'soldOut')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inStock">In Stock</SelectItem>
                                        <SelectItem value="soldOut">Sold Out</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-destructive mt-1 text-sm">{errors.status}</p>}
                            </div>

                            <div>
                                <Label htmlFor="rating">Rating</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', e.target.value)}
                                />
                                {errors.rating && <p className="text-destructive mt-1 text-sm">{errors.rating}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Product Image</Label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-muted cursor-pointer rounded-lg border border-dashed p-4 text-center"
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="mx-auto h-40 rounded" />
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="destructive"
                                                className="absolute top-2 right-2 rounded-full"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setImagePreview(null);
                                                    setData('image', null);
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <Upload className="text-muted mx-auto h-8 w-8" />
                                            <p className="text-muted-foreground text-sm">Click to upload or drag and drop</p>
                                            <p className="text-muted-foreground text-xs">PNG, JPG, GIF images supported</p>
                                        </div>
                                    )}
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>
                                {errors.image && <p className="text-destructive mt-1 text-sm">{errors.image}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-destructive mt-1 text-sm">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <Label>Features</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                <Plus className="mr-2 h-4 w-4" /> Add Feature
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {data.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <Input value={feature} onChange={(e) => updateFeature(idx, e.target.value)} placeholder={`Feature ${idx + 1}`} />
                                    {data.features.length > 1 && (
                                        <Button type="button" size="icon" variant="ghost" onClick={() => removeFeature(idx)}>
                                            <X className="text-muted-foreground h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
