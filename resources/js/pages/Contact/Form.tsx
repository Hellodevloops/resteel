import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select,SelectContent,SelectItem ,SelectTrigger ,SelectValue} from '@/components/ui/select';
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
  [key: string]: string | number | null;
}

interface Contact extends ContactFormData {
  id?: number;
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
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              {isEditing ? 'Edit Contact' : 'Create Contact'}
            </h1>
            <p className="text-slate-600 mt-2">
              {isEditing
                ? 'Update the contact information below.'
                : 'Fill in the contact information below to create a new contact.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={data.company} onChange={e => setData('company', e.target.value)} />
                {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={value => setData('status', value)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={data.type} onValueChange={value => setData('type', value)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="source">Source</Label>
              <Input id="source" value={data.source} onChange={e => setData('source', e.target.value)} />
              {errors.source && <p className="text-sm text-red-600 mt-1">{errors.source}</p>}
            </div>

            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={data.value || ''}
                onChange={e => setData('value', e.target.value ? parseFloat(e.target.value) : null)}
              />
              {errors.value && <p className="text-sm text-red-600 mt-1">{errors.value}</p>}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={4} value={data.message} onChange={e => setData('message', e.target.value)} />
              {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
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
