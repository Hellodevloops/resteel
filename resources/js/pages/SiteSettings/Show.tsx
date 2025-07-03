import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit3, Facebook, Globe, Instagram, Link2, Linkedin, Mail, MapPin, Phone, RefreshCw, Settings, Twitter, Youtube } from 'lucide-react';

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
    // Social Media Links
    social_twitter: string;
    social_instagram: string;
    social_youtube: string;
    social_facebook: string;
    social_linkedin: string;
    social_website: string;
    last_updated?: string;
}

interface Props {
    settings?: SiteSettings;
}

const Show = ({ settings }: Props) => {
    // Mock data for demonstration since this is frontend only
    const mockSettings: SiteSettings = {
        id: 1,
        // language: 'English',
        contact_email: 'Info@2ndhandholding.com',
        contact_phone: '+31 (0) 123 456 789',
        contact_address: 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
        // currency: 'USD',
        tax_rate: 8.5,
        company_name: 'Resteel Solutions',
        company_tagline: 'Building the future, one solution at a time',
        company_description: 'Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.',
        email_notifications: true,
        order_notifications: true,
        contact_form_notifications: false,
        shipping_enabled: true,
        shipping_rate: '5.99',
        free_shipping_threshold: '50.00',
        shipping_zones: ['United States', 'Canada', 'Europe'],
        social_twitter: 'https://twitter.com/resteel',
        social_instagram: 'https://instagram.com/resteel',
        social_youtube: 'https://youtube.com',
        social_facebook: '',
        social_linkedin: '',
        social_website: 'www.Resteel-solutions.com',
        last_updated: '2024-01-15',
    };

    const currentSettings = settings || mockSettings;

    // Social media configuration
    const socialPlatforms = [
        { name: 'Twitter/X', icon: Twitter, url: currentSettings.social_twitter, color: 'text-blue-400' },
        { name: 'Instagram', icon: Instagram, url: currentSettings.social_instagram, color: 'text-pink-400' },
        { name: 'YouTube', icon: Youtube, url: currentSettings.social_youtube, color: 'text-red-500' },
        { name: 'Facebook', icon: Facebook, url: currentSettings.social_facebook, color: 'text-blue-600' },
        { name: 'LinkedIn', icon: Linkedin, url: currentSettings.social_linkedin, color: 'text-blue-700' },
        { name: 'Website', icon: Globe, url: currentSettings.social_website, color: 'text-green-600' },
    ];

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
                <div className="container mx-auto space-y-6 px-6 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Company Information */}
                        {/* <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Building className="mr-2 h-5 w-5" />
                                    Company Information
                                </CardTitle>
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
                                    <p className="text-sm font-medium">{currentSettings.company_description}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Tax Rate</p>
                                    <p className="font-medium">{currentSettings.tax_rate}%</p>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Contact Information */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Contact Information
                                </CardTitle>
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
                        {/* <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Truck className="mr-2 h-5 w-5" />
                                    Shipping Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">Shipping Enabled</p>
                                    <Badge variant={currentSettings.shipping_enabled ? 'default' : 'secondary'}>
                                        {currentSettings.shipping_enabled ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </div>
                                {currentSettings.shipping_enabled && (
                                    <>
                                        <div>
                                            <p className="text-muted-foreground text-sm">Shipping Rate</p>
                                            <p className="font-medium">${currentSettings.shipping_rate}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">Free Shipping Threshold</p>
                                            <p className="font-medium">${currentSettings.free_shipping_threshold}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">Shipping Zones</p>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {currentSettings.shipping_zones.map((zone, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {zone}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card> */}

                        {/* Notification Settings */}
                        {/* <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Notification Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">Email Notifications</p>
                                    <Badge variant={currentSettings.email_notifications ? 'default' : 'secondary'}>
                                        {currentSettings.email_notifications ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">Order Notifications</p>
                                    <Badge variant={currentSettings.order_notifications ? 'default' : 'secondary'}>
                                        {currentSettings.order_notifications ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">Contact Form Notifications</p>
                                    <Badge variant={currentSettings.contact_form_notifications ? 'default' : 'secondary'}>
                                        {currentSettings.contact_form_notifications ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>

                    {/* Social Media Links */}
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Link2 className="mr-2 h-5 w-5" />
                                Social Media Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {socialPlatforms.map((platform) => {
                                    const Icon = platform.icon;
                                    return (
                                        <div key={platform.name} className="flex items-center space-x-3 rounded-md border p-3">
                                            <Icon className={`h-5 w-5 ${platform.color}`} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">{platform.name}</p>
                                                {platform.url ? (
                                                    <a
                                                        href={platform.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block truncate text-xs text-blue-600 hover:underline"
                                                    >
                                                        {platform.url}
                                                    </a>
                                                ) : (
                                                    <p className="text-muted-foreground text-xs">Not configured</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
