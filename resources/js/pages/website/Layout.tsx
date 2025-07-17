// components/layout/Layout.tsx
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { SiteSettings } from '@/types/site-settings';
import React, { useEffect } from 'react';
import FloatingChatbot from './FloatingChatbot';
import WhatsAppFloat from './WhatsAppFloat';

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
    siteSettings?: SiteSettings;
};

const Layout = ({ children, title, siteSettings }: LayoutProps) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        } else if (siteSettings?.company_name) {
            document.title = `${siteSettings.company_name} | ${siteSettings.company_tagline || 'Welcome'}`;
        }
    }, [title, siteSettings]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingChatbot />
            <WhatsAppFloat />
        </div>
    );
};

export default Layout;
