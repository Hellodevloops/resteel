import { ArrowRight, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const ContactCTA = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        message: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Get in Touch</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
                        Ready to sell equipment or start a project? Our team, with over 20 years of experience, is here to guide you across Europe.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-900">Send Us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your mobile number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Your Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us about your project or equipment..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
                                >
                                    <Send className="h-5 w-5" /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info & Quick Links */}
                    <div className="space-y-8">
                        {/* Contact Information */}
                        <div className="rounded-3xl bg-white p-6 shadow-xl">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <a href="mailto:2ndhand@tradingbv.com" className="text-sm text-blue-600 hover:text-blue-800">
                                            2ndhand@tradingbv.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <p className="text-sm text-gray-600">Available upon request</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Location</p>
                                        <p className="text-sm text-gray-600">Westleest 2H, 5705 DN Helmond, Netherlands</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Experience</p>
                                        <p className="text-sm text-gray-600">20+ Years Across Europe</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="rounded-3xl bg-white p-6 shadow-xl">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Explore More</h3>
                            <div className="space-y-2">
                                {[
                                    { href: '#services', label: 'Our Services' },
                                    { href: '#portfolio', label: 'Project Portfolio' },
                                    { href: '#references', label: 'Client References' },
                                    { href: '#tender', label: 'Tender Quotations' },
                                    { href: '#agricultural', label: 'Agricultural Sector' },
                                ].map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="block text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map & Newsletter Section */}
                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Map Section */}
                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                        <div className="p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Our Location</h3>
                            <p className="mb-4 text-sm text-gray-600">2nd Hand Trading B.V., Westleest 2H, 5705 DN Helmond, Netherlands</p>
                        </div>
                        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="h-10 w-10 text-red-500" />
                            </div>
                            <p className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
                                Helmond, Netherlands
                            </p>
                        </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-xl">
                        <h3 className="mb-4 text-xl font-semibold">Stay Updated</h3>
                        <p className="mb-6 text-sm">Receive our newsletters.</p>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-300 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-orange-400"
                            />
                            <button className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 transition-colors duration-300 hover:bg-orange-600">
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-gray-200">Join our network of professionals across Europe.</p>
                    </div>
                </div>

                {/* Services Highlights */}
                {/* <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: Building, label: 'Purchase & Sale' },
                        { icon: Users, label: 'Mediation' },
                        { icon: Hammer, label: 'Assembly' },
                        { icon: Truck, label: 'Transport' },
                    ].map((service) => (
                        <div
                            key={service.label}
                            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
                        >
                            <service.icon className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900">{service.label}</span>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default ContactCTA;
