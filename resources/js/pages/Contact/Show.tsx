import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Building, MapPin, Calendar, Tag, AlertCircle, DollarSign, MessageSquare } from 'lucide-react';

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
    created_at: string;
    updated_at: string;
}

interface Props {
    contact: Contact;
}

export default function ContactShow({ contact }: Props) {
    return (
        <AppLayout>
            <Head title={`Contact - ${contact.name}`} />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link
                                    href="/admin/contacts"
                                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Contacts
                                </Link>
                                <h1 className="mt-2 text-2xl font-bold text-gray-800">{contact.name}</h1>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                        ${contact.type === 'Lead' ? 'bg-green-100 text-green-800' : 
                                        contact.type === 'Customer' ? 'bg-blue-100 text-blue-800' : 
                                        'bg-gray-100 text-gray-800'}`}>
                                        {contact.type}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                        ${contact.status === 'active' ? 'bg-green-100 text-green-800' : 
                                        contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'}`}>
                                        {contact.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href={`/admin/contacts/${contact.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                    Edit Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="text-sm text-gray-900">{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            <p className="text-sm text-gray-900">{contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Company</p>
                                            <p className="text-sm text-gray-900">{contact.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Tag className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Source</p>
                                            <p className="text-sm text-gray-900">{contact.source}</p>
                                        </div>
                                    </div>
                                    {contact.value !== null && (
                                        <div className="flex items-start">
                                            <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Value</p>
                                                <p className="text-sm text-gray-900">${contact.value.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6">
                            {/* Message */}
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex items-start">
                                        <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="ml-3 flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Message</h3>
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity & Alerts */}
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Activity & Alerts</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Last Contact</p>
                                                <p className="text-sm text-gray-900">{contact.last_contact}</p>
                                            </div>
                                        </div>
                                        {contact.alerts > 0 && (
                                            <div className="flex items-start">
                                                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                                                    <p className="text-sm text-red-600">{contact.alerts} alert(s) require attention</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-start">
                                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Created</p>
                                                <p className="text-sm text-gray-900">{contact.created_at}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                                <p className="text-sm text-gray-900">{contact.updated_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 