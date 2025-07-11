<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WebShopController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\SiteSettingsController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\TestimonialController;

// Home route
Route::get('/', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Home', [
        'siteSettings' => $mergedSettings
    ]);
})->name('home');
// Route::get('/admin/testimonials', function () {
//     return Inertia::render('website/Home');
// })->name('home');
// Content management routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        // Content management routes
        Route::get('/content', [App\Http\Controllers\ContentController::class, 'index'])->name('content.index');
        Route::get('/content/create', [App\Http\Controllers\ContentController::class, 'create'])->name('content.create');
        Route::post('/content', [App\Http\Controllers\ContentController::class, 'store'])->name('content.store');
        Route::get('/content/edit', [App\Http\Controllers\ContentController::class, 'edit'])->name('content.edit');
        Route::put('/content', [App\Http\Controllers\ContentController::class, 'update'])->name('content.update');
    });
});

// Site Settings Routes (outside of auth middleware for now, move inside if needed)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/settings', [SiteSettingsController::class, 'show'])->name('settings');
    Route::get('/admin/settings/edit', [SiteSettingsController::class, 'edit'])->name('settings.edit');
    Route::post('/admin/settings', [SiteSettingsController::class, 'store'])->name('settings.store');
    Route::put('/admin/settings/{setting}', [SiteSettingsController::class, 'update'])->name('settings.update');
});

// Public website pages
Route::get('/buildings', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Buildings', [
        'siteSettings' => $mergedSettings
    ]);
})->name('buildings');
Route::get('/building-details/{id}', function ($id) {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/BuildingsDetails', [
        'id' => $id,
        'siteSettings' => $mergedSettings
    ]);
})->name('buildingsdetails');
Route::get('/services', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Services', [
        'siteSettings' => $mergedSettings
    ]);
})->name('services');
Route::get('/about', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/About', [
        'siteSettings' => $mergedSettings
    ]);
})->name('about');
Route::get('/terms', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Terms', [
        'siteSettings' => $mergedSettings
    ]);
})->name('terms');
Route::get('/privacy', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Privacy', [
        'siteSettings' => $mergedSettings
    ]);
})->name('privacy');
Route::get('/career', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Career', [
        'siteSettings' => $mergedSettings
    ]);
})->name('career');
Route::get('/cart', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/Cart', [
        'siteSettings' => $mergedSettings
    ]);
})->name('cart');
Route::get('/contact', function () {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/ContactPage', [
        'siteSettings' => $mergedSettings
    ]);
})->name('contact');

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
        // Route::get('/webshops', [WebShopController::class, 'index'])->name('webshops.index');
        // Route::get('/webshops/create', [WebShopController::class, 'create'])->name('webshops.create');
        // Route::post('/webshops', [WebShopController::class, 'store'])->name('webshops.store');
        // Route::get('/webshops/{webshop}', [WebShopController::class, 'show'])->name('webshops.show');
        // Route::get('/webshops/{webshop}/edit', [WebShopController::class, 'edit'])->name('webshops.edit');
        // Route::put('/webshops/{webshop}', [WebShopController::class, 'update'])->name('webshops.update');
        // Route::delete('/webshops/{webshop}', [WebShopController::class, 'destroy'])->name('webshops.destroy');

        // Admin testimonial routes
        Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
        Route::get('/testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
        Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show'])->name('testimonials.show');
        Route::get('/testimonials/{testimonial}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
        Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
    });

    // For backward compatibility, keep the old routes but redirect them to the new ones
    Route::redirect('admin/warehouse', '/admin/warehouses')->name('warehouse.index');
    Route::redirect('admin/warehouse/create', '/admin/warehouses/create')->name('warehouse.create');
    Route::redirect('admin/warehouse/{warehouse}', '/admin/warehouses/{warehouse}')->name('warehouse.show');
    Route::redirect('admin/warehouse/{warehouse}/edit', '/admin/warehouses/{warehouse}/edit')->name('warehouse.edit');
});

// Language switching routes with better session handling
Route::post('/locale/change', [LocaleController::class, 'change'])->name('locale.change');
Route::get('/locale/current', [LocaleController::class, 'current'])->name('locale.current');
Route::get('/locale/translations/{locale}', [LocaleController::class, 'translations'])->name('locale.translations');

// Test route for debugging locale
Route::get('/test-locale', function () {
    return response()->json([
        'current_locale' => app()->getLocale(),
        'session_locale' => session('locale'),
        'supported_locales' => config('app.supported_locales'),
        'fallback_locale' => config('app.fallback_locale'),
    ]);
});

// Fallback route for backward compatibility (GET method)
Route::get('/locale/{locale}', function ($locale) {
    if (in_array($locale, config('app.supported_locales'))) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('locale.change.get');


Route::get('/webshopdetail/{id}', function ($id) {
    $siteSettings = App\Http\Controllers\SiteSettingsController::getPublicSettings();
    $contentSettings = App\Http\Controllers\ContentController::getPublicContentSettings();

    // Merge content settings into site settings for backward compatibility
    $mergedSettings = array_merge($siteSettings, $contentSettings);

    return Inertia::render('website/WebshopItemDetail', [
        'productId' => $id,
        'siteSettings' => $mergedSettings
    ]);
})->name('WebshopItemDetail');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
