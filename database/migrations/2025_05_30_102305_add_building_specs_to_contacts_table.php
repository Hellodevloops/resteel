<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::table('contacts', function (Blueprint $table) {
      $table->string('building_category')->nullable()->after('message');
      $table->string('building_type')->nullable()->after('building_category');
      $table->string('building_width')->nullable()->after('building_type');
      $table->string('building_length')->nullable()->after('building_width');
      $table->string('gutter_height')->nullable()->after('building_length');
      $table->string('top_height')->nullable()->after('gutter_height');
    });
  }

  public function down(): void
  {
    Schema::table('contacts', function (Blueprint $table) {
      $table->dropColumn([
        'building_category',
        'building_type',
        'building_width',
        'building_length',
        'gutter_height',
        'top_height'
      ]);
    });
  }
};
