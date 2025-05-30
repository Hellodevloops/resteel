// import {
//     CheckCircle,
//     DollarSign,
//     FileText,
//     Image,
//     Package,
//     Plus,
//     Save,
//     Star,
//     Tag,
//     Search,
//     Filter,
//     Eye,
//     Settings,
//     TrendingUp,
//     Building,
//     Activity,
//     BarChart3,
//     AlertTriangle,
//     Clock,
//     Zap
// } from 'lucide-react';
// import { useState, useEffect } from 'react';

// const WebShopDashboard = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [selectedView, setSelectedView] = useState('overview');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterCategory, setFilterCategory] = useState('all');
//     const [showAddForm, setShowAddForm] = useState(false);

//     const [formData, setFormData] = useState({
//         name: '',
//         price: '',
//         image: '',
//         category: 'insulated',
//         description: '',
//         rating: 5.0,
//         inStock: true,
//         features: [''],
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         setTimeout(() => setIsVisible(true), 100);
//     }, []);

//     const categories = [
//         { id: 'insulated', name: 'Insulated Buildings' },
//         { id: 'non-insulated', name: 'Non-Insulated' },
//         { id: 'workshop', name: 'Workshops' },
//         { id: 'garage', name: 'Garages' },
//         { id: 'agricultural', name: 'Agricultural' },
//     ];

//     // Sample data - would come from props in real app
//     const webShopData = {
//         overview: {
//             totalProducts: 24,
//             activeProducts: 22,
//             totalRevenue: '€2,845,600',
//             averageRating: 4.8,
//             monthlyOrders: 156,
//             growthRate: 18.5,
//         },
//         products: [
//             {
//                 id: 1,
//                 name: 'Storage Building 6m x 12m Insulated',
//                 price: '€26,995.00',
//                 category: 'insulated',
//                 rating: 4.9,
//                 inStock: true,
//                 image: '/assets/product-1.webp',
//                 description: 'Complete building package with premium insulation for temperature control.',
//                 features: ['Premium Insulation', 'Steel Frame', 'Weather Resistant'],
//                 orders: 23,
//                 revenue: '€620,785'
//             },
//             {
//                 id: 2,
//                 name: 'Workshop Building 8m x 15m',
//                 price: '€34,500.00',
//                 category: 'workshop',
//                 rating: 4.7,
//                 inStock: true,
//                 image: '/assets/product-2.webp',
//                 description: 'Professional workshop space with high-quality construction.',
//                 features: ['Large Space', 'Industrial Grade', 'Ventilation System'],
//                 orders: 18,
//                 revenue: '€621,000'
//             },
//             {
//                 id: 3,
//                 name: 'Agricultural Storage 10m x 20m',
//                 price: '€42,000.00',
//                 category: 'agricultural',
//                 rating: 4.8,
//                 inStock: false,
//                 image: '/assets/product-3.webp',
//                 description: 'Heavy-duty agricultural storage with reinforced structure.',
//                 features: ['Heavy Duty', 'Large Capacity', 'Weather Protection'],
//                 orders: 12,
//                 revenue: '€504,000'
//             },
//             {
//                 id: 4,
//                 name: 'Garage Building 4m x 8m',
//                 price: '€18,500.00',
//                 category: 'garage',
//                 rating: 4.6,
//                 inStock: true,
//                 image: '/assets/product-4.webp',
//                 description: 'Compact garage solution for residential use.',
//                 features: ['Compact Design', 'Easy Assembly', 'Durable Materials'],
//                 orders: 31,
//                 revenue: '€573,500'
//             }
//         ],
//         recentActivity: [
//             { id: 1, action: 'New order received', product: 'Storage Building 6m x 12m', time: '1 hour ago', type: 'success' },
//             { id: 2, action: 'Product out of stock', product: 'Agricultural Storage 10m x 20m', time: '3 hours ago', type: 'alert' },
//             { id: 3, action: 'Price updated', product: 'Workshop Building 8m x 15m', time: '5 hours ago', type: 'warning' },
//             { id: 4, action: 'New product added', product: 'Garage Building 4m x 8m', time: '1 day ago', type: 'success' },
//         ]
//     };

//     const filteredProducts = webShopData.products.filter((product) => {
//         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesFilter = filterCategory === 'all' || product.category === filterCategory;
//         return matchesSearch && matchesFilter;
//     });

//     const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
//         <div
//             className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
//                 isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`}
//         >
//             <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                     <p className="mb-2 text-sm font-medium text-white/80">{title}</p>
//                     <p className="mb-1 text-3xl font-bold">{value}</p>
//                     <p className="text-sm text-white/90">{subtitle}</p>
//                     {trend && (
//                         <div className="mt-2 flex items-center">
//                             <TrendingUp className="mr-1 h-4 w-4" />
//                             <span className="text-sm">+{trend}% this month</span>
//                         </div>
//                     )}
//                 </div>
//                 <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
//                     <Icon className="h-6 w-6" />
//                 </div>
//             </div>
//             <div className="absolute -right-2 -bottom-2 h-20 w-20 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110"></div>
//         </div>
//     );

//     const ProductCard = ({ product, index }) => (
//         <div
//             className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10 ${
//                 isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
//             }`}
//             style={{ animationDelay: `${index * 100}ms` }}
//         >
//             {/* Stock Status Indicator */}
//             <div className="absolute top-4 right-4 z-10">
//                 <div
//                     className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
//                         product.inStock
//                             ? 'bg-green-100 text-green-700'
//                             : 'bg-red-100 text-red-700'
//                     }`}
//                 >
//                     <div
//                         className={`mr-2 h-2 w-2 rounded-full ${
//                             product.inStock
//                                 ? 'animate-pulse bg-green-500'
//                                 : 'bg-red-500'
//                         }`}
//                     ></div>
//                     {product.inStock ? 'In Stock' : 'Out of Stock'}
//                 </div>
//             </div>

//             <div className="p-6">
//                 {/* Header */}
//                 <div className="mb-4">
//                     <h3 className="mb-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-500">{product.name}</h3>
//                     <div className="flex items-center justify-between">
//                         <span className="text-2xl font-bold text-orange-500">{product.price}</span>
//                         <div className="flex items-center">
//                             <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span className="text-sm font-medium">{product.rating}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Category */}
//                 <div className="mb-4">
//                     <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
//                         {categories.find(cat => cat.id === product.category)?.name}
//                     </span>
//                 </div>

//                 {/* Description */}
//                 <p className="mb-4 text-sm text-slate-600 line-clamp-2">{product.description}</p>

//                 {/* Features */}
//                 <div className="mb-4">
//                     <div className="flex flex-wrap gap-1">
//                         {product.features.slice(0, 3).map((feature, idx) => (
//                             <span key={idx} className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
//                                 {feature}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="mb-4 grid grid-cols-2 gap-4">
//                     <div className="rounded-xl bg-slate-50 p-3">
//                         <div className="mb-1 flex items-center">
//                             <Package className="mr-2 h-4 w-4 text-blue-500" />
//                             <span className="text-xs font-medium text-slate-600">Orders</span>
//                         </div>
//                         <p className="text-sm font-bold text-slate-800">{product.orders}</p>
//                     </div>
//                     <div className="rounded-xl bg-slate-50 p-3">
//                         <div className="mb-1 flex items-center">
//                             <Zap className="mr-2 h-4 w-4 text-green-500" />
//                             <span className="text-xs font-medium text-slate-600">Revenue</span>
//                         </div>
//                         <p className="text-sm font-bold text-slate-800">{product.revenue}</p>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-2">
//                     <button className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
//                         <Eye className="mr-2 h-4 w-4" />
//                         View Details
//                     </button>
//                     <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200">
//                         <Settings className="h-4 w-4" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

//     const ActivityItem = ({ activity }) => (
//         <div className="flex items-start space-x-3 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50">
//             <div
//                 className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
//                     activity.type === 'success'
//                         ? 'bg-green-100 text-green-600'
//                         : activity.type === 'warning'
//                           ? 'bg-yellow-100 text-yellow-600'
//                           : 'bg-red-100 text-red-600'
//                 }`}
//             >
//                 {activity.type === 'success' ? (
//                     <CheckCircle className="h-4 w-4" />
//                 ) : activity.type === 'warning' ? (
//                     <Clock className="h-4 w-4" />
//                 ) : (
//                     <AlertTriangle className="h-4 w-4" />
//                 )}
//             </div>
//             <div className="min-w-0 flex-1">
//                 <p className="text-sm font-medium text-slate-800">{activity.action}</p>
//                 <p className="text-sm text-slate-600">{activity.product}</p>
//                 <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
//             </div>
//         </div>
//     );

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const handleFeatureChange = (index, value) => {
//         const newFeatures = [...formData.features];
//         newFeatures[index] = value;
//         setFormData((prev) => ({
//             ...prev,
//             features: newFeatures,
//         }));
//     };

//     const addFeature = () => {
//         setFormData((prev) => ({
//             ...prev,
//             features: [...prev.features, ''],
//         }));
//     };

//     const removeFeature = (index) => {
//         const newFeatures = formData.features.filter((_, i) => i !== index);
//         setFormData((prev) => ({
//             ...prev,
//             features: newFeatures.length > 0 ? newFeatures : [''],
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setTimeout(() => {
//             console.log('Form submitted:', formData);
//             setIsSubmitting(false);
//             setShowAddForm(false);
//             // Reset form
//             setFormData({
//                 name: '',
//                 price: '',
//                 image: '',
//                 category: 'insulated',
//                 description: '',
//                 rating: 5.0,
//                 inStock: true,
//                 features: [''],
//             });
//         }, 2000);
//     };

//     if (showAddForm) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//                 {/* Header */}
//                 <div className="border-b border-slate-200 bg-white shadow-sm">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
//                                 <p className="mt-1 text-slate-600">Create a new product for your webshop</p>
//                             </div>
//                             <button
//                                 onClick={() => setShowAddForm(false)}
//                                 className="flex items-center rounded-xl bg-slate-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-slate-600"
//                             >
//                                 Back to Products
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mx-auto max-w-4xl px-6 py-8">
//                     <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
//                         <div className="p-8">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//                                     {/* Left Column */}
//                                     <div className="space-y-6">
//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <Tag className="h-4 w-4" />
//                                                 Product Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="name"
//                                                 value={formData.name}
//                                                 onChange={handleInputChange}
//                                                 placeholder="e.g., Storage Building 6m x 12m Insulated"
//                                                 className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                                 required
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <DollarSign className="h-4 w-4" />
//                                                 Price (€)
//                                             </label>
//                                             <input
//                                                 type="number"
//                                                 name="price"
//                                                 value={formData.price}
//                                                 onChange={handleInputChange}
//                                                 placeholder="26995.00"
//                                                 step="0.01"
//                                                 min="0"
//                                                 className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                                 required
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <Package className="h-4 w-4" />
//                                                 Category
//                                             </label>
//                                             <select
//                                                 name="category"
//                                                 value={formData.category}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                             >
//                                                 {categories.map((cat) => (
//                                                     <option key={cat.id} value={cat.id}>
//                                                         {cat.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <Star className="h-4 w-4" />
//                                                 Rating
//                                             </label>
//                                             <input
//                                                 type="number"
//                                                 name="rating"
//                                                 value={formData.rating}
//                                                 onChange={handleInputChange}
//                                                 min="1"
//                                                 max="5"
//                                                 step="0.1"
//                                                 className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="flex cursor-pointer items-center gap-3">
//                                                 <input
//                                                     type="checkbox"
//                                                     name="inStock"
//                                                     checked={formData.inStock}
//                                                     onChange={handleInputChange}
//                                                     className="h-5 w-5 rounded focus:ring-2 focus:ring-orange-500"
//                                                     style={{ accentColor: '#f97316' }}
//                                                 />
//                                                 <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                     <CheckCircle className="h-4 w-4" />
//                                                     Product In Stock
//                                                 </span>
//                                             </label>
//                                         </div>
//                                     </div>

//                                     {/* Right Column */}
//                                     <div className="space-y-6">
//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <Image className="h-4 w-4" />
//                                                 Product Image URL
//                                             </label>
//                                             <input
//                                                 type="url"
//                                                 name="image"
//                                                 value={formData.image}
//                                                 onChange={handleInputChange}
//                                                 placeholder="/assets/product-image.webp"
//                                                 className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <FileText className="h-4 w-4" />
//                                                 Description
//                                             </label>
//                                             <textarea
//                                                 name="description"
//                                                 value={formData.description}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Complete building package storage building with premium insulation for temperature control."
//                                                 rows="4"
//                                                 className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                                                 <Star className="h-4 w-4" />
//                                                 Product Features
//                                             </label>
//                                             <div className="space-y-3">
//                                                 {formData.features.map((feature, index) => (
//                                                     <div key={index} className="flex gap-2">
//                                                         <input
//                                                             type="text"
//                                                             value={feature}
//                                                             onChange={(e) => handleFeatureChange(index, e.target.value)}
//                                                             placeholder="e.g., Premium Insulation"
//                                                             className="flex-1 rounded-lg border-2 border-slate-200 px-4 py-2 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
//                                                         />
//                                                         {formData.features.length > 1 && (
//                                                             <button
//                                                                 type="button"
//                                                                 onClick={() => removeFeature(index)}
//                                                                 className="rounded-lg bg-red-500 px-3 py-2 text-white transition-all duration-300 hover:bg-red-600 hover:scale-105"
//                                                             >
//                                                                 ×
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                                 <button
//                                                     type="button"
//                                                     onClick={addFeature}
//                                                     className="w-full rounded-lg border-2 border-dashed border-orange-300 px-4 py-2 text-sm font-medium text-orange-600 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 hover:scale-[1.02]"
//                                                 >
//                                                     + Add Feature
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-8 border-t border-slate-200 pt-6">
//                                     <button
//                                         type="submit"
//                                         disabled={isSubmitting}
//                                         className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
//                                     >
//                                         {isSubmitting ? (
//                                             <>
//                                                 <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
//                                                 Adding Product...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="h-5 w-5" />
//                                                 Add Product to WebShop
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//             {/* Header */}
//             <div className="border-b border-slate-200 bg-white shadow-sm">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-3xl font-bold text-slate-800">WebShop Management</h1>
//                             <p className="mt-1 text-slate-600">Manage your online product catalog and sales</p>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={() => setShowAddForm(true)}
//                                 className="flex items-center rounded-xl bg-orange-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
//                             >
//                                 <Plus className="mr-2 h-4 w-4" />
//                                 Add Product
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//                 {/* Overview Metrics */}
//                 <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                     <MetricCard
//                         title="Total Products"
//                         value={webShopData.overview.totalProducts}
//                         subtitle={`${webShopData.overview.activeProducts} active`}
//                         icon={Package}
//                         color="from-blue-500 to-blue-600"
//                     />
//                     <MetricCard
//                         title="Total Revenue"
//                         value={webShopData.overview.totalRevenue}
//                         subtitle="This month"
//                         icon={DollarSign}
//                         color="from-green-500 to-green-600"
//                         trend={webShopData.overview.growthRate}
//                     />
//                     <MetricCard
//                         title="Average Rating"
//                         value={webShopData.overview.averageRating}
//                         subtitle="Customer satisfaction"
//                         icon={Star}
//                         color="from-yellow-500 to-yellow-600"
//                     />
//                     <MetricCard
//                         title="Monthly Orders"
//                         value={webShopData.overview.monthlyOrders}
//                         subtitle="This month"
//                         icon={TrendingUp}
//                         color="from-orange-500 to-orange-600"
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
//                     {/* Main Content */}
//                     <div className="xl:col-span-3">
//                         {/* Search and Filter Bar */}
//                         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
//                             <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
//                                 <div className="relative flex-1">
//                                     <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search products..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
//                                     />
//                                 </div>
//                                 <div className="relative">
//                                     <Filter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
//                                     <select
//                                         value={filterCategory}
//                                         onChange={(e) => setFilterCategory(e.target.value)}
//                                         className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-8 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
//                                     >
//                                         <option value="all">All Categories</option>
//                                         {categories.map((cat) => (
//                                             <option key={cat.id} value={cat.id}>{cat.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Products Grid */}
//                         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                             {filteredProducts.map((product, index) => (
//                                 <ProductCard key={product.id} product={product} index={index} />
//                             ))}
//                         </div
