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

    const handleReset = () => {
        reset();
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{isEditing ? 'Edit Site Settings' : 'Site Settings'}</h2>
                    <p className="text-muted-foreground">Configure your website's core settings and preferences</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Phone className="mr-2 h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact_email">Contact Email *</Label>
                            <div className="relative">
                                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="pl-10"
                                    placeholder="contact@yourcompany.com"
                                    required
                                />
                            </div>
                            {errors.contact_email && <p className="text-sm text-red-600">{errors.contact_email}</p>}
                            {data.contact_email && !validateEmail(data.contact_email) && (
                                <p className="flex items-center text-sm text-orange-600">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    Please enter a valid email address
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_phone">Contact Phone</Label>
                            <div className="relative">
                                <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="contact_phone"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className="pl-10"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            {errors.contact_phone && <p className="text-sm text-red-600">{errors.contact_phone}</p>}
                            {data.contact_phone && !validatePhone(data.contact_phone) && (
                                <p className="flex items-center text-sm text-orange-600">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    Please enter a valid phone number
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_address">Contact Address</Label>
                            <div className="relative">
                                <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Textarea
                                    id="contact_address"
                                    value={data.contact_address}
                                    onChange={(e) => setData('contact_address', e.target.value)}
                                    className="pl-10"
                                    placeholder="123 Business Street, City, State, Country"
                                    rows={3}
                                />
                            </div>
                            {errors.contact_address && <p className="text-sm text-red-600">{errors.contact_address}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media Links */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Link2 className="mr-2 h-5 w-5" />
                            Social Media Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="social_twitter">Twitter/X</Label>
                            <div className="relative">
                                <Twitter className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_twitter"
                                    type="url"
                                    value={data.social_twitter}
                                    onChange={(e) => setData('social_twitter', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://twitter.com/yourusername"
                                />
                            </div>
                            {errors.social_twitter && <p className="text-sm text-red-600">{errors.social_twitter}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="social_instagram">Instagram</Label>
                            <div className="relative">
                                <Instagram className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_instagram"
                                    type="url"
                                    value={data.social_instagram}
                                    onChange={(e) => setData('social_instagram', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://instagram.com/yourusername"
                                />
                            </div>
                            {errors.social_instagram && <p className="text-sm text-red-600">{errors.social_instagram}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="social_youtube">YouTube</Label>
                            <div className="relative">
                                <Youtube className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_youtube"
                                    type="url"
                                    value={data.social_youtube}
                                    onChange={(e) => setData('social_youtube', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://youtube.com/yourchannel"
                                />
                            </div>
                            {errors.social_youtube && <p className="text-sm text-red-600">{errors.social_youtube}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="social_facebook">Facebook</Label>
                            <div className="relative">
                                <Facebook className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_facebook"
                                    type="url"
                                    value={data.social_facebook}
                                    onChange={(e) => setData('social_facebook', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://facebook.com/yourpage"
                                />
                            </div>
                            {errors.social_facebook && <p className="text-sm text-red-600">{errors.social_facebook}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="social_linkedin">LinkedIn</Label>
                            <div className="relative">
                                <Linkedin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_linkedin"
                                    type="url"
                                    value={data.social_linkedin}
                                    onChange={(e) => setData('social_linkedin', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://linkedin.com/company/yourcompany"
                                />
                            </div>
                            {errors.social_linkedin && <p className="text-sm text-red-600">{errors.social_linkedin}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="social_website">Website</Label>
                            <div className="relative">
                                <Globe className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="social_website"
                                    type="url"
                                    value={data.social_website}
                                    onChange={(e) => setData('social_website', e.target.value)}
                                    className="pl-10"
                                    placeholder="https://www.yourwebsite.com"
                                />
                            </div>
                            {errors.social_website && <p className="text-sm text-red-600">{errors.social_website}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={handleReset} disabled={processing}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
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
