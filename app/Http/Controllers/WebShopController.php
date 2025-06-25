<?php

namespace App\Http\Controllers;

use App\Models\WebShop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class WebShopController extends Controller
{
    public function index()
    {
        $products = WebShop::latest()->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'description' => $product->description,
                'rating' => $product->rating,
                'status' => $product->status,
                'features' => $product->features,
                'created_at' => $product->created_at->toDateString(),
                'updated_at' => $product->updated_at->toDateString(),
            ];
        });

        return Inertia::render('WebShop/Index', [
            'products' => $products,
            'filters' => request()->only(['search', 'status', 'sort']),
        ]);
    }

    public function create()
    {
        return Inertia::render('WebShop/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'description' => 'required|string',
                'rating' => 'required|numeric|min:0|max:5',
                'status' => 'required|in:inStock,soldOut',
                'features' => 'required|array|min:1',
                'features.*' => 'required|string|max:255',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = Storage::url($path);
            }

            // Create the product
            $product = WebShop::create($validated);

            return redirect()->route('admin.webshops.show', $product->id)
                ->with('success', 'Product created successfully.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to create product. Please try again.',
                'details' => $e->getMessage()
            ])->withInput();
        }
    }

    public function show(WebShop $webshop)
    {
        $product = [
            'id' => $webshop->id,
            'name' => $webshop->name,
            'price' => $webshop->price,
            'image' => $webshop->image,
            'description' => $webshop->description,
            'rating' => $webshop->rating,
            'status' => $webshop->status,
            'features' => $webshop->features,
            'created_at' => $webshop->created_at->toDateString(),
            'updated_at' => $webshop->updated_at->toDateString(),
        ];

        return Inertia::render('WebShop/Show', [
            'product' => $product
        ]);
    }

    public function edit(WebShop $webshop)
    {
        $product = [
            'id' => $webshop->id,
            'name' => $webshop->name,
            'price' => $webshop->price,
            'image' => $webshop->image,
            'description' => $webshop->description,
            'rating' => $webshop->rating,
            'status' => $webshop->status,
            'features' => $webshop->features,
        ];

        return Inertia::render('WebShop/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, WebShop $webshop)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'description' => 'required|string',
                'rating' => 'required|numeric|min:0|max:5',
                'status' => 'required|in:inStock,soldOut',
                'features' => 'required|array|min:1',
                'features.*' => 'required|string|max:255',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($webshop->image) {
                    $oldPath = str_replace('/storage/', '', $webshop->image);
                    Storage::disk('public')->delete($oldPath);
                }

                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = Storage::url($path);
            }

            // Update the product
            $webshop->update($validated);

            return redirect()->route('admin.webshops.show', $webshop->id)
                ->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to update product. Please try again.',
                'details' => $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(WebShop $webshop)
    {
        // Delete the product image if exists
        if ($webshop->image) {
            $path = str_replace('/storage/', '', $webshop->image);
            Storage::disk('public')->delete($path);
        }

        $webshop->delete();

        return Redirect::route('admin.webshops.index')
            ->with('success', 'Product deleted successfully.');
    }

    public function frontend()
    {
        $products = WebShop::latest()->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'description' => $product->description,
                'rating' => $product->rating,
                'status' => $product->status,
                'features' => $product->features,
                'created_at' => $product->created_at->toDateString(),
                'updated_at' => $product->updated_at->toDateString(),
            ];
        });
        // dd($products);
        return Inertia::render('website/WebShop', [
            'products' => $products,
            'filters' => request()->only(['search', 'status', 'sort']),
        ]);
    }

    public function webshop_view_api()
    {
        $webshop = WebShop::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $webshop
        ]);
    }

    public function webshop_detail_api($id)
    {
        $webshop = WebShop::find($id);

        if (!$webshop) {
            return response()->json([
                'status' => 'error',
                'message' => 'WebShop not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $webshop
        ]);
    }
}
