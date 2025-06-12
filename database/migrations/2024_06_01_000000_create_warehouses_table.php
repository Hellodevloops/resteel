<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('warehouses', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('location');
      $table->enum('status', ['active', 'leased', 'under_maintenance', 'coming_soon', 'inactive'])->default('active');
      $table->string('capacity')->nullable();
      $table->string('occupied')->nullable();
      $table->float('occupancy_rate')->default(0);
      $table->string('type')->nullable();
      $table->date('last_inspection')->nullable();
      $table->string('revenue')->nullable();
      $table->integer('alerts')->default(0);
      $table->text('description')->nullable();
      $table->text('construction')->nullable();
      $table->string('year_built')->nullable();
      $table->string('price')->nullable();
      $table->string('total_area')->nullable();
      $table->string('unit_of_measurement')->default('m²');
      $table->boolean('has_video')->default(false);
      $table->json('video_urls')->nullable();
      $table->json('features')->nullable();
      $table->string('main_hall_dimensions')->nullable();
      $table->string('main_hall_area')->nullable();
      $table->string('office_space_dimensions')->nullable();
      $table->string('office_space_area')->nullable();
      $table->string('loading_dock_dimensions')->nullable();
      $table->string('loading_dock_area')->nullable();
      $table->string('category')->nullable();
      $table->string('ceiling_height')->nullable();
      $table->string('floor_load_capacity')->nullable();
      $table->integer('number_of_loading_docks')->default(0);
      $table->integer('parking_spaces')->default(0);
      $table->json('security_features')->nullable();
      $table->json('utilities')->nullable();
      $table->json('certificates')->nullable();
      $table->date('availability_date')->nullable();
      $table->string('lease_terms')->nullable();
      $table->string('contact_person')->nullable();
      $table->string('contact_email')->nullable();
      $table->string('contact_phone')->nullable();
      $table->string('address')->nullable();
      $table->string('postal_code')->nullable();
      $table->string('city')->nullable();
      $table->string('country')->nullable();
      $table->string('latitude')->nullable();
      $table->string('longitude')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('warehouses');
  }
};
