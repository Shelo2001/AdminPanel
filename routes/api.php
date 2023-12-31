<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/categories', [ProductController::class,'getCategories']);
Route::post('/categories', [ProductController::class,'createCategory']);
Route::post('/product/create', [ProductController::class,'createProduct']);
Route::get('/products', [ProductController::class,'getProducts']);
Route::delete('/products/{id}', [ProductController::class,'deleteProductById']);
Route::get('/products/{id}', [ProductController::class,'getProductById']);
