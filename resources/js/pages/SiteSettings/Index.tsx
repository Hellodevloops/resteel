import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bell, DollarSign, Edit3, Globe, Mail, MapPin, Phone, RefreshCw, Save, Settings, Truck } from 'lucide-react';

interface SiteSettings {
    id: number;
    // language: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    // currency: string;
    tax_rate: number;
    company_name: string;
    company_tagline: string;
    email_notifications: boolean;
    order_notifications: boolean;
    shipping_enabled: boolean;
    shipping_rate: string;
    last_updated: string;
}

interface SettingsOverview {
    totalSettings: number;
    lastUpdated: string;
    activeNotifications: number;
    configuredShipping: boolean;
}

interface SiteSettingsData {
    overview: SettingsOverview;
    settings: SiteSettings;
}

interface Props {
    siteSettingsData?: SiteSettingsData;
}

export default function Index({ siteSettingsData }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Site Settings', href: route('settings') }];

    const getStatusBadge = (status: boolean) => {
        return status ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>
        );
    };

    // Mock data for demonstration since this is frontend only
    const mockSettings: SiteSettings = {
        id: 1,
        language: 'English',
        contact_email: 'contact@company.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Business St, City, Country',
        currency: 'USD',
        tax_rate: 8.5,
        company_name: 'Your Company Name',
        company_tagline: 'Building the future, one solution at a time',
        email_notifications: true,
        order_notifications: true,
        shipping_enabled: true,
        shipping_rate: '5.99',
        last_updated: '2024-01-15',
    };

    const mockOverview: SettingsOverview = {
        totalSettings: 12,
        lastUpdated: '2024-01-15',
        activeNotifications: 2,
        configuredShipping: true,
    };

    return (
        <AppLayout>
            <Head title="Site Settings - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                    <Settings className="text-primary-foreground h-5 w-5" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold">Site Settings</h1>
                                    <p className="text-muted-foreground text-sm">Manage your website configuration and settings</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="rounded-sm">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refresh
                                </Button>
                                <Button className="rounded-sm">
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Edit Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Overview Stats */}
                        <div className="lg:col-span-4">
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                                <Card className="rounded-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm">Total Settings</p>
                                                <p className="text-2xl font-bold">{mockOverview.totalSettings}</p>
                                            </div>
                                            <Settings className="text-muted-foreground h-8 w-8" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm">Last Updated</p>
                                                <p className="text-2xl font-bold">{mockOverview.lastUpdated}</p>
                                            </div>
                                            <Save className="text-muted-foreground h-8 w-8" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm">Active Notifications</p>
                                                <p className="text-2xl font-bold">{mockOverview.activeNotifications}</p>
                                            </div>
                                            <Bell className="text-muted-foreground h-8 w-8" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm">Shipping</p>
                                                <p className="text-2xl font-bold">{mockOverview.configuredShipping ? 'Ready' : 'Setup'}</p>
                                            </div>
                                            <Truck className="text-muted-foreground h-8 w-8" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Settings Cards */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Core Settings */}
                                <Card className="rounded-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Globe className="mr-2 h-5 w-5" />
                                            Core Settings
                                        </CardTitle>
                                        <CardDescription>Basic website configuration</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Language</p>
                                                <p className="font-medium">{mockSettings.language}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Currency</p>
                                                <p className="font-medium">{mockSettings.currency}</p>
                                            </div>
                                        </div> */}

                                        <div className="space-y-2">
                                            <p className="text-muted-foreground text-sm">Tax Rate</p>
                                            <p className="font-medium">{mockSettings.tax_rate}%</p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <p className="text-muted-foreground text-sm">Company Details</p>
                                            <p className="font-medium">{mockSettings.company_name}</p>
                                            <p className="text-muted-foreground text-sm">{mockSettings.company_tagline}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Contact Information */}
                                <Card className="rounded-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Contact Information
                                        </CardTitle>
                                        <CardDescription>Customer contact details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="text-muted-foreground h-4 w-4" />
                                                <span className="text-sm">{mockSettings.contact_email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="text-muted-foreground h-4 w-4" />
                                                <span className="text-sm">{mockSettings.contact_phone}</span>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                                                <span className="text-sm">{mockSettings.contact_address}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Shipping Settings */}
                                <Card className="rounded-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Truck className="mr-2 h-5 w-5" />
                                            Shipping Settings
                                        </CardTitle>
                                        <CardDescription>E-commerce shipping configuration</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Shipping Enabled</span>
                                            {getStatusBadge(mockSettings.shipping_enabled)}
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-muted-foreground text-sm">Base Shipping Rate</p>
                                            <div className="flex items-center space-x-1">
                                                <DollarSign className="text-muted-foreground h-4 w-4" />
                                                <span className="font-medium">{mockSettings.shipping_rate}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
