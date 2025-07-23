import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ContentForm from './Form';

interface ContentSettings {
    id?: number;
    services_title: string;
    services_subtitle: string;
    services_items: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    why_choose_us_title: string;
    why_choose_us_subtitle: string;
    why_choose_us_items: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    who_we_are_title: string;
    who_we_are_description: string;
    who_we_are_founded: string;
    what_we_offer_title: string;
    what_we_offer_subtitle: string;
    what_we_offer_items: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    stats_title: string;
    stats_subtitle: string;
    stats_items: Array<{
        label: string;
        value: string;
    }>;
    mission_title: string;
    mission_subtitle: string;
    mission_items: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
}

interface MultiLangContentSettings {
    [locale: string]: ContentSettings;
}

interface Props {
    content?: MultiLangContentSettings;
}

export default function Edit({ content }: Props) {
    return (
        <AppLayout>
            <Head title="Edit Content - Admin" />
            <div className="bg-background min-h-screen">
                <ContentForm content={content} isEditing={true} />
            </div>
        </AppLayout>
    );
}
