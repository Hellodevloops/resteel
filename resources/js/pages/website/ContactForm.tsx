import { useState } from 'react';
import axios from 'axios';
import { X, User, Mail, Phone, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: `I am interested in ${productName}. Please provide more information.`,
    status: 'pending',
    type: 'Lead',
    source: 'Website',
    value: ''
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
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || 
                       document.cookie.split('; ')
                         .find(row => row.startsWith('XSRF-TOKEN='))
                         ?.split('=')[1];

      const response = await axios.post('/contacts', formData, {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'Accept': 'application/json',
        }
      });

      // Handle successful response
      if (response.data && response.data.success) {
        setSubmitStatus('success');
        setStatusMessage(response.data.message || 'Thank you! Your inquiry has been submitted successfully. We\'ll get back to you within 24 hours.');
        
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
            value: ''
          });
        }, 3000);
      } else {
        setSubmitStatus('error');
        setStatusMessage('Unexpected response format. Please try again.');
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 422 && data.errors) {
          // Validation errors
          setErrors(data.errors);
          setSubmitStatus('error');
          setStatusMessage('Please correct the errors below and try again.');
        } else if (status === 419) {
          // CSRF token mismatch
          setSubmitStatus('error');
          setStatusMessage('Security token expired. Please refresh the page and try again.');
        } else {
          setSubmitStatus('error');
          setStatusMessage(data.message || 'Server error occurred. Please try again later.');
        }
      } else if (error.request) {
        // Network error
        setSubmitStatus('error');
        setStatusMessage('Network error. Please check your connection and try again.');
      } else {
        // Other error
        setSubmitStatus('error');
        setStatusMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear status messages when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <p className="text-sm text-slate-600 mt-1">We'd love to hear from you</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 group"
            >
              <X className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>
        </div>

        <div className="px-8 py-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Product Interest Badge */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm font-medium text-slate-700">
                Interested in: <span className="text-blue-600 font-semibold">{productName}</span>
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fade-in">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-emerald-800 font-semibold text-sm mb-1">Success!</h4>
                  <p className="text-emerald-700 text-sm leading-relaxed">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-fade-in">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-800 font-semibold text-sm mb-1">Error</h4>
                  <p className="text-red-700 text-sm leading-relaxed">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <User className="h-4 w-4 mr-2 text-slate-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.name 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Mail className="h-4 w-4 mr-2 text-slate-400" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                }`}
                placeholder="your.email@company.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="h-4 w-4 mr-2 text-slate-400" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.phone 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Building className="h-4 w-4 mr-2 text-slate-400" />
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.company 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                  }`}
                  placeholder="Your company name"
                />
                {errors.company && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                Inquiry Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 hover:border-gray-300 transition-all duration-200 bg-white"
              >
                <option value="Lead">General Inquiry</option>
                <option value="Customer">Existing Customer Support</option>
                <option value="Partner">Partnership Opportunity</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                  errors.message 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                }`}
                placeholder="Tell us more about your requirements or questions..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={processing || submitStatus === 'success'}
              className={`w-full py-4 px-6 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                submitStatus === 'success' 
                  ? 'bg-emerald-500 hover:bg-emerald-500' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500'
              }`}
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
            By submitting this form, you agree to our privacy policy. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;