import { Badge } from '@/components/ui/badge';
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

interface ContentOverview {
    totalSections: number;
    lastUpdated: string;
    configuredSections: number;
}

interface Props {
    content?: ContentSettings;
}

export default function Index({ content }: Props) {
    // Mock overview data since this is mainly frontend
    const mockOverview: ContentOverview = {
        totalSections: 6,
        lastUpdated: '2024-01-15',
        configuredSections: 6,
    };

    const getSectionStatus = (items: unknown[]) => {
        return items && items.length > 0 ? (
            <Badge className="bg-green-100 text-xs text-green-800 hover:bg-green-100 sm:text-sm">Configured</Badge>
        ) : (
            <Badge className="bg-yellow-100 text-xs text-yellow-800 hover:bg-yellow-100 sm:text-sm">Empty</Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Content Management - Admin" />

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-sm sm:h-10 sm:w-10">
                                    <FileText className="text-primary-foreground h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold sm:text-xl">Content Management</h1>
                                    <p className="text-muted-foreground text-xs sm:text-sm">Manage and configure your website's content sections</p>
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                                <Button variant="outline" className="rounded-sm text-xs sm:text-sm">
                                    <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Refresh
                                </Button>
                                <Button asChild className="rounded-sm text-xs sm:text-sm">
                                    <Link href={route('admin.content.edit')}>
                                        <Edit3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        Edit Content
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
                        {/* Overview Stats */}
                        <div className="lg:col-span-4">
                            <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                                <Card className="rounded-sm">
                                    <CardContent className="p-3 sm:p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Total Sections</p>
                                                <p className="text-xl font-bold sm:text-2xl">{mockOverview.totalSections}</p>
                                            </div>
                                            <Settings className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-sm">
                                    <CardContent className="p-3 sm:p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Last Updated</p>
                                                <p className="text-xl font-bold sm:text-2xl">{mockOverview.lastUpdated}</p>
                                            </div>
                                            <FileText className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-sm sm:col-span-2 lg:col-span-1">
                                    <CardContent className="p-3 sm:p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Configured</p>
                                                <p className="text-xl font-bold sm:text-2xl">{mockOverview.configuredSections}</p>
                                            </div>
                                            <Edit3 className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Content Sections */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                {/* Services We Provide */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">Services We Provide</span>
                                            </div>
                                            {getSectionStatus(content?.services_items || [])}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.services_title || 'Services We Provide'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Items Configured</p>
                                                <p className="text-xs sm:text-sm">{content?.services_items?.length || 0} services</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Why Choose Us */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">Why Choose Us</span>
                                            </div>
                                            {getSectionStatus(content?.why_choose_us_items || [])}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.why_choose_us_title || 'Why Choose Us'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Items Configured</p>
                                                <p className="text-xs sm:text-sm">{content?.why_choose_us_items?.length || 0} features</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* About - Who We Are */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">About - Who We Are</span>
                                            </div>
                                            <Badge className="bg-green-100 text-xs text-green-800 hover:bg-green-100 sm:text-sm">Configured</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.who_we_are_title || 'Who We Are'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Description Length</p>
                                                <p className="text-xs sm:text-sm">{content?.who_we_are_description?.length || 0} characters</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* About - What We Offer */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">About - What We Offer</span>
                                            </div>
                                            {getSectionStatus(content?.what_we_offer_items || [])}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.what_we_offer_title || 'What We Offer'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Items Configured</p>
                                                <p className="text-xs sm:text-sm">{content?.what_we_offer_items?.length || 0} offerings</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* About - Stats */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">About - Stats Section</span>
                                            </div>
                                            {getSectionStatus(content?.stats_items || [])}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.stats_title || 'Across Borders'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Items Configured</p>
                                                <p className="text-xs sm:text-sm">{content?.stats_items?.length || 0} statistics</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* About - Mission */}
                                <Card className="rounded-sm">
                                    <CardHeader className="p-3 sm:p-6">
                                        <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                            <div className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="text-sm sm:text-base">About - Mission Section</span>
                                            </div>
                                            {getSectionStatus(content?.mission_items || [])}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Title</p>
                                                <p className="text-xs font-medium sm:text-sm">{content?.mission_title || 'Our Mission'}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs sm:text-sm">Items Configured</p>
                                                <p className="text-xs sm:text-sm">{content?.mission_items?.length || 0} values</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
