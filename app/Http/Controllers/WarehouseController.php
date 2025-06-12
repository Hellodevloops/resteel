<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
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

    // Ensure features and video_urls are arrays for each warehouse
    $warehouses->each(function ($warehouse) {
      if (is_null($warehouse->features)) {
        $warehouse->features = [];
      }

      if (is_null($warehouse->video_urls)) {
        $warehouse->video_urls = [];
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
    $validated = $this->validateWarehouse($request);

    if (isset($validated['features']) && is_string($validated['features'])) {
      $validated['features'] = explode(',', $validated['features']);
    }

    if (isset($validated['video_urls']) && is_string($validated['video_urls'])) {
      $validated['video_urls'] = explode(',', $validated['video_urls']);
    }

    Warehouse::create($validated);

    return redirect()->route('admin.warehouses.index')
      ->with('success', 'Warehouse created successfully.');
  }

  /**
   * Display the specified warehouse.
   */
  public function show(Warehouse $warehouse)
  {
    // Ensure features and video_urls are arrays
    if (is_null($warehouse->features)) {
      $warehouse->features = [];
    }

    if (is_null($warehouse->video_urls)) {
      $warehouse->video_urls = [];
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
    // Ensure features and video_urls are arrays
    if (is_null($warehouse->features)) {
      $warehouse->features = [];
    }

    if (is_null($warehouse->video_urls)) {
      $warehouse->video_urls = [];
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
    $validated = $this->validateWarehouse($request);

    if (isset($validated['features']) && is_string($validated['features'])) {
      $validated['features'] = explode(',', $validated['features']);
    }

    if (isset($validated['video_urls']) && is_string($validated['video_urls'])) {
      $validated['video_urls'] = explode(',', $validated['video_urls']);
    }

    $warehouse->update($validated);

    return redirect()->route('admin.warehouses.index')
      ->with('success', 'Warehouse updated successfully.');
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
      'status' => 'required|in:active,maintenance,inactive',
      'capacity' => 'nullable|string|max:255',
      'occupied' => 'nullable|string|max:255',
      'occupancy_rate' => 'nullable|integer|min:0|max:100',
      'type' => 'nullable|string|max:255',
      'last_inspection' => 'nullable|date',
      'revenue' => 'nullable|string|max:255',
      'alerts' => 'nullable|integer|min:0',
      'description' => 'nullable|string',
      'construction' => 'nullable|string',
      'year_built' => 'nullable|string|max:255',
      'price' => 'nullable|string|max:255',
      'total_area' => 'nullable|string|max:255',
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
}
