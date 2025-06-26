'use client';

import { useTranslation } from 'react-i18next';
import ContactCTA from './Contact';
import Layout from './Layout';

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={`${t('contact_us')} | Resteel`}>
            <main className="mt-16 min-h-screen sm:mt-20">
                <ContactCTA />
            </main>
        </Layout>
    );
};

export default ContactPage;
