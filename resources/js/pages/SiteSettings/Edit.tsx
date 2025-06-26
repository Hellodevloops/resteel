import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import SiteSettingsForm from './Form';

export default function Edit() {
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
                        <SiteSettingsForm isEditing />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
