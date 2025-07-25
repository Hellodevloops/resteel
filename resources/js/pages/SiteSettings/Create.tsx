import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import SiteSettingsForm from './Form';

export default function Create() {
    // breadcrumbs: BreadcrumbItem[] = [
    //     { title: 'Site Settings', href: route('settings') },
    //     { title: 'Create', href: route('settings.create') },
    // ];

    return (
        <AppLayout>
            <Head title="Create Site Settings - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header - Mobile Responsive */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                <Settings className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="truncate text-lg font-semibold sm:text-xl">Create Site Settings</h1>
                                <p className="text-muted-foreground truncate text-xs sm:text-sm">
                                    Configure your website settings for the first time
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Mobile Responsive */}
                <div className="container mx-auto">
                    <div className="h-full">
                        <SiteSettingsForm />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
