import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import SiteSettingsForm from './Form';

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
}

interface Props {
    settings?: SiteSettings;
}

export default function Edit({ settings }: Props) {
    // Mock settings data for demonstration
    const mockSettings: SiteSettings = {
        id: 1,
        // language: 'en',
        contact_email: 'contact@company.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Business Street, City, State, Country',
        // currency: 'USD',
        tax_rate: 8.5,
        // company_name: 'Your Company Name',
        company_tagline: 'Building the future, one solution at a time',
        company_description: 'We are a leading company in our industry, providing innovative solutions to our customers worldwide.',
        email_notifications: true,
        order_notifications: true,
        contact_form_notifications: true,
        shipping_enabled: true,
        shipping_rate: '5.99',
        free_shipping_threshold: '50.00',
        shipping_zones: ['United States', 'Canada', 'Europe'],
    };

    const currentSettings = settings || mockSettings;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Site Settings', href: route('settings') },
        { title: 'Edit', href: route('settings.edit') },
    ];

    return (
        <AppLayout>
            <Head title="Edit Site Settings - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                <Settings className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Edit Site Settings</h1>
                                <p className="text-muted-foreground text-sm">Update your website configuration and preferences</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto">
                    <div className="h-full">
                        <SiteSettingsForm settings={currentSettings} isEditing />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
