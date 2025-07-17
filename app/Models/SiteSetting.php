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

    // Fields that should always be treated as strings, never as JSON
    $alwaysStringFields = [
      'services_title',
      'services_subtitle',
      'why_choose_us_title',
      'why_choose_us_subtitle',
      'who_we_are_title',
      'who_we_are_description',
      'who_we_are_founded',
      'what_we_offer_title',
      'what_we_offer_subtitle',
      'company_name',
      'company_tagline',
      'company_description',
      'contact_email',
      'contact_phone',
      'contact_address'
    ];

    // Parse JSON values and convert string booleans
    foreach ($settings as $key => $value) {
      if ($value === 'true') {
        $settings[$key] = true;
      } elseif ($value === 'false') {
        $settings[$key] = false;
      } elseif (!in_array($key, $alwaysStringFields) && is_string($value) && (str_starts_with($value, '[') || str_starts_with($value, '{'))) {
        // Only try to parse as JSON if the field is not in the alwaysStringFields list
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
