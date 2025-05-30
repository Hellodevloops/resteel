<?php
namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all()->map(function ($contact) {
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'company' => $validated['company'],
            'message' => $validated['message'],
            'status' => 'pending',
            'type' => 'Lead',
            'source' => 'Website',
            'value' => null,
            'alerts' => 0,
            'last_contact' => now(),
        ]);

        return redirect()->back()->with('success', 'Contact created successfully!');
    }
}
