import AppLayout from '@/layouts/app-layout';
import ContentForm from './Form';

export default function Create() {
    return (
        <AppLayout>
            
            <div className="bg-background min-h-screen">
                <ContentForm isEditing={false} />
            </div>
        </AppLayout>
    );
}
