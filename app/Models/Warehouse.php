<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'location',
    'status',
    'capacity',
    'occupied',
    'occupancy_rate',
    'type',
    'last_inspection',
    'revenue',
    'alerts',
    'description',
    'construction',
    'year_built',
    'price',
    'total_area',
    'has_video',
    'video_urls',
    'features',
    'main_hall_dimensions',
    'main_hall_area',
    'office_space_dimensions',
    'office_space_area',
    'loading_dock_dimensions',
    'loading_dock_area',
    'category',
  ];

  protected $casts = [
    'occupancy_rate' => 'integer',
    'alerts' => 'integer',
    'has_video' => 'boolean',
    'video_urls' => 'array',
    'features' => 'array',
    'last_inspection' => 'date',
  ];
}
