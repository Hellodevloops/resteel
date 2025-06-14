export interface Product {
    id?: number;
    name: string;
    price: string;
    image: string | null;
    description: string;
    rating: string;
    status: 'inStock' | 'soldOut';
    features: string[];
    [key: string]: string | string[] | number | null | undefined | File;
}

export interface ProductFormData extends Omit<Product, 'image'> {
    image: File | null;
} 