import { Warehouse } from '@/types/warehouse';
import { Product } from '@/types/webshop';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Enhanced cart item interface that supports both warehouse and webshop items
export interface CartItem {
    id: string; // Composite ID: `${source}-${originalId}`
    originalId: number; // Original item ID
    name: string;
    price: number;
    quantity: number;
    image: string | null;
    inStock: boolean;
    category: string;
    source: 'warehouse' | 'webshop'; // Source indication
    specifications?: string; // For warehouses: dimensions, for products: features summary
    description?: string;
    // Source-specific data
    warehouseData?: Warehouse;
    productData?: Product;
}

// Cart context interface
export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Warehouse | Product, source: 'warehouse' | 'webshop', quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, newQuantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
    getCartSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

// Function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    try {
        if (typeof window === 'undefined') return []; // SSR check
        const savedCart = localStorage.getItem('resteel-cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Validate that parsedCart is an array
            if (Array.isArray(parsedCart)) {
                console.log('📦 Cart loaded from localStorage:', parsedCart.length, 'items');
                return parsedCart;
            }
        } else {
            console.log('📦 No cart found in localStorage, starting with empty cart');
        }
    } catch (error) {
        console.error('❌ Failed to load cart from localStorage:', error);
    }
    return [];
};

// Function to save cart to localStorage
const saveCartToStorage = (cartItems: CartItem[]) => {
    try {
        if (typeof window === 'undefined') return; // SSR check
        localStorage.setItem('resteel-cart', JSON.stringify(cartItems));
        console.log('💾 Cart saved to localStorage:', cartItems.length, 'items');
    } catch (error) {
        console.error('❌ Failed to save cart to localStorage:', error);
    }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Initialize cart with data from localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartFromStorage());
    const isInitialMount = useRef(true);

    // Save cart to localStorage whenever cartItems change (but not on initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            saveCartToStorage(cartItems);
        }
    }, [cartItems]);

    // Convert warehouse to cart item
    const warehouseToCartItem = useCallback((warehouse: Warehouse, quantity: number = 1): CartItem => {
        return {
            id: `warehouse-${warehouse.id}`,
            originalId: warehouse.id!,
            name: warehouse.name,
            price: parseFloat(warehouse.price) || 0,
            quantity,
            image: warehouse.image_path || '/assets/industrial-shed.webp',
            inStock: warehouse.status === 'active' || warehouse.status === 'leased',
            category: warehouse.category || 'Warehouse',
            source: 'warehouse',
            specifications: `${warehouse.total_area} • ${warehouse.location}`,
            description: warehouse.description,
            warehouseData: warehouse,
        };
    }, []);

    // Convert webshop product to cart item
    const productToCartItem = useCallback((product: Product, quantity: number = 1): CartItem => {
        return {
            id: `webshop-${product.id}`,
            originalId: product.id!,
            name: product.name,
            price: parseFloat(product.price as string) || 0,
            quantity,
            image: product.image || '/assets/industrial-shed.webp',
            inStock: product.status === 'inStock',
            category: 'Product',
            source: 'webshop',
            specifications: product.features?.slice(0, 2).join(' • ') || 'High-quality product',
            description: product.description,
            productData: product,
        };
    }, []);

    // Add item to cart
    const addToCart = useCallback(
        (item: Warehouse | Product, source: 'warehouse' | 'webshop', quantity: number = 1) => {
            const cartItem = source === 'warehouse' ? warehouseToCartItem(item as Warehouse, quantity) : productToCartItem(item as Product, quantity);

            setCartItems((prev) => {
                const existingItemIndex = prev.findIndex((existingItem) => existingItem.id === cartItem.id);

                if (existingItemIndex >= 0) {
                    // Update quantity if item already exists
                    const updatedItems = [...prev];
                    updatedItems[existingItemIndex].quantity += quantity;
                    console.log('🔄 Updated existing item in cart:', cartItem.name, 'new quantity:', updatedItems[existingItemIndex].quantity);
                    return updatedItems;
                } else {
                    // Add new item
                    console.log('➕ Added new item to cart:', cartItem.name, 'quantity:', quantity);
                    return [...prev, cartItem];
                }
            });
        },
        [warehouseToCartItem, productToCartItem],
    );

    // Update quantity of existing item
    const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    }, []);

    // Remove item from cart
    const removeFromCart = useCallback((itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    }, []);

    // Clear entire cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate cart subtotal
    const getCartSubtotal = useCallback(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    // Calculate cart total (including tax and shipping)
    const getCartTotal = useCallback(() => {
        const subtotal = getCartSubtotal();
        const tax = subtotal * 0.08;
        const shipping = subtotal > 500 ? 0 : 49.99;
        return subtotal + tax + shipping;
    }, [getCartSubtotal]);

    // Get total number of items in cart
    const getCartItemsCount = useCallback(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getCartSubtotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Helper functions for converting items to cart items (can be used outside context)
export const useCartHelpers = () => {
    const warehouseToCartItem = (warehouse: Warehouse, quantity: number = 1): CartItem => {
        return {
            id: `warehouse-${warehouse.id}`,
            originalId: warehouse.id!,
            name: warehouse.name,
            price: parseFloat(warehouse.price) || 0,
            quantity,
            image: warehouse.image_path || '/assets/industrial-shed.webp',
            inStock: warehouse.status === 'active' || warehouse.status === 'leased',
            category: warehouse.category || 'Warehouse',
            source: 'warehouse',
            specifications: `${warehouse.total_area} • ${warehouse.location}`,
            description: warehouse.description,
            warehouseData: warehouse,
        };
    };

    const productToCartItem = (product: Product, quantity: number = 1): CartItem => {
        return {
            id: `webshop-${product.id}`,
            originalId: product.id!,
            name: product.name,
            price: parseFloat(product.price as string) || 0,
            quantity,
            image: product.image || '/assets/industrial-shed.webp',
            inStock: product.status === 'inStock',
            category: 'Product',
            source: 'webshop',
            specifications: product.features?.slice(0, 2).join(' • ') || 'High-quality product',
            description: product.description,
            productData: product,
        };
    };

    return { warehouseToCartItem, productToCartItem };
};
