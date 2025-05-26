import { ArrowRight, Clock, Minus, Plus, Shield, ShoppingBag, Star, Trash2, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

const Cart = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Steel I-Beam Grade A36',
            specifications: '8" x 6" x 20ft',
            price: 245.5,
            quantity: 3,
            image: '/api/placeholder/120/120',
            inStock: true,
            category: 'Structural Steel',
        },
        {
            id: 2,
            name: 'Reinforcement Bar Bundle',
            specifications: '#4 Rebar, 40ft length',
            price: 89.99,
            quantity: 2,
            image: '/api/placeholder/120/120',
            inStock: true,
            category: 'Reinforcement',
        },
        {
            id: 3,
            name: 'Custom Steel Plate',
            specifications: '1/2" x 24" x 48"',
            price: 156.75,
            quantity: 1,
            image: '/api/placeholder/120/120',
            inStock: false,
            category: 'Custom Fabrication',
        },
        {
            id: 4,
            name: 'Angle Iron L-Bracket',
            specifications: '2" x 2" x 1/4" x 10ft',
            price: 34.2,
            quantity: 5,
            image: '/api/placeholder/120/120',
            inStock: true,
            category: 'Structural Steel',
        },
    ]);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 500 ? 0 : 49.99;
    const total = subtotal + tax + shipping;

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

    return (
        <div className="mt-22 min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-600/10"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 backdrop-blur-sm">
                                <ShoppingBag className="h-6 w-6 text-orange-500" />
                            </div>
                            <h1 className="text-4xl font-bold text-white lg:text-5xl">Your Cart</h1>
                        </div>
                        <p className="max-w-2xl text-xl text-white/80">
                            Review your selected steel products and materials before proceeding to checkout
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div
                            className={`transition-all delay-200 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <div className="shadow-card overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
                                    <h2 className="text-2xl font-bold text-slate-700">Cart Items</h2>
                                    <p className="mt-1 text-slate-600">{cartItems.length} items in your cart</p>
                                </div>

                                <div className="divide-y divide-slate-200">
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`p-6 transition-all duration-500 hover:bg-slate-50 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                                            style={{ transitionDelay: `${400 + index * 100}ms` }}
                                        >
                                            <div className="flex items-start space-x-4">
                                                {/* Product Image */}
                                                <div className="shadow-soft flex h-24 w-24 items-center justify-center rounded-xl border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300">
                                                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800"></div>
                                                </div>

                                                {/* Product Details */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
                                                            <p className="mt-1 text-sm text-slate-600">{item.specifications}</p>
                                                            <div className="mt-2 flex items-center space-x-3">
                                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                                                    {item.category}
                                                                </span>
                                                                {item.inStock ? (
                                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                                                                        In Stock
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">
                                                                        Custom Order
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>

                                                    {/* Quantity and Price */}
                                                    <div className="mt-4 flex items-end justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-sm text-slate-600">Quantity:</span>
                                                            <div className="flex items-center rounded-lg bg-slate-100">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="rounded-l-lg p-2 transition-colors hover:bg-slate-200"
                                                                >
                                                                    <Minus className="h-4 w-4 text-slate-600" />
                                                                </button>
                                                                <span className="px-4 py-2 text-sm font-medium text-slate-800">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="rounded-r-lg p-2 transition-colors hover:bg-slate-200"
                                                                >
                                                                    <Plus className="h-4 w-4 text-slate-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-slate-800">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </div>
                                                            <div className="text-sm text-slate-500">${item.price.toFixed(2)} each</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div
                            className={`transition-all delay-600 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            {/* Benefits */}
                            <div className="shadow-card mb-6 rounded-2xl border border-slate-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-slate-800">Why Choose Resteel?</h3>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">{benefit.title}</div>
                                                <div className="text-sm text-slate-600">{benefit.subtitle}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="shadow-card sticky top-6 rounded-2xl border border-slate-200 bg-white p-6">
                                <h3 className="mb-6 text-lg font-semibold text-slate-800">Order Summary</h3>

                                <div className="mb-6 space-y-4">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {shipping === 0 && (
                                        <div className="flex items-center text-sm text-green-600">
                                            <Star className="mr-1 h-4 w-4" />
                                            Free shipping applied!
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6 border-t border-slate-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-slate-800">Total</span>
                                        <span className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="hover:shadow-glow group flex w-full items-center justify-center space-x-2 rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>

                                <div className="mt-4 text-center">
                                    <p className="text-xs text-slate-500">Secure checkout powered by industry-leading encryption</p>
                                </div>

                                <div className="mt-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                                    <div className="mb-2 flex items-center space-x-2">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium text-blue-800">Need a Quote?</span>
                                    </div>
                                    <p className="mb-3 text-sm text-blue-700">For bulk orders or custom specifications, get a personalized quote.</p>
                                    <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                        Request Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
