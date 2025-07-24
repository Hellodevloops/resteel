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
      'social_website' => 'nullable|url',
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

    // Filter to only return site settings related fields (contact info, social media)
    $siteSettingsKeys = [
      'id',
      'contact_email',
      'contact_phone',
      'contact_address',
      'tax_rate',
      'company_name',
      'company_tagline',
      'company_description',
      'shipping_enabled',
      'shipping_rate',
      'free_shipping_threshold',
      'shipping_zones',
      'email_notifications',
      'order_notifications',
      'contact_form_notifications',
      'social_twitter',
      'social_instagram',
      'social_youtube',
      'social_facebook',
      'social_linkedin',
      'social_website'
    ];

    // Merge with defaults to ensure all keys exist
    return array_merge([
      'id' => 1,
      'contact_email' => 'Info@2ndhandholding.com',
      'contact_phone' => '+31 (6) 25334951',
      'contact_address' => 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
      'tax_rate' => 8.5,
      'company_name' => 'Resteel Solutions',
      'company_tagline' => 'Building the future, one solution at a time',
      'company_description' => 'Specialists in buying and selling second-hand buildings and construction materials with over 25 years of experience.',
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
      'social_website' => 'www.Resteel-solutions.com'
    ], array_intersect_key($settings, array_flip($siteSettingsKeys)));
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
