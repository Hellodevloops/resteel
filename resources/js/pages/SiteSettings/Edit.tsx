import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import SiteSettingsForm from './Form';

interface SiteSettings {
    id: number;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
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
}

interface Props {
    settings?: SiteSettings;
}

export default function Edit({ settings }: Props) {
    // Mock settings data for demonstration
    const mockSettings: SiteSettings = {
        id: 1,
        contact_email: 'contact@company.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Business Street, City, State, Country',
        tax_rate: 8.5,
        company_name: 'Your Company Name',
        company_tagline: 'Building the future, one solution at a time',
        company_description: 'We are a leading company in our industry, providing innovative solutions to our customers worldwide.',
        email_notifications: true,
        order_notifications: true,
        contact_form_notifications: true,
        shipping_enabled: true,
        shipping_rate: '5.99',
        free_shipping_threshold: '50.00',
        shipping_zones: ['United States', 'Canada', 'Europe'],
        // Social Media Links
        social_twitter: '',
        social_instagram: '',
        social_youtube: '',
        social_facebook: '',
        social_linkedin: '',
        social_website: 'www.Resteel-solutions.com',
    };

    const currentSettings = settings || mockSettings;

    // breadcrumbs: BreadcrumbItem[] = [
    //     { title: 'Site Settings', href: route('settings') },
    //     { title: 'Edit', href: route('settings.edit') },
    // ];

    return (
        <AppLayout>
            <Head title="Edit Site Settings - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header - Mobile Responsive */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                <Settings className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="truncate text-lg font-semibold sm:text-xl">Edit Site Settings</h1>
                                <p className="text-muted-foreground truncate text-xs sm:text-sm">Update your website configuration and preferences</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Mobile Responsive */}
                <div className="container mx-auto">
                    <div className="h-full">
                        <SiteSettingsForm settings={currentSettings} isEditing />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
