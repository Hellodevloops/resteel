<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    // First, let's check what the current enum values are
    $currentEnum = DB::select("SHOW COLUMNS FROM warehouses LIKE 'status'")[0]->Type;

    // Extract current enum values
    preg_match("/enum\((.*)\)/", $currentEnum, $matches);
    $currentValues = array_map(function ($value) {
      return trim($value, "'");
    }, explode(',', $matches[1]));

    // Define the expected values
    $expectedValues = ['active', 'leased', 'under_maintenance', 'coming_soon', 'inactive', 'sale', 'sold'];

    // Check if we need to add the missing values
    $missingValues = array_diff($expectedValues, $currentValues);

    if (!empty($missingValues)) {
      // Add missing values one by one to avoid issues with different MySQL versions
      foreach ($missingValues as $value) {
        try {
          DB::statement("ALTER TABLE warehouses MODIFY COLUMN status ENUM('" . implode("','", array_merge($currentValues, [$value])) . "') DEFAULT 'active'");
          $currentValues[] = $value;
        } catch (Exception $e) {
          // Log the error but continue
          Log::warning("Failed to add enum value '{$value}' to warehouses.status: " . $e->getMessage());
        }
      }
    }

    // Final check - ensure the enum has all expected values
    $finalEnum = DB::select("SHOW COLUMNS FROM warehouses LIKE 'status'")[0]->Type;
    Log::info("Final warehouse status enum: " . $finalEnum);
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    // We don't want to remove the enum values in case they're being used
    // This migration is meant to be safe to run multiple times
  }
};
