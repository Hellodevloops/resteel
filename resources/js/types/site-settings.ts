export interface SiteSettings {
    id?: number;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    tax_rate: number;
    company_name: string;
    company_tagline: string;
    company_description: string;
    shipping_enabled: boolean;
    shipping_rate: string;
    free_shipping_threshold: string;
    shipping_zones: string[];
    social_twitter: string;
    social_instagram: string;
    social_youtube: string;
    social_facebook: string;
    social_linkedin: string;
}
