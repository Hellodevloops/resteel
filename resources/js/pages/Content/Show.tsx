import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit3, FileText, RefreshCw, Settings } from 'lucide-react';

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

interface Props {
    content?: ContentSettings;
}

export default function Show({ content }: Props) {
    return (
        <AppLayout>
            <Head title="Content Management - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-sm">
                                    <FileText className="text-primary-foreground h-5 w-5" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold">Content Management</h1>
                                    <p className="text-muted-foreground text-sm">Manage your website's content sections</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="rounded-sm">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refresh
                                </Button>
                                <Button asChild className="rounded-sm">
                                    <Link href={route('admin.content.edit')}>
                                        <Edit3 className="mr-2 h-4 w-4" />
                                        Edit Content
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto space-y-6 px-6 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Services Section */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Services We Provide
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.services_title || 'Services We Provide'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Subtitle</p>
                                    <p className="text-sm">
                                        {content?.services_subtitle || 'Comprehensive solutions for your industrial building needs'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Items</p>
                                    <p className="text-sm">{content?.services_items?.length || 0} service items configured</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Why Choose Us Section */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Why Choose Us
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.why_choose_us_title || 'Why Choose Us'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Subtitle</p>
                                    <p className="text-sm">{content?.why_choose_us_subtitle || 'We combine decades of experience...'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Items</p>
                                    <p className="text-sm">{content?.why_choose_us_items?.length || 0} feature items configured</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About - Who We Are */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    About - Who We Are
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.who_we_are_title || 'Who We Are'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Description</p>
                                    <p className="line-clamp-2 text-sm">
                                        {content?.who_we_are_description || 'Resteel is a trusted European leader...'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Founded Info</p>
                                    <p className="text-sm">{content?.who_we_are_founded || 'Founded in 2005...'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About - What We Offer */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    About - What We Offer
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.what_we_offer_title || 'What We Offer'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Subtitle</p>
                                    <p className="text-sm">{content?.what_we_offer_subtitle || 'More than just buying and selling...'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Items</p>
                                    <p className="text-sm">{content?.what_we_offer_items?.length || 0} offering items configured</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About - Stats */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    About - Stats Section
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.stats_title || 'Across Borders'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Subtitle</p>
                                    <p className="text-sm">{content?.stats_subtitle || 'Our structures stand in more than 25 countries...'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Stats</p>
                                    <p className="text-sm">{content?.stats_items?.length || 0} statistics configured</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About - Mission */}
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    About - Mission Section
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Title</p>
                                    <p className="font-medium">{content?.mission_title || 'Our Mission'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Subtitle</p>
                                    <p className="text-sm">{content?.mission_subtitle || 'Advancing sustainable construction...'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Mission Values</p>
                                    <p className="text-sm">{content?.mission_items?.length || 0} mission values configured</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
