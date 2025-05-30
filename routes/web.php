<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebShopController;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('website/App');
})->name('home');

Route::get('/buildings', function () {
    return Inertia::render('website/Buildings');
})->name('buildings');

// New frontend route for website/WebShop.tsx
Route::get('/webshop', [WebShopController::class, 'frontend'])->name('webshop.front');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin/warehouse', function () {
        return Inertia::render('Warehouse/Index');
    })->name('warehouse.index');

    Route::get('admin/webshop', function () {
        return Inertia::render('WebShop/Index');
    })->name('webshop.index');

    // Route::get('admin/contacts', function () {
    //     return Inertia::render('Contact/Index');
    // })->name('contact.index');
    Route::get('/admin/contacts', [ContactController::class, 'index'])->name('contacts.index');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

    Route::get('/admin', [WebShopController::class, 'index'])->name('webshops.index');
    Route::post('/webshops', [WebShopController::class, 'store'])->name('webshops.store');
    Route::put('/webshops/{webshop}', [WebShopController::class, 'update'])->name('webshops.update');
    Route::delete('/webshops/{webshop}', [WebShopController::class, 'destroy'])->name('webshops.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
