<?php
namespace App\Http\Controllers;

use App\Models\WebShop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class WebShopController extends Controller
{
    public function index()
    {
        $products = WebShop::all();
        return Inertia::render('WebShop/Index', ['products' => $products]);
    }

    public function frontend()
    {
        $products = WebShop::all();
        return Inertia::render('website/WebShop', ['products' => $products]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // File upload
            'description' => 'required|string',
            'rating' => 'required|numeric|min:0|max:5',
            'status' => 'required|in:inStock,soldOut',
            'features' => 'required|array|min:1',
            'features.*' => 'string|max:255',
        ]);

        // Handle file upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            $validated['image'] = null;
        }

        WebShop::create($validated);

        return redirect()->route('webshops.index')->with('message', 'Product added successfully!');
    }
}
