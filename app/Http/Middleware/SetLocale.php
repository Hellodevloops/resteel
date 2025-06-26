<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Get locale from session, fallback to config default
        $locale = session('locale', config('app.locale'));

        // Validate locale is supported
        if (!in_array($locale, config('app.supported_locales'))) {
            $locale = config('app.locale');
            session(['locale' => $locale]); // Store corrected locale in session
        }

        // Set the application locale
        App::setLocale($locale);

        return $next($request);
    }
}
