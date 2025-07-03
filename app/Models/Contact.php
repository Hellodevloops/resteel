<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'message',
        'status',
        'type',
        'source',
        'value',
        'alerts',
        'last_contact',
        'building_category',
        'building_type',
        'building_width',
        'building_length',
        'gutter_height',
        'top_height',
    ];

    protected $casts = [
        'last_contact' => 'date',
    ];
}
