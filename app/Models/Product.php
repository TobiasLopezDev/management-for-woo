<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'sku',
        'type',
        'parent_sku',
        'cost',
        'price',
        'stock_management',
        'images',
    ];

    protected $casts = [
        'cost' => 'decimal:2',
        'price' => 'decimal:2',
        'stock_management' => 'boolean',
        'images' => 'array',
    ];
}
