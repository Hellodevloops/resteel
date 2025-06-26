import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { AlertCircle, Building2, DollarSign, Mail, MapPin, Phone, RefreshCw, Save, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    isEditing?: boolean;
}

export default function SiteSettingsForm({ isEditing = false }: Props) {
    const { settings, updateSettings, resetSettings, isLoading } = useSiteSettings();

    // Local form state that syncs with context
    const [formData, setFormData] = useState(settings);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync form data with context when settings change
    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.company_name.trim()) {
                toast.error('Company name is required');
                return;
            }
            if (!formData.contact_email.trim()) {
                toast.error('Contact email is required');
                return;
            }
            if (!validateEmail(formData.contact_email)) {
                toast.error('Please enter a valid email address');
                return;
            }

            // Update settings via context
            updateSettings(formData);
            toast.success('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save settings. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const handleReset = () => {
        resetSettings();
        setFormData(settings);
        toast.info('Settings reset to default values');
    };

    const handleFieldChange = (field: keyof typeof formData, value: string | number | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{isEditing ? 'Edit Site Settings' : 'Site Settings'}</h2>
                    <p className="text-muted-foreground">Configure your website's core settings and preferences</p>
                </div>
                <Badge variant="outline" className="text-sm">
                    Live Updates
                </Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Details */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Building2 className="mr-2 h-5 w-5" />
                            Company Details
                        </CardTitle>
                        <CardDescription>Your company information displayed on the website</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="company_name">Company Name *</Label>
                            <Input
                                id="company_name"
                                value={formData.company_name}
                                onChange={(e) => handleFieldChange('company_name', e.target.value)}
                                placeholder="Enter your company name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company_tagline">Company Tagline</Label>
                            <Input
                                id="company_tagline"
                                value={formData.company_tagline}
                                onChange={(e) => handleFieldChange('company_tagline', e.target.value)}
                                placeholder="Enter your company tagline or slogan"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company_description">Company Description</Label>
                            <Textarea
                                id="company_description"
                                value={formData.company_description}
                                onChange={(e) => handleFieldChange('company_description', e.target.value)}
                                placeholder="Brief description of your company"
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Phone className="mr-2 h-5 w-5" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>Contact details displayed on your website</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact_email">Contact Email *</Label>
                            <div className="relative">
                                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={formData.contact_email}
                                    onChange={(e) => handleFieldChange('contact_email', e.target.value)}
                                    className="pl-10"
                                    placeholder="contact@yourcompany.com"
                                    required
                                />
                            </div>
                            {formData.contact_email && !validateEmail(formData.contact_email) && (
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
                                    value={formData.contact_phone}
                                    onChange={(e) => handleFieldChange('contact_phone', e.target.value)}
                                    className="pl-10"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            {formData.contact_phone && !validatePhone(formData.contact_phone) && (
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
                                    value={formData.contact_address}
                                    onChange={(e) => handleFieldChange('contact_address', e.target.value)}
                                    className="pl-10"
                                    placeholder="123 Business Street, City, State, Country"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Shipping Settings */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            Shipping Settings
                        </CardTitle>
                        <CardDescription>Configure shipping options for your e-commerce</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <input
                                id="shipping_enabled"
                                type="checkbox"
                                checked={formData.shipping_enabled}
                                onChange={(e) => handleFieldChange('shipping_enabled', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                                <Label htmlFor="shipping_enabled">Enable Shipping</Label>
                                <p className="text-muted-foreground text-sm">Allow customers to purchase items for shipping</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                            <Input
                                id="tax_rate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={formData.tax_rate}
                                onChange={(e) => handleFieldChange('tax_rate', parseFloat(e.target.value) || 0)}
                                className="max-w-xs"
                            />
                            <p className="text-muted-foreground text-xs">Tax rate applied to orders</p>
                        </div>

                        {formData.shipping_enabled && (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="shipping_rate">Base Shipping Rate</Label>
                                        <div className="relative">
                                            <DollarSign className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                            <Input
                                                id="shipping_rate"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.shipping_rate}
                                                onChange={(e) => handleFieldChange('shipping_rate', e.target.value)}
                                                className="pl-10"
                                                placeholder="5.99"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="free_shipping_threshold">Free Shipping Threshold</Label>
                                        <div className="relative">
                                            <DollarSign className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                            <Input
                                                id="free_shipping_threshold"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.free_shipping_threshold}
                                                onChange={(e) => handleFieldChange('free_shipping_threshold', e.target.value)}
                                                className="pl-10"
                                                placeholder="50.00"
                                            />
                                        </div>
                                        <p className="text-muted-foreground text-xs">Minimum order amount for free shipping</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading || isSubmitting}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading || isSubmitting}>
                            {isSubmitting || isLoading ? (
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
