'use client';

import { SiteSettings } from '@/types/site-settings';
import { useTranslation } from 'react-i18next';
import ContactCTA from './Contact';
import Layout from './Layout';

interface Props {
    siteSettings: SiteSettings;
}

const ContactPage = ({ siteSettings }: Props) => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('contact_us')} | Resteel`}>
            <main className="mt-16 min-h-screen sm:mt-20">
                <ContactCTA siteSettings={siteSettings} />
            </main>
        </Layout>
    );
};

export default ContactPage;
