import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BrickWall, Home, PhoneCall } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const dashboardCards = [
    {
        title: 'Warehouse',
        description: 'Manage your warehouse inventory and operations',
        href: '/admin/warehouse',
        icon: BrickWall,
        color: 'bg-blue-700/10 text-blue-700',
        hoverColor: 'group-hover:bg-blue-700/20',
        gradient: 'from-blue-700/8 via-blue-600/12 to-blue-700/16',
        shadowColor: 'group-hover:shadow-blue-700/30',
        borderGlow: 'group-hover:border-blue-600/60',
        isActive: true,
    },
    {
        title: 'WebShop',
        description: 'Manage your online store and products',
        href: '/admin/webshops',
        icon: Home,
        color: 'bg-blue-600/10 text-blue-600',
        hoverColor: 'group-hover:bg-blue-600/20',
        gradient: 'from-blue-600/6 via-blue-500/10 to-blue-600/14',
        shadowColor: 'group-hover:shadow-blue-600/25',
        borderGlow: 'group-hover:border-blue-500/55',
        isActive: false,
    },
    {
        title: 'Contacts',
        description: 'Manage your business contacts and communications',
        href: '/admin/contacts',
        icon: PhoneCall,
        color: 'bg-blue-800/10 text-blue-800',
        hoverColor: 'group-hover:bg-blue-800/20',
        gradient: 'from-blue-800/10 via-blue-700/14 to-blue-800/18',
        shadowColor: 'group-hover:shadow-blue-800/35',
        borderGlow: 'group-hover:border-blue-700/65',
        isActive: false,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-6">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                        Welcome to Resteel Platform
                    </h1>
                    <p className="text-muted-foreground text-lg">Manage your business operations from one central hub</p>
                </div>

                {/* Enhanced Cards Grid */}
                <div className="grid auto-rows-min gap-8 md:grid-cols-3">
                    {dashboardCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={index}
                                href={card.href}
                                className="group block transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                            >
                                <Card
                                    className={`relative h-full cursor-pointer overflow-hidden bg-gradient-to-br ${card.gradient} border-sidebar-border/40 border-2 ${card.borderGlow} transition-all duration-500 hover:shadow-2xl ${card.shadowColor} backdrop-blur-sm`}
                                >
                                    {/* Active Badge */}
                                    {card.isActive && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="text-bold inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    )}

                                    {/* Animated background overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent text-[#0076A8] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* Subtle animated border glow */}
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-current to-transparent text-[#0076A8] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-20" />

                                    <CardHeader className="relative pt-8 pb-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-5">
                                                <div
                                                    className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${card.color} ${card.hoverColor} shadow-lg group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}
                                                >
                                                    <Icon className="h-8 w-8 text-[#0076A8] transition-all duration-500 group-hover:scale-110" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="group">
                                                        <CardTitle className="text-2xl font-bold tracking-tight text-[#0076A8] transition-all duration-300 group-hover:text-[#0076A8]">
                                                            {card.title}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="text-muted-foreground group-hover:text-foreground h-6 w-6 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100" />
                                        </div>
                                    </CardHeader>

                                    <CardContent className="relative pt-0 pb-8">
                                        <CardDescription className="text-muted-foreground/90 group-hover:text-muted-foreground text-base leading-relaxed transition-colors duration-300">
                                            {card.description}
                                        </CardDescription>

                                        {/* Action indicator */}
                                        <div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm font-medium opacity-0 transition-all duration-500 group-hover:opacity-100">
                                            <span>Explore</span>
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>

                                    {/* Enhanced bottom accent */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${card.gradient} opacity-0 transition-all duration-500 group-hover:h-2 group-hover:opacity-100`}
                                    />

                                    {/* Subtle inner glow */}
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Enhanced Placeholder Section */}
                <div className="border-sidebar-border/40 from-background via-muted/5 to-muted/10 relative min-h-[60vh] flex-1 overflow-hidden rounded-2xl border-2 border-dashed bg-gradient-to-br">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />

                    {/* Content overlay */}
                    {/* <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-md space-y-4 text-center">
                            <div className="bg-muted/20 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                                <div className="bg-muted/40 flex h-12 w-12 items-center justify-center rounded-full">
                                    <div className="bg-muted-foreground/20 h-6 w-6 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-muted-foreground/80 text-xl font-semibold">Your Dashboard Awaits</h3>
                                <p className="text-muted-foreground/60 text-sm leading-relaxed">
                                    This space is ready for your custom widgets and analytics
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* Subtle gradient overlay */}
                    <div className="from-background/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                </div>
            </div>
        </AppLayout>
    );
}
