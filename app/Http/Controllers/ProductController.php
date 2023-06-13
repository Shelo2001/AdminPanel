<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function createCategory(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
        ]);
    
        $category = Category::create([
            'name' => $validatedData['name'],
        ]);

        return response()->json(['category' => $category,'success' => true]);
    }

    public function getCategories(){
        $categories = Category::all();

        return response()->json(['categories' => $categories]);
    }
}
