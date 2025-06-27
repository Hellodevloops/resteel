import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/webshop';
import { usePage } from '@inertiajs/react';
import { Filter, Search, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import Layout from './Layout';

const steelBlue = '#0076A8';
const charcoal = '#3C3F48';

type Filters = {
    search?: string;
    status?: string;
    sort?: string;
};

const WebShop = () => {
    const { t } = useTranslation();
    const { products = [], filters = {} } = usePage().props as {
        products: Product[];
        filters: Filters;
    };

    // Cart context
    const { addToCart } = useCart();

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [contactForm, setContactForm] = useState<{ isOpen: boolean; productName: string }>({ isOpen: false, productName: '' });

    const allCategories = Array.from(new Set(products.flatMap((p) => (p.category ? [p.category] : []))));

    const categories = [
        { id: 'all', name: t('all_products'), count: products.length },
        ...allCategories.map((cat) => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
            count: products.filter((p) => p.category === cat).length,
        })),
    ];

    const normalizedProducts = products.map((product) => ({
        ...product,
        inStock: typeof product.inStock === 'boolean' ? product.inStock : product.status ? product.status === 'inStock' : true,
    }));

    const filteredProducts = normalizedProducts.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedProducts = filteredProducts;

    const openContactForm = (productName: string) => {
        setContactForm({ isOpen: true, productName });
    };

    const closeContactForm = () => {
        setContactForm({ isOpen: false, productName: '' });
    };

    // Updated handleAddToCart function to use cart context
    const handleAddToCart = (product: Product, quantity: number = 1) => {
        try {
            addToCart(product, 'webshop', quantity);
            // Show success message (you can replace this with a toast notification)
            // alert(`${product.name} added to cart successfully!`);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    return (
        <Layout title={`${t('webshop')} | Resteel`}>
            <main className="flex-grow">
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 py-18">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: charcoal }}>
                                {t('premium_structures')}
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">{t('webshop_subtitle')}</p>
                        </div>

                        <div className="mb-8 flex flex-col items-center justify-between gap-4 lg:flex-row">
                            <div className="relative w-72">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder={t('search_products_placeholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="lg:hidden">
                                            <Filter className="mr-2 h-4 w-4" /> {t('filters')}
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                        <SheetHeader>
                                            <SheetTitle>{t('categories')}</SheetTitle>
                                        </SheetHeader>
                                        <div className="mt-6 space-y-2">
                                            {categories.map((category) => (
                                                <Button
                                                    key={category.id}
                                                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                                                    className="w-full justify-between"
                                                    onClick={() => setSelectedCategory(category.id)}
                                                >
                                                    {category.name}
                                                    <Badge variant="secondary">{category.count}</Badge>
                                                </Button>
                                            ))}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            <div className="hidden lg:block">
                                <div className="space-y-2 rounded-xl border bg-white p-4">
                                    <h3 className="text-lg font-semibold" style={{ color: charcoal }}>
                                        {t('categories')}
                                    </h3>
                                    {categories.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant={selectedCategory === category.id ? 'default' : 'ghost'}
                                            className="w-full justify-between"
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            {category.name}
                                            <Badge className="bg-white text-gray-800">{category.count}</Badge>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 lg:col-span-3">
                                {sortedProducts.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <div className="mb-6 text-8xl opacity-50">🔍</div>
                                        <h3 className="mb-3 text-2xl font-bold" style={{ color: charcoal }}>
                                            {t('no_products_found')}
                                        </h3>
                                        <p className="mx-auto max-w-md text-gray-500">{t('search_criteria_no_match')}</p>
                                    </div>
                                ) : (
                                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                                        {/* Render actual products from backend */}
                                        {sortedProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex flex-col space-y-4 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg"
                                            >
                                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-4xl text-gray-400">🏗️</div>
                                                    )}
                                                    <div className="absolute top-2 left-2">
                                                        <Badge
                                                            className={
                                                                product.inStock
                                                                    ? 'border-green-200 bg-green-100 text-green-800'
                                                                    : 'border-red-200 bg-red-100 text-red-800'
                                                            }
                                                        >
                                                            {product.inStock ? t('in_stock') : t('out_of_stock')}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="line-clamp-1 text-lg font-bold text-gray-800">{product.name}</h3>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.features?.slice(0, 2).map((feature, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-700"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col justify-between gap-3 pt-2">
                                                        <span className="text-xl font-bold" style={{ color: steelBlue }}>
                                                            €{typeof product.price === 'string' ? product.price : product.price.toFixed(2)}
                                                        </span>
                                                        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => openContactForm(product.name)}
                                                                className="flex-1 rounded-xl border-gray-300 transition-colors hover:border-gray-400"
                                                            >
                                                                {t('contact_us')}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleAddToCart(product)}
                                                                disabled={!product.inStock}
                                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-0 font-medium text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-0"
                                                                style={{
                                                                    background: product.inStock
                                                                        ? `linear-gradient(135deg, ${steelBlue} 0%, #005A85 100%)`
                                                                        : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                                                                }}
                                                            >
                                                                <ShoppingCart className="h-4 w-4 flex-shrink-0" />
                                                                <span className="truncate">
                                                                    {product.inStock ? t('add_to_cart') : t('out_of_stock')}
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog open={contactForm.isOpen} onOpenChange={(open) => !open && closeContactForm()}>
                    {/* <DialogContent className=""> */}
                    <DialogHeader>
                        {/* <DialogTitle>{t('get_in_touch')}</DialogTitle> */}
                        {/* <p className="text-sm text-gray-600">{t('we_d_love_to_hear_from_you')}</p> */}
                    </DialogHeader>
                    <ContactForm isOpen={contactForm.isOpen} onClose={closeContactForm} productName={contactForm.productName} />
                    {/* </DialogContent> */}
                </Dialog>
            </main>
        </Layout>
    );
};

export default WebShop;
