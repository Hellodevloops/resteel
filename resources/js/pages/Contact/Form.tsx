import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: string;
    type: string;
    source: string;
    value: number | null;
    building_category: string;
    building_type: string;
    building_width: string;
    building_length: string;
    gutter_height: string;
    top_height: string;
    [key: string]: string | number | null | undefined;
}

interface Contact extends ContactFormData {
    id: number;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    contact?: Contact;
    isEditing?: boolean;
}

export default function ContactForm({ contact, isEditing = false }: Props) {
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const { data, setData, post, put, processing, errors } = useForm({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        company: contact?.company || '',
        message: contact?.message || '',
        status: contact?.status || 'pending',
        type: contact?.type || 'Lead',
        source: contact?.source || 'Website',
        value: contact?.value || null,
        building_category: contact?.building_category || '',
        building_type: contact?.building_type || '',
        building_width: contact?.building_width || '',
        building_length: contact?.building_length || '',
        gutter_height: contact?.gutter_height || '',
        top_height: contact?.top_height || '',
    });

    // Validation functions
    const validateEmail = (email: string): string => {
        if (!email) return '';

        // Check if email contains uppercase letters
        if (email !== email.toLowerCase()) {
            return 'Email must be all lowercase';
        }

        // Basic email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address (e.g., test@domain.com)';
        }

        return '';
    };

    const validatePhone = (phone: string): string => {
        if (!phone) return '';

        // Remove any non-numeric characters for validation
        const numericOnly = phone.replace(/\D/g, '');

        // Check if input contains non-numeric characters
        if (numericOnly.length !== phone.length) {
            return 'Phone number can only contain numeric digits';
        }

        // Check maximum length
        if (numericOnly.length > 12) {
            return 'Phone number cannot exceed 12 digits';
        }

        return '';
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate email
        const emailError = validateEmail(data.email);
        if (emailError) {
            newErrors.email = emailError;
        }

        // Validate phone
        const phoneError = validatePhone(data.phone);
        if (phoneError) {
            newErrors.phone = phoneError;
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!validateForm()) {
            return;
        }

        if (isEditing && contact?.id) {
            put(`/admin/contacts/${contact.id}`);
        } else {
            post('/admin/contacts');
        }
    };

    const handleEmailChange = (value: string) => {
        const lowerCaseValue = value.toLowerCase();
        setData('email', lowerCaseValue);

        // Clear validation errors when user starts typing
        if (validationErrors.email) {
            setValidationErrors((prev) => ({
                ...prev,
                email: '',
            }));
        }

        // Real-time validation for email
        const emailError = validateEmail(lowerCaseValue);
        if (emailError) {
            setValidationErrors((prev) => ({
                ...prev,
                email: emailError,
            }));
        }
    };

    const handlePhoneChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        setData('phone', numericValue);

        // Clear validation errors when user starts typing
        if (validationErrors.phone) {
            setValidationErrors((prev) => ({
                ...prev,
                phone: '',
            }));
        }

        // Real-time validation for phone
        const phoneError = validatePhone(numericValue);
        if (phoneError) {
            setValidationErrors((prev) => ({
                ...prev,
                phone: phoneError,
            }));
        }
    };

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Contact' : 'Create Contact'} />
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-3xl px-4 py-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Contact' : 'Create Contact'}</h1>
                        <p className="mt-2 text-slate-600">
                            {isEditing ? 'Update the contact information below.' : 'Fill in the contact information below to create a new contact.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => handleEmailChange(e.target.value)} />
                                {(errors.email || validationErrors.email) && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email || validationErrors.email}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" value={data.phone} onChange={(e) => handlePhoneChange(e.target.value)} />
                                {(errors.phone || validationErrors.phone) && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone || validationErrors.phone}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="source">Source</Label>
                            <Input id="source" value={data.source} onChange={(e) => setData('source', e.target.value)} />
                            {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source}</p>}
                        </div>

                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={4} value={data.message} onChange={(e) => setData('message', e.target.value)} />
                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        </div>

                        <div className="pt-4 text-right">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : isEditing ? 'Update Contact' : 'Create Contact'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
