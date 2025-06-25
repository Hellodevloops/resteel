import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AlertCircle, Building2, DollarSign, Globe, Mail, MapPin, Phone, RefreshCw, Save, Truck } from 'lucide-react';
import { useState } from 'react';

interface SiteSettings {
    id?: number;
    language: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    currency: string;
    tax_rate: number;
    company_name: string;
    company_tagline: string;
    company_description: string;
    shipping_enabled: boolean;
    shipping_rate: string;
    free_shipping_threshold: string;
    shipping_zones: string[];
}

interface Props {
    settings?: SiteSettings;
    isEditing?: boolean;
}

export default function SiteSettingsForm({ settings, isEditing = false }: Props) {
    const { data, setData, processing, errors, reset } = useForm({
        language: settings?.language || 'en',
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        contact_address: settings?.contact_address || '',
        currency: settings?.currency || 'USD',
        tax_rate: settings?.tax_rate || 0,
        company_name: settings?.company_name || '',
        company_tagline: settings?.company_tagline || '',
        company_description: settings?.company_description || '',
        shipping_enabled: settings?.shipping_enabled || false,
        shipping_rate: settings?.shipping_rate || '',
        free_shipping_threshold: settings?.free_shipping_threshold || '',
        shipping_zones: settings?.shipping_zones || [''],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Mock submission since this is frontend only
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log('Site Settings Data:', data);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings. Please try again.');
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

    const addShippingZone = () => {
        setData('shipping_zones', [...data.shipping_zones, '']);
    };

    const removeShippingZone = (index: number) => {
        const updatedZones = data.shipping_zones.filter((_, i) => i !== index);
        setData('shipping_zones', updatedZones);
    };

    const updateShippingZone = (index: number, value: string) => {
        const updatedZones = [...data.shipping_zones];
        updatedZones[index] = value;
        setData('shipping_zones', updatedZones);
    };

    const handleReset = () => {
        reset();
        setIsSubmitting(false);
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
                    Frontend Only
                </Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Core Settings */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Globe className="mr-2 h-5 w-5" />
                            Core Settings
                        </CardTitle>
                        <CardDescription>Basic website configuration including language and currency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="language">Language *</Label>
                                <Select value={data.language} onValueChange={(value) => setData('language', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="it">Italian</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.language && <p className="text-sm text-red-600">{errors.language}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency *</Label>
                                <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.currency && <p className="text-sm text-red-600">{errors.currency}</p>}
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
                                value={data.tax_rate}
                                onChange={(e) => setData('tax_rate', parseFloat(e.target.value) || 0)}
                                className="max-w-xs"
                            />
                            {errors.tax_rate && <p className="text-sm text-red-600">{errors.tax_rate}</p>}
                        </div>
                    </CardContent>
                </Card>

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
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                placeholder="Enter your company name"
                                required
                            />
                            {errors.company_name && <p className="text-sm text-red-600">{errors.company_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company_tagline">Company Tagline</Label>
                            <Input
                                id="company_tagline"
                                value={data.company_tagline}
                                onChange={(e) => setData('company_tagline', e.target.value)}
                                placeholder="Enter your company tagline or slogan"
                            />
                            {errors.company_tagline && <p className="text-sm text-red-600">{errors.company_tagline}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company_description">Company Description</Label>
                            <Textarea
                                id="company_description"
                                value={data.company_description}
                                onChange={(e) => setData('company_description', e.target.value)}
                                placeholder="Brief description of your company"
                                rows={4}
                            />
                            {errors.company_description && <p className="text-sm text-red-600">{errors.company_description}</p>}
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
                                checked={data.shipping_enabled}
                                onChange={(e) => setData('shipping_enabled', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                                <Label htmlFor="shipping_enabled">Enable Shipping</Label>
                                <p className="text-muted-foreground text-sm">Allow customers to purchase items for shipping</p>
                            </div>
                        </div>

                        {data.shipping_enabled && (
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
                                                value={data.shipping_rate}
                                                onChange={(e) => setData('shipping_rate', e.target.value)}
                                                className="pl-10"
                                                placeholder="5.99"
                                            />
                                        </div>
                                        {errors.shipping_rate && <p className="text-sm text-red-600">{errors.shipping_rate}</p>}
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
                                                value={data.free_shipping_threshold}
                                                onChange={(e) => setData('free_shipping_threshold', e.target.value)}
                                                className="pl-10"
                                                placeholder="50.00"
                                            />
                                        </div>
                                        <p className="text-muted-foreground text-xs">Minimum order amount for free shipping</p>
                                        {errors.free_shipping_threshold && <p className="text-sm text-red-600">{errors.free_shipping_threshold}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Shipping Zones</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addShippingZone}>
                                            Add Zone
                                        </Button>
                                    </div>

                                    {data.shipping_zones.map((zone, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={zone}
                                                onChange={(e) => updateShippingZone(index, e.target.value)}
                                                placeholder="e.g., United States, Europe, Worldwide"
                                                className="flex-1"
                                            />
                                            {data.shipping_zones.length > 1 && (
                                                <Button type="button" variant="outline" size="sm" onClick={() => removeShippingZone(index)}>
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={handleReset} disabled={processing || isSubmitting}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing || isSubmitting}>
                            {isSubmitting ? (
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
