import axios from 'axios';
import { Building, Mail, MessageCircle, MessageSquare, Phone, Send, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: 'active' | 'pending' | 'inactive';
    type: 'Lead' | 'Customer' | 'Partner';
    source: string;
    value: number | null;
}

const FloatingChatbot: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [chatMessages, setChatMessages] = useState([{ type: 'bot', text: t('chatbot_welcome') }]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        status: 'pending',
        type: 'Lead',
        source: 'Website Chatbot',
        value: null,
    });

    const reset = () => {
        setData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            status: 'pending',
            type: 'Lead',
            source: 'Website Chatbot',
            value: null,
        });
        setErrors({});
    };

    const steps = [
        { field: 'name', question: t('chatbot_name_question'), icon: User, placeholder: t('chatbot_name_placeholder') },
        { field: 'email', question: t('chatbot_email_question'), icon: Mail, placeholder: t('chatbot_email_placeholder') },
        { field: 'phone', question: t('chatbot_phone_question'), icon: Phone, placeholder: t('chatbot_phone_placeholder'), optional: true },
        {
            field: 'company',
            question: t('chatbot_company_question'),
            icon: Building,
            placeholder: t('chatbot_company_placeholder'),
            optional: true,
        },
        {
            field: 'message',
            question: t('chatbot_message_question'),
            icon: MessageSquare,
            placeholder: t('chatbot_message_placeholder'),
        },
    ];

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setCurrentStep(0);
            reset();
            setChatMessages([{ type: 'bot', text: t('chatbot_welcome') }]);
        }
    };

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    // Phone number validation function
    const validatePhoneNumber = (phone: string): boolean => {
        // Remove all non-digit characters except +, -, (, ), and space
        const cleaned = phone.replace(/[^\d+\-()\s]/g, '');

        // Remove all non-digit characters for length check
        const digitsOnly = phone.replace(/\D/g, '');

        // Check if it's empty (optional field)
        if (!phone.trim()) {
            return true;
        }

        // Check minimum length (at least 7 digits for a valid phone number)
        if (digitsOnly.length < 7) {
            return false;
        }

        // Check maximum length (reasonable limit of 15 digits)
        if (digitsOnly.length > 15) {
            return false;
        }

        // Check for valid phone number patterns
        // Supports international formats with +, local formats with country codes, etc.
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$|^[+]?[(]?[1-9][\d]{0,4}[)]?[\d\s-]{0,15}$/;

        return phoneRegex.test(cleaned);
    };

    const handleNext = () => {
        const currentField = steps[currentStep].field as keyof ContactFormData;
        const currentValue = data[currentField];

        // Validate required fields
        if (!currentValue && !steps[currentStep].optional) {
            setErrors({ [currentField]: t('chatbot_field_required', { field: steps[currentStep].question.replace('?', '') }) });
            return;
        }

        // Email validation
        if (currentField === 'email' && currentValue) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(String(currentValue))) {
                setErrors({ email: t('chatbot_invalid_email') });
                return;
            }
        }

        // Phone validation
        if (currentField === 'phone' && currentValue) {
            if (!validatePhoneNumber(String(currentValue))) {
                setErrors({ phone: t('chatbot_invalid_phone') });
                return;
            }
        }

        // Clear any existing errors
        setErrors({});

        // Skip optional fields if empty
        if (!currentValue && steps[currentStep].optional) {
            setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_no_problem') }]);
        } else {
            setChatMessages((prev) => [
                ...prev,
                { type: 'user', text: String(currentValue) },
                { type: 'bot', text: currentStep === steps.length - 1 ? t('chatbot_perfect_submit') : t('chatbot_great_next') },
            ]);
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(steps.length); // Set to steps.length to indicate submission
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await axios.post('/contacts', data, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    Accept: 'application/json',
                },
                withCredentials: true, // important for Laravel session cookies
            });

            const result = response.data;

            if (result.success) {
                setChatMessages((prev) => [
                    ...prev,
                    {
                        type: 'bot',
                        text: t('chatbot_success_message', { name: data.name }),
                    },
                ]);
                setTimeout(() => {
                    setIsOpen(false);
                    reset();
                    setCurrentStep(0);
                    setChatMessages([{ type: 'bot', text: t('chatbot_welcome') }]);
                }, 3000);
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                    setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_error_check_info') }]);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            }
        } catch (error: unknown) {
            console.error('Error submitting form:', error);

            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number; data?: { errors?: Record<string, string> } } };

                if (axiosError.response?.status === 419) {
                    setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_error_csrf') }]);
                } else if (axiosError.response?.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                    setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_error_check_input') }]);
                } else {
                    setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_error_general') }]);
                }
            } else {
                setChatMessages((prev) => [...prev, { type: 'bot', text: t('chatbot_error_general') }]);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const currentStepData = steps[currentStep];
    const currentValue = data[currentStepData?.field as keyof ContactFormData] || '';
    const isSubmitted = currentStep >= steps.length;

    return (
        <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute right-0 bottom-16 mb-3 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl sm:bottom-20 sm:mb-4 sm:w-80">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-600 p-3 text-white sm:p-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 sm:h-8 sm:w-8">
                                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold sm:text-base">{t('chatbot_assistant_title')}</h3>
                                <p className="text-xs text-blue-100">{t('chatbot_expert_subtitle')}</p>
                            </div>
                        </div>
                        <button onClick={toggleChatbot} className="text-white transition-colors hover:text-gray-200">
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-56 space-y-2 overflow-y-auto bg-gray-50 p-3 sm:h-64 sm:space-y-3 sm:p-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[200px] rounded-lg px-2 py-1.5 text-xs sm:max-w-xs sm:px-3 sm:py-2 sm:text-sm ${
                                        msg.type === 'user' ? 'bg-blue-600 text-white' : 'border bg-white text-gray-800'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />

                        {/* Current Question */}
                        {!isSubmitted && currentStepData && (
                            <div className="flex justify-start">
                                <div className="max-w-[200px] rounded-lg border bg-white px-2 py-1.5 text-xs text-gray-800 sm:max-w-xs sm:px-3 sm:py-2 sm:text-sm">
                                    <div className="mb-1 flex items-center space-x-1 sm:mb-2 sm:space-x-2">
                                        <currentStepData.icon className="h-3 w-3 text-blue-600 sm:h-4 sm:w-4" />
                                        <span className="font-medium">{currentStepData.question}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    {!isSubmitted && currentStepData && (
                        <div className="border-t bg-white p-3 sm:p-4">
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    {currentStepData.field === 'message' ? (
                                        <textarea
                                            value={currentValue}
                                            onChange={(e) => handleInputChange(currentStepData.field as keyof ContactFormData, e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full resize-none rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
                                            rows={2}
                                        />
                                    ) : (
                                        <input
                                            type={currentStepData.field === 'email' ? 'email' : 'text'}
                                            value={currentValue}
                                            onChange={(e) => handleInputChange(currentStepData.field as keyof ContactFormData, e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
                                        />
                                    )}
                                    {errors[currentStepData.field as keyof ContactFormData] && (
                                        <p className="mt-1 text-xs text-red-500">{errors[currentStepData.field as keyof ContactFormData]}</p>
                                    )}
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={isSubmitting || (!currentValue && !currentStepData.optional)}
                                    className="flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2"
                                >
                                    {isSubmitting ? (
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-4 sm:w-4"></div>
                                    ) : (
                                        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                                    )}
                                </button>
                            </div>
                            {currentStepData.optional && (
                                <button onClick={handleNext} className="mt-2 text-xs text-gray-500 hover:text-gray-700">
                                    {t('chatbot_skip_step')}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Progress Bar */}
                    {!isSubmitted && (
                        <div className="px-3 pb-2 sm:px-4">
                            <div className="h-1 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-1 rounded-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <p className="mt-1 text-center text-xs text-gray-500">
                                {t('chatbot_step_progress', { current: currentStep + 1, total: steps.length })}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleChatbot}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl active:scale-95 sm:h-14 sm:w-14"
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                ) : (
                    <MessageCircle className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                )}

                {!isOpen && (
                    <div className="absolute right-full mr-2 hidden rounded-lg bg-gray-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block sm:mr-3 sm:px-3 sm:py-2 sm:text-sm">
                        <span className="whitespace-nowrap">{t('chatbot_need_help')}</span>
                        <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default FloatingChatbot;
