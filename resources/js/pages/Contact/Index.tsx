import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Pencil, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';

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
}

export default function ContactList({ contacts: initialContacts, recentActivity = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const { delete: destroy } = useForm();

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
                {/* Header */}
                <div className="border-b border-gray-200 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Contact List</h1>
                                <p className="mt-1 text-gray-600">View and manage your contacts</p>
                            </div>
                            <Link
                                href="/admin/contacts/create"
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                style={{ backgroundColor: steelBlue }}
                            >
                                Add New Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search contacts by name, email, phone, company, type, status, or building details..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            <div className="mt-2 text-sm text-gray-600">
                                Showing {filteredContacts.length} of {initialContacts.length} contacts
                            </div>
                        )}
                    </div>

                    {/* Contact List */}
                    <div className="overflow-hidden bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Building</th> */}
                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{contact.name}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{contact.email}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{contact.phone}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{contact.company}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                    contact.type === 'Lead'
                                                        ? 'bg-green-100 text-green-800'
                                                        : contact.type === 'Customer'
                                                          ? 'bg-blue-100 text-blue-800'
                                                          : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {contact.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                    contact.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : contact.status === 'pending'
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {contact.status}
                                            </span>
                                        </td>
                                        {/* <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {contact.building_category && (
                                                <div>
                                                    <span className="font-medium">{contact.building_category}</span>
                                                    {contact.building_type && (
                                                        <>
                                                            <br />
                                                            <span className="text-xs">
                                                                Type: {contact.building_type}
                                                                {contact.building_width &&
                                                                    contact.building_length &&
                                                                    ` • ${contact.building_width}m × ${contact.building_length}m`}
                                                                {contact.gutter_height && ` • H: ${contact.gutter_height}m`}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td> */}
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <div className="flex justify-end space-x-3">
                                                <Link href={`/admin/contacts/${contact.id}`} className="text-blue-600 hover:text-blue-900">
                                                    <Eye className="h-5 w-5" />
                                                </Link>
                                                <Link href={`/admin/contacts/${contact.id}/edit`} className="text-yellow-600 hover:text-yellow-900">
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
                        {filteredContacts.length === 0 && (
                            <div className="p-6 text-center text-gray-500">No contacts found. Try adjusting your search.</div>
                        )}
                    </div>

                    {/* Recent Activity Section */}
                    {recentActivity.length > 0 && (
                        <div className="mt-8">
                            <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Activity</h2>
                            <div className="overflow-hidden bg-white shadow">
                                <ul className="divide-y divide-gray-200">
                                    {recentActivity.map((activity) => (
                                        <li key={activity.id} className="px-6 py-4">
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
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                    <p className="text-sm text-gray-500">
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
