import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AlertCircle, Facebook, Globe, Instagram, Link2, Linkedin, Mail, MapPin, Phone, RefreshCw, Save, Twitter, Youtube } from 'lucide-react';

interface SiteSettings {
    id?: number;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    tax_rate: number;
    company_name: string;
    company_tagline: string;
    company_description: string;
    shipping_enabled: boolean;
    shipping_rate: string;
    free_shipping_threshold: string;
    shipping_zones: string[];
    // Social Media Links
    social_twitter: string;
    social_instagram: string;
    social_youtube: string;
    social_facebook: string;
    social_linkedin: string;
    social_website: string;
}

interface Props {
    settings?: SiteSettings;
    isEditing?: boolean;
}

export default function SiteSettingsForm({ settings, isEditing = false }: Props) {
    const { data, setData, processing, errors, reset, post, put } = useForm({
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        contact_address: settings?.contact_address || '',
        tax_rate: settings?.tax_rate || 0,
        company_name: settings?.company_name || '',
        company_tagline: settings?.company_tagline || '',
        company_description: settings?.company_description || '',
        shipping_enabled: settings?.shipping_enabled || false,
        shipping_rate: settings?.shipping_rate || '',
        free_shipping_threshold: settings?.free_shipping_threshold || '',
        shipping_zones: settings?.shipping_zones || [''],
        // Social Media Links
        social_twitter: settings?.social_twitter || '',
        social_instagram: settings?.social_instagram || '',
        social_youtube: settings?.social_youtube || '',
        social_facebook: settings?.social_facebook || '',
        social_linkedin: settings?.social_linkedin || '',
        social_website: settings?.social_website || 'www.Resteel-solutions.com',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && settings?.id) {
            // Use PUT for updating existing settings
            put(route('settings.update', settings.id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
                onError: (errors) => {
                    console.error('Error saving settings:', errors);
                },
            });
        } else {
            // Use POST for creating new settings
            post(route('settings.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
                onError: (errors) => {
                    console.error('Error saving settings:', errors);
                },
            });
        }
    };

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    };

    const normalizeUrl = (url: string): string => {
        if (!url) return url;
        return url.startsWith('http') ? url : `https://${url}`;
    };

    const handleReset = () => {
        reset();
    };

    return (
        <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Header - Mobile Responsive */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{isEditing ? 'Edit Site Settings' : 'Site Settings'}</h2>
                    <p className="text-muted-foreground truncate text-sm">Configure your website's core settings and preferences</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Contact Information - Mobile Responsive */}
                <Card className="rounded-sm">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="flex items-center text-base sm:text-lg">
                            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact_email" className="text-sm sm:text-base">
                                Contact Email *
                            </Label>
                            <div className="relative">
                                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="pl-10 text-sm sm:text-base"
                                    placeholder="contact@yourcompany.com"
                                    required
                                />
                            </div>
                            {errors.contact_email && <p className="text-xs text-red-600 sm:text-sm">{errors.contact_email}</p>}
                            {data.contact_email && !validateEmail(data.contact_email) && (
                                <p className="flex items-center text-xs text-orange-600 sm:text-sm">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    Please enter a valid email address
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_phone" className="text-sm sm:text-base">
                                Contact Phone
                            </Label>
                            <div className="relative">
                                <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="contact_phone"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className="pl-10 text-sm sm:text-base"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            {errors.contact_phone && <p className="text-xs text-red-600 sm:text-sm">{errors.contact_phone}</p>}
                            {data.contact_phone && !validatePhone(data.contact_phone) && (
                                <p className="flex items-center text-xs text-orange-600 sm:text-sm">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    Please enter a valid phone number
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_address" className="text-sm sm:text-base">
                                Contact Address
                            </Label>
                            <div className="relative">
                                <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Textarea
                                    id="contact_address"
                                    value={data.contact_address}
                                    onChange={(e) => setData('contact_address', e.target.value)}
                                    className="pl-10 text-sm sm:text-base"
                                    placeholder="123 Business Street, City, State, Country"
                                    rows={3}
                                />
                            </div>
                            {errors.contact_address && <p className="text-xs text-red-600 sm:text-sm">{errors.contact_address}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media Links - Mobile Responsive */}
                <Card className="rounded-sm">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="flex items-center text-base sm:text-lg">
                            <Link2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Social Media Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="social_twitter" className="text-sm sm:text-base">
                                    Twitter/X
                                </Label>
                                <div className="relative">
                                    <Twitter className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_twitter"
                                        type="url"
                                        value={data.social_twitter}
                                        onChange={(e) => setData('social_twitter', e.target.value)}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://twitter.com/yourusername"
                                    />
                                </div>
                                {errors.social_twitter && <p className="text-xs text-red-600 sm:text-sm">{errors.social_twitter}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_instagram" className="text-sm sm:text-base">
                                    Instagram
                                </Label>
                                <div className="relative">
                                    <Instagram className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_instagram"
                                        type="url"
                                        value={data.social_instagram}
                                        onChange={(e) => setData('social_instagram', e.target.value)}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://instagram.com/yourusername"
                                    />
                                </div>
                                {errors.social_instagram && <p className="text-xs text-red-600 sm:text-sm">{errors.social_instagram}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_youtube" className="text-sm sm:text-base">
                                    YouTube
                                </Label>
                                <div className="relative">
                                    <Youtube className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_youtube"
                                        type="url"
                                        value={data.social_youtube}
                                        onChange={(e) => setData('social_youtube', e.target.value)}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://youtube.com/yourchannel"
                                    />
                                </div>
                                {errors.social_youtube && <p className="text-xs text-red-600 sm:text-sm">{errors.social_youtube}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_facebook" className="text-sm sm:text-base">
                                    Facebook
                                </Label>
                                <div className="relative">
                                    <Facebook className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_facebook"
                                        type="url"
                                        value={data.social_facebook}
                                        onChange={(e) => setData('social_facebook', e.target.value)}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://facebook.com/yourpage"
                                    />
                                </div>
                                {errors.social_facebook && <p className="text-xs text-red-600 sm:text-sm">{errors.social_facebook}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_linkedin" className="text-sm sm:text-base">
                                    LinkedIn
                                </Label>
                                <div className="relative">
                                    <Linkedin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_linkedin"
                                        type="url"
                                        value={data.social_linkedin}
                                        onChange={(e) => setData('social_linkedin', e.target.value)}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://linkedin.com/company/yourcompany"
                                    />
                                </div>
                                {errors.social_linkedin && <p className="text-xs text-red-600 sm:text-sm">{errors.social_linkedin}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_website" className="text-sm sm:text-base">
                                    Website
                                </Label>
                                <div className="relative">
                                    <Globe className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                    <Input
                                        id="social_website"
                                        type="url"
                                        value={data.social_website}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Only normalize on blur to avoid disrupting typing
                                            setData('social_website', value);
                                        }}
                                        onBlur={(e) => {
                                            const value = e.target.value;
                                            if (value && validateUrl(value)) {
                                                setData('social_website', normalizeUrl(value));
                                            }
                                        }}
                                        className="pl-10 text-sm sm:text-base"
                                        placeholder="https://www.yourwebsite.com"
                                    />
                                </div>
                                {errors.social_website && <p className="text-xs text-red-600 sm:text-sm">{errors.social_website}</p>}
                                {data.social_website && !validateUrl(data.social_website) && (
                                    <p className="flex items-center text-xs text-orange-600 sm:text-sm">
                                        <AlertCircle className="mr-1 h-3 w-3" />
                                        Please enter a valid website URL (e.g., www.example.com or https://example.com)
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions - Mobile Responsive */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <Button type="button" variant="outline" onClick={handleReset} disabled={processing} className="text-sm sm:text-base">
                        <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Reset
                    </Button>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <Button type="submit" disabled={processing} className="text-sm sm:text-base">
                            {processing ? (
                                <>
                                    <RefreshCw className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Save Settings
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
