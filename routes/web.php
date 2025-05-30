<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('website/App');
})->name('home');

// Add this route for the buildings page
Route::get('/buildings', function () {
    return Inertia::render('website/Buildings');
})->name('buildings');

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

    Route::get('admin/contact', function () {
        return Inertia::render('Contact/Index');
    })->name('contact.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
