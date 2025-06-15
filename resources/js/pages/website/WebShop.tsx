import Layout from './Layout';
import ContactForm from './ContactForm';
import { usePage } from '@inertiajs/react';
import {
  Search, Star, Filter, Grid, List,
  Heart, Eye
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<{ isOpen: boolean; productName: string }>({
    isOpen: false,
    productName: ''
  });

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Hero Section */}
          <div className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: charcoal }}>
              Premium Steel Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of high-quality steel products for all your construction needs
            </p>
          </div>

          {/* Search and Controls */}
          <div className={`mb-8 transition-all delay-200 duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search premium steel products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-10 hover:border-gray-300"
                  style={{ 
                    focusBorderColor: steelBlue, 
                    focusRingColor: steelBlue + '1A' 
                  }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    style={{ 
                      backgroundColor: viewMode === 'grid' ? steelBlue : 'transparent' 
                    }}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    style={{ 
                      backgroundColor: viewMode === 'list' ? steelBlue : 'transparent' 
                    }}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className={`lg:col-span-1 transition-all delay-400 duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            } ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-32">
                <div className="rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm p-6 shadow-xl">
                  <h3 className="mb-6 text-xl font-bold flex items-center gap-2" style={{ color: charcoal }}>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: steelBlue }}></div>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full rounded-2xl p-4 text-left transition-all duration-300 group ${
                          selectedCategory === category.id
                            ? 'text-white shadow-2xl scale-105'
                            : 'text-gray-600 hover:bg-gray-50 hover:scale-102'
                        }`}
                        style={{
                          background: selectedCategory === category.id 
                            ? `linear-gradient(135deg, ${steelBlue}, ${charcoal})`
                            : 'transparent'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold" style={{ color: charcoal }}>
                  {selectedCategory === 'all'
                    ? 'All Products'
                    : categories.find((c) => c.id === selectedCategory)?.name}
                  <span className="ml-3 text-lg text-white px-3 py-1 rounded-full" style={{ backgroundColor: steelBlue }}>
                    {sortedProducts.length}
                  </span>
                </h2>
              </div>

              {/* Products */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className={`group relative rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: `${600 + index * 100}ms`,
                        borderColor: hoveredProduct === product.id ? steelBlue : undefined
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 via-white to-gray-50">
                          {product.image ? (
                            <img
                              src={
                                product.image.startsWith('/storage')
                                  ? `${location.origin}${product.image}`
                                  : product.image
                              }
                              alt={product.name}
                              className="h-full w-full object-cover filter group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                              <div className="text-center">
                                <div className="mb-3 text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-500">🏗️</div>
                                <div className="text-sm font-medium">Product Image</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Floating Actions */}
                        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                          hoveredProduct === product.id ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        }`}>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                          </button>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                            <Eye className="h-4 w-4 text-gray-600" style={{ color: steelBlue }} />
                          </button>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                            product.inStock 
                              ? 'bg-emerald-500/90 text-white' 
                              : 'bg-red-500/90 text-white'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <h3 className="text-lg font-bold group-hover:transition-colors line-clamp-2" 
                              style={{ 
                                color: charcoal,
                                ...(hoveredProduct === product.id && { color: steelBlue })
                              }}>
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        
                        <p className="mb-4 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        
                        <div className="mb-6 flex flex-wrap gap-2">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-gray-50 rounded-full border"
                              style={{ 
                                color: steelBlue,
                                borderColor: steelBlue + '30'
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 2 && (
                            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                              +{product.features.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold" style={{ color: charcoal }}>
                            ₹{product.price.toLocaleString()}
                          </div>
                          <button
                            onClick={() => openContactForm(product.name)}
                            disabled={!product.inStock}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform text-white ${
                              product.inStock
                                ? 'shadow-lg hover:scale-105 hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            style={{
                              background: product.inStock 
                                ? `linear-gradient(135deg, ${steelBlue}, ${charcoal})`
                                : undefined
                            }}
                          >
                            {product.inStock ? 'Contact Us' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-4">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`group flex flex-col md:flex-row gap-6 rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all duration-500 hover:shadow-xl ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: `${600 + index * 100}ms`,
                        borderColor: 'rgb(229 231 235)' // default gray-200
                      }}
                    >
                      <div className="w-full md:w-48 h-32 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={
                              product.image.startsWith('/storage')
                                ? `${location.origin}${product.image}`
                                : product.image
                            }
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">🏗️</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-2">
                              <h3 className="text-xl font-bold group-hover:transition-colors" 
                                  style={{ color: charcoal }}>
                                {product.name}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                product.inStock 
                                  ? 'bg-emerald-100 text-emerald-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {product.features.slice(0, 3).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-gray-50 rounded-full"
                                  style={{ color: steelBlue }}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl font-bold" style={{ color: charcoal }}>
                              ₹{product.price.toLocaleString()}
                            </div>
                            <button
                              onClick={() => openContactForm(product.name)}
                              disabled={!product.inStock}
                              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 text-white ${
                                product.inStock
                                  ? 'shadow-lg hover:scale-105 hover:shadow-xl'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                              style={{
                                background: product.inStock 
                                  ? `linear-gradient(135deg, ${steelBlue}, ${charcoal})`
                                  : undefined
                              }}
                            >
                              {product.inStock ? 'Contact Us' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="py-16 text-center">
                  <div className="mb-6 text-8xl opacity-50">🔍</div>
                  <h3 className="mb-3 text-2xl font-bold" style={{ color: charcoal }}>
                    No products found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={contactForm.isOpen}
        onClose={closeContactForm}
        productName={contactForm.productName}
      />
    </Layout>
  );
};

export default WebShop;