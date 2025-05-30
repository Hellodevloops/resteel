<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebShop extends Model
{
    protected $fillable = [
        'name',
        'price',
        'image',
        'description',
        'rating',
        'status',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];
}
