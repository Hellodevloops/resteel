export interface Warehouse {
    id?: number;
    name: string;
    location: string;
    status: 'active' | 'maintenance' | 'inactive';
    capacity: string;
    occupied: string;
    occupancy_rate: number;
    type: string;
    last_inspection: string;
    revenue: string;
    alerts: number;
    description: string;
    construction: string;
    year_built: string;
    price: string;
    total_area: string;
    has_video: boolean;
    video_urls: string[];
    features: string[];
    main_hall_dimensions: string;
    main_hall_area: string;
    office_space_dimensions: string;
    office_space_area: string;
    loading_dock_dimensions: string;
    loading_dock_area: string;
    category: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: string | string[] | number | boolean | null | undefined | File;
}

export interface WarehouseFormData extends Omit<Warehouse, 'image'> {
    image: File | null;
}
