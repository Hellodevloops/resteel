<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
  /**
   * Change the application locale and store in session
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function change(Request $request): JsonResponse
  {
    $locale = $request->input('locale');

    // Validate the locale
    if (!$locale || !in_array($locale, config('app.supported_locales'))) {
      return response()->json([
        'success' => false,
        'message' => 'Invalid locale provided'
      ], 400);
    }

    try {
      // Store locale in session
      Session::put('locale', $locale);

      // Set the application locale for current request
      App::setLocale($locale);

      return response()->json([
        'success' => true,
        'locale' => $locale,
        'message' => 'Language changed successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to change language: ' . $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get current locale (for debugging/API purposes)
   *
   * @return JsonResponse
   */
  public function current(): JsonResponse
  {
    return response()->json([
      'current_locale' => App::getLocale(),
      'session_locale' => Session::get('locale'),
      'supported_locales' => config('app.supported_locales')
    ]);
  }
}
