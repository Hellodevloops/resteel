import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Clock, Mail, MapPin, Phone, Users, Zap, Send, User, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

const ContactCTA = () => {
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
            contact: 'info@resteel.com',
            href: 'mailto:info@resteel.com?subject=Premium Steel Solutions Inquiry',
            color: 'from-orange-500 to-orange-600',
            accent: 'border-orange-500/30',
        },
        {
            icon: Phone,
            title: 'Direct Consultation',
            subtitle: 'Speak with our engineering specialists',
            contact: '+31 (0) 123 456 789',
            href: 'tel:+31123456789',
            color: 'from-blue-600 to-blue-700',
            accent: 'border-blue-600/30',
        },
        {
            icon: MapPin,
            title: 'Visit Our Facility',
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
            <Head title="Contact Us" />
            <section id="contact-section" className="relative overflow-hidden bg-slate-50 py-16 md:py-16 lg:py-16">
                <div className="absolute inset-0 overflow-hidden">
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
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`mb-12 md:mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/10 to-blue-600/10 px-6 py-3 backdrop-blur-sm">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                            <span className="text-sm font-semibold tracking-wide text-slate-700 uppercase">Expert Consultation</span>
                        </div>
                        <h2 className="mb-6 text-4xl leading-tight font-bold text-slate-800 md:text-5xl lg:text-6xl">
                            Ready to Build
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Something Great?
                            </span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
                            Transform your vision into reality with our precision engineering and decades of expertise. Let's discuss your next
                            industrial project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                        <div className="space-y-6">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-2xl border bg-white/80 p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${method.accent} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                    ></div>
                                    <div className="relative flex items-start space-x-4 md:space-x-6">
                                        <div
                                            className={`flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} shadow-lg`}
                                        >
                                            <method.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="mb-2 text-xl md:text-2xl font-bold text-slate-800">{method.title}</h3>
                                            <p className="mb-4 text-sm md:text-base text-slate-600">{method.subtitle}</p>
                                            <a
                                                href={method.href}
                                                className="group/link inline-flex items-center text-base md:text-lg font-semibold text-slate-800 transition-colors hover:text-orange-600"
                                            >
                                                <span className="truncate">{method.contact}</span>
                                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1" />
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
                            className={`space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-800 p-8 md:p-10 text-white shadow-2xl">
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.3) 0%, transparent 50%),
                                                     radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.3) 0%, transparent 50%)`,
                                    }}
                                ></div>
                                <div className="relative">
                                    <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold">Start Your Project Today</h3>
                                    <p className="mb-6 md:mb-8 text-base md:text-lg text-white/80">
                                        Get a personalized consultation and detailed project estimate within 24 hours. Our experts are ready to bring
                                        your vision to life.
                                    </p>
                                    <div className="flex flex-col gap-3 md:gap-4 sm:flex-row">
                                        <Button
                                            size="lg"
                                            className="bg-orange-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25"
                                        >
                                            Get Free Consultation
                                            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-white/30 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10"
                                        >
                                            <a href="tel:+31123456789">Call Now</a>
                                        </Button>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 h-16 w-16 md:h-20 md:w-20 animate-pulse rounded-full bg-orange-500/20"></div>
                                <div
                                    className="absolute bottom-4 left-4 h-12 w-12 md:h-16 md:w-16 animate-pulse rounded-full bg-blue-600/20"
                                    style={{ animationDelay: '1s' }}
                                ></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                                    >
                                        <div className="mb-3 md:mb-4 flex justify-center">
                                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 transition-transform duration-300 group-hover:scale-110">
                                                <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm font-semibold text-slate-700">{feature.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-6 text-center backdrop-blur-sm">
                                <div className="mb-2 md:mb-3 flex justify-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                                    ))}
                                </div>
                                <p className="text-xs md:text-sm font-semibold text-slate-700">Trusted by 500+ Industrial Clients</p>
                                <p className="text-xs text-slate-500">Average 4.9/5 satisfaction rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    <div className="bg-white p-8 md:p-12 lg:p-16 flex items-center justify-center">
                        <div className="w-full max-w-lg">
                            <div className="mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl">
                                        <MessageSquare className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-3xl font-bold text-slate-800">Send us a Message</h3>
                                        <p className="text-lg text-slate-600 mt-2">We'll respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all duration-300"
                                            placeholder="Your Name *"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all duration-300"
                                            placeholder="Phone Number"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all duration-300"
                                            placeholder="Email Address *"
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all duration-300"
                                            placeholder="Company Name"
                                        />
                                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                    </div>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all duration-300 resize-none"
                                        placeholder="Tell us about your project requirements *"
                                        required
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                                >
                                    Send Message
                                    <Send className="ml-3 h-6 w-6" />
                                </Button>
                                <div className="pt-6 border-t border-slate-200">
                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-slate-600">Need immediate assistance?</p>
                                        <p className="text-sm text-slate-500">
                                            Call us directly at{' '}
                                            <a href="tel:+31123456789" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                                                +31 (0) 123 456 789
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="relative bg-slate-200 min-h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d5.6234567!3d51.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWesterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Resteel Location Map"
                        ></iframe>
                        <div className="absolute top-10 left-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 max-w-sm">
                            <div className="flex items-start space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-2">Our Location</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Westerbeemd 2B<br />
                                        5705 DN Helmond<br />
                                        Netherlands
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <p className="text-xs text-slate-500">
                                            Open Monday - Friday<br />
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
