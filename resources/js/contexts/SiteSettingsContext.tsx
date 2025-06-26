import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

export interface SiteSettings {
    id?: number;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    tax_rate: number;
    company_name: string;
    company_tagline: string;
    company_description: string;
    email_notifications?: boolean;
    order_notifications?: boolean;
    contact_form_notifications?: boolean;
    shipping_enabled: boolean;
    shipping_rate: string;
    free_shipping_threshold: string;
    shipping_zones: string[];
    last_updated?: string;
}

export interface SiteSettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => void;
    resetSettings: () => void;
    isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

interface SiteSettingsProviderProps {
    children: ReactNode;
}

// Default settings
const defaultSettings: SiteSettings = {
    id: 1,
    contact_email: 'contact@company.com',
    contact_phone: '+1 (555) 123-4567',
    contact_address: '123 Business Street, City, State 12345, Country',
    tax_rate: 8.5,
    company_name: 'Your Company Name',
    company_tagline: 'Building the future, one solution at a time',
    company_description: 'We are a leading company in our industry, providing innovative solutions to our customers worldwide.',
    email_notifications: true,
    order_notifications: true,
    contact_form_notifications: false,
    shipping_enabled: true,
    shipping_rate: '5.99',
    free_shipping_threshold: '50.00',
    shipping_zones: ['United States', 'Canada', 'Europe'],
    last_updated: new Date().toISOString().split('T')[0],
};

// Function to load settings from localStorage
const loadSettingsFromStorage = (): SiteSettings => {
    try {
        if (typeof window === 'undefined') return defaultSettings; // SSR check
        const savedSettings = localStorage.getItem('resteel-site-settings');
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            // Merge with default settings to ensure all properties exist
            return { ...defaultSettings, ...parsedSettings };
        }
    } catch (error) {
        console.error('❌ Failed to load site settings from localStorage:', error);
    }
    return defaultSettings;
};

// Function to save settings to localStorage
const saveSettingsToStorage = (settings: SiteSettings) => {
    try {
        if (typeof window === 'undefined') return; // SSR check
        localStorage.setItem('resteel-site-settings', JSON.stringify(settings));
        console.log('💾 Site settings saved to localStorage');
    } catch (error) {
        console.error('❌ Failed to save site settings to localStorage:', error);
    }
};

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({ children }) => {
    // Initialize settings with data from localStorage
    const [settings, setSettings] = useState<SiteSettings>(() => loadSettingsFromStorage());
    const [isLoading, setIsLoading] = useState(false);
    const isInitialMount = useRef(true);

    // Save settings to localStorage whenever settings change (but not on initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            saveSettingsToStorage(settings);
        }
    }, [settings]);

    // Update settings
    const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            setSettings((prev) => ({
                ...prev,
                ...newSettings,
                last_updated: new Date().toISOString().split('T')[0],
            }));
            setIsLoading(false);
        }, 500);
    }, []);

    // Reset settings to default
    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
    }, []);

    const value: SiteSettingsContextType = {
        settings,
        updateSettings,
        resetSettings,
        isLoading,
    };

    return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
};

// Custom hook to use site settings context
export const useSiteSettings = (): SiteSettingsContextType => {
    const context = useContext(SiteSettingsContext);
    if (context === undefined) {
        throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
    }
    return context;
};
