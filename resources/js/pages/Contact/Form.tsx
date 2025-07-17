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
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">{isEditing ? 'Edit Contact' : 'Create Contact'}</h1>
                        <p className="mt-2 text-sm text-slate-600 sm:text-base">
                            {isEditing ? 'Update the contact information below.' : 'Fill in the contact information below to create a new contact.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-4 shadow sm:p-6 lg:p-8">
                        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full" />
                                {errors.name && <p className="text-xs text-red-600 sm:text-sm">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                    className="w-full"
                                />
                                {(errors.email || validationErrors.email) && (
                                    <p className="text-xs text-red-600 sm:text-sm">{errors.email || validationErrors.email}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    className="w-full"
                                />
                                {(errors.phone || validationErrors.phone) && (
                                    <p className="text-xs text-red-600 sm:text-sm">{errors.phone || validationErrors.phone}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                                    Company
                                </Label>
                                <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} className="w-full" />
                                {errors.company && <p className="text-xs text-red-600 sm:text-sm">{errors.company}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                                Source
                            </Label>
                            <Input id="source" value={data.source} onChange={(e) => setData('source', e.target.value)} className="w-full" />
                            {errors.source && <p className="text-xs text-red-600 sm:text-sm">{errors.source}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                rows={4}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full resize-none"
                            />
                            {errors.message && <p className="text-xs text-red-600 sm:text-sm">{errors.message}</p>}
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end sm:gap-4">
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                {processing ? 'Saving...' : isEditing ? 'Update Contact' : 'Create Contact'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
