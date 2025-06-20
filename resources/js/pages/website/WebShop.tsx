import Layout from './Layout';
import ContactForm from './ContactForm';
import { usePage } from '@inertiajs/react';
import {
  Search, Star, Filter, Grid, List,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const steelBlue = '#0076A8';
const charcoal = '#3C3F48';

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description: string;
  rating: number;
  status?: string;
  inStock?: boolean;
  features: string[];
};

type Filters = {
  search?: string;
  status?: string;
  sort?: string;
};

const WebShop = () => {
  const { products = [], filters = {} } = usePage().props as {
    products: Product[];
    filters: Filters;
  };

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<{ isOpen: boolean; productName: string }>({ isOpen: false, productName: '' });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const allCategories = Array.from(
    new Set(products.flatMap((p) => (p.category ? [p.category] : [])))
  );

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...allCategories.map((cat) => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
      count: products.filter((p) => p.category === cat).length,
    })),
  ];

  const normalizedProducts = products.map((product) => ({
    ...product,
    inStock:
      typeof product.inStock === 'boolean'
        ? product.inStock
        : product.status
        ? product.status === 'inStock'
        : true,
  }));

  const filteredProducts = normalizedProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = filteredProducts;

  const openContactForm = (productName: string) => {
    setContactForm({ isOpen: true, productName });
  };

  const closeContactForm = () => {
    setContactForm({ isOpen: false, productName: '' });
  };

  return (
    <Layout title="Webshop | Resteel">
      <main className="flex-grow">
      <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 py-18">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: charcoal }}>
              Premium Structures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of high-quality steel products for all your construction needs
            </p>
          </div>

          <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search premium steel products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
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

              <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as 'grid' | 'list')}>
                <TabsList>
                  <TabsTrigger value="grid"><Grid className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <div className="rounded-xl border p-4 bg-white space-y-2">
                <h3 className="font-semibold text-lg" style={{ color: charcoal }}>Categories</h3>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <Badge className="bg-white text-gray-800">{category.count}</Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mb-6 text-8xl opacity-50">🔍</div>
                  <h3 className="mb-3 text-2xl font-bold" style={{ color: charcoal }}>
                    No products found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any products matching your search criteria.
                  </p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={viewMode === 'grid'
                        ? "rounded-xl border bg-white shadow-sm p-4 flex flex-col space-y-4"
                        : "flex flex-col sm:flex-row items-stretch gap-4 rounded-xl border bg-white shadow-sm p-4 transition hover:shadow-md"
                      }
                    >
                      <div className={viewMode === 'grid'
                        ? "relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden"
                        : "sm:w-48 w-full flex-shrink-0 aspect-video sm:aspect-square rounded-lg overflow-hidden bg-gray-100"
                      }>
                        {product.image ? (
                          <img
                            src={product.image.startsWith('/storage') ? `${location.origin}${product.image}` : product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-4xl">🏗️</div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Badge variant={product.inStock ? "success" : "destructive"}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} variant="outline" className="text-xs border border-1 border-gray-600 p-1 rounded  ">{feature}</span>
                          ))}
                          {product.features.length > 3 && (
                            <span variant="secondary" className="text-xs border border-1 border-gray-600 p-1 rounded ">+{product.features.length - 3}</span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xl font-bold text-gray-800">€{product.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2">
                            {/* <Badge variant={product.inStock ? "success" : "destructive"}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge> */}
                            <Button
                              size="sm"
                              onClick={() => openContactForm(product.name)}
                              disabled={!product.inStock}
                              className="rounded-xl"
                            >
                              {product.inStock ? 'Contact Us' : 'Out of Stock'}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Us About: {contactForm.productName}</DialogTitle>
          </DialogHeader>
          <ContactForm
            isOpen={contactForm.isOpen}
            onClose={closeContactForm}
            productName={contactForm.productName}
          />
        </DialogContent>
      </Dialog>
      </main>
    </Layout>
  );
};

export default WebShop;
