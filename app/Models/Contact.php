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
    ];

    protected $casts = [
        'last_contact' => 'date',
    ];
}
