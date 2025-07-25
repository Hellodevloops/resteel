<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()->get()->map(function ($contact) {
            return [
                'id' => $contact->id,
                'name' => $contact->name,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'company' => $contact->company,
                'message' => $contact->message,
                'status' => $contact->status,
                'type' => $contact->type,
                'last_contact' => $contact->last_contact->toDateString(),
                'source' => $contact->source,
                'value' => $contact->value,
                'alerts' => $contact->alerts,
                'building_category' => $contact->building_category,
                'building_type' => $contact->building_type,
                'building_width' => $contact->building_width,
                'building_length' => $contact->building_length,
                'gutter_height' => $contact->gutter_height,
                'top_height' => $contact->top_height,
            ];
        });

        $recentActivity = [
            ['id' => 1, 'action' => 'New contact added', 'contact' => 'Recent User', 'time' => '2 hours ago', 'type' => 'success'],
            // Add dynamic activity from a model if needed
        ];

        return Inertia::render('Contact/Index', [
            'contacts' => $contacts,
            'recentActivity' => $recentActivity,
        ]);
    }

    public function create()
    {
        return Inertia::render('Contact/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'status' => 'required|string|in:active,pending,inactive',
            'type' => 'required|string|in:Lead,Customer,Partner',
            'source' => 'required|string|max:255',
            'value' => 'nullable|numeric',
            'building_category' => 'nullable|string|max:255',
            'building_type' => 'nullable|string|in:Industrial,AGRI',
            'building_width' => 'nullable|string|max:50',
            'building_length' => 'nullable|string|max:50',
            'gutter_height' => 'nullable|string|max:50',
            'top_height' => 'nullable|string|max:50',
        ]);

        $contact = Contact::create([
            ...$validated,
            'alerts' => 0,
            'last_contact' => now(),
        ]);

        // Check if this is a public submission (from website) or admin submission
        if ($request->expectsJson()) {
            // This is likely a public submission from the website contact form
            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.',
                'contact_id' => $contact->id
            ]);
        }

        // This is an admin submission, redirect to admin contacts index
        return Redirect::route('admin.contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $contactData = [
            'id' => $contact->id,
            'name' => $contact->name,
            'email' => $contact->email,
            'phone' => $contact->phone,
            'company' => $contact->company,
            'message' => $contact->message,
            'status' => $contact->status,
            'type' => $contact->type,
            'last_contact' => $contact->last_contact->toDateString(),
            'source' => $contact->source,
            'value' => $contact->value,
            'alerts' => $contact->alerts,
            'created_at' => $contact->created_at->toDateString(),
            'updated_at' => $contact->updated_at->toDateString(),
            'building_category' => $contact->building_category,
            'building_type' => $contact->building_type,
            'building_width' => $contact->building_width,
            'building_length' => $contact->building_length,
            'gutter_height' => $contact->gutter_height,
            'top_height' => $contact->top_height,
        ];

        return Inertia::render('Contact/Show', [
            'contact' => $contactData
        ]);
    }

    public function edit(Contact $contact)
    {
        $contactData = [
            'id' => $contact->id,
            'name' => $contact->name,
            'email' => $contact->email,
            'phone' => $contact->phone,
            'company' => $contact->company,
            'message' => $contact->message,
            'status' => $contact->status,
            'type' => $contact->type,
            'source' => $contact->source,
            'value' => $contact->value,
            'building_category' => $contact->building_category,
            'building_type' => $contact->building_type,
            'building_width' => $contact->building_width,
            'building_length' => $contact->building_length,
            'gutter_height' => $contact->gutter_height,
            'top_height' => $contact->top_height,
        ];

        return Inertia::render('Contact/Edit', [
            'contact' => $contactData
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'status' => 'required|string|in:active,pending,inactive',
            'type' => 'required|string|in:Lead,Customer,Partner',
            'source' => 'required|string|max:255',
            'value' => 'nullable|numeric',
            'building_category' => 'nullable|string|max:255',
            'building_type' => 'nullable|string|in:Industrial,AGRI',
            'building_width' => 'nullable|string|max:50',
            'building_length' => 'nullable|string|max:50',
            'gutter_height' => 'nullable|string|max:50',
            'top_height' => 'nullable|string|max:50',
        ]);

        $contact->update($validated);

        return Redirect::route('admin.contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return Redirect::route('admin.contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
