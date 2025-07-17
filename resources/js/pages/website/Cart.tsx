// pages/cart.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowRight, Building2, Clock, Minus, Plus, Shield, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const Cart = () => {
    const { t } = useTranslation();
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
            title: t('free_shipping'),
            subtitle: t('free_shipping_subtitle'),
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: t('quality_guarantee'),
            subtitle: t('quality_guarantee_subtitle'),
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: t('fast_processing'),
            subtitle: t('fast_processing_subtitle'),
        },
    ];

    // Handle empty cart state
    if (cartItems.length === 0) {
        return (
            <Layout title={`${t('cart')} | Resteel`}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-25">
                    <div className="container mx-auto px-4 py-12 md:px-6">
                        <div className="mb-12 text-center">
                            <h1 className="mb-4 text-5xl font-extrabold" style={{ color: charcoal }}>
                                {t('shopping')} <span style={{ color: steelBlue }}>{t('cart')}</span>
                            </h1>
                            <div className="mx-auto mb-6 h-1 w-24" style={{ backgroundColor: steelBlue }}></div>
                            <p className="mx-auto max-w-3xl text-xl text-slate-600">{t('cart_empty_subtitle')}</p>
                        </div>

                        <div className="mx-auto max-w-2xl text-center">
                            <div className="rounded-3xl border-2 bg-white p-12 shadow-xl" style={{ borderColor: steelBlue + '30' }}>
                                <div className="mb-8">
                                    <ShoppingBag className="mx-auto h-24 w-24 text-slate-300" />
                                </div>
                                <h2 className="mb-4 text-3xl font-bold" style={{ color: charcoal }}>
                                    {t('cart_empty')}
                                </h2>
                                <p className="mb-8 text-lg text-slate-600">{t('cart_empty_description')}</p>
                                <div className="space-y-4">
                                    <Button
                                        className="w-full rounded-2xl py-4 text-xl font-bold text-white transition-all hover:scale-105"
                                        style={{ backgroundColor: steelBlue }}
                                        onClick={() => (window.location.href = '/warehouses')}
                                    >
                                        <Building2 className="mr-3 h-6 w-6" />
                                        {t('browse_warehouses')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl border-2 py-4 text-xl font-bold transition-all hover:bg-blue-50"
                                        style={{ borderColor: steelBlue, color: steelBlue }}
                                        onClick={() => (window.location.href = '/webshop')}
                                    >
                                        <ShoppingBag className="mr-3 h-6 w-6" />
                                        {t('browse_products')}
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
        <Layout title={`${t('cart')} | Resteel`}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-25">
                <div className="container mx-auto px-4 py-12 md:px-6">
                    {/* Header Section - Centered and Minimalist */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-5xl font-extrabold" style={{ color: charcoal }}>
                            {t('shopping')} <span style={{ color: steelBlue }}>{t('cart')}</span>
                        </h1>
                        <div className="mx-auto mb-6 h-1 w-24" style={{ backgroundColor: steelBlue }}></div>
                        <p className="mx-auto max-w-3xl text-xl text-slate-600">{t('cart_review_subtitle')}</p>
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
                                    {t('your_items')} <span className="text-lg font-normal text-slate-500">({cartItems.length})</span>
                                </h2>
                                {cartItems.length > 0 && (
                                    <Button variant="outline" onClick={clearCart} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                        {t('clear_cart')}
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
                                                                        {item.source === 'warehouse' ? t('warehouse') : t('product')}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Actions & Price */}
                                                <div className="flex flex-col justify-between p-6 lg:w-1/4">
                                                    <div className="mb-4 text-right">
                                                        <div className="text-3xl font-bold" style={{ color: steelBlue }}>
                                                            €{(item.price * item.quantity).toFixed(2)}
                                                        </div>
                                                        <div className="text-sm text-slate-600">
                                                            €{item.price.toFixed(2)} {t('each')}
                                                        </div>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="mb-4 flex items-center justify-center rounded-lg border p-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="mx-3 min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        {t('remove')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="rounded-3xl border-2 bg-white p-8 shadow-xl lg:p-12" style={{ borderColor: steelBlue + '30' }}>
                            <h3 className="mb-8 text-3xl font-bold" style={{ color: charcoal }}>
                                {t('order_summary')}
                            </h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span>{t('subtotal')}</span>
                                    <span>€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t('tax')}</span>
                                    <span>€{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t('shipping')}</span>
                                    <span>{shipping === 0 ? t('free') : `€${shipping.toFixed(2)}`}</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between text-2xl font-bold" style={{ color: steelBlue }}>
                                    <span>{t('total')}</span>
                                    <span>€{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button className="mt-8 w-full rounded-2xl py-6 text-xl font-bold text-white" style={{ backgroundColor: steelBlue }}>
                                {t('proceed_to_checkout')}
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
