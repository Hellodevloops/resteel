import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import TestimonialForm from './Form';

export default function CreateTestimonial() {
    return (
        <AppLayout>
            <Head title="Create Testimonial - Admin" />

            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('admin.testimonials.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Testimonials
                        </Link>
                    </Button>
                </div>

                <TestimonialForm />
            </div>
        </AppLayout>
    );
}
