import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { Globe, Plus, RefreshCw, Save, Settings, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ServiceItem {
    icon: string;
    title: string;
    description: string;
}

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface OfferingItem {
    icon: string;
    title: string;
    description: string;
}

interface StatItem {
    label: string;
    value: string;
}

interface MissionItem {
    icon: string;
    title: string;
    description: string;
}

interface ContentSettings {
    id?: number;
    // Services Section
    services_title: string;
    services_subtitle: string;
    services_items: ServiceItem[];
    // Why Choose Us Section
    why_choose_us_title: string;
    why_choose_us_subtitle: string;
    why_choose_us_items: FeatureItem[];
    // About - Who We Are
    who_we_are_title: string;
    who_we_are_description: string;
    who_we_are_founded: string;
    // About - What We Offer
    what_we_offer_title: string;
    what_we_offer_subtitle: string;
    what_we_offer_items: OfferingItem[];
    // About - Stats Section
    stats_title: string;
    stats_subtitle: string;
    stats_items: StatItem[];
    // About - Mission Section
    mission_title: string;
    mission_subtitle: string;
    mission_items: MissionItem[];
}

interface MultiLangContentSettings {
    [locale: string]: ContentSettings;
}

interface Props {
    content?: MultiLangContentSettings;
    isEditing?: boolean;
}

interface PageProps {
    locale?: string;
    supported_locales?: string[];
}

interface FormData extends ContentSettings {
    locale: string;
}

const languageLabels: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    nl: 'Nederlands',
};

export default function ContentForm({ content, isEditing = false }: Props) {
    const pageProps = usePage().props as PageProps;
    const supportedLocales = pageProps?.supported_locales || ['en', 'de', 'nl'];
    const currentPageLocale = pageProps?.locale || 'en';

    // Initialize with the current page locale
    const [selectedLocale, setSelectedLocale] = useState(currentPageLocale);

    // Get content for the selected locale with fallback to default values
    const getContentForLocale = (locale: string): ContentSettings => {
        const defaultContent: ContentSettings = {
            // Services Section
            services_title: '',
            services_subtitle: '',
            services_items: [],
            // Why Choose Us Section
            why_choose_us_title: '',
            why_choose_us_subtitle: '',
            why_choose_us_items: [],
            // About - Who We Are
            who_we_are_title: '',
            who_we_are_description: '',
            who_we_are_founded: '',
            // About - What We Offer
            what_we_offer_title: '',
            what_we_offer_subtitle: '',
            what_we_offer_items: [],
            // About - Stats Section
            stats_title: '',
            stats_subtitle: '',
            stats_items: [],
            // About - Mission Section
            mission_title: '',
            mission_subtitle: '',
            mission_items: [],
        };

        return content?.[locale] || defaultContent;
    };

    const contentForLocale = getContentForLocale(selectedLocale);

    const { data, setData, processing, errors, reset, post, put } = useForm<FormData>({
        locale: selectedLocale,
        ...contentForLocale,
    });

    // Update form data when locale changes
    useEffect(() => {
        const newContent = getContentForLocale(selectedLocale);
        setData({
            locale: selectedLocale,
            ...newContent,
        });
    }, [selectedLocale]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            // Use PUT for updating existing content
            put(route('admin.content.update'), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
                onError: (errors) => {
                    console.error('Error saving content:', errors);
                },
            });
        } else {
            // Use POST for creating new content
            post(route('admin.content.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by redirect from controller
                },
                onError: (errors) => {
                    console.error('Error saving content:', errors);
                },
            });
        }
    };

    const handleReset = () => {
        reset();
    };

    // Helper to update content data
    const updateContent = (field: keyof ContentSettings, value: any) => {
        setData(field, value);
    };

    // Helper methods for managing array items
    const addServiceItem = () => {
        setData('services_items', [...data.services_items, { icon: 'Store', title: '', description: '' }]);
    };

    const removeServiceItem = (index: number) => {
        const updatedItems = data.services_items.filter((_: any, i: number) => i !== index);
        setData('services_items', updatedItems);
    };

    const updateServiceItem = (index: number, field: keyof ServiceItem, value: string) => {
        const updatedItems = [...data.services_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData('services_items', updatedItems);
    };

    const addWhyChooseUsItem = () => {
        setData('why_choose_us_items', [...data.why_choose_us_items, { icon: 'Globe', title: '', description: '' }]);
    };

    const removeWhyChooseUsItem = (index: number) => {
        const updatedItems = data.why_choose_us_items.filter((_: any, i: number) => i !== index);
        setData('why_choose_us_items', updatedItems);
    };

    const updateWhyChooseUsItem = (index: number, field: keyof FeatureItem, value: string) => {
        const updatedItems = [...data.why_choose_us_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData('why_choose_us_items', updatedItems);
    };

    const addOfferingItem = () => {
        setData('what_we_offer_items', [...data.what_we_offer_items, { icon: 'Building2', title: '', description: '' }]);
    };

    const removeOfferingItem = (index: number) => {
        const updatedItems = data.what_we_offer_items.filter((_: any, i: number) => i !== index);
        setData('what_we_offer_items', updatedItems);
    };

    const updateOfferingItem = (index: number, field: keyof OfferingItem, value: string) => {
        const updatedItems = [...data.what_we_offer_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData('what_we_offer_items', updatedItems);
    };

    // Stats Section helpers
    const addStatItem = () => {
        setData('stats_items', [...data.stats_items, { label: '', value: '' }]);
    };

    const removeStatItem = (index: number) => {
        const updatedItems = data.stats_items.filter((_: any, i: number) => i !== index);
        setData('stats_items', updatedItems);
    };

    const updateStatItem = (index: number, field: keyof StatItem, value: string) => {
        const updatedItems = [...data.stats_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData('stats_items', updatedItems);
    };

    // Mission Section helpers
    const addMissionItem = () => {
        setData('mission_items', [...data.mission_items, { icon: 'CheckCircle2', title: '', description: '' }]);
    };

    const removeMissionItem = (index: number) => {
        const updatedItems = data.mission_items.filter((_: any, i: number) => i !== index);
        setData('mission_items', updatedItems);
    };

    const updateMissionItem = (index: number, field: keyof MissionItem, value: string) => {
        const updatedItems = [...data.mission_items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setData('mission_items', updatedItems);
    };

    const availableIcons = [
        'Store',
        'Wrench',
        'Truck',
        'PackageCheck',
        'Building2',
        'Users2',
        'Globe',
        'Hammer',
        'ShieldCheck',
        'CheckCircle2',
        'BriefcaseBusiness',
        'Lightbulb',
    ];

    // Language selector component
    const LanguageSelector = () => (
        <div className="ml-auto flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <select
                value={selectedLocale}
                onChange={(e) => setSelectedLocale(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            >
                {supportedLocales.map((locale) => (
                    <option key={locale} value={locale}>
                        {languageLabels[locale] || locale}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{isEditing ? 'Edit Content' : 'Manage Content'}</h2>
                    <p className="text-muted-foreground">Configure your website's content sections</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Services We Provide Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Services We Provide
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="services_title">Section Title</Label>
                            <Input
                                id="services_title"
                                value={data.services_title}
                                onChange={(e) => updateContent('services_title', e.target.value)}
                                placeholder="Services We Provide"
                            />
                            {errors['services_title'] && <p className="text-sm text-red-600">{errors['services_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="services_subtitle">Section Subtitle</Label>
                            <Textarea
                                id="services_subtitle"
                                value={data.services_subtitle}
                                onChange={(e) => updateContent('services_subtitle', e.target.value)}
                                placeholder="Comprehensive solutions for your industrial building needs"
                                rows={2}
                            />
                            {errors['services_subtitle'] && <p className="text-sm text-red-600">{errors['services_subtitle']}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Service Items</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addServiceItem}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add Service
                                </Button>
                            </div>

                            {data.services_items.map((service, index) => (
                                <div key={index} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Service {index + 1}</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeServiceItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="space-y-1">
                                            <Label>Icon</Label>
                                            <select
                                                value={service.icon}
                                                onChange={(e) => updateServiceItem(index, 'icon', e.target.value)}
                                                className="w-full rounded border p-2"
                                            >
                                                {availableIcons.map((icon) => (
                                                    <option key={icon} value={icon}>
                                                        {icon}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Title</Label>
                                            <Input
                                                value={service.title}
                                                onChange={(e) => updateServiceItem(index, 'title', e.target.value)}
                                                placeholder="Service title"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={service.description}
                                                onChange={(e) => updateServiceItem(index, 'description', e.target.value)}
                                                placeholder="Service description"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Why Choose Us Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Why Choose Us
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="why_choose_us_title">Section Title</Label>
                            <Input
                                id="why_choose_us_title"
                                value={data.why_choose_us_title}
                                onChange={(e) => updateContent('why_choose_us_title', e.target.value)}
                                placeholder="Why Choose Us"
                            />
                            {errors['why_choose_us_title'] && <p className="text-sm text-red-600">{errors['why_choose_us_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="why_choose_us_subtitle">Section Subtitle</Label>
                            <Textarea
                                id="why_choose_us_subtitle"
                                value={data.why_choose_us_subtitle}
                                onChange={(e) => updateContent('why_choose_us_subtitle', e.target.value)}
                                placeholder="We combine decades of experience with a broad European network"
                                rows={2}
                            />
                            {errors['why_choose_us_subtitle'] && <p className="text-sm text-red-600">{errors['why_choose_us_subtitle']}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Feature Items</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addWhyChooseUsItem}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add Feature
                                </Button>
                            </div>

                            {data.why_choose_us_items.map((feature, index) => (
                                <div key={index} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Feature {index + 1}</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeWhyChooseUsItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="space-y-1">
                                            <Label>Icon</Label>
                                            <select
                                                value={feature.icon}
                                                onChange={(e) => updateWhyChooseUsItem(index, 'icon', e.target.value)}
                                                className="w-full rounded border p-2"
                                            >
                                                {availableIcons.map((icon) => (
                                                    <option key={icon} value={icon}>
                                                        {icon}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Title</Label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => updateWhyChooseUsItem(index, 'title', e.target.value)}
                                                placeholder="Feature title"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={feature.description}
                                                onChange={(e) => updateWhyChooseUsItem(index, 'description', e.target.value)}
                                                placeholder="Feature description"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* About - Who We Are Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            About - Who We Are
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="who_we_are_title">Section Title</Label>
                            <Input
                                id="who_we_are_title"
                                value={data.who_we_are_title}
                                onChange={(e) => updateContent('who_we_are_title', e.target.value)}
                                placeholder="Who We Are"
                            />
                            {errors['who_we_are_title'] && <p className="text-sm text-red-600">{errors['who_we_are_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="who_we_are_description">Description</Label>
                            <Textarea
                                id="who_we_are_description"
                                value={data.who_we_are_description}
                                onChange={(e) => updateContent('who_we_are_description', e.target.value)}
                                placeholder="Resteel is a trusted European leader in sustainable steel construction..."
                                rows={4}
                            />
                            {errors['who_we_are_description'] && <p className="text-sm text-red-600">{errors['who_we_are_description']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="who_we_are_founded">Founded Information</Label>
                            <Input
                                id="who_we_are_founded"
                                value={data.who_we_are_founded}
                                onChange={(e) => updateContent('who_we_are_founded', e.target.value)}
                                placeholder="Founded in 1985 · Headquartered in Helmond, Netherlands"
                            />
                            {errors['who_we_are_founded'] && <p className="text-sm text-red-600">{errors['who_we_are_founded']}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* About - What We Offer Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            About - What We Offer
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="what_we_offer_title">Section Title</Label>
                            <Input
                                id="what_we_offer_title"
                                value={data.what_we_offer_title}
                                onChange={(e) => updateContent('what_we_offer_title', e.target.value)}
                                placeholder="What We Offer"
                            />
                            {errors['what_we_offer_title'] && <p className="text-sm text-red-600">{errors['what_we_offer_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="what_we_offer_subtitle">Section Subtitle</Label>
                            <Textarea
                                id="what_we_offer_subtitle"
                                value={data.what_we_offer_subtitle}
                                onChange={(e) => updateContent('what_we_offer_subtitle', e.target.value)}
                                placeholder="More than just buying and selling — we help move, manage, and optimize every structure"
                                rows={2}
                            />
                            {errors['what_we_offer_subtitle'] && <p className="text-sm text-red-600">{errors['what_we_offer_subtitle']}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Service Offerings</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addOfferingItem}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add Offering
                                </Button>
                            </div>

                            {data.what_we_offer_items.map((offering, index) => (
                                <div key={index} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Offering {index + 1}</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeOfferingItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="space-y-1">
                                            <Label>Icon</Label>
                                            <select
                                                value={offering.icon}
                                                onChange={(e) => updateOfferingItem(index, 'icon', e.target.value)}
                                                className="w-full rounded border p-2"
                                            >
                                                {availableIcons.map((icon) => (
                                                    <option key={icon} value={icon}>
                                                        {icon}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Title</Label>
                                            <Input
                                                value={offering.title}
                                                onChange={(e) => updateOfferingItem(index, 'title', e.target.value)}
                                                placeholder="Offering title"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={offering.description}
                                                onChange={(e) => updateOfferingItem(index, 'description', e.target.value)}
                                                placeholder="Offering description"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* About - Stats Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            About - Stats Section
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="stats_title">Section Title</Label>
                            <Input
                                id="stats_title"
                                value={data.stats_title}
                                onChange={(e) => updateContent('stats_title', e.target.value)}
                                placeholder="Across Borders"
                            />
                            {errors['stats_title'] && <p className="text-sm text-red-600">{errors['stats_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stats_subtitle">Section Subtitle</Label>
                            <Textarea
                                id="stats_subtitle"
                                value={data.stats_subtitle}
                                onChange={(e) => updateContent('stats_subtitle', e.target.value)}
                                placeholder="Our structures stand in more than 25 countries — from farms in Finland to factories in France"
                                rows={2}
                            />
                            {errors['stats_subtitle'] && <p className="text-sm text-red-600">{errors['stats_subtitle']}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Statistics</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addStatItem}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add Stat
                                </Button>
                            </div>

                            {data.stats_items.map((stat, index) => (
                                <div key={index} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Statistic {index + 1}</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeStatItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label>Label</Label>
                                            <Input
                                                value={stat.label}
                                                onChange={(e) => updateStatItem(index, 'label', e.target.value)}
                                                placeholder="Years Experience"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Value</Label>
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => updateStatItem(index, 'value', e.target.value)}
                                                placeholder="20+"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* About - Mission Section */}
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            About - Mission Section
                            <LanguageSelector />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="mission_title">Section Title</Label>
                            <Input
                                id="mission_title"
                                value={data.mission_title}
                                onChange={(e) => updateContent('mission_title', e.target.value)}
                                placeholder="Our Mission"
                            />
                            {errors['mission_title'] && <p className="text-sm text-red-600">{errors['mission_title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mission_subtitle">Section Subtitle</Label>
                            <Textarea
                                id="mission_subtitle"
                                value={data.mission_subtitle}
                                onChange={(e) => updateContent('mission_subtitle', e.target.value)}
                                placeholder="Advancing sustainable construction through innovative steel solutions"
                                rows={2}
                            />
                            {errors['mission_subtitle'] && <p className="text-sm text-red-600">{errors['mission_subtitle']}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Mission Values</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addMissionItem}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add Value
                                </Button>
                            </div>

                            {data.mission_items.map((mission, index) => (
                                <div key={index} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Value {index + 1}</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeMissionItem(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="space-y-1">
                                            <Label>Icon</Label>
                                            <select
                                                value={mission.icon}
                                                onChange={(e) => updateMissionItem(index, 'icon', e.target.value)}
                                                className="w-full rounded border p-2"
                                            >
                                                {availableIcons.map((icon) => (
                                                    <option key={icon} value={icon}>
                                                        {icon}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Title</Label>
                                            <Input
                                                value={mission.title}
                                                onChange={(e) => updateMissionItem(index, 'title', e.target.value)}
                                                placeholder="Integrity"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={mission.description}
                                                onChange={(e) => updateMissionItem(index, 'description', e.target.value)}
                                                placeholder="Honest, transparent business practices"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                    Save Content
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
