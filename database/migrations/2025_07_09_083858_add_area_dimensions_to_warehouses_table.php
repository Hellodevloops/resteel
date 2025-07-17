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
        Schema::table('warehouses', function (Blueprint $table) {
            $table->json('area_dimensions')->nullable()->after('features');
            // Modify the status column to add 'sold' and 'sale' as valid values
            $table->enum('status', ['active', 'leased', 'under_maintenance', 'coming_soon', 'inactive', 'sale', 'sold'])->default('active')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('warehouses', function (Blueprint $table) {
            $table->dropColumn('area_dimensions');
            // Optionally revert status column to previous enum values if needed
            $table->enum('status', ['active', 'leased', 'under_maintenance', 'coming_soon', 'inactive'])->default('active')->change();
        });
    }
};
