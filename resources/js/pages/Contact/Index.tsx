import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Filter,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    Settings,
    TrendingUp,
    User,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    // Sample contact data - replace with actual data from your Laravel backend via props
    const contactData = {
        overview: {
            totalContacts: 1247,
            activeContacts: 1156,
            totalCompanies: 342,
            conversionRate: 23.5,
            monthlyLeads: 89,
            growthRate: 15.2,
        },
        contacts: [
            {
                id: 1,
                name: 'Sarah Johnson',
                email: 'sarah.johnson@techcorp.com',
                phone: '+1 (555) 123-4567',
                company: 'TechCorp Industries',
                status: 'active',
                type: 'Lead',
                lastContact: '2024-05-28',
                source: 'Website',
                value: '$45,200',
                alerts: 0,
            },
            {
                id: 2,
                name: 'Michael Chen',
                email: 'mchen@innovategroup.com',
                phone: '+1 (555) 987-6543',
                company: 'Innovate Group',
                status: 'active',
                type: 'Client',
                lastContact: '2024-05-25',
                source: 'Referral',
                value: '$125,800',
                alerts: 1,
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                email: 'emily.r@startup.io',
                phone: '+1 (555) 456-7890',
                company: 'Startup Solutions',
                status: 'pending',
                type: 'Prospect',
                lastContact: '2024-05-20',
                source: 'LinkedIn',
                value: '$12,500',
                alerts: 2,
            },
            {
                id: 4,
                name: 'David Thompson',
                email: 'dthompson@enterprise.com',
                phone: '+1 (555) 321-0987',
                company: 'Enterprise Corp',
                status: 'active',
                type: 'Client',
                lastContact: '2024-05-29',
                source: 'Trade Show',
                value: '$89,300',
                alerts: 0,
            },
        ],
        recentActivity: [
            { id: 1, action: 'New contact added', contact: 'Alex Martinez', time: '2 hours ago', type: 'success' },
            { id: 2, action: 'Follow-up scheduled', contact: 'Sarah Johnson', time: '4 hours ago', type: 'warning' },
            { id: 3, action: 'Meeting completed', contact: 'Michael Chen', time: '1 day ago', type: 'success' },
            { id: 4, action: 'Response overdue', contact: 'Emily Rodriguez', time: '2 days ago', type: 'alert' },
        ],
    };

    const filteredContacts = contactData.contacts.filter((contact) => {
        const matchesSearch =
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
        <div
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-white/80">{title}</p>
                    <p className="mb-1 text-3xl font-bold">{value}</p>
                    <p className="text-sm text-white/90">{subtitle}</p>
                    {trend && (
                        <div className="mt-2 flex items-center">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span className="text-sm">+{trend}% this month</span>
                        </div>
                    )}
                </div>
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="absolute -right-2 -bottom-2 h-20 w-20 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110"></div>
        </div>
    );

    const ContactCard = ({ contact, index }) => (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 z-10">
                <div
                    className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        contact.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : contact.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                    }`}
                >
                    <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                            contact.status === 'active' ? 'animate-pulse bg-green-500' : contact.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                    ></div>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </div>
            </div>

            {/* Alerts Badge */}
            {contact.alerts > 0 && (
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {contact.alerts}
                    </div>
                </div>
            )}

            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="mb-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-500">{contact.name}</h3>
                    <div className="mb-1 flex items-center text-sm text-slate-600">
                        <Building className="mr-1 h-4 w-4" />
                        {contact.company}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <Mail className="mr-1 h-4 w-4" />
                        {contact.email}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4">
                    <div className="mb-2 flex items-center text-sm text-slate-600">
                        <Phone className="mr-1 h-4 w-4" />
                        {contact.phone}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">Contact Type</span>
                        <span
                            className={`rounded-full px-2 py-1 text-sm font-bold ${
                                contact.type === 'Client'
                                    ? 'bg-green-100 text-green-700'
                                    : contact.type === 'Lead'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {contact.type}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-3">
                        <div className="mb-1 flex items-center">
                            <Zap className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-slate-600">Value</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{contact.value}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                        <div className="mb-1 flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                            <span className="text-xs font-medium text-slate-600">Source</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{contact.source}</p>
                    </div>
                </div>

                {/* Last Contact */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-slate-600">Last Contact</span>
                    </div>
                    <div className="text-xs text-slate-500">{contact.lastContact}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </button>
                    <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ActivityItem = ({ activity }) => (
        <div className="flex items-start space-x-3 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50">
            <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    activity.type === 'success'
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                }`}
            >
                {activity.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                ) : activity.type === 'warning' ? (
                    <Clock className="h-4 w-4" />
                ) : (
                    <AlertTriangle className="h-4 w-4" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                <p className="text-sm text-slate-600">{activity.contact}</p>
                <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <Head title="Contact Management Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                {/* Header */}
                <div className="border-b border-slate-200 bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Contact Management</h1>
                                <p className="mt-1 text-slate-600">Manage your contacts, leads, and client relationships</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center rounded-xl bg-orange-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Overview Metrics */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            title="Total Contacts"
                            value={contactData.overview.totalContacts}
                            subtitle={`${contactData.overview.activeContacts} active`}
                            icon={Users}
                            color="from-blue-500 to-blue-600"
                        />
                        <MetricCard
                            title="Companies"
                            value={contactData.overview.totalCompanies}
                            subtitle="Unique organizations"
                            icon={Building}
                            color="from-green-500 to-green-600"
                        />
                        <MetricCard
                            title="Conversion Rate"
                            value={`${contactData.overview.conversionRate}%`}
                            subtitle="Lead to client"
                            icon={TrendingUp}
                            color="from-purple-500 to-purple-600"
                        />
                        <MetricCard
                            title="Monthly Leads"
                            value={contactData.overview.monthlyLeads}
                            subtitle="New this month"
                            icon={Activity}
                            color="from-orange-500 to-orange-600"
                            trend={contactData.overview.growthRate}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
                        {/* Main Content */}
                        <div className="xl:col-span-3">
                            {/* Search and Filter Bar */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search contacts..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Filter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-8 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Contacts Grid */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {filteredContacts.map((contact, index) => (
                                    <ContactCard key={contact.id} contact={contact} index={index} />
                                ))}
                            </div>

                            {filteredContacts.length === 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                                    <User className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                                    <h3 className="mb-2 text-lg font-medium text-slate-600">No contacts found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="xl:col-span-1">
                            {/* Recent Activity */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-lg">
                                <div className="border-b border-slate-200 p-6">
                                    <h3 className="flex items-center text-lg font-semibold text-slate-800">
                                        <Activity className="mr-2 h-5 w-5 text-orange-500" />
                                        Recent Activity
                                    </h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {contactData.recentActivity.map((activity) => (
                                        <ActivityItem key={activity.id} activity={activity} />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg">
                                <div className="border-b border-slate-200 p-6">
                                    <h3 className="flex items-center text-lg font-semibold text-slate-800">
                                        <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                                        Quick Stats
                                    </h3>
                                </div>
                                <div className="space-y-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Avg. Response Time</span>
                                        <span className="text-lg font-bold text-slate-800">2.4h</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Follow-ups Due</span>
                                        <span className="text-lg font-bold text-red-600">12</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Hot Leads</span>
                                        <span className="text-lg font-bold text-yellow-600">24</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Monthly Growth</span>
                                        <span className="text-lg font-bold text-green-600">+15.2%</span>
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
