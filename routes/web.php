<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('website/App');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('warehouse', function () {
        return Inertia::render('Warehouse/Index');
    })->name('warehouse.index');

    Route::get('webshop', function () {
        return Inertia::render('WebShop/Index');
    })->name('webshop.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
