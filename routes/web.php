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
Route::post('/contacts', [ContactController::class, 'store'])->name('public.contacts.store');

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
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::get('/contacts/create', [ContactController::class, 'create'])->name('contacts.create');
        Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
        Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
        Route::get('/contacts/{contact}/edit', [ContactController::class, 'edit'])->name('contacts.edit');
        Route::put('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

        // Admin webshop routes
        Route::get('/webshops', [WebShopController::class, 'index'])->name('webshops.index');
        Route::get('/webshops/create', [WebShopController::class, 'create'])->name('webshops.create');
        Route::post('/webshops', [WebShopController::class, 'store'])->name('webshops.store');
        Route::get('/webshops/{webshop}', [WebShopController::class, 'show'])->name('webshops.show');
        Route::get('/webshops/{webshop}/edit', [WebShopController::class, 'edit'])->name('webshops.edit');
        Route::put('/webshops/{webshop}', [WebShopController::class, 'update'])->name('webshops.update');
        Route::delete('/webshops/{webshop}', [WebShopController::class, 'destroy'])->name('webshops.destroy');
    });

    Route::get('/contact', function () {
        return Inertia::render('Contact');
    })->name('contact');

    // Public webshop route
    Route::get('/webshop', [WebShopController::class, 'frontend'])->name('webshop.frontend');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
