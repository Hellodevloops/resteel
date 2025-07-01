import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit3, Hash, MessageSquare, Star, User } from 'lucide-react';

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
    testimonial: Testimonial;
}

export default function ShowTestimonial({ testimonial }: Props) {
    return (
        <AppLayout>
            <Head title={`${testimonial.author} - Testimonial Details`} />

            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('admin.testimonials.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Testimonials
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('admin.testimonials.edit', testimonial.id)}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Testimonial
                        </Link>
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Quote Card */}
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    Testimonial Quote
                                </div>
                                <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                                    {testimonial.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="border-primary border-l-4 pl-4 text-lg italic">"{testimonial.quote}"</blockquote>
                            <div className="mt-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="text-muted-foreground ml-2 text-sm">{testimonial.rating} out of 5 stars</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Author Information */}
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Author Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-muted-foreground text-sm">Name</p>
                                <p className="text-lg font-medium">{testimonial.author}</p>
                            </div>
                            {(testimonial.position || testimonial.company) && (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {testimonial.position && (
                                        <div>
                                            <p className="text-muted-foreground text-sm">Position</p>
                                            <p className="font-medium">{testimonial.position}</p>
                                        </div>
                                    )}
                                    {testimonial.company && (
                                        <div>
                                            <p className="text-muted-foreground text-sm">Company</p>
                                            <p className="font-medium">{testimonial.company}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Additional Details */}
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Hash className="mr-2 h-5 w-5" />
                                Additional Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* <div>
                                    <p className="text-muted-foreground text-sm">Sort Order</p>
                                    <p className="font-medium">{testimonial.sort_order}</p>
                                </div> */}
                                <div>
                                    <p className="text-muted-foreground text-sm">Status</p>
                                    <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                                        {testimonial.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-muted-foreground text-sm">Created</p>
                                    <p className="font-medium">{new Date(testimonial.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Last Updated</p>
                                    <p className="font-medium">{new Date(testimonial.updated_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
