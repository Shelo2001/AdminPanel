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
                $name = time().'_'.uniqid().'.'.$ex;
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

    public function getProducts(Request $request){
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->input('description') . '%');
        }

        if ($request->has('minPrice')) {
            $query->where('price', '>=',$request->input('minPrice'));
        }

        if ($request->has('maxPrice')) {
            $query->where('price', '<=',$request->input('maxPrice'));
        }

        $products = $query->with('Images', 'Categories')->get();

        return response()->json(['products' => $products]);
    }

    public function deleteProductById($id){
        $product = Product::where('id', $id)->delete();

        return response()->json(['success' => 'successfully deleted product']);
    }
    public function getProductById($id){
        $product = Product::where('id', $id)->with('Images','Categories')->first();

        return response()->json(['product' => $product]);
    }
}
