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
        contact_phone: '+31 (6) 25334951',
        contact_address: 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
        // currency: 'USD',
        tax_rate: 8.5,
        company_name: 'Resteel Solutions',
        company_tagline: 'Building the future, one solution at a time',
        company_description: 'Specialists in buying and selling second-hand buildings and construction materials with over 25 years of experience.',
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
                                    <p className="text-muted-foreground truncate text-xs sm:text-sm">Current website configuration and settings</p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <Button variant="outline" className="rounded-sm text-xs sm:text-sm">
                                    <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Refresh
                                </Button>
                                <Button asChild className="rounded-sm text-xs sm:text-sm">
                                    <Link href="/admin/settings/edit">
                                        <Edit3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        Edit Settings
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Mobile Responsive */}
                <div className="container mx-auto space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                        {/* Contact Information - Mobile Responsive */}
                        <Card className="rounded-sm">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex items-center text-base sm:text-lg">
                                    <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 p-4 pt-0 sm:space-y-4 sm:p-6">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <Mail className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground text-xs sm:text-sm">Email</p>
                                            <p className="truncate text-sm font-medium sm:text-base">{currentSettings.contact_email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <Phone className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground text-xs sm:text-sm">Phone</p>
                                            <p className="truncate text-sm font-medium sm:text-base">{currentSettings.contact_phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-muted-foreground text-xs sm:text-sm">Address</p>
                                            <p className="text-sm font-medium break-words sm:text-base">{currentSettings.contact_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Information - Mobile Responsive */}
                        <Card className="rounded-sm">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex items-center text-base sm:text-lg">
                                    <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Company Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 p-4 pt-0 sm:space-y-4 sm:p-6">
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <p className="text-muted-foreground text-xs sm:text-sm">Company Name</p>
                                        <p className="truncate text-sm font-medium sm:text-base">{currentSettings.company_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs sm:text-sm">Tagline</p>
                                        <p className="text-sm font-medium break-words sm:text-base">{currentSettings.company_tagline}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs sm:text-sm">Description</p>
                                        <p className="text-sm font-medium break-words sm:text-base">{currentSettings.company_description}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs sm:text-sm">Tax Rate</p>
                                        <p className="text-sm font-medium sm:text-base">{currentSettings.tax_rate}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Social Media Links - Mobile Responsive */}
                    <Card className="rounded-sm">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="flex items-center text-base sm:text-lg">
                                <Link2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                Social Media Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 sm:p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                                {socialPlatforms.map((platform) => {
                                    const Icon = platform.icon;
                                    return (
                                        <div key={platform.name} className="flex items-center space-x-3 rounded-md border p-3 sm:p-4">
                                            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${platform.color} flex-shrink-0`} />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-medium sm:text-sm">{platform.name}</p>
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
