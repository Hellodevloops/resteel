import axios from 'axios';
import { AlertCircle, Building, CheckCircle, Mail, MessageSquare, Phone, User, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const steelBlue = '#0076A8';
const charcoal = '#3C3F48';
const lightGray = '#F8FAFC';

export type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: string;
    type: string;
    source: string;
    value: string;
};

type ContactFormProps = {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
};

const ContactForm = ({ isOpen, onClose, productName }: ContactFormProps) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: t('contact_form_interested_in', { product: productName }),
        status: 'pending',
        type: 'Lead',
        source: 'Website',
        value: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSubmitStatus('idle');

        try {
            // Configure axios defaults for Laravel
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            // Get CSRF token from meta tag or cookie
            const csrfToken =
                document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

            const response = await axios.post('/contacts', formData, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    Accept: 'application/json',
                },
            });

            // Handle successful response
            if (response.data && response.data.success) {
                setSubmitStatus('success');
                setStatusMessage(response.data.message || t('contact_form_success_message'));

                // Auto-close after showing success message
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                    setStatusMessage('');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        message: '',
                        status: 'pending',
                        type: 'Lead',
                        source: 'Website',
                        value: '',
                    });
                }, 3000);
            } else {
                setSubmitStatus('error');
                setStatusMessage(t('contact_form_unexpected_response'));
            }
        } catch (error: any) {
            if (error.response) {
                // Server responded with error status
                const { status, data } = error.response;

                if (status === 422 && data.errors) {
                    // Validation errors
                    setErrors(data.errors);
                    setSubmitStatus('error');
                    setStatusMessage(t('contact_form_validation_error'));
                } else if (status === 419) {
                    // CSRF token mismatch
                    setSubmitStatus('error');
                    setStatusMessage(t('contact_form_csrf_error'));
                } else {
                    setSubmitStatus('error');
                    setStatusMessage(data.message || t('contact_form_server_error'));
                }
            } else if (error.request) {
                // Network error
                setSubmitStatus('error');
                setStatusMessage(t('contact_form_network_error'));
            } else {
                // Other error
                setSubmitStatus('error');
                setStatusMessage(t('contact_form_unexpected_error'));
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear status messages when user starts typing
        if (submitStatus !== 'idle') {
            setSubmitStatus('idle');
            setStatusMessage('');
        }
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 mt-22 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                {/* Header */}
                <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-blue-50 px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-2xl font-bold text-transparent">
                                {t('get_in_touch')}
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">{t('we_d_love_to_hear_from_you')}</p>
                        </div>
                        <button onClick={onClose} className="group rounded-full p-2 transition-all duration-200 hover:bg-white/80">
                            <X className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-600" />
                        </button>
                    </div>
                </div>

                <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-8 py-6">
                    {/* Product Interest Badge */}
                    <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <p className="text-sm font-medium text-slate-700">
                                {t('interested_in')}: <span className="font-semibold text-blue-600">{productName}</span>
                            </p>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="animate-fade-in mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <div>
                                    <h4 className="mb-1 text-sm font-semibold text-emerald-800">{t('success')}</h4>
                                    <p className="text-sm leading-relaxed text-emerald-700">{statusMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="animate-fade-in mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                <div>
                                    <h4 className="mb-1 text-sm font-semibold text-red-800">{t('error')}</h4>
                                    <p className="text-sm leading-relaxed text-red-700">{statusMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div>
                            <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                <User className="mr-2 h-4 w-4 text-slate-400" />
                                {t('full_name')} *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:outline-none ${
                                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                                }`}
                                placeholder={t('enter_full_name')}
                            />
                            {errors.name && (
                                <p className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="mr-1 h-4 w-4" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                <Mail className="mr-2 h-4 w-4 text-slate-400" />
                                {t('email_address')} *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:outline-none ${
                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                                }`}
                                placeholder={t('email_placeholder')}
                            />
                            {errors.email && (
                                <p className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="mr-1 h-4 w-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone and Company Row */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                    <Phone className="mr-2 h-4 w-4 text-slate-400" />
                                    {t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:outline-none ${
                                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                                    }`}
                                    placeholder={t('phone_placeholder')}
                                />
                                {errors.phone && (
                                    <p className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                    <Building className="mr-2 h-4 w-4 text-slate-400" />
                                    {t('company')}
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:outline-none ${
                                        errors.company ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                                    }`}
                                    placeholder={t('company_placeholder')}
                                />
                                {errors.company && (
                                    <p className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.company}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Inquiry Type */}
                        <div>
                            <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                <MessageSquare className="mr-2 h-4 w-4 text-slate-400" />
                                {t('inquiry_type')}
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                            >
                                <option value="Lead">{t('general_inquiry')}</option>
                                <option value="Customer">{t('existing_customer_support')}</option>
                                <option value="Partner">{t('partnership_opportunity')}</option>
                            </select>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="mb-2 flex items-center text-sm font-semibold text-slate-700">
                                <MessageSquare className="mr-2 h-4 w-4 text-slate-400" />
                                {t('message')} *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className={`w-full resize-none rounded-xl border-2 p-4 transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:outline-none ${
                                    errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                                }`}
                                placeholder={t('message_placeholder')}
                            />
                            {errors.message && (
                                <p className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="mr-1 h-4 w-4" />
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing || submitStatus === 'success'}
                            className={`flex w-full transform items-center justify-center space-x-2 rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed ${
                                submitStatus === 'success'
                                    ? 'bg-emerald-500 hover:bg-emerald-500'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500'
                            }`}
                        >
                            {processing ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                    <span>{t('sending')}</span>
                                </>
                            ) : submitStatus === 'success' ? (
                                <>
                                    <CheckCircle className="h-5 w-5" />
                                    <span>{t('sent_successfully')}</span>
                                </>
                            ) : (
                                <>
                                    <Mail className="h-5 w-5" />
                                    <span>{t('send_inquiry')}</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">{t('contact_form_privacy_note')}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
