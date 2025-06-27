import axios from 'axios';
import { Building, Mail, MessageCircle, MessageSquare, Phone, Send, User, X } from 'lucide-react';
import React, { useState } from 'react';

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
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [chatMessages, setChatMessages] = useState([
        { type: 'bot', text: "Hello! 👋 I'm here to help you with your industrial building needs. Let's get started!" },
    ]);

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
        { field: 'name', question: "What's your name?", icon: User, placeholder: 'Enter your full name' },
        { field: 'email', question: "What's your email address?", icon: Mail, placeholder: 'Enter your email' },
        { field: 'phone', question: "What's your phone number?", icon: Phone, placeholder: 'Enter your phone number (optional)', optional: true },
        {
            field: 'company',
            question: "What's your company name?",
            icon: Building,
            placeholder: 'Enter your company name (optional)',
            optional: true,
        },
        {
            field: 'message',
            question: 'Tell us about your requirements:',
            icon: MessageSquare,
            placeholder: 'Describe your industrial building needs',
        },
    ];

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setCurrentStep(0);
            reset();
            setChatMessages([{ type: 'bot', text: "Hello! 👋 I'm here to help you with your industrial building needs. Let's get started!" }]);
        }
    };

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleNext = () => {
        const currentField = steps[currentStep].field as keyof ContactFormData;
        const currentValue = data[currentField];

        // Validate required fields
        if (!currentValue && !steps[currentStep].optional) {
            setErrors({ [currentField]: `${steps[currentStep].question.replace('?', '')} is required` });
            return;
        }

        // Email validation
        if (currentField === 'email' && currentValue) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(String(currentValue))) {
                setErrors({ email: 'Please enter a valid email address' });
                return;
            }
        }

        // Clear any existing errors
        setErrors({});

        // Skip optional fields if empty
        if (!currentValue && steps[currentStep].optional) {
            setChatMessages((prev) => [...prev, { type: 'bot', text: "No problem! Let's continue." }]);
        } else {
            setChatMessages((prev) => [
                ...prev,
                { type: 'user', text: String(currentValue) },
                { type: 'bot', text: currentStep === steps.length - 1 ? 'Perfect! Let me submit your information.' : 'Great! Next question:' },
            ]);
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
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
                        text: `✅ Thank you ${result.data.name}! Your information has been submitted successfully. Our team will contact you soon!`,
                    },
                ]);
                setTimeout(() => {
                    setIsOpen(false);
                    reset();
                    setCurrentStep(0);
                    setChatMessages([
                        { type: 'bot', text: "Hello! 👋 I'm here to help you with your industrial building needs. Let's get started!" },
                    ]);
                }, 3000);
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                    setChatMessages((prev) => [...prev, { type: 'bot', text: '❌ Please check your information and try again.' }]);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);

            if (error.response?.status === 419) {
                setChatMessages((prev) => [...prev, { type: 'bot', text: '❌ CSRF token mismatch. Please refresh the page and try again.' }]);
            } else if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                setChatMessages((prev) => [...prev, { type: 'bot', text: '❌ Please check your input and try again.' }]);
            } else {
                setChatMessages((prev) => [
                    ...prev,
                    { type: 'bot', text: '❌ Sorry, there was an error submitting your information. Please try again later.' },
                ]);
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

    const currentStepData = steps[currentStep];
    const currentValue = data[currentStepData?.field as keyof ContactFormData] || '';
    const isSubmitted = currentStep >= steps.length;

    return (
        <div className="fixed right-6 bottom-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute right-0 bottom-20 mb-4 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                <MessageCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Resteel Assistant</h3>
                                <p className="text-xs text-blue-100">Industrial Buildings Expert</p>
                            </div>
                        </div>
                        <button onClick={toggleChatbot} className="text-white transition-colors hover:text-gray-200">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-64 space-y-3 overflow-y-auto bg-gray-50 p-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                                        msg.type === 'user' ? 'bg-blue-600 text-white' : 'border bg-white text-gray-800'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Current Question */}
                        {!isSubmitted && currentStepData && (
                            <div className="flex justify-start">
                                <div className="max-w-xs rounded-lg border bg-white px-3 py-2 text-sm text-gray-800">
                                    <div className="mb-2 flex items-center space-x-2">
                                        <currentStepData.icon className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">{currentStepData.question}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    {!isSubmitted && currentStepData && (
                        <div className="border-t bg-white p-4">
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    {currentStepData.field === 'message' ? (
                                        <textarea
                                            value={currentValue}
                                            onChange={(e) => handleInputChange(currentStepData.field as keyof ContactFormData, e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            rows={2}
                                        />
                                    ) : (
                                        <input
                                            type={currentStepData.field === 'email' ? 'email' : 'text'}
                                            value={currentValue}
                                            onChange={(e) => handleInputChange(currentStepData.field as keyof ContactFormData, e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    )}
                                    {errors[currentStepData.field as keyof ContactFormData] && (
                                        <p className="mt-1 text-xs text-red-500">{errors[currentStepData.field as keyof ContactFormData]}</p>
                                    )}
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={isSubmitting || (!currentValue && !currentStepData.optional)}
                                    className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {currentStepData.optional && (
                                <button onClick={handleNext} className="mt-2 text-xs text-gray-500 hover:text-gray-700">
                                    Skip this step
                                </button>
                            )}
                        </div>
                    )}

                    {/* Progress Bar */}
                    {!isSubmitted && (
                        <div className="px-4 pb-2">
                            <div className="h-1 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-1 rounded-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <p className="mt-1 text-center text-xs text-gray-500">
                                Step {currentStep + 1} of {steps.length}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleChatbot}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl"
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                ) : (
                    <MessageCircle className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                )}

                {/* Pulse animation */}
                {/* {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
                )} */}

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-3 hidden group-hover:block">
                        <div className="rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg">
                            Need help? Let's chat!
                            <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default FloatingChatbot;
