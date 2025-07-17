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
    'unit_of_measurement',
    'has_video',
    'video_urls',
    'features',
    'area_dimensions',
    'main_hall_dimensions',
    'main_hall_area',
    'office_space_dimensions',
    'office_space_area',
    'loading_dock_dimensions',
    'loading_dock_area',
    'category',
    'ceiling_height',
    'floor_load_capacity',
    'number_of_loading_docks',
    'parking_spaces',
    'security_features',
    'utilities',
    'certificates',
    'availability_date',
    'lease_terms',
    'contact_person',
    'contact_email',
    'contact_phone',
    'address',
    'postal_code',
    'city',
    'country',
    'latitude',
    'longitude',
    'image_path',
    'additional_images',
  ];

  protected $casts = [
    'occupancy_rate' => 'float',
    'alerts' => 'integer',
    'has_video' => 'boolean',
    'video_urls' => 'array',
    'features' => 'array',
    'area_dimensions' => 'array',
    'security_features' => 'array',
    'utilities' => 'array',
    'certificates' => 'array',
    'additional_images' => 'array',
    'last_inspection' => 'date',
    'availability_date' => 'date',
    'number_of_loading_docks' => 'integer',
    'parking_spaces' => 'integer',
  ];
}
