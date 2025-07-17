import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Bell, Edit3, Mail, MapPin, Phone, RefreshCw, Save, Settings, Truck } from 'lucide-react';

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
    // siteSettingsData is available for future use
    // breadcrumbs: BreadcrumbItem[] = [{ title: 'Site Settings', href: route('settings') }];

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
        contact_email: 'contact@company.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Business St, City, Country',
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
                {/* Header - Mobile Responsive */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                    <Settings className="text-primary-foreground h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="truncate text-lg font-semibold sm:text-xl">Site Settings</h1>
                                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                                        Manage your website configuration and settings
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <Button variant="outline" className="rounded-sm text-xs sm:text-sm">
                                    <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Refresh
                                </Button>
                                <Button className="rounded-sm text-xs sm:text-sm">
                                    <Edit3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Edit Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Mobile Responsive */}
                <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                    <div className="space-y-6">
                        {/* Overview Stats - Mobile Responsive Grid */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                            <Card className="rounded-sm">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground truncate text-xs sm:text-sm">Total Settings</p>
                                            <p className="truncate text-xl font-bold sm:text-2xl">{mockOverview.totalSettings}</p>
                                        </div>
                                        <Settings className="text-muted-foreground h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-sm">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground truncate text-xs sm:text-sm">Last Updated</p>
                                            <p className="truncate text-xl font-bold sm:text-2xl">{mockOverview.lastUpdated}</p>
                                        </div>
                                        <Save className="text-muted-foreground h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-sm">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground truncate text-xs sm:text-sm">Active Notifications</p>
                                            <p className="truncate text-xl font-bold sm:text-2xl">{mockOverview.activeNotifications}</p>
                                        </div>
                                        <Bell className="text-muted-foreground h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-sm">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground truncate text-xs sm:text-sm">Shipping</p>
                                            <p className="truncate text-xl font-bold sm:text-2xl">
                                                {mockOverview.configuredShipping ? 'Ready' : 'Setup'}
                                            </p>
                                        </div>
                                        <Truck className="text-muted-foreground h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Settings Cards - Mobile Responsive Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                            <Card className="rounded-sm">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="flex items-center text-base sm:text-lg">
                                        <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 sm:p-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <Mail className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Email</p>
                                                <p className="truncate text-sm font-medium sm:text-base">{mockSettings.contact_email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <Phone className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Phone</p>
                                                <p className="truncate text-sm font-medium sm:text-base">{mockSettings.contact_phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Address</p>
                                                <p className="text-sm font-medium break-words sm:text-base">{mockSettings.contact_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Additional Settings Card - Mobile Responsive */}
                            <Card className="rounded-sm">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="flex items-center text-base sm:text-lg">
                                        <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                        System Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 sm:p-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Email Notifications</p>
                                            </div>
                                            {getStatusBadge(mockSettings.email_notifications)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Order Notifications</p>
                                            </div>
                                            {getStatusBadge(mockSettings.order_notifications)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-muted-foreground text-xs sm:text-sm">Shipping Enabled</p>
                                            </div>
                                            {getStatusBadge(mockSettings.shipping_enabled)}
                                        </div>
                                        {mockSettings.shipping_enabled && (
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-muted-foreground text-xs sm:text-sm">Shipping Rate</p>
                                                </div>
                                                <p className="text-sm font-medium sm:text-base">${mockSettings.shipping_rate}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
