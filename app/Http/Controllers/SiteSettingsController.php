<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Redirect;

class SiteSettingsController extends Controller
{
  /**
   * Display the site settings.
   */
  public function show()
  {
    $settings = $this->getSettings();

    return Inertia::render('SiteSettings/Show', [
      'settings' => $settings
    ]);
  }

  /**
   * Show the form for editing the site settings.
   */
  public function edit()
  {
    $settings = $this->getSettings();

    return Inertia::render('SiteSettings/Edit', [
      'settings' => $settings
    ]);
  }

  /**
   * Store site settings (for initial creation).
   */
  public function store(Request $request)
  {
    return $this->update($request);
  }

  /**
   * Update the site settings.
   */
  public function update(Request $request)
  {
    $validated = $request->validate([
      'contact_email' => 'required|email',
      'contact_phone' => 'nullable|string',
      'contact_address' => 'nullable|string',
      'tax_rate' => 'nullable|numeric|min:0|max:100',
      'company_name' => 'nullable|string|max:255',
      'company_tagline' => 'nullable|string|max:255',
      'company_description' => 'nullable|string',
      'shipping_enabled' => 'boolean',
      'shipping_rate' => 'nullable|numeric|min:0',
      'free_shipping_threshold' => 'nullable|numeric|min:0',
      'shipping_zones' => 'nullable|array',
      'shipping_zones.*' => 'string',
      // Social Media Links
      'social_twitter' => 'nullable|url',
      'social_instagram' => 'nullable|url',
      'social_youtube' => 'nullable|url',
      'social_facebook' => 'nullable|url',
      'social_linkedin' => 'nullable|url',
      // Testimonials
      'testimonials' => 'nullable|array',
      'testimonials.*.quote' => 'required_with:testimonials|string',
      'testimonials.*.author' => 'required_with:testimonials|string',
      'testimonials.*.position' => 'nullable|string',
      'testimonials.*.rating' => 'nullable|integer|min:1|max:5',
    ]);

    // Update settings in database
    SiteSetting::updateMany($validated);

    return Redirect::route('settings')->with('success', 'Settings updated successfully!');
  }

  /**
   * Get current settings from database or return defaults.
   */
  private function getSettings()
  {
    $settings = SiteSetting::getAllSettings();

    // Merge with defaults to ensure all keys exist
    return array_merge([
      'id' => 1,
      'contact_email' => 'Info@2ndhandholding.com',
      'contact_phone' => '+31 (0) 123 456 789',
      'contact_address' => 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
      'tax_rate' => 8.5,
      'company_name' => 'Resteel Solutions',
      'company_tagline' => 'Building the future, one solution at a time',
      'company_description' => 'Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.',
      'shipping_enabled' => true,
      'shipping_rate' => '5.99',
      'free_shipping_threshold' => '50.00',
      'shipping_zones' => ['United States', 'Canada', 'Europe'],
      'email_notifications' => true,
      'order_notifications' => true,
      'contact_form_notifications' => false,
      // Social Media Links
      'social_twitter' => 'https://twitter.com/resteel',
      'social_instagram' => 'https://instagram.com/resteel',
      'social_youtube' => 'https://youtube.com',
      'social_facebook' => '',
      'social_linkedin' => '',
      // Testimonials
      'testimonials' => [
        [
          'quote' => 'Resteel made our entire site relocation process seamless...',
          'author' => 'Stefan Döring',
          'position' => 'RheinBuild GmbH',
          'rating' => 5
        ],
        [
          'quote' => 'We saved over 40% on our structural build...',
          'author' => 'Anita Kovács',
          'position' => 'Danube Construction',
          'rating' => 5
        ],
        [
          'quote' => 'International coordination is always a challenge...',
          'author' => 'Gilles Moreau',
          'position' => 'ProStruct Industries',
          'rating' => 5
        ],
        [
          'quote' => 'Resteel proved to be a reliable partner...',
          'author' => 'Jakub Nowak',
          'position' => 'AgroFab Polska',
          'rating' => 5
        ],
        [
          'quote' => 'When we urgently needed a large-scale steel hall...',
          'author' => 'Luca Bianchi',
          'position' => 'Infrastrutture SRL',
          'rating' => 5
        ]
      ]
    ], $settings);
  }

  /**
   * Get settings for public pages.
   */
  public static function getPublicSettings()
  {
    $instance = new self();
    return $instance->getSettings();
  }
}
