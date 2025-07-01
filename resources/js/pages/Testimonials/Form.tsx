import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { MessageSquare, RefreshCw, Save, Star } from 'lucide-react';

interface Testimonial {
    id?: number;
    quote: string;
    author: string;
    position?: string;
    company?: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    testimonial?: Testimonial;
    isEditing?: boolean;
}

export default function TestimonialForm({ testimonial, isEditing = false }: Props) {
    const { data, setData, processing, errors, reset, post, put } = useForm<Testimonial>({
        quote: testimonial?.quote || '',
        author: testimonial?.author || '',
        position: testimonial?.position || '',
        company: testimonial?.company || '',
        rating: testimonial?.rating || 5,
        is_active: testimonial?.is_active ?? true,
        sort_order: testimonial?.sort_order || 999,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && testimonial?.id) {
            put(route('admin.testimonials.update', testimonial.id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
            });
        } else {
            post(route('admin.testimonials.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
            });
        }
    };

    const handleReset = () => {
        reset();
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{isEditing ? 'Edit Testimonial' : 'Create Testimonial'}</h2>
                    <p className="text-muted-foreground">{isEditing ? 'Update the testimonial details' : 'Add a new customer testimonial'}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Testimonial Content */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Testimonial Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="quote">Quote *</Label>
                            <Textarea
                                id="quote"
                                value={data.quote}
                                onChange={(e) => setData('quote', e.target.value)}
                                placeholder="Enter the testimonial quote..."
                                rows={4}
                                required
                                className={errors.quote ? 'border-red-500' : ''}
                            />
                            {errors.quote && <p className="text-sm text-red-600">{errors.quote}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="author">Author Name *</Label>
                                <Input
                                    id="author"
                                    type="text"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className={errors.author ? 'border-red-500' : ''}
                                />
                                {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    placeholder="ABC Corporation"
                                />
                                {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    placeholder="CEO"
                                />
                                {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                            </div>

                            <div className="space-y-2">
                                {/* <Label htmlFor="sort_order">Sort Order</Label> */}
                                {/* <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    placeholder="999"
                                    min="0"
                                />
                                {errors.sort_order && <p className="text-sm text-red-600">{errors.sort_order}</p>} */}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setData('rating', star)} className="focus:outline-none">
                                        <Star
                                            className={`h-6 w-6 ${
                                                star <= data.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                                            } transition-colors hover:fill-yellow-400 hover:text-yellow-400`}
                                        />
                                    </button>
                                ))}
                                <span className="text-muted-foreground ml-2 text-sm">{data.rating} / 5</span>
                            </div>
                            {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                            <Label htmlFor="is_active">Active</Label>
                            <span className="text-muted-foreground text-sm">({data.is_active ? 'Visible on website' : 'Hidden from website'})</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={handleReset} disabled={processing}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
