<?php

namespace App\Models;

use App\Models\ProductImage;
use App\Models\ProductCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    
    public function Images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function Categories()
    {
        return $this->hasMany(ProductCategories::class);
    }
}
