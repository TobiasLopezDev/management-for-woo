<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // Verifica si el usuario está autenticado
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    // Si no está autenticado, renderiza la vista Welcome
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Products routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    
    Route::get('/product/view/{product}/', [ProductController::class, 'view'])->name('products.view');
    
    Route::get('/product/edit/{product}/', [ProductController::class, 'edit'])->name('products.edit');
    Route::patch('/product/edit/{product}/', [ProductController::class, 'update'])->name('products.update');

    Route::get('/product/delete/{product}/', [ProductController::class, 'delete'])->name('products.delete');
    Route::delete('/product/delete/{product}/', [ProductController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/auth.php';
