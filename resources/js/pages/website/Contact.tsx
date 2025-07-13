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
        <section id="contact-section" className="bg-slate-200/80 py-25">
            <div className="container mx-auto max-w-7xl space-y-16 px-4">
                <div className="text-center">
                    <span
                        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
                    >
                        {t('expert_consultation')}
                    </span>
                    <h2 className="text-4xl font-bold md:text-5xl" style={{ color: charcoal }}>
                        {t('ready_to_build_great').split(' ').slice(0, -2).join(' ')}{' '}
                        <span style={{ color: steelBlue }}>{t('ready_to_build_great').split(' ').slice(-2).join(' ')}</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">{t('transform_vision_subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {/* Form */}
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold md:text-3xl" style={{ color: steelBlue }}>
                                {t('send_us_message')}
                            </CardTitle>
                            <CardDescription className="text-md">{t('respond_soon')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">{t('name_required')}</Label>
                                        <Input id="name" value={data.name} onChange={handleChange} />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">{t('phone')}</Label>
                                        <Input id="phone" value={data.phone} onChange={handleChange} />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="email">{t('email_required')}</Label>
                                        <Input id="email" type="email" value={data.email} onChange={handleChange} />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="company">{t('your_company')}</Label>
                                        <Input id="company" value={data.company} onChange={handleChange} />
                                        {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="message">{t('message_required')}</Label>
                                    <Textarea id="message" value={data.message} onChange={handleChange} rows={5} />
                                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                                </div>
                                {/* 
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="building_category">Building Types</Label>
                                        <select
                                            id="building_category"
                                            value={data.building_category}
                                            onChange={handleChange}
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select building type</option>
                                            <option value="Warehouses">Warehouses</option>
                                            <option value="Steel Constructions">Steel Constructions</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.building_category && <p className="text-sm text-red-500">{errors.building_category}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="building_type">Type Building</Label>
                                        <select
                                            id="building_type"
                                            value={data.building_type}
                                            onChange={handleChange}
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select type</option>
                                            <option value="Industrial">Industrial</option>
                                            <option value="AGRI">AGRI</option>
                                        </select>
                                        {errors.building_type && <p className="text-sm text-red-500">{errors.building_type}</p>}
                                    </div>
                                </div> */}
                                {/* 
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="building_width">Width</Label>
                                        <Input
                                            id="building_width"
                                            value={data.building_width}
                                            onChange={handleChange}
                                            placeholder="Width in meters"
                                        />
                                        {errors.building_width && <p className="text-sm text-red-500">{errors.building_width}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="building_length">Length</Label>
                                        <Input
                                            id="building_length"
                                            value={data.building_length}
                                            onChange={handleChange}
                                            placeholder="Length in meters"
                                        />
                                        {errors.building_length && <p className="text-sm text-red-500">{errors.building_length}</p>}
                                    </div>
                                </div> */}
                                {/* 
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="gutter_height">High Gutter</Label>
                                        <Input id="gutter_height" value={data.gutter_height} onChange={handleChange} placeholder="Height in meters" />
                                        {errors.gutter_height && <p className="text-sm text-red-500">{errors.gutter_height}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="top_height">High Top</Label>
                                        <Input id="top_height" value={data.top_height} onChange={handleChange} placeholder="Height in meters" />
                                        {errors.top_height && <p className="text-sm text-red-500">{errors.top_height}</p>}
                                    </div>
                                </div> */}

                                <Button
                                    type="submit"
                                    className="mt-6 flex w-full items-center justify-center gap-2 text-white"
                                    style={{ backgroundColor: vibrantOrange }}
                                    disabled={loading}
                                >
                                    {loading ? t('sending') : t('send_message_btn')} <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <Card className="flex items-start gap-4 p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl p-3 text-white" style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">{t('email_inquiries')}</p>
                                    <a
                                        href={`mailto:${siteSettings?.contact_email || 'Info@2ndhandholding.com'}`}
                                        className="text-md hover:underline"
                                        style={{ color: steelBlue }}
                                    >
                                        {siteSettings?.contact_email || 'Info@2ndhandholding.com'}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card className="flex items-start gap-4 p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl p-3 text-white" style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">{t('direct_consultation')}</p>
                                    <a
                                        href={`tel:${siteSettings?.contact_phone?.replace(/\s+/g, '') || '+31625334951'}`}
                                        className="text-md hover:underline"
                                        style={{ color: steelBlue }}
                                    >
                                        {siteSettings?.contact_phone || '+31 (6) 25334951'}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl p-3 text-white" style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">{t('visit_our_facility')}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {siteSettings?.contact_address || 'Waterbeemd 2B, 5705 DN Helmond, Netherlands'}
                                    </p>
                                    <a
                                        href="https://www.google.com/maps?q=Waterbeemd+2B,+5705+DN+Helmond,+Netherlands"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm hover:underline"
                                        style={{ color: steelBlue }}
                                    >
                                        {t('schedule_tour')}
                                    </a>
                                </div>
                            </div>
                            <iframe
                                className="h-30 w-full rounded-md border"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.4054706121573!2d5.659797676888595!3d51.48243397952794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c728cc878e130f%3A0x465e58709af94a83!2sWaterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1690225065506!5m2!1sen!2sus"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Resteel Location Map"
                            />
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

const ContactPage = ({ siteSettings }: PageProps) => {
    return (
        <Layout title={`${siteSettings.company_name} | Contact`} siteSettings={siteSettings}>
            <ContactCTA siteSettings={siteSettings} />
        </Layout>
    );
};

export default ContactPage;
