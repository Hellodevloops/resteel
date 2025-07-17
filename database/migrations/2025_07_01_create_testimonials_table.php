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
    Schema::create('testimonials', function (Blueprint $table) {
      $table->id();
      $table->string('quote', 1000);
      $table->string('author');
      $table->string('position')->nullable();
      $table->string('company')->nullable();
      $table->integer('rating')->default(5);
      $table->boolean('is_active')->default(true);
      $table->integer('sort_order')->default(0);
      $table->timestamps();
    });

    // Insert default testimonials
    $defaultTestimonials = [
      [
        'quote' => 'Resteel made our entire site relocation process seamless...',
        'author' => 'Stefan Döring',
        'position' => null,
        'company' => 'RheinBuild GmbH',
        'rating' => 5,
        'is_active' => true,
        'sort_order' => 1
      ],
      [
        'quote' => 'We saved over 40% on our structural build...',
        'author' => 'Anita Kovács',
        'position' => null,
        'company' => 'Danube Construction',
        'rating' => 5,
        'is_active' => true,
        'sort_order' => 2
      ],
      [
        'quote' => 'International coordination is always a challenge...',
        'author' => 'Gilles Moreau',
        'position' => null,
        'company' => 'ProStruct Industries',
        'rating' => 5,
        'is_active' => true,
        'sort_order' => 3
      ],
      [
        'quote' => 'Resteel proved to be a reliable partner...',
        'author' => 'Jakub Nowak',
        'position' => null,
        'company' => 'AgroFab Polska',
        'rating' => 5,
        'is_active' => true,
        'sort_order' => 4
      ],
      [
        'quote' => 'When we urgently needed a large-scale steel hall...',
        'author' => 'Luca Bianchi',
        'position' => null,
        'company' => 'Infrastrutture SRL',
        'rating' => 5,
        'is_active' => true,
        'sort_order' => 5
      ]
    ];

    foreach ($defaultTestimonials as $testimonial) {
      DB::table('testimonials')->insert([
        ...$testimonial,
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
    Schema::dropIfExists('testimonials');
  }
};
