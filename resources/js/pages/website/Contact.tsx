'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SiteSettings } from '@/types/site-settings';
import axios from 'axios';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

// Brand colors
const steelBlue = '#0076A8';
const charcoal = '#3C3F48';
const vibrantOrange = '#FF6600';

interface ContactCTAProps {
    siteSettings?: SiteSettings;
}

const ContactCTA = ({ siteSettings }: ContactCTAProps) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        status: 'pending',
        type: 'Lead',
        source: 'Website Form',
        value: '',
        building_category: '',
        building_type: '',
        building_width: '',
        building_length: '',
        gutter_height: '',
        top_height: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            status: 'pending',
            type: 'Lead',
            source: 'Website Form',
            value: '',
            building_category: '',
            building_type: '',
            building_width: '',
            building_length: '',
            gutter_height: '',
            top_height: '',
        });
        setErrors({});
    };

    // Validation functions
    const validatePhone = (phone: string): string | null => {
        if (!phone) return null; // Phone is optional

        // Remove all non-numeric characters
        const numericOnly = phone.replace(/\D/g, '');

        if (numericOnly.length > 12) {
            return 'Phone number cannot exceed 12 digits';
        }

        if (numericOnly.length < 6) {
            return 'Phone number must be at least 6 digits';
        }

        return null;
    };

    const validateEmail = (email: string): string | null => {
        if (!email) return 'Email is required';

        // Check if email contains capital letters
        if (email !== email.toLowerCase()) {
            return 'Email address cannot contain capital letters';
        }

        // Standard email regex pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }

        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        // For phone field, only allow numeric input
        if (id === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setData({ ...data, [id]: numericValue });
        } else {
            setData({ ...data, [id]: value });
        }

        // Clear error when user starts typing
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Client-side validation
        const validationErrors: { [key: string]: string } = {};

        // Validate email
        const emailError = validateEmail(data.email);
        if (emailError) {
            validationErrors.email = emailError;
        }

        // Validate phone
        const phoneError = validatePhone(data.phone);
        if (phoneError) {
            validationErrors.phone = phoneError;
        }

        // If there are validation errors, stop submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            await axios.post('/contacts', {
                ...data,
                value: data.value ? parseFloat(data.value) : null,
            });
            reset();
            alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { errors?: { [key: string]: string } } } };
                if (axiosError.response?.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact-section" className="bg-slate-200/80 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:py-20">
            <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12 lg:space-y-16">
                {/* Hero Section */}
                <div className="space-y-4 text-center sm:space-y-6">
                    <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-medium sm:text-sm"
                        style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
                    >
                        {t('expert_consultation')}
                    </span>
                    <h2 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ color: charcoal }}>
                        {t('ready_to_build_great').split(' ').slice(0, -2).join(' ')}{' '}
                        <span style={{ color: steelBlue }}>{t('ready_to_build_great').split(' ').slice(-2).join(' ')}</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base lg:text-lg xl:text-xl">{t('transform_vision_subtitle')}</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    {/* Contact Form */}
                    <Card className="shadow-lg sm:shadow-xl">
                        <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                            <CardTitle className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl" style={{ color: steelBlue }}>
                                {t('send_us_message')}
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base lg:text-lg">{t('respond_soon')}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Name and Phone Row */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium sm:text-base">
                                            {t('name_required')}
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="h-10 text-sm sm:h-11 sm:text-base lg:h-12"
                                        />
                                        {errors.name && <p className="text-xs text-red-500 sm:text-sm">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium sm:text-base">
                                            {t('phone')}
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={handleChange}
                                            className="h-10 text-sm sm:h-11 sm:text-base lg:h-12"
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 sm:text-sm">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Email and Company Row */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium sm:text-base">
                                            {t('email_required')}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="h-10 text-sm sm:h-11 sm:text-base lg:h-12"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 sm:text-sm">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company" className="text-sm font-medium sm:text-base">
                                            {t('your_company')}
                                        </Label>
                                        <Input
                                            id="company"
                                            value={data.company}
                                            onChange={handleChange}
                                            className="h-10 text-sm sm:h-11 sm:text-base lg:h-12"
                                        />
                                        {errors.company && <p className="text-xs text-red-500 sm:text-sm">{errors.company}</p>}
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-sm font-medium sm:text-base">
                                        {t('message_required')}
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="min-h-[100px] resize-none text-sm sm:min-h-[120px] sm:text-base lg:min-h-[140px]"
                                    />
                                    {errors.message && <p className="text-xs text-red-500 sm:text-sm">{errors.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="mt-6 flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-white sm:mt-8 sm:py-4 sm:text-base lg:py-5 lg:text-lg"
                                    style={{ backgroundColor: vibrantOrange }}
                                    disabled={loading}
                                >
                                    {loading ? t('sending') : t('send_message_btn')}
                                    <Send className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                        {/* Email Card */}
                        <Card className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                                <div
                                    className="flex-shrink-0 rounded-xl p-2 sm:p-3 lg:p-4"
                                    style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
                                >
                                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-sm font-semibold sm:text-base lg:text-lg">{t('email_inquiries')}</p>
                                    <a
                                        href={`mailto:${siteSettings?.contact_email || 'Info@2ndhandholding.com'}`}
                                        className="text-sm transition-colors duration-200 hover:underline sm:text-base lg:text-lg"
                                        style={{ color: steelBlue }}
                                    >
                                        {siteSettings?.contact_email || 'Info@2ndhandholding.com'}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        {/* Phone Card */}
                        <Card className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                                <div
                                    className="flex-shrink-0 rounded-xl p-2 sm:p-3 lg:p-4"
                                    style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
                                >
                                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-sm font-semibold sm:text-base lg:text-lg">{t('direct_consultation')}</p>
                                    <a
                                        href={`tel:${siteSettings?.contact_phone?.replace(/\s+/g, '') || '+31625334951'}`}
                                        className="text-sm transition-colors duration-200 hover:underline sm:text-base lg:text-lg"
                                        style={{ color: steelBlue }}
                                    >
                                        {siteSettings?.contact_phone || '+31 (6) 25334951'}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        {/* Address and Map Card */}
                        <Card className="p-4 sm:p-6 lg:p-8">
                            <div className="mb-4 flex items-start gap-3 sm:mb-6 sm:gap-4 lg:gap-5">
                                <div
                                    className="flex-shrink-0 rounded-xl p-2 sm:p-3 lg:p-4"
                                    style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
                                >
                                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-2">
                                    <p className="text-sm font-semibold sm:text-base lg:text-lg">{t('visit_our_facility')}</p>
                                    <p className="text-xs text-slate-600 sm:text-sm lg:text-base">
                                        {siteSettings?.contact_address || 'Waterbeemd 2B, 5705 DN Helmond, Netherlands'}
                                    </p>
                                    <a
                                        href="https://www.google.com/maps?q=Waterbeemd+2B,+5705+DN+Helmond,+Netherlands"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-xs transition-colors duration-200 hover:underline sm:text-sm lg:text-base"
                                        style={{ color: steelBlue }}
                                    >
                                        {t('schedule_tour')}
                                    </a>
                                </div>
                            </div>

                            {/* Responsive Map */}
                            <div className="relative w-full overflow-hidden rounded-lg border">
                                <iframe
                                    className="h-48 w-full sm:h-56 md:h-64 lg:h-72 xl:h-80"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.4054706121573!2d5.659797676888595!3d51.48243397952794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c728cc878e130f%3A0x465e58709af94a83!2sWaterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1690225065506!5m2!1sen!2sus"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Resteel Location Map"
                                    style={{ border: 0 }}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface PageProps {
    siteSettings: SiteSettings;
}

export const ContactPage = ({ siteSettings }: PageProps) => {
    return (
        <Layout title={`${siteSettings.company_name} | Contact`} siteSettings={siteSettings}>
            <ContactCTA siteSettings={siteSettings} />
        </Layout>
    );
};

export default ContactCTA;
