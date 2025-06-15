<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class WarehouseController extends Controller
{
  /**
   * Display a listing of the warehouses.
   */
  public function index()
  {
    $warehouses = Warehouse::all();

    // Ensure array fields are initialized for each warehouse
    $warehouses->each(function ($warehouse) {
      $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
      foreach ($arrayFields as $field) {
        if (is_null($warehouse->$field)) {
          $warehouse->$field = [];
        }
      }
    });

    $overview = [
      'totalWarehouses' => $warehouses->count(),
      'activeWarehouses' => $warehouses->where('status', 'active')->count(),
      'totalCapacity' => $this->formatTotalCapacity($warehouses),
      'occupancyRate' => $this->calculateAverageOccupancyRate($warehouses),
      'monthlyRevenue' => $this->formatTotalRevenue($warehouses),
      'growthRate' => 12.5, // This would be calculated based on historical data
    ];

    $recentActivity = $this->getRecentActivity();

    return Inertia::render('Warehouse/Index', [
      'warehouseData' => [
        'overview' => $overview,
        'warehouses' => $warehouses,
        'recentActivity' => $recentActivity,
      ]
    ]);
  }
  public function warehosue_view_api()
{
    $warehouses = Warehouse::orderBy('created_at', 'desc')->get();

    return response()->json([
        'status' => 'success',
        'data' => $warehouses
    ]);
}

public function warehouse_detail_api($id)
{
    $warehouse = Warehouse::find($id);

    if (!$warehouse) {
        return response()->json([
            'status' => 'error',
            'message' => 'Warehouse not found'
        ], 404);
    }

    return response()->json([
        'status' => 'success',
        'data' => $warehouse
    ]);
}


  /**
   * Show the form for creating a new warehouse.
   */
  public function create()
  {
    return Inertia::render('Warehouse/Create');
  }

  /**
   * Store a newly created warehouse in the database.
   */
  public function store(Request $request)
  {
    try {
      // Log the request data for debugging
      Log::info('Store warehouse request data:', $request->all());

      // Validate the warehouse data
      $validated = $this->validateWarehouse($request);

      // Process array fields
      if (isset($validated['features']) && is_string($validated['features'])) {
        $validated['features'] = explode(',', $validated['features']);
      }

      if (isset($validated['video_urls']) && is_string($validated['video_urls'])) {
        $validated['video_urls'] = explode(',', $validated['video_urls']);
      }

      if (isset($validated['security_features']) && is_string($validated['security_features'])) {
        $validated['security_features'] = explode(',', $validated['security_features']);
      }

      if (isset($validated['utilities']) && is_string($validated['utilities'])) {
        $validated['utilities'] = explode(',', $validated['utilities']);
      }

      if (isset($validated['certificates']) && is_string($validated['certificates'])) {
        $validated['certificates'] = explode(',', $validated['certificates']);
      }

      // Ensure empty arrays are properly handled
      $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
      foreach ($arrayFields as $field) {
        if (!isset($validated[$field]) || (is_array($validated[$field]) && empty($validated[$field]))) {
          $validated[$field] = [];
        }
      }

      // Handle main image upload
      if ($request->hasFile('image')) {
        $path = $request->file('image')->store('warehouses', 'public');
        $validated['image_path'] = Storage::url($path);
      }

      // Handle additional images
      if ($request->hasFile('images')) {
        $additionalImages = [];
        foreach ($request->file('images') as $image) {
          $path = $image->store('warehouses', 'public');
          $additionalImages[] = Storage::url($path);
        }
        $validated['additional_images'] = $additionalImages;
      }

      // Remove the image and images from validated data as they are File objects
      unset($validated['image']);
      unset($validated['images']);

      // Create the warehouse
      Warehouse::create($validated);

      return redirect()->route('admin.warehouses.index')
        ->with('success', 'Warehouse created successfully.');
    } catch (\Exception $e) {
      // Log any errors
      Log::error('Error creating warehouse:', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
      ]);

      return back()->withErrors(['general' => 'An error occurred while creating the warehouse: ' . $e->getMessage()]);
    }
  }

  /**
   * Display the specified warehouse.
   */
  public function show(Warehouse $warehouse)
  {
    // Ensure array fields are initialized
    $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
    foreach ($arrayFields as $field) {
      if (is_null($warehouse->$field)) {
        $warehouse->$field = [];
      }
    }

    return Inertia::render('Warehouse/Show', [
      'warehouse' => $warehouse
    ]);
  }

  /**
   * Show the form for editing the specified warehouse.
   */
  public function edit(Warehouse $warehouse)
  {
    // Ensure array fields are initialized
    $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
    foreach ($arrayFields as $field) {
      if (is_null($warehouse->$field)) {
        $warehouse->$field = [];
      }
    }

    return Inertia::render('Warehouse/Edit', [
      'warehouse' => $warehouse
    ]);
  }

  /**
   * Update the specified warehouse in the database.
   */
  public function update(Request $request, Warehouse $warehouse)
  {
    try {
      // Log the request data for debugging
      Log::info('Update warehouse request data:', $request->all());

      // Validate the warehouse data
      $validated = $this->validateWarehouse($request);

      // Process array fields
      if (isset($validated['features']) && is_string($validated['features'])) {
        $validated['features'] = explode(',', $validated['features']);
      }

      if (isset($validated['video_urls']) && is_string($validated['video_urls'])) {
        $validated['video_urls'] = explode(',', $validated['video_urls']);
      }

      if (isset($validated['security_features']) && is_string($validated['security_features'])) {
        $validated['security_features'] = explode(',', $validated['security_features']);
      }

      if (isset($validated['utilities']) && is_string($validated['utilities'])) {
        $validated['utilities'] = explode(',', $validated['utilities']);
      }

      if (isset($validated['certificates']) && is_string($validated['certificates'])) {
        $validated['certificates'] = explode(',', $validated['certificates']);
      }

      // Ensure empty arrays are properly handled
      $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
      foreach ($arrayFields as $field) {
        if (!isset($validated[$field]) || (is_array($validated[$field]) && empty($validated[$field]))) {
          $validated[$field] = [];
        }
      }

      // Handle main image upload
      if ($request->hasFile('image')) {
        // Delete old image if exists
        if ($warehouse->image_path) {
          $oldPath = str_replace('/storage/', '', $warehouse->image_path);
          Storage::disk('public')->delete($oldPath);
        }

        $path = $request->file('image')->store('warehouses', 'public');
        $validated['image_path'] = Storage::url($path);
      }

      // Handle additional images
      if ($request->hasFile('images')) {
        // Delete old additional images if they exist
        if (!empty($warehouse->additional_images)) {
          foreach ($warehouse->additional_images as $oldImage) {
            $oldPath = str_replace('/storage/', '', $oldImage);
            Storage::disk('public')->delete($oldPath);
          }
        }

        $additionalImages = [];
        foreach ($request->file('images') as $image) {
          $path = $image->store('warehouses', 'public');
          $additionalImages[] = Storage::url($path);
        }
        $validated['additional_images'] = $additionalImages;
      }

      // Remove the image and images from validated data as they are File objects
      unset($validated['image']);
      unset($validated['images']);

      // Update the warehouse
      $warehouse->update($validated);

      return redirect()->route('admin.warehouses.index')
        ->with('success', 'Warehouse updated successfully.');
    } catch (\Exception $e) {
      // Log any errors
      Log::error('Error updating warehouse:', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
      ]);

      return back()->withErrors(['general' => 'An error occurred while updating the warehouse: ' . $e->getMessage()]);
    }
  }

  /**
   * Remove the specified warehouse from the database.
   */
  public function destroy(Warehouse $warehouse)
  {
    $warehouse->delete();

    return redirect()->route('admin.warehouses.index')
      ->with('success', 'Warehouse deleted successfully.');
  }

  /**
   * Validate the warehouse data.
   */
  private function validateWarehouse(Request $request)
  {
    return $request->validate([
      'name' => 'required|string|max:255',
      'location' => 'required|string|max:255',
      'status' => 'required|in:active,leased,under_maintenance,coming_soon,inactive',
      'capacity' => 'nullable|string|max:255',
      'occupied' => 'nullable|string|max:255',
      'occupancy_rate' => 'nullable|numeric|min:0|max:100',
      'type' => 'nullable|string|max:255',
      'last_inspection' => 'nullable|date',
      'revenue' => 'nullable|string|max:255',
      'alerts' => 'nullable|integer|min:0',
      'description' => 'nullable|string',
      'construction' => 'nullable|string',
      'year_built' => 'nullable|string|max:255',
      'price' => 'nullable|string|max:255',
      'total_area' => 'nullable|string|max:255',
      'unit_of_measurement' => 'nullable|string|max:10',
      'has_video' => 'nullable|boolean',
      'video_urls' => 'nullable',
      'features' => 'nullable',
      'main_hall_dimensions' => 'nullable|string|max:255',
      'main_hall_area' => 'nullable|string|max:255',
      'office_space_dimensions' => 'nullable|string|max:255',
      'office_space_area' => 'nullable|string|max:255',
      'loading_dock_dimensions' => 'nullable|string|max:255',
      'loading_dock_area' => 'nullable|string|max:255',
      'category' => 'nullable|string|max:255',
      'ceiling_height' => 'nullable|string|max:255',
      'floor_load_capacity' => 'nullable|string|max:255',
      'number_of_loading_docks' => 'nullable|integer|min:0',
      'parking_spaces' => 'nullable|integer|min:0',
      'security_features' => 'nullable',
      'utilities' => 'nullable',
      'certificates' => 'nullable',
      'availability_date' => 'nullable|date',
      'lease_terms' => 'nullable|string|max:255',
      'contact_person' => 'nullable|string|max:255',
      'contact_email' => 'nullable|string|email|max:255',
      'contact_phone' => 'nullable|string|max:255',
      'address' => 'nullable|string|max:255',
      'postal_code' => 'nullable|string|max:50',
      'city' => 'nullable|string|max:255',
      'country' => 'nullable|string|max:255',
      'latitude' => 'nullable|string|max:255',
      'longitude' => 'nullable|string|max:255',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
      'images' => 'nullable|array',
      'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
    ]);
  }

  /**
   * Calculate the average occupancy rate of all warehouses.
   */
  private function calculateAverageOccupancyRate($warehouses)
  {
    if ($warehouses->isEmpty()) {
      return 0;
    }

    return round($warehouses->avg('occupancy_rate'));
  }

  /**
   * Format the total capacity of all warehouses.
   */
  private function formatTotalCapacity($warehouses)
  {
    // This is a simplification - in a real app, you'd need to parse and sum the capacities
    return number_format($warehouses->count() * 10000) . ' m²';
  }

  /**
   * Format the total revenue of all warehouses.
   */
  private function formatTotalRevenue($warehouses)
  {
    // This is a simplification - in a real app, you'd need to parse and sum the revenues
    return '$' . number_format($warehouses->count() * 25000);
  }

  /**
   * Get recent activity data.
   */
  private function getRecentActivity()
  {
    // In a real application, this would be fetched from an activity log
    return [
      ['id' => 1, 'action' => 'New warehouse added', 'warehouse' => 'East Regional Hub', 'time' => '2 hours ago', 'type' => 'success'],
      ['id' => 2, 'action' => 'Maintenance scheduled', 'warehouse' => 'South Processing Facility', 'time' => '4 hours ago', 'type' => 'warning'],
      ['id' => 3, 'action' => 'Inspection completed', 'warehouse' => 'North Logistics Center', 'time' => '1 day ago', 'type' => 'success'],
      ['id' => 4, 'action' => 'Capacity threshold reached', 'warehouse' => 'Central Distribution Hub', 'time' => '2 days ago', 'type' => 'alert'],
    ];
  }

  /**
   * Get featured warehouses for the public frontend.
   */
  public function featured()
  {
    try {
      // Get warehouses with 'active' status
      $warehouses = Warehouse::where('status', 'active')->get();

      // Ensure array fields are initialized for each warehouse
      $warehouses->each(function ($warehouse) {
        $arrayFields = ['features', 'video_urls', 'security_features', 'utilities', 'certificates'];
        foreach ($arrayFields as $field) {
          if (is_null($warehouse->$field)) {
            $warehouse->$field = [];
          }
        }
      });

      // Transform warehouses into the format expected by the frontend
      $formattedWarehouses = $warehouses->map(function ($warehouse) {
        // Extract the main hall dimensions if available
        $specifications = [];
        if ($warehouse->main_hall_dimensions && $warehouse->main_hall_area) {
          $specifications[] = [
            'name' => 'Main Hall',
            'dimensions' => $warehouse->main_hall_dimensions,
            'area' => $warehouse->main_hall_area . ' ' . $warehouse->unit_of_measurement
          ];
        }

        if ($warehouse->office_space_dimensions && $warehouse->office_space_area) {
          $specifications[] = [
            'name' => 'Office Space',
            'dimensions' => $warehouse->office_space_dimensions,
            'area' => $warehouse->office_space_area . ' ' . $warehouse->unit_of_measurement
          ];
        }

        if ($warehouse->loading_dock_dimensions && $warehouse->loading_dock_area) {
          $specifications[] = [
            'name' => 'Loading Dock',
            'dimensions' => $warehouse->loading_dock_dimensions,
            'area' => $warehouse->loading_dock_area . ' ' . $warehouse->unit_of_measurement
          ];
        }

        // If no specifications were added, add a generic one with the total area
        if (empty($specifications) && $warehouse->total_area) {
          $specifications[] = [
            'name' => 'Warehouse',
            'dimensions' => 'Not specified',
            'area' => $warehouse->total_area . ' ' . $warehouse->unit_of_measurement
          ];
        }

        return [
          'id' => $warehouse->id,
          'title' => $warehouse->name,
          'status' => strtoupper($warehouse->status),
          'type' => 'warehouses', // Default type
          'category' => $warehouse->category ?: 'Industrial Warehouses',
          'construction' => $warehouse->construction ?: 'Not specified',
          'image' => 'https://www.tradingbv.com/wp-content/uploads/2024/06/20240523_101558000_iOS-2048x1152.jpg', // Default image
          'specifications' => $specifications,
          'totalArea' => $warehouse->total_area . ' ' . $warehouse->unit_of_measurement,
          'hasVideo' => $warehouse->has_video,
          'videoUrls' => $warehouse->video_urls,
          'featured' => true,
          'year_built' => $warehouse->year_built,
          'location' => $warehouse->location,
          'description' => $warehouse->description,
        ];
      });

      return [
        'warehouses' => $formattedWarehouses
      ];
    } catch (\Exception $e) {
      Log::error('Error fetching featured warehouses:', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
      ]);

      return response()->json([
        'error' => 'Failed to fetch featured warehouses',
        'message' => $e->getMessage()
      ], 500);
    }
  }
}
