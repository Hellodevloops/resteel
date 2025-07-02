import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ContentForm from './Form';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create Content - Admin" />
            <ContentForm isEditing={false} />
        </AppLayout>
    );
}
