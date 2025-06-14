import { useForm } from '@inertiajs/react';
import { Product } from '@/types/webshop';
import { useState, useRef } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select,SelectContent,SelectItem ,SelectTrigger ,SelectValue} from '@/components/ui/select';
 
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
    setData('features', data.features.filter(f => f.trim()));
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
  const removeFeature = (i: number) => setData('features', data.features.filter((_, idx) => idx !== i));
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
          <a href={route('admin.webshops.index')} className="inline-flex items-center text-sm text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="price">Price (€)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={data.price}
                  onChange={e => setData('price', e.target.value)}
                />
                {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={value => setData('status', value as 'inStock' | 'soldOut')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inStock">In Stock</SelectItem>
                    <SelectItem value="soldOut">Sold Out</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive mt-1">{errors.status}</p>}
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
                  onChange={e => setData('rating', e.target.value)}
                />
                {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Product Image</Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-muted rounded-lg p-4 text-center cursor-pointer"
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="h-40 mx-auto rounded" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={e => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setData('image', null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
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
                {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Features</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" /> Add Feature
              </Button>
            </div>
            <div className="space-y-3">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Input
                    value={feature}
                    onChange={e => updateFeature(idx, e.target.value)}
                    placeholder={`Feature ${idx + 1}`}
                  />
                  {data.features.length > 1 && (
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeFeature(idx)}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" disabled={processing}>
              {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
