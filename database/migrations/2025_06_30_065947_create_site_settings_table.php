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
            'contact_phone' => '+31 (0) 123 456 789',
            'contact_address' => 'Westerbeemd 2B, 5705 DN Helmond, Netherlands',
            'tax_rate' => '8.5',
            'company_name' => 'Resteel Solutions',
            'company_tagline' => 'Building the future, one solution at a time',
            'company_description' => 'Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.',
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
            // Testimonials
            'testimonials' => json_encode([
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
