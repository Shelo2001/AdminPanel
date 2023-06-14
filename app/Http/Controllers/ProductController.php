<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Models\ProductCategories;
use Intervention\Image\Facades\Image;

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

    public function createProduct(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'images' => 'required',
            'categories' => 'required',
        ]);
    
        $product = new Product;
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->save();

        foreach ($validatedData['images'] as $image) {
            
                $productImage = new ProductImage;
                $strpos = strpos($image, ';');
                $sub = substr($image, 0, $strpos);
                $ex = explode('/', $sub)[1];
                $name = time().'.'.$ex;
                $img = Image::make($image)->resize(117,100);
                $upload_path = public_path()."/upload/";
                $img->save($upload_path.$name);
                $productImage->src = $name;
                $productImage->product_id = $product->id;
                $productImage->save();
        }
    
        foreach ($validatedData['categories'] as $category) {
            $productCategories = new ProductCategories;
            $productCategories->product_id = $product->id;
            $productCategories->category = $category;
            $productCategories->save();
        }

        return response(["success"=>true]);
    }

    public function getProducts(){
        $products = Product::with('Images', 'Categories')->get();

        return response()->json(['products' => $products]);
    }
}
