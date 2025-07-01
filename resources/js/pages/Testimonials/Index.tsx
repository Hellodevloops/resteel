import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MessageSquare, Plus, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    position?: string;
    company?: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('admin.testimonials.destroy', deleteId), {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Testimonials - Admin" />

            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                        <p className="text-muted-foreground mt-1">Manage customer testimonials and reviews</p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.testimonials.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Testimonial
                        </Link>
                    </Button>
                </div>

                {testimonials.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <MessageSquare className="text-muted-foreground mb-4 h-12 w-12" />
                            <h3 className="text-lg font-semibold">No testimonials yet</h3>
                            <p className="text-muted-foreground mt-2 text-center">Get started by creating your first testimonial.</p>
                            <Button asChild className="mt-4">
                                <Link href={route('admin.testimonials.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add First Testimonial
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="relative">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                                            <CardDescription>
                                                {testimonial.position && testimonial.company
                                                    ? `${testimonial.position} at ${testimonial.company}`
                                                    : testimonial.company || testimonial.position || 'Customer'}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                                            {testimonial.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">"{testimonial.quote}"</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button asChild size="sm" variant="ghost">
                                                <Link href={route('admin.testimonials.show', testimonial.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild size="sm" variant="ghost">
                                                <Link href={route('admin.testimonials.edit', testimonial.id)}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setDeleteId(testimonial.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {/* <div className="text-muted-foreground mt-2 text-xs">Sort Order: {testimonial.sort_order}</div> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the testimonial.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
