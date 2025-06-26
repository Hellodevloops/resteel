import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const isActiveRoute = (href: string) => {
        const currentUrl = page.url;

        // Exact match
        if (currentUrl === href) {
            return true;
        }

        // Check if current URL starts with the href path (for nested routes)
        // But avoid false positives like '/admin/warehouse' matching '/admin/w'
        if (href !== '/' && currentUrl.startsWith(href + '/')) {
            return true;
        }

        // Special handling for routes that might have query parameters or fragments
        if (href !== '/' && currentUrl.split('?')[0].split('#')[0] === href) {
            return true;
        }

        return false;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActiveRoute(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
