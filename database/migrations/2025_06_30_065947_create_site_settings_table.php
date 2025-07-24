<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        $defaultSettings = [
            'contact_email' => 'Info@2ndhandholding.com',
            'contact_phone' => '+31 (6) 25334951',
            'contact_address' => 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
            'tax_rate' => '8.5',
            'company_name' => 'Resteel Solutions',
            'company_tagline' => 'Building the future, one solution at a time',
            'company_description' => 'Specialists in buying and selling second-hand buildings and construction materials with over 25 years of experience.',
            'shipping_enabled' => 'true',
            'shipping_rate' => '5.99',
            'free_shipping_threshold' => '50.00',
            'shipping_zones' => json_encode(['United States', 'Canada', 'Europe']),
            'email_notifications' => 'true',
            'order_notifications' => 'true',
            'contact_form_notifications' => 'false',
            // Social Media Links
            'social_twitter' => 'https://twitter.com/resteel',
            'social_instagram' => 'https://instagram.com/resteel',
            'social_youtube' => 'https://youtube.com',
            'social_facebook' => '',
            'social_linkedin' => '',
            // Services We Provide Section
            'services_title' => 'Services We Provide',
            'services_subtitle' => 'Comprehensive solutions for your industrial building needs',
            'services_items' => json_encode([
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
            ]),
            // Why Choose Us Section
            'why_choose_us_title' => 'Why Choose Us',
            'why_choose_us_subtitle' => 'We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective',
            'why_choose_us_items' => json_encode([
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
                    'description' => 'Since 2000, we\'ve helped hundreds of industrial and agri businesses relocate or resell steel halls.'
                ]
            ]),
            // About - Who We Are Section
            'who_we_are_title' => 'Who We Are',
            'who_we_are_description' => 'Resteel is a trusted European leader in sustainable steel construction. We help companies rethink infrastructure using reclaimed, premium-grade materials — without compromising on strength, safety, or style.',
            'who_we_are_founded' => 'Founded in 2000 · Headquartered in Helmond, Netherlands',
            // About - What We Offer Section
            'what_we_offer_title' => 'What We Offer',
            'what_we_offer_subtitle' => 'More than just buying and selling — we help move, manage, and optimize every structure',
            'what_we_offer_items' => json_encode([
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
            ]),
            // About - Stats Section
            'stats_title' => 'Across Borders',
            'stats_subtitle' => 'Our structures stand in more than 25 countries — from farms in Finland to factories in France',
            'stats_items' => json_encode([
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
            ]),
            // About - Mission Section
            'mission_title' => 'Our Mission',
            'mission_subtitle' => 'Advancing sustainable construction through innovative steel solutions',
            'mission_items' => json_encode([
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
            ])
        ];

        foreach ($defaultSettings as $key => $value) {
            DB::table('site_settings')->insert([
                'key' => $key,
                'value' => $value,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
