import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { ArrowRight, Award, Clock, Mail, MapPin, MessageSquare, Phone, Send, User, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactCTA = () => {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contacts', {
            onSuccess: () => {
                reset();
                alert('Thank you for your inquiry! We will get back to you within 24 hours.');
            },
        });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Inquiries',
            subtitle: 'Get detailed quotations & technical specifications',
            contact: 'Info@2ndhandholding.com',
            href: 'mailto:Info@2ndhandholding.com?subject=Premium Steel Solutions Inquiry',
            color: 'from-orange-500 to-orange-600',
            accent: 'border-orange-500/30',
        },
        {
            icon: Phone,
            title: 'Direct Consultation',
            subtitle: 'Speak with our engineering specialists',
            contact: '+31 (6) 25334951',
            href: 'tel:+31625334951',
            color: 'from-blue-600 to-blue-700',
            accent: 'border-blue-600/30',
        },
        {
            icon: MapPin,
            title: 'Visit by appointment only',
            subtitle: 'Westerbeemd 2B, 5705 DN Helmond, NL',
            contact: 'Schedule Tour',
            href: '/contact',
            color: 'from-teal-500 to-teal-600',
            accent: 'border-teal-500/30',
        },
    ];

    const features = [
        { icon: Clock, text: '24/7 Project Support' },
        { icon: Award, text: 'ISO 9001 Certified' },
        { icon: Users, text: '500+ Satisfied Clients' },
        { icon: Zap, text: 'Rapid Response Time' },
    ];

    return (
        <>
            <section id="contact-section" className="relative overflow-hidden bg-slate-50 pt-30 pb-16">
                {/* Animated Background Elements */}

                {/* <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/5 blur-3xl"
                        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
                    ></div>
                    <div
                        className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/10 to-slate-700/5 blur-3xl"
                        style={{ transform: `translate3d(0, ${scrollY * -0.1}px, 0)` }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-500/5 to-transparent blur-2xl"
                        style={{ transform: `translate(-50%, -50%) translate3d(0, ${scrollY * 0.05}px, 0)` }}
                    ></div>
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(74, 83, 99, 0.3) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(74, 83, 99, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            transform: `translate3d(0, ${scrollY * 0.02}px, 0)`,
                        }}
                    ></div>
                    <div
                        className="absolute top-10 left-10 h-3 w-3 animate-bounce rounded-full bg-orange-500/40"
                        style={{ animationDuration: '4s' }}
                    ></div>
                    <div
                        className="absolute top-40 right-20 h-2 w-2 animate-bounce rounded-full bg-blue-600/40"
                        style={{ animationDuration: '6s', animationDelay: '-2s' }}
                    ></div>
                    <div
                        className="absolute bottom-20 left-1/4 h-4 w-4 animate-bounce rounded-full bg-teal-500/30"
                        style={{ animationDuration: '5s', animationDelay: '-1s' }}
                    ></div>
                </div> */}

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`mb-12 text-center transition-all duration-1000 md:mb-16 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/10 to-blue-600/10 px-6 py-3 backdrop-blur-sm">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                            <span className="text-sm font-semibold tracking-wide text-slate-700 uppercase">Expert Consultation</span>
                        </div>

                        <h1 className="mb-6 text-4xl leading-tight font-bold text-cyan-600 md:text-5xl lg:text-6xl">
                            Ready to Build
                            <span className="ms-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Something Great?
                            </span>
                        </h1>

                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
                            Transform your vision into reality with our precision engineering and decades of expertise. Let's discuss your next
                            industrial project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                        <div className="space-y-6">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-8 ${method.accent} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                    ></div>
                                    <div className="relative flex items-start space-x-4 md:space-x-6">
                                        <div
                                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br md:h-16 md:w-16 ${method.color} shadow-lg`}
                                        >
                                            <method.icon className="h-7 w-7 text-white md:h-8 md:w-8" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-2 text-xl font-bold text-cyan-600 md:text-2xl">{method.title}</h3>
                                            <p className="mb-4 text-sm text-slate-600 md:text-base">{method.subtitle}</p>
                                            <a
                                                href={method.href}
                                                className="group/link inline-flex items-center text-base font-semibold text-cyan-600 transition-colors hover:text-orange-600 md:text-lg"
                                            >
                                                <span className="truncate">{method.contact}</span>
                                                <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1 md:h-5 md:w-5" />
                                            </a>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${method.color} transition-all duration-300 group-hover:w-full`}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`space-y-6 transition-all duration-1000 md:space-y-8 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                        >
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group rounded-2xl border border-slate-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-6 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                                    >
                                        <div className="mb-3 flex justify-center md:mb-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12">
                                                <feature.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                                            </div>
                                        </div>
                                        <p className="text-xs font-semibold text-cyan-600 md:text-sm">{feature.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-center backdrop-blur-sm md:p-6">
                                <div className="mb-2 flex justify-center space-x-1 md:mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 md:h-5 md:w-5"
                                        ></div>
                                    ))}
                                </div>
                                <p className="text-xs font-semibold text-cyan-600 md:text-sm">Trusted by 500+ Industrial Clients</p>
                                <p className="text-xs text-slate-500">Average 4.9/5 satisfaction rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-100">
                <div className="grid min-h-[500px] grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center bg-white p-8 md:p-12 lg:p-16">
                        <div className="w-full max-w-lg">
                            <div className="mb-8">
                                <div className="mb-6 flex items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl">
                                        <MessageSquare className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-3xl font-bold text-cyan-600">
                                            Send us a{' '}
                                            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                                                Message
                                            </span>
                                        </h3>
                                        <p className="mt-2 text-lg text-cyan-600">We'll respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <User className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-4 pr-4 pl-12 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                            placeholder="Your Name *"
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <Phone className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-4 pr-4 pl-12 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                            placeholder="Phone Number"
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <Mail className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-4 pr-4 pl-12 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                            placeholder="Email Address *"
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                            placeholder="Company Name"
                                        />
                                        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                                    </div>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={5}
                                        className="w-full resize-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                        placeholder="Tell us about your project requirements *"
                                        required
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    size="lg"
                                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:shadow-orange-500/25"
                                >
                                    {t('send_message_btn')}
                                    <Send className="ml-3 h-6 w-6" />
                                </Button>
                                <div className="border-t border-slate-200 pt-6">
                                    <div className="space-y-2 text-center">
                                        <p className="text-sm text-cyan-600">Need immediate assistance?</p>
                                        <p className="text-sm text-cyan-600">
                                            Call us directly at{' '}
                                            <a
                                                href="tel:+31123456789"
                                                className="font-semibold text-orange-600 transition-colors hover:text-orange-700"
                                            >
                                                +31 (6) 25334951
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="relative min-h-[500px] bg-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d5.6234567!3d51.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWesterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Resteel Location Map"
                        ></iframe>
                        <div className="absolute top-10 left-10 max-w-sm rounded-2xl border border-white/50 bg-white/95 p-6 shadow-xl backdrop-blur-sm">
                            <div className="flex items-start space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="mb-2 text-lg font-bold text-cyan-600">Our Location</h4>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        Westerbeemd 2B
                                        <br />
                                        5705 DN Helmond
                                        <br />
                                        Netherlands
                                    </p>
                                    <div className="mt-4 border-t border-slate-200 pt-4">
                                        <p className="text-xs text-slate-500">
                                            Open Monday - Friday
                                            <br />
                                            8:00 AM - 6:00 PM CET
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactCTA;
