<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $testimonials = Testimonial::ordered()->get();

    return Inertia::render('Testimonials/Index', [
      'testimonials' => $testimonials
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Testimonials/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'quote' => 'required|string|max:1000',
      'author' => 'required|string|max:255',
      'position' => 'nullable|string|max:255',
      'company' => 'nullable|string|max:255',
      'rating' => 'required|integer|min:1|max:5',
      'is_active' => 'boolean',
      'sort_order' => 'integer'
    ]);

    $validated['is_active'] = $request->input('is_active', true);
    $validated['sort_order'] = $request->input('sort_order', 999);

    Testimonial::create($validated);

    return redirect()->route('admin.testimonials.index')
      ->with('success', 'Testimonial created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Testimonial $testimonial)
  {
    return Inertia::render('Testimonials/Show', [
      'testimonial' => $testimonial
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Testimonial $testimonial)
  {
    return Inertia::render('Testimonials/Edit', [
      'testimonial' => $testimonial
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Testimonial $testimonial)
  {
    $validated = $request->validate([
      'quote' => 'required|string|max:1000',
      'author' => 'required|string|max:255',
      'position' => 'nullable|string|max:255',
      'company' => 'nullable|string|max:255',
      'rating' => 'required|integer|min:1|max:5',
      'is_active' => 'boolean',
      'sort_order' => 'integer'
    ]);

    $testimonial->update($validated);

    return redirect()->route('admin.testimonials.index')
      ->with('success', 'Testimonial updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Testimonial $testimonial)
  {
    $testimonial->delete();

    return redirect()->route('admin.testimonials.index')
      ->with('success', 'Testimonial deleted successfully.');
  }

  /**
   * Get active testimonials for public display.
   */
  public function getActiveTestimonials()
  {
    return Testimonial::getActiveTestimonials();
  }
}
