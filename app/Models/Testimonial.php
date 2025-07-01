<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
  use HasFactory;

  protected $fillable = [
    'quote',
    'author',
    'position',
    'company',
    'rating',
    'is_active',
    'sort_order',
  ];

  protected $casts = [
    'is_active' => 'boolean',
    'rating' => 'integer',
    'sort_order' => 'integer',
  ];

  /**
   * Scope a query to only include active testimonials.
   */
  public function scopeActive($query)
  {
    return $query->where('is_active', true);
  }

  /**
   * Scope a query to order by sort order.
   */
  public function scopeOrdered($query)
  {
    return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
  }

  /**
   * Get all active testimonials ordered by sort order.
   */
  public static function getActiveTestimonials()
  {
    return static::active()->ordered()->get();
  }
}
