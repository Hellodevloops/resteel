<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WebShopController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\WarehouseController;

// Home route
Route::get('/', function () {
    return Inertia::render('website/Home');
})->name('home');

// Public website pages
Route::get('/buildings', fn() => Inertia::render('website/Buildings'))->name('buildings');
Route::get('/building-details/{id}', function ($id) {
    return Inertia::render('website/BuildingsDetails', ['id' => $id]);
})->name('buildingsdetails');
Route::get('/services', fn() => Inertia::render('website/Services'))->name('services');
Route::get('/about', fn() => Inertia::render('website/About'))->name('about');
Route::get('/terms', fn() => Inertia::render('website/Terms'))->name('terms');
Route::get('/privacy', fn() => Inertia::render('website/Privacy'))->name('privacy');
Route::get('/career', fn() => Inertia::render('website/Career'))->name('career');
Route::get('/cart', fn() => Inertia::render('website/Cart'))->name('cart');
Route::get('/contact', fn() => Inertia::render('website/ContactPage'))->name('contact');

Route::get('/api/webshop/{id}', [WebShopController::class, 'webshop_detail_api']);
Route::get('/api/webshop', [WebShopController::class, 'webshop_view_api']);

Route::get('/api/warehouses/{id}', [WarehouseController::class, 'warehouse_detail_api']);
Route::get('/api/warehouses', [WarehouseController::class, 'warehosue_view_api']);
// Public contact form route
Route::post('/contacts', [ContactController::class, 'store'])->name('public.contacts.store');

// Public webshop route (calls controller, not just Inertia page)
Route::get('/webshops', [WebShopController::class, 'frontend'])->name('webshop.frontend');

// Public API routes
Route::get('/api/featured-warehouses', [WarehouseController::class, 'featured'])->name('api.featured-warehouses');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard route - also make it available as admin.dashboard
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    // Admin prefix group for other routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Admin dashboard route
        Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

        // Admin warehouse routes
        Route::get('/warehouses', [WarehouseController::class, 'index'])->name('warehouses.index');
        Route::get('/warehouses/create', [WarehouseController::class, 'create'])->name('warehouses.create');
        Route::post('/warehouses', [WarehouseController::class, 'store'])->name('warehouses.store');
        Route::get('/warehouses/{warehouse}', [WarehouseController::class, 'show'])->name('warehouses.show');
        Route::get('/warehouses/{warehouse}/edit', [WarehouseController::class, 'edit'])->name('warehouses.edit');
        Route::put('/warehouses/{warehouse}', [WarehouseController::class, 'update'])->name('warehouses.update');
        Route::delete('/warehouses/{warehouse}', [WarehouseController::class, 'destroy'])->name('warehouses.destroy');

        // Admin contact routes
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

    // For backward compatibility, keep the old routes but redirect them to the new ones
    Route::redirect('admin/warehouse', '/admin/warehouses')->name('warehouse.index');
    Route::redirect('admin/warehouse/create', '/admin/warehouses/create')->name('warehouse.create');
    Route::redirect('admin/warehouse/{warehouse}', '/admin/warehouses/{warehouse}')->name('warehouse.show');
    Route::redirect('admin/warehouse/{warehouse}/edit', '/admin/warehouses/{warehouse}/edit')->name('warehouse.edit');
});

Route::get('/locale/{locale}', function ($locale) {
    if (in_array($locale, config('app.supported_locales'))) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('locale.change');


Route::get('/webshopdetail', fn() => Inertia::render('website/WebshopItemDetail'))->name('WebshopItemDetail');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
