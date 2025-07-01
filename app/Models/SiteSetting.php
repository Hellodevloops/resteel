<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
  protected $fillable = ['key', 'value'];

  /**
   * Get a setting value by key.
   */
  public static function get($key, $default = null)
  {
    $setting = static::where('key', $key)->first();
    return $setting ? $setting->value : $default;
  }

  /**
   * Set a setting value by key.
   */
  public static function set($key, $value)
  {
    return static::updateOrCreate(
      ['key' => $key],
      ['value' => $value]
    );
  }

  /**
   * Get all settings as an associative array.
   */
  public static function getAllSettings()
  {
    $settings = static::all()->pluck('value', 'key')->toArray();

    // Fields that should remain as strings even if they contain only numbers
    $stringFields = ['contact_phone'];

    // Parse JSON values and convert string booleans
    foreach ($settings as $key => $value) {
      if ($value === 'true') {
        $settings[$key] = true;
      } elseif ($value === 'false') {
        $settings[$key] = false;
      } elseif (is_string($value) && (str_starts_with($value, '[') || str_starts_with($value, '{'))) {
        $decoded = json_decode($value, true);
        if ($decoded !== null) {
          $settings[$key] = $decoded;
        }
      } elseif (is_numeric($value) && !in_array($key, $stringFields)) {
        // Keep numeric strings as strings unless they're integers
        if (strpos($value, '.') === false) {
          $settings[$key] = (int) $value;
        } else {
          $settings[$key] = (float) $value;
        }
      }
    }

    return $settings;
  }

  /**
   * Update multiple settings at once.
   */
  public static function updateMany(array $settings)
  {
    foreach ($settings as $key => $value) {
      // Convert arrays and booleans to strings for storage
      if (is_array($value)) {
        $value = json_encode($value);
      } elseif (is_bool($value)) {
        $value = $value ? 'true' : 'false';
      }

      static::set($key, $value);
    }
  }
}
