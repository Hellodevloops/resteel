'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Brand colors
const steelBlue = '#0076A8';
const charcoal = '#3C3F48';
const vibrantOrange = '#FF6600';

const ContactCTA = () => {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
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
        });
        setErrors({});
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 },
        );

        const element = document.getElementById('contact-section');
        if (element) observer.observe(element);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axios.post('/contacts', {
                ...data,
                value: data.value ? parseFloat(data.value) : null,
            });
            reset();
            alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
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
                                    <a href="mailto:Info@2ndhandholding.com" className="text-md hover:underline" style={{ color: steelBlue }}>
                                        Info@2ndhandholding.com
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
                                    <a href="tel:+31123456789" className="text-md hover:underline" style={{ color: steelBlue }}>
                                        +31 (0) 123 456 789
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
                                    <p className="text-muted-foreground text-sm">Westerbeemd 2B, 5705 DN Helmond</p>
                                    <a href="/contact" className="text-sm hover:underline" style={{ color: steelBlue }}>
                                        {t('schedule_tour')}
                                    </a>
                                </div>
                            </div>
                            <iframe
                                className="h-30 w-full rounded-md border"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d5.6234567!3d51.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWesterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1234567890123"
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

export default ContactCTA;
