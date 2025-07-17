'use client';

import { SiteSettings } from '@/types/site-settings';
import { ContactPage } from './Contact';

interface Props {
    siteSettings: SiteSettings;
}

const ContactPageWrapper = ({ siteSettings }: Props) => {
    return <ContactPage siteSettings={siteSettings} />;
};

export default ContactPageWrapper;
