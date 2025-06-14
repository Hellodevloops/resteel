import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    const filteredContacts = initialContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Contact List" />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Contact List</h1>
                                <p className="mt-1 text-gray-600">View and manage your contacts</p>
                            </div>
                            <Link
                                href="/admin/contacts/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add New Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.company}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${contact.type === 'Lead' ? 'bg-green-100 text-green-800' : 
                                                contact.type === 'Customer' ? 'bg-blue-100 text-blue-800' : 
                                                'bg-gray-100 text-gray-800'}`}>
                                                {contact.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${contact.status === 'active' ? 'bg-green-100 text-green-800' : 
                                                contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'}`}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-3">
                                                <Link
                                                    href={`/admin/contacts/${contact.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={`/admin/contacts/${contact.id}/edit`}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    <Pencil className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredContacts.length === 0 && (
                            <div className="p-6 text-center text-gray-500">
                                No contacts found. Try adjusting your search.
                            </div>
                        )}
                    </div>

                    {/* Recent Activity Section */}
                    {recentActivity.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <ul className="divide-y divide-gray-200">
                                    {recentActivity.map((activity) => (
                                        <li key={activity.id} className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-2 w-2 rounded-full ${
                                                    activity.type === 'success' ? 'bg-green-400' :
                                                    activity.type === 'warning' ? 'bg-yellow-400' :
                                                    'bg-red-400'
                                                }`} />
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