export interface AreaDimension {
    name: string;
    dimensions: string;
    area: string;
}

export interface Warehouse {
    id?: number;
    name: string;
    location: string;
    status: 'active' | 'leased' | 'under_maintenance' | 'coming_soon' | 'inactive';
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
    unit_of_measurement: string;
    has_video: boolean;
    video_urls: string[];
    features: string[];
    area_dimensions: AreaDimension[];
    category: string;
    ceiling_height: string;
    floor_load_capacity: string;
    number_of_loading_docks: number;
    parking_spaces: number;
    security_features: string[];
    utilities: string[];
    certificates: string[];
    availability_date: string;
    lease_terms: string;
    contact_person: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    image_path?: string | null;
    additional_images?: string[];
    created_at?: string;
    updated_at?: string;
    [key: string]: string | string[] | number | boolean | null | undefined | File | File[] | AreaDimension[];
}

export interface WarehouseFormData extends Omit<Warehouse, 'image'> {
    image: File | null;
    images: File[];
}
