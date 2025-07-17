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
        // Modify the status enum to include 'sale' and 'sold' values
        DB::statement("ALTER TABLE warehouses MODIFY COLUMN status ENUM('active', 'leased', 'under_maintenance', 'coming_soon', 'inactive', 'sale', 'sold') DEFAULT 'active'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to original enum values
        DB::statement("ALTER TABLE warehouses MODIFY COLUMN status ENUM('active', 'leased', 'under_maintenance', 'coming_soon', 'inactive') DEFAULT 'active'");
    }
};
