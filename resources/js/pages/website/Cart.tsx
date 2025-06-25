// pages/cart.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowRight, Building2, Clock, Minus, Plus, Shield, ShoppingBag, Star, Trash2, Truck } from 'lucide-react';
import Layout from './Layout';

const Cart = () => {
    const steelBlue = '#0076A8';
    const charcoal = '#3C3F48';
    const warehouseColor = '#4CAF50'; // Green for warehouses
    const webshopColor = '#FF9800'; // Orange for webshop products

    // Use cart context instead of local state
    const { cartItems, updateQuantity, removeFromCart, clearCart, getCartSubtotal } = useCart();

    // Calculate totals
    const subtotal = getCartSubtotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 500 ? 0 : 49.99;
    const total = subtotal + tax + shipping;

    // Get source-specific styling
    const getSourceStyling = (source: 'warehouse' | 'webshop') => {
        return source === 'warehouse'
            ? { color: warehouseColor, backgroundColor: warehouseColor + '15' }
            : { color: webshopColor, backgroundColor: webshopColor + '15' };
    };

    // Get source icon
    const getSourceIcon = (source: 'warehouse' | 'webshop') => {
        return source === 'warehouse' ? <Building2 className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />;
    };

    const benefits = [
        {
            icon: <Truck className="h-5 w-5" />,
            title: 'Free Shipping',
            subtitle: 'On orders over $500',
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: 'Quality Guarantee',
            subtitle: 'ISO 9001 certified materials',
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: 'Fast Processing',
            subtitle: 'Ships within 2-3 business days',
        },
    ];

    // Handle empty cart state
    if (cartItems.length === 0) {
        return (
            <Layout title="Your Cart | Resteel">
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-25">
                    <div className="container mx-auto px-4 py-12 md:px-6">
                        <div className="mb-12 text-center">
                            <h1 className="mb-4 text-5xl font-extrabold" style={{ color: charcoal }}>
                                Shopping <span style={{ color: steelBlue }}>Cart</span>
                            </h1>
                            <div className="mx-auto mb-6 h-1 w-24" style={{ backgroundColor: steelBlue }}></div>
                            <p className="mx-auto max-w-3xl text-xl text-slate-600">Your cart is currently empty</p>
                        </div>

                        <div className="mx-auto max-w-2xl text-center">
                            <div className="rounded-3xl border-2 bg-white p-12 shadow-xl" style={{ borderColor: steelBlue + '30' }}>
                                <div className="mb-8">
                                    <ShoppingBag className="mx-auto h-24 w-24 text-slate-300" />
                                </div>
                                <h2 className="mb-4 text-3xl font-bold" style={{ color: charcoal }}>
                                    Your cart is empty
                                </h2>
                                <p className="mb-8 text-lg text-slate-600">Explore our warehouses and products to add items to your cart</p>
                                <div className="space-y-4">
                                    <Button
                                        className="w-full rounded-2xl py-4 text-xl font-bold text-white transition-all hover:scale-105"
                                        style={{ backgroundColor: steelBlue }}
                                        onClick={() => (window.location.href = '/warehouses')}
                                    >
                                        <Building2 className="mr-3 h-6 w-6" />
                                        Browse Warehouses
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl border-2 py-4 text-xl font-bold transition-all hover:bg-blue-50"
                                        style={{ borderColor: steelBlue, color: steelBlue }}
                                        onClick={() => (window.location.href = '/webshop')}
                                    >
                                        <ShoppingBag className="mr-3 h-6 w-6" />
                                        Browse Products
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Your Cart | Resteel">
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-25">
                <div className="container mx-auto px-4 py-12 md:px-6">
                    {/* Header Section - Centered and Minimalist */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-5xl font-extrabold" style={{ color: charcoal }}>
                            Shopping <span style={{ color: steelBlue }}>Cart</span>
                        </h1>
                        <div className="mx-auto mb-6 h-1 w-24" style={{ backgroundColor: steelBlue }}></div>
                        <p className="mx-auto max-w-3xl text-xl text-slate-600">
                            Review your selected warehouses and products before proceeding to checkout
                        </p>
                    </div>

                    {/* Main Content - Horizontal Layout */}
                    <div className="mx-auto max-w-7xl">
                        {/* Top Benefits Bar */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center rounded-2xl border-2 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                                        style={{ borderColor: steelBlue + '20', backgroundColor: steelBlue + '05' }}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                                                style={{ backgroundColor: steelBlue }}
                                            >
                                                {benefit.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className="text-lg font-bold" style={{ color: charcoal }}>
                                                    {benefit.title}
                                                </div>
                                                <div className="text-sm text-slate-600">{benefit.subtitle}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart Items - Horizontal Cards */}
                        <div className="mb-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-3xl font-bold" style={{ color: charcoal }}>
                                    Your Items <span className="text-lg font-normal text-slate-500">({cartItems.length})</span>
                                </h2>
                                {cartItems.length > 0 && (
                                    <Button variant="outline" onClick={clearCart} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                        Clear Cart
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="overflow-hidden border-2 shadow-lg transition-all duration-300 hover:shadow-xl"
                                        style={{ borderColor: steelBlue + '20' }}
                                    >
                                        <CardContent className="p-0">
                                            <div className="flex flex-col lg:flex-row">
                                                {/* Left: Product Image */}
                                                <div
                                                    className="flex items-center justify-center p-6 lg:w-1/4"
                                                    style={{ backgroundColor: steelBlue + '05' }}
                                                >
                                                    <img
                                                        src={item.image || '/assets/industrial-shed.webp'}
                                                        alt={item.name}
                                                        className="h-40 w-full max-w-[200px] rounded-xl border-2 object-cover shadow-md"
                                                        style={{ borderColor: steelBlue + '30' }}
                                                    />
                                                </div>

                                                {/* Center: Product Details */}
                                                <div className="flex flex-col justify-between p-6 lg:w-2/4">
                                                    <div>
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <div>
                                                                <h3 className="mb-2 text-2xl font-bold" style={{ color: charcoal }}>
                                                                    {item.name}
                                                                </h3>
                                                                <p className="mb-4 text-lg text-slate-600">{item.specifications}</p>
                                                                <div className="flex items-center space-x-3">
                                                                    {/* Source Badge */}
                                                                    <Badge
                                                                        className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white"
                                                                        style={getSourceStyling(item.source)}
                                                                    >
                                                                        {getSourceIcon(item.source)}
                                                                        {item.source === 'warehouse' ? 'Warehouse' : 'Product'}
                                                                    </Badge>
                                                                    {/* Category Badge */}
                                                                    <Badge
                                                                        className="px-3 py-1 text-sm font-medium text-white"
                                                                        style={{ backgroundColor: steelBlue }}
                                                                    >
                                                                        {item.category}
                                                                    </Badge>
                                                                    {/* Stock Status Badge */}
                                                                    {item.inStock ? (
                                                                        <Badge
                                                                            variant="default"
                                                                            className="bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                                                                        >
                                                                            ✓ Available
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800"
                                                                        >
                                                                            ⏳ {item.source === 'warehouse' ? 'On Request' : 'Custom Order'}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500"
                                                            >
                                                                <Trash2 className="h-6 w-6" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Quantity and Price */}
                                                <div
                                                    className="flex flex-col items-center justify-center space-y-6 border-l-2 p-6 lg:w-1/4"
                                                    style={{ borderColor: steelBlue + '20', backgroundColor: steelBlue + '02' }}
                                                >
                                                    <div className="text-center">
                                                        <div className="mb-3 text-sm font-medium text-slate-700">Quantity</div>
                                                        <div
                                                            className="flex items-center justify-center overflow-hidden rounded-full border-2"
                                                            style={{ borderColor: steelBlue + '40' }}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="h-12 w-12 rounded-none hover:bg-blue-50"
                                                            >
                                                                <Minus className="h-5 w-5" />
                                                            </Button>
                                                            <div
                                                                className="min-w-[4rem] px-4 py-3 text-center text-xl font-bold"
                                                                style={{ color: steelBlue, backgroundColor: 'white' }}
                                                            >
                                                                {item.quantity}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-12 w-12 rounded-none hover:bg-blue-50"
                                                            >
                                                                <Plus className="h-5 w-5" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <div className="mb-1 text-3xl font-bold" style={{ color: steelBlue }}>
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </div>
                                                        <div className="text-sm text-slate-500">${item.price.toFixed(2)} each</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Section - Order Summary */}
                        <div className="rounded-3xl border-2 bg-white p-8 shadow-xl" style={{ borderColor: steelBlue + '30' }}>
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Left: Order Summary */}
                                <div>
                                    <h3 className="mb-6 text-2xl font-bold" style={{ color: charcoal }}>
                                        Order Summary
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-slate-200 py-3">
                                            <span className="text-lg font-medium text-slate-700">Subtotal ({cartItems.length} items)</span>
                                            <span className="text-lg font-bold text-slate-800">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-slate-200 py-3">
                                            <span className="text-lg font-medium text-slate-700">Tax (8%)</span>
                                            <span className="text-lg font-bold text-slate-800">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-slate-200 py-3">
                                            <span className="text-lg font-medium text-slate-700">Shipping</span>
                                            <span className="text-lg font-bold text-slate-800">
                                                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        {shipping === 0 && (
                                            <div className="flex items-center justify-center py-2 font-medium text-green-600">
                                                <Star className="mr-2 h-5 w-5" />
                                                Free shipping applied!
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between border-t-2 py-6" style={{ borderColor: steelBlue + '40' }}>
                                            <span className="text-2xl font-bold text-slate-800">Total</span>
                                            <span className="text-3xl font-bold" style={{ color: steelBlue }}>
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Checkout Actions */}
                                <div className="flex flex-col justify-center space-y-6">
                                    <Button
                                        className="w-full rounded-2xl py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
                                        style={{ backgroundColor: steelBlue }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005a7a')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = steelBlue)}
                                    >
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight className="ml-3 h-6 w-6" />
                                    </Button>

                                    <div className="text-center">
                                        <p className="mb-4 text-sm text-slate-500">🔒 Secure checkout powered by industry-leading encryption</p>
                                    </div>

                                    {/* Quote Section */}
                                    <div
                                        className="rounded-2xl border-2 p-6 text-center"
                                        style={{ borderColor: steelBlue + '30', backgroundColor: steelBlue + '05' }}
                                    >
                                        <div className="mb-4 flex items-center justify-center space-x-2">
                                            <Shield className="h-6 w-6" style={{ color: steelBlue }} />
                                            <span className="text-xl font-bold" style={{ color: steelBlue }}>
                                                Need a Quote?
                                            </span>
                                        </div>
                                        <p className="mb-6 text-slate-700">For bulk orders or custom specifications, get a personalized quote.</p>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-xl border-2 py-3 text-lg font-medium transition-all hover:bg-blue-50"
                                            style={{ borderColor: steelBlue, color: steelBlue }}
                                        >
                                            Request Quote
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
