<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Redirect;

class ContentController extends Controller
{
  /**
   * Display the content management page.
   */
  public function show()
  {
    $content = $this->getAllContentByLocale();

    return Inertia::render('Content/Show', [
      'content' => $content
    ]);
  }

  /**
   * Show the form for editing content.
   */
  public function edit()
  {
    $content = $this->getAllContentByLocale();

    return Inertia::render('Content/Edit', [
      'content' => $content
    ]);
  }

  /**
   * Show the form for creating content.
   */
  public function create()
  {
    return Inertia::render('Content/Create');
  }

  /**
   * Display the content list.
   */
  public function index()
  {
    $content = $this->getAllContentByLocale();

    return Inertia::render('Content/Index', [
      'content' => $content
    ]);
  }

  /**
   * Store content settings (for initial creation).
   */
  public function store(Request $request)
  {
    return $this->update($request);
  }

  /**
   * Update the content settings.
   */
  public function update(Request $request)
  {
    $validated = $request->validate([
      'locale' => 'required|string|in:en,de,nl',
      // Services We Provide
      'services_title' => 'nullable|string|max:255',
      'services_subtitle' => 'nullable|string',
      'services_items' => 'nullable|array',
      'services_items.*.icon' => 'required_with:services_items|string',
      'services_items.*.title' => 'required_with:services_items|string',
      'services_items.*.description' => 'required_with:services_items|string',
      // Why Choose Us
      'why_choose_us_title' => 'nullable|string|max:255',
      'why_choose_us_subtitle' => 'nullable|string',
      'why_choose_us_items' => 'nullable|array',
      'why_choose_us_items.*.icon' => 'required_with:why_choose_us_items|string',
      'why_choose_us_items.*.title' => 'required_with:why_choose_us_items|string',
      'why_choose_us_items.*.description' => 'required_with:why_choose_us_items|string',
      // About - Who We Are
      'who_we_are_title' => 'nullable|string|max:255',
      'who_we_are_description' => 'nullable|string',
      'who_we_are_founded' => 'nullable|string|max:255',
      // About - What We Offer
      'what_we_offer_title' => 'nullable|string|max:255',
      'what_we_offer_subtitle' => 'nullable|string',
      'what_we_offer_items' => 'nullable|array',
      'what_we_offer_items.*.icon' => 'required_with:what_we_offer_items|string',
      'what_we_offer_items.*.title' => 'required_with:what_we_offer_items|string',
      'what_we_offer_items.*.description' => 'required_with:what_we_offer_items|string',
      // About - Stats Section
      'stats_title' => 'nullable|string|max:255',
      'stats_subtitle' => 'nullable|string',
      'stats_items' => 'nullable|array',
      'stats_items.*.label' => 'required_with:stats_items|string',
      'stats_items.*.value' => 'required_with:stats_items|string',
      // About - Mission Section
      'mission_title' => 'nullable|string|max:255',
      'mission_subtitle' => 'nullable|string',
      'mission_items' => 'nullable|array',
      'mission_items.*.icon' => 'required_with:mission_items|string',
      'mission_items.*.title' => 'required_with:mission_items|string',
      'mission_items.*.description' => 'required_with:mission_items|string',
    ]);

    $locale = $validated['locale'];
    unset($validated['locale']);

    // Update content settings in database with locale prefix
    $prefixedData = [];
    foreach ($validated as $key => $value) {
      $prefixedData[$locale . '_' . $key] = $value;
    }

    SiteSetting::updateMany($prefixedData);

    return Redirect::route('admin.content.index')->with('success', 'Content updated successfully!');
  }

  /**
   * Get all content organized by locale.
   */
  private function getAllContentByLocale()
  {
    $settings = SiteSetting::getAllSettings();
    $locales = ['en', 'de', 'nl'];
    $contentByLocale = [];

    foreach ($locales as $locale) {
      $contentByLocale[$locale] = $this->getContentForLocale($locale, $settings);
    }

    return $contentByLocale;
  }

  /**
   * Get content settings for a specific locale.
   */
  private function getContentForLocale($locale, $settings = null)
  {
    if ($settings === null) {
      $settings = SiteSetting::getAllSettings();
    }

    $defaults = $this->getDefaultContent();
    $content = [];

    // Extract locale-specific content
    foreach ($defaults as $key => $defaultValue) {
      $localeKey = $locale . '_' . $key;

      if (isset($settings[$localeKey])) {
        $content[$key] = $settings[$localeKey];
      } elseif ($locale === 'en' && isset($settings[$key])) {
        // Fallback to non-prefixed keys for English (backward compatibility)
        $content[$key] = $settings[$key];
      } else {
        $content[$key] = $defaultValue;
      }
    }

    return $content;
  }

  /**
   * Get default content structure.
   */
  private function getDefaultContent()
  {
    return [
      // Services We Provide Section
      'services_title' => 'Services We Provide',
      'services_subtitle' => 'Comprehensive solutions for your industrial building needs',
      'services_items' => [
        [
          'icon' => 'Store',
          'title' => 'Premium Re-Sale',
          'description' => 'Access a wide selection of vetted second-hand steel buildings ready for new purpose.'
        ],
        [
          'icon' => 'Wrench',
          'title' => 'Assembly & Disassembly',
          'description' => 'From full dismounting to site setup, we manage both ends of the lifecycle.'
        ],
        [
          'icon' => 'Truck',
          'title' => 'Transport & Logistics',
          'description' => 'International transport across Europe with partner fleets and freight planning.'
        ],
        [
          'icon' => 'PackageCheck',
          'title' => 'Equipment Tracking',
          'description' => 'Get visibility, safety, and updates throughout your building\'s relocation journey.'
        ]
      ],
      // Why Choose Us Section
      'why_choose_us_title' => 'Why Choose Us',
      'why_choose_us_subtitle' => 'We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective',
      'why_choose_us_items' => [
        [
          'icon' => 'Globe',
          'title' => 'Europe-Wide Reach',
          'description' => 'We advertise your listings across 20+ countries through our network of verified buyers and partners.'
        ],
        [
          'icon' => 'Hammer',
          'title' => 'End-to-End Support',
          'description' => 'We manage the full lifecycle — disassembly, transport, and reassembly included.'
        ],
        [
          'icon' => 'ShieldCheck',
          'title' => '20+ Years of Trust',
          'description' => 'Since 2005, we\'ve helped hundreds of industrial and agri businesses relocate or resell steel halls.'
        ]
      ],
      // About - Who We Are Section
      'who_we_are_title' => 'Who We Are',
      'who_we_are_description' => 'Resteel is a trusted European leader in sustainable steel construction. We help companies rethink infrastructure using reclaimed, premium-grade materials — without compromising on strength, safety, or style.',
      'who_we_are_founded' => 'Founded in 2005 · Headquartered in Helmond, Netherlands',
      // About - What We Offer Section
      'what_we_offer_title' => 'What We Offer',
      'what_we_offer_subtitle' => 'More than just buying and selling — we help move, manage, and optimize every structure',
      'what_we_offer_items' => [
        [
          'icon' => 'Building2',
          'title' => 'Steel Halls',
          'description' => 'Pre-owned halls for industrial and agricultural use.'
        ],
        [
          'icon' => 'Wrench',
          'title' => 'Assembly Services',
          'description' => 'Complete dismantling, transport, and reassembly.'
        ],
        [
          'icon' => 'Users2',
          'title' => 'Project Guidance',
          'description' => 'Consultation on layout, logistics, and feasibility.'
        ],
        [
          'icon' => 'ShieldCheck',
          'title' => 'Certified Steel',
          'description' => 'Compliance-backed quality and safety assurance.'
        ]
      ],
      // About - Stats Section
      'stats_title' => 'Across Borders',
      'stats_subtitle' => 'Our structures stand in more than 25 countries — from farms in Finland to factories in France',
      'stats_items' => [
        [
          'label' => 'Years Experience',
          'value' => '20+'
        ],
        [
          'label' => 'Countries Served',
          'value' => '25+'
        ],
        [
          'label' => 'Projects Delivered',
          'value' => '500+'
        ],
        [
          'label' => 'Max Hall Size',
          'value' => '60,000 m²'
        ]
      ],
      // About - Mission Section
      'mission_title' => 'Our Mission',
      'mission_subtitle' => 'Advancing sustainable construction through innovative steel solutions',
      'mission_items' => [
        [
          'icon' => 'CheckCircle2',
          'title' => 'Integrity',
          'description' => 'Honest, transparent business practices'
        ],
        [
          'icon' => 'BriefcaseBusiness',
          'title' => 'Expertise',
          'description' => 'Deep industry knowledge and experience'
        ],
        [
          'icon' => 'Lightbulb',
          'title' => 'Innovation',
          'description' => 'Creative solutions for complex challenges'
        ]
      ]
    ];
  }

  /**
   * Get current content settings from database or return defaults.
   */
  private function getContentSettings()
  {
    $locale = app()->getLocale();
    return $this->getContentForLocale($locale);
  }

  /**
   * Get content settings for public pages.
   */
  public static function getPublicContentSettings()
  {
    $instance = new self();
    return $instance->getContentSettings();
  }
}
