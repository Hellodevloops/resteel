import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const steelBlue = '#0076A8';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: string;
    type: string;
    source: string;
    value: number | null;
    alerts: number;
    last_contact: string;
    building_category: string;
    building_type: string;
    building_width: string;
    building_length: string;
    gutter_height: string;
    top_height: string;
}

interface Props {
    contacts: Contact[];
    recentActivity?: Array<{
        id: number;
        action: string;
        contact: string;
        time: string;
        type: string;
    }>;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function ContactList({ contacts: initialContacts, recentActivity = [], flash = {} }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const { delete: destroy } = useForm();

    // Handle flash messages
    useEffect(() => {
        if (flash.success) {
            setShowSuccessAlert(true);
            // Auto-hide success message after 5 seconds
            const timer = setTimeout(() => setShowSuccessAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            destroy(route('admin.contacts.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Add any success handling
                },
            });
        }
    };

    // Filter contacts based on search term
    const filteredContacts = initialContacts.filter((contact) => {
        if (!searchTerm.trim()) return true;

        const searchLower = searchTerm.toLowerCase();
        return (
            (contact.name && contact.name.toLowerCase().includes(searchLower)) ||
            (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
            (contact.phone && contact.phone.toLowerCase().includes(searchLower)) ||
            (contact.company && contact.company.toLowerCase().includes(searchLower)) ||
            (contact.type && contact.type.toLowerCase().includes(searchLower)) ||
            (contact.status && contact.status.toLowerCase().includes(searchLower)) ||
            (contact.building_category && contact.building_category.toLowerCase().includes(searchLower)) ||
            (contact.building_type && contact.building_type.toLowerCase().includes(searchLower))
        );
    });

    return (
        <AppLayout>
            <Head title="Contact List" />

            <div className="min-h-screen bg-gray-100">
                {/* Success Alert */}
                {showSuccessAlert && flash.success && (
                    <div className="fixed top-4 right-4 z-50 max-w-sm sm:max-w-md">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3 shadow-lg sm:p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-xs font-medium text-green-800 sm:text-sm">{flash.success}</p>
                                </div>
                                <button onClick={() => setShowSuccessAlert(false)} className="ml-3 flex-shrink-0 text-green-400 hover:text-green-600">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="border-b border-gray-200 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">Contact List</h1>
                                <p className="mt-1 text-sm text-gray-600 sm:text-base">View and manage your contacts</p>
                            </div>
                            <Link
                                href="/admin/contacts/create"
                                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
                                style={{ backgroundColor: steelBlue }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-4 sm:mb-6">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <div className="mt-2 text-xs text-gray-600 sm:text-sm">
                                Showing {filteredContacts.length} of {initialContacts.length} contacts
                            </div>
                        )}
                    </div>

                    {/* Contact List - Mobile Card View */}
                    <div className="block sm:hidden">
                        <div className="space-y-3">
                            {filteredContacts.map((contact) => (
                                <div key={contact.id} className="rounded-lg bg-white p-4 shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-medium text-gray-900">{contact.name}</h3>
                                            <p className="truncate text-xs text-gray-500">{contact.email}</p>
                                            <p className="truncate text-xs text-gray-500">{contact.phone}</p>
                                            {contact.company && <p className="truncate text-xs text-gray-500">{contact.company}</p>}
                                        </div>
                                        <div className="ml-4 flex items-center space-x-2">
                                            <Link href={`/admin/contacts/${contact.id}`} className="p-1 text-blue-600 hover:text-blue-900">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/contacts/${contact.id}/edit`} className="p-1 text-yellow-600 hover:text-yellow-900">
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(contact.id)} className="p-1 text-red-600 hover:text-red-900">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredContacts.length === 0 && (
                            <div className="rounded-lg bg-white p-6 text-center shadow">
                                <p className="text-sm text-gray-500">No contacts found. Try adjusting your search.</p>
                            </div>
                        )}
                    </div>

                    {/* Contact List - Desktop Table View */}
                    <div className="hidden overflow-hidden rounded-lg bg-white shadow sm:block">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                            Company
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                                                <div className="max-w-xs truncate">{contact.name}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
                                                <div className="max-w-xs truncate">{contact.email}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
                                                <div className="max-w-xs truncate">{contact.phone}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
                                                <div className="max-w-xs truncate">{contact.company}</div>
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm font-medium sm:px-6">
                                                <div className="flex justify-end space-x-3">
                                                    <Link href={`/admin/contacts/${contact.id}`} className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/contacts/${contact.id}/edit`}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                    >
                                                        <Pencil className="h-5 w-5" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(contact.id)} className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredContacts.length === 0 && (
                            <div className="p-6 text-center text-gray-500">No contacts found. Try adjusting your search.</div>
                        )}
                    </div>

                    {/* Recent Activity Section */}
                    {recentActivity.length > 0 && (
                        <div className="mt-6 sm:mt-8">
                            <h2 className="mb-3 text-lg font-medium text-gray-900 sm:mb-4">Recent Activity</h2>
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <ul className="divide-y divide-gray-200">
                                    {recentActivity.map((activity) => (
                                        <li key={activity.id} className="px-4 py-3 sm:px-6 sm:py-4">
                                            <div className="flex items-center">
                                                <div
                                                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                                                        activity.type === 'success'
                                                            ? 'bg-green-400'
                                                            : activity.type === 'warning'
                                                              ? 'bg-yellow-400'
                                                              : 'bg-red-400'
                                                    }`}
                                                />
                                                <div className="ml-3 min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">{activity.action}</p>
                                                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                                                        {activity.contact} • {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
