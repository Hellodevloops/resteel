// components/layout/Layout.tsx
import React, { useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import FloatingChatbot from './FloatingChatbot';
import WhatsAppFloat from './WhatsAppFloat';
type LayoutProps = {
    children: React.ReactNode;
    title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

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
