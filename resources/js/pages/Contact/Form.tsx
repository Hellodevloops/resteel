import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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
    [key: string]: string | number | null; // Add index signature
}

interface Contact extends ContactFormData {
    id?: number;
}

interface Props {
    contact?: Contact;
    isEditing?: boolean;
}

export default function ContactForm({ contact, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<ContactFormData>({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        company: contact?.company || '',
        message: contact?.message || '',
        status: contact?.status || 'pending',
        type: contact?.type || 'Lead',
        source: contact?.source || 'Website',
        value: contact?.value || null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing && contact?.id) {
            put(`/admin/contacts/${contact.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Add any success handling
                },
            });
        } else {
            post('/admin/contacts', {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Add any success handling
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Contact' : 'Create Contact'} />

            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    {isEditing ? 'Edit Contact' : 'Create Contact'}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    {isEditing
                                        ? 'Update the contact information below.'
                                        : 'Fill in the contact information below to create a new contact.'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={handleSubmit}>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.phone && (
                                                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                value={data.company}
                                                onChange={e => setData('company', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.company && (
                                                <p className="mt-2 text-sm text-red-600">{errors.company}</p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={4}
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.message && (
                                                <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                id="status"
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                            {errors.status && (
                                                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                                            )}
                                        </div>

                                        {/* Type */}
                                        <div>
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                Type
                                            </label>
                                            <select
                                                name="type"
                                                id="type"
                                                value={data.type}
                                                onChange={e => setData('type', e.target.value)}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="Lead">Lead</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Partner">Partner</option>
                                            </select>
                                            {errors.type && (
                                                <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                                            )}
                                        </div>

                                        {/* Source */}
                                        <div>
                                            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                                                Source
                                            </label>
                                            <input
                                                type="text"
                                                name="source"
                                                id="source"
                                                value={data.source}
                                                onChange={e => setData('source', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.source && (
                                                <p className="mt-2 text-sm text-red-600">{errors.source}</p>
                                            )}
                                        </div>

                                        {/* Value */}
                                        <div>
                                            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                                Value
                                            </label>
                                            <input
                                                type="number"
                                                name="value"
                                                id="value"
                                                value={data.value || ''}
                                                onChange={e => setData('value', e.target.value ? parseFloat(e.target.value) : null)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.value && (
                                                <p className="mt-2 text-sm text-red-600">{errors.value}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                        >
                                            {processing ? 'Saving...' : isEditing ? 'Update Contact' : 'Create Contact'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 