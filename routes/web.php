<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WebShopController;
use App\Http\Controllers\ContactController;

// Home route (was missing)
Route::get('/', function () {
    return Inertia::render('website/Home');
})->name('home');

Route::get('/buildings', function () {
    return Inertia::render('website/Buildings');
})->name('buildings');

Route::get('/webshop', function () {
    return Inertia::render('website/WebShop');
})->name('webshop');

// New frontend route for website/WebShop.tsx
// Route::get('/webshop', [WebShopController::class, 'frontend'])->name('webshop.front');

// ✅ Integrated new routes
Route::get('/buildingsdetails', function () {
    return Inertia::render('website/BuildingsDetails');
})->name('buildingsdetails');

Route::get('/services', function () {
    return Inertia::render('website/Services');
})->name('services');

Route::get('/about', function () {
    return Inertia::render('website/About');
})->name('about');

Route::get('/terms', function () {
    return Inertia::render('website/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('website/Privacy');
})->name('privacy');

Route::get('/career', function () {
    return Inertia::render('website/Career');
})->name('career');

Route::get('/cart', function () {
    return Inertia::render('website/Cart');
})->name('cart');

Route::get('/contactpage', function () {
    return Inertia::render('website/ContactPage');
})->name('contactpage');

// Public contact form route
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

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

    // Admin contact routes
    Route::get('/admin/contacts', [ContactController::class, 'index'])->name('contacts.index');

    Route::get('/contact', function () {
        return Inertia::render('Contact');
    })->name('contact');

    // Admin webshop management routes
    Route::get('/admin', [WebShopController::class, 'index'])->name('webshops.index');
    Route::post('/webshops', [WebShopController::class, 'store'])->name('webshops.store');
    Route::put('/webshops/{webshop}', [WebShopController::class, 'update'])->name('webshops.update');
    Route::delete('/webshops/{webshop}', [WebShopController::class, 'destroy'])->name('webshops.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
