<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\App; // Add this line

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Inertia::share([
            'locale' => fn() => App::getLocale(),
            'fallback_locale' => fn() => config('app.fallback_locale'),
            'supported_locales' => config('app.supported_locales'),
            'translations' => function () {
                $files = File::files(resource_path("lang/" . App::getLocale()));
                return collect($files)
                    ->mapWithKeys(fn($f) => [pathinfo($f)['filename'] => require $f])
                    ->all();
            },
        ]);
    }
}
