import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building2, Check, DollarSign, Edit3, Globe, Mail, MapPin, Phone, RefreshCw, Settings, Truck, X } from 'lucide-react';

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
    company_description: string;
    email_notifications: boolean;
    order_notifications: boolean;
    contact_form_notifications: boolean;
    shipping_enabled: boolean;
    shipping_rate: string;
    free_shipping_threshold: string;
    shipping_zones: string[];
    last_updated: string;
}

interface Props {
    settings?: SiteSettings;
}

const Show = ({ settings }: Props) => {
    // Mock data for demonstration since this is frontend only
    const mockSettings: SiteSettings = {
        id: 1,
        language: 'English',
        contact_email: 'contact@company.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Business Street, City, State 12345, Country',
        currency: 'USD',
        tax_rate: 8.5,
        company_name: 'Your Company Name',
        company_tagline: 'Building the future, one solution at a time',
        company_description: 'We are a leading company in our industry, providing innovative solutions to our customers worldwide.',
        email_notifications: true,
        order_notifications: true,
        contact_form_notifications: false,
        shipping_enabled: true,
        shipping_rate: '5.99',
        free_shipping_threshold: '50.00',
        shipping_zones: ['United States', 'Canada', 'Europe'],
        last_updated: '2024-01-15',
    };

    const currentSettings = settings || mockSettings;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Site Settings', href: route('settings') }];

    const getStatusBadge = (status: boolean) => {
        return status ? (
            <Badge className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="h-3 w-3" />
                Active
            </Badge>
        ) : (
            <Badge className="flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-100">
                <X className="h-3 w-3" />
                Inactive
            </Badge>
        );
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
                                    <p className="text-muted-foreground text-sm">Current website configuration and settings</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="rounded-sm">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refresh
                                </Button>
                                <Button asChild className="rounded-sm">
                                    <Link href="/admin/settings/edit">
                                        <Edit3 className="mr-2 h-4 w-4" />
                                        Edit Settings
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                                <div>
                                    <p className="text-muted-foreground text-sm">Tax Rate</p>
                                    <p className="font-medium">{currentSettings.tax_rate}%</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="text-muted-foreground text-sm">Last Updated</p>
                                    <p className="font-medium">{currentSettings.last_updated}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Details */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Building2 className="mr-2 h-5 w-5" />
                                    Company Details
                                </CardTitle>
                                <CardDescription>Your company information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Company Name</p>
                                    <p className="font-medium">{currentSettings.company_name}</p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground text-sm">Tagline</p>
                                    <p className="font-medium">{currentSettings.company_tagline}</p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground text-sm">Description</p>
                                    <p className="text-sm">{currentSettings.company_description}</p>
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
                                        <div>
                                            <p className="text-muted-foreground text-sm">Email</p>
                                            <p className="font-medium">{currentSettings.contact_email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Phone className="text-muted-foreground h-4 w-4" />
                                        <div>
                                            <p className="text-muted-foreground text-sm">Phone</p>
                                            <p className="font-medium">{currentSettings.contact_phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <MapPin className="text-muted-foreground mt-1 h-4 w-4" />
                                        <div>
                                            <p className="text-muted-foreground text-sm">Address</p>
                                            <p className="font-medium">{currentSettings.contact_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Settings */}
                        <Card className="rounded-sm lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Truck className="mr-2 h-5 w-5" />
                                    Shipping Settings
                                </CardTitle>
                                <CardDescription>E-commerce shipping configuration</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm">Shipping Enabled</p>
                                            {getStatusBadge(currentSettings.shipping_enabled)}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-sm">Base Shipping Rate</p>
                                        <div className="flex items-center space-x-1">
                                            <DollarSign className="text-muted-foreground h-4 w-4" />
                                            <span className="font-medium">{currentSettings.shipping_rate}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-sm">Free Shipping Threshold</p>
                                        <div className="flex items-center space-x-1">
                                            <DollarSign className="text-muted-foreground h-4 w-4" />
                                            <span className="font-medium">{currentSettings.free_shipping_threshold}</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
