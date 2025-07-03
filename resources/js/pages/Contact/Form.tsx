import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: string;
    type: string;
    source: string;
    value: number | null;
    building_category: string;
    building_type: string;
    building_width: string;
    building_length: string;
    gutter_height: string;
    top_height: string;
    [key: string]: string | number | null | undefined;
}

interface Contact extends ContactFormData {
    id: number;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    contact?: Contact;
    isEditing?: boolean;
}

export default function ContactForm({ contact, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<ContactFormData>({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        company: contact?.company || '',
        message: contact?.message || '',
        status: contact?.status || 'pending',
        type: contact?.type || 'Lead',
        source: contact?.source || 'Website',
        value: contact?.value || null,
        building_category: contact?.building_category || '',
        building_type: contact?.building_type || '',
        building_width: contact?.building_width || '',
        building_length: contact?.building_length || '',
        gutter_height: contact?.gutter_height || '',
        top_height: contact?.top_height || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing && contact?.id) {
            put(`/admin/contacts/${contact.id}`, { preserveScroll: true });
        } else {
            post('/admin/contacts', { preserveScroll: true });
        }
    };

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Contact' : 'Create Contact'} />
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-3xl px-4 py-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Contact' : 'Create Contact'}</h1>
                        <p className="mt-2 text-slate-600">
                            {isEditing ? 'Update the contact information below.' : 'Fill in the contact information below to create a new contact.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>
                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Lead">Lead</SelectItem>
                                        <SelectItem value="Customer">Customer</SelectItem>
                                        <SelectItem value="Partner">Partner</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="source">Source</Label>
                            <Input id="source" value={data.source} onChange={(e) => setData('source', e.target.value)} />
                            {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source}</p>}
                        </div>

                        <div>
                            <Label htmlFor="value">Value</Label>
                            <Input
                                id="value"
                                type="number"
                                value={data.value || ''}
                                onChange={(e) => setData('value', e.target.value ? parseFloat(e.target.value) : null)}
                            />
                            {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
                        </div>

                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={4} value={data.message} onChange={(e) => setData('message', e.target.value)} />
                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Building Specifications</h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="building_category">Building Type</Label>
                                    <Select value={data.building_category} onValueChange={(value) => setData('building_category', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select building type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Warehouses">Warehouses</SelectItem>
                                            <SelectItem value="Steel Constructions">Steel Constructions</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.building_category && <p className="mt-1 text-sm text-red-600">{errors.building_category}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="building_type">Type Building</Label>
                                    <Select value={data.building_type} onValueChange={(value) => setData('building_type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Industrial">Industrial</SelectItem>
                                            <SelectItem value="AGRI">AGRI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.building_type && <p className="mt-1 text-sm text-red-600">{errors.building_type}</p>}
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="building_width">Width (meters)</Label>
                                    <Input
                                        id="building_width"
                                        value={data.building_width}
                                        onChange={(e) => setData('building_width', e.target.value)}
                                        placeholder="e.g. 10"
                                    />
                                    {errors.building_width && <p className="mt-1 text-sm text-red-600">{errors.building_width}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="building_length">Length (meters)</Label>
                                    <Input
                                        id="building_length"
                                        value={data.building_length}
                                        onChange={(e) => setData('building_length', e.target.value)}
                                        placeholder="e.g. 20"
                                    />
                                    {errors.building_length && <p className="mt-1 text-sm text-red-600">{errors.building_length}</p>}
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="gutter_height">High Gutter (meters)</Label>
                                    <Input
                                        id="gutter_height"
                                        value={data.gutter_height}
                                        onChange={(e) => setData('gutter_height', e.target.value)}
                                        placeholder="e.g. 4"
                                    />
                                    {errors.gutter_height && <p className="mt-1 text-sm text-red-600">{errors.gutter_height}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="top_height">High Top (meters)</Label>
                                    <Input
                                        id="top_height"
                                        value={data.top_height}
                                        onChange={(e) => setData('top_height', e.target.value)}
                                        placeholder="e.g. 6"
                                    />
                                    {errors.top_height && <p className="mt-1 text-sm text-red-600">{errors.top_height}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 text-right">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : isEditing ? 'Update Contact' : 'Create Contact'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
