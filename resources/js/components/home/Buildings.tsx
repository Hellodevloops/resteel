import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data for buildings (more extensive than the featured ones)
const buildingsData = [
    {
        id: 1,
        title: 'Hall No.1',
        type: 'halls',
        dimensions: '75x225 m',
        area: '16,875 m²',
        height: 'Gutter 8.80 m, Ridge 12.5 m',
        materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        hasVideo: true,
        videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
        image: 'https://images.unsplash.com/photo-1553522911-d9e11577dc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: 'Hall No.2',
        type: 'halls',
        dimensions: '50x90 m',
        area: '4,500 m²',
        height: 'Gutter 8.80 m, Ridge 12.5 m',
        materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        hasVideo: true,
        videoUrl: 'https://youtu.be/hP-YuahiFBQ?si=VaFagc0fpMFYSKYF',
        image: 'https://images.unsplash.com/photo-1565939513947-3c6481adc0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        title: 'Hall No.3',
        type: 'halls',
        dimensions: '75x190 m',
        area: '14,250 m²',
        height: 'Gutter 8.80 m, Ridge 12.5 m',
        materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        hasVideo: true,
        videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
        image: 'https://images.unsplash.com/photo-1517520853509-2bc4129825a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        title: 'Business Premises',
        type: 'commercial',
        dimensions: '85x110 m',
        area: '9,350 m²',
        height: 'Loading dock 7.5 m, Storage 10.5 m',
        materials: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
        hasVideo: true,
        videoUrl: 'https://youtu.be/nDMEJ53FIFU?si=0HiY8k2S5WwhFpCb',
        image: 'https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        title: 'Small Hall',
        type: 'halls',
        dimensions: '16.5x20 m',
        area: '336 m²',
        height: 'Gutter 4.6 m, Ridge 7.85 m',
        materials: 'Steel, Sandwich wall panels and glass, Isolated roof panels, Windows',
        hasVideo: true,
        videoUrl: 'https://youtu.be/iAiTm-Hwrro',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 6,
        title: 'Steel Structure',
        type: 'structures',
        dimensions: '50x90 m',
        area: '4,500 m²',
        height: 'Gutter 5.7 m, Ridge 7.7 m',
        materials: '1x roof plates, 1x wall plates, 1x batch concrete elements 200 m',
        hasVideo: false,
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 7,
        title: 'Steel Structure Frame',
        type: 'structures',
        dimensions: '45x75 m',
        area: '3,375 m²',
        height: 'Gutter 10-12 m',
        materials: 'No walls, No roof',
        hasVideo: false,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 8,
        title: 'Medium Hall',
        type: 'halls',
        dimensions: '27x40 m',
        area: '1,080 m²',
        height: 'Gutter 9 m, Ridge 9 m',
        materials: 'Steel, Isolated roof panels, Roof plates, Ytong walls',
        hasVideo: true,
        videoUrl: 'https://youtu.be/Xtweo0aHWGU',
        image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 9,
        title: 'Warehouse Complex',
        type: 'warehouses',
        dimensions: '44x88 m',
        area: '3,872 m²',
        height: 'Contact for details',
        materials: 'Steel construction',
        hasVideo: false,
        image: 'https://images.unsplash.com/photo-1631651364796-c49f56b726d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
];

// Building types for filtering
const buildingTypes = [
    { id: 'all', label: 'All Buildings' },
    { id: 'halls', label: 'Halls' },
    { id: 'warehouses', label: 'Warehouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'structures', label: 'Structures' },
];

const Buildings = () => {
    const [filter, setFilter] = useState('all');
    const [videoFilter, setVideoFilter] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Apply filters
    const filteredBuildings = buildingsData.filter((building) => {
        const typeMatch = filter === 'all' || building.type === filter;
        const videoMatch = videoFilter ? building.hasVideo : true;
        return typeMatch && videoMatch;
    });

    // Update document title and trigger animations
    useEffect(() => {
        document.title = 'Available Buildings | Resteel';
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div className="bg-slate-50">
            {/* Header Component with Enhanced Return */}
            <Header />

            <main className="pt-20">
                {/* Hero Banner - Enhanced with industrial theme */}
                <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
                    {/* Background with parallax effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800">
                        {/* Mesh Pattern Overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-600/10"></div>
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.1) 0%, transparent 50%), 
                   radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.1) 0%, transparent 50%), 
                   radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.1) 0%, transparent 50%)`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div
                        className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-lg bg-orange-500/20"
                        style={{ animationDuration: '4s' }}
                    ></div>
                    <div
                        className="absolute top-32 right-20 h-12 w-12 animate-bounce rounded-lg bg-blue-600/20"
                        style={{ animationDuration: '4s', animationDelay: '-1s' }}
                    ></div>
                    <div
                        className="absolute bottom-32 left-20 h-8 w-8 animate-bounce rounded-lg bg-orange-500/30"
                        style={{ animationDuration: '4s', animationDelay: '-2s' }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center text-white">
                        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm">
                                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                                Premium Industrial Buildings
                            </div>
                        </div>

                        <h1
                            className={`mb-6 text-5xl leading-tight font-bold transition-all delay-200 duration-1000 lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Available
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
                        </h1>

                        <p
                            className={`mx-auto mb-8 max-w-3xl text-xl text-white/80 transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Browse our current inventory of second-hand industrial buildings, warehouses, and structures available for purchase,
                            disassembly, and transport.
                        </p>

                        <div
                            className={`transition-all delay-600 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <button className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25">
                                Explore Inventory
                            </button>
                        </div>
                    </div>
                </section>

                {/* Filters - Enhanced Design */}
                <section className="relative bg-white py-8 shadow-lg">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-wrap gap-3">
                                {buildingTypes.map((type, index) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setFilter(type.id)}
                                        className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                            filter === type.id
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                                                : 'border-2 border-slate-600 text-slate-600 hover:border-orange-500 hover:text-orange-500'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center rounded-xl bg-slate-50 p-4">
                                <label className="flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={videoFilter}
                                        onChange={() => setVideoFilter(!videoFilter)}
                                        className="h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="ml-3 font-medium text-slate-700">Show only with videos</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Buildings Grid - Enhanced Cards */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4">
                        {filteredBuildings.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {filteredBuildings.map((building, index) => (
                                    <div
                                        key={building.id}
                                        className={`group overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={building.image}
                                                alt={building.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>

                                            {building.hasVideo && (
                                                <div className="absolute top-4 right-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                                                    <span className="mr-1">●</span>Video Available
                                                </div>
                                            )}

                                            <div className="absolute bottom-4 left-4 rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="mb-4 text-xl font-bold text-slate-700 transition-colors group-hover:text-orange-500">
                                                {building.title}
                                            </h3>

                                            <div className="mb-6 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-500">Dimensions</span>
                                                    <span className="text-sm font-semibold text-slate-700">{building.dimensions}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-500">Area</span>
                                                    <span className="text-sm font-semibold text-slate-700">{building.area}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-500">Height</span>
                                                    <span className="text-sm font-semibold text-slate-700">{building.height}</span>
                                                </div>
                                                <div className="border-t border-slate-100 pt-3">
                                                    <span className="text-sm font-medium text-slate-500">Materials</span>
                                                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{building.materials}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/buildings/${building.id}`}
                                                    className="flex-1 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    View Details
                                                </Link>
                                                {building.hasVideo && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(building.videoUrl, '_blank');
                                                        }}
                                                        className="flex-1 rounded-xl border-2 border-orange-500 py-3 text-center text-sm font-semibold text-orange-500 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                                                    >
                                                        Watch Video
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                                    <div className="h-12 w-12 rounded-lg bg-slate-300"></div>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-slate-700">No buildings match your filters</h3>
                                <p className="mb-6 text-slate-500">Try changing your filter criteria to see more results</p>
                                <button
                                    onClick={() => {
                                        setFilter('all');
                                        setVideoFilter(false);
                                    }}
                                    className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section - Enhanced */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-20">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(244, 70, 17, 0.3) 0%, transparent 50%), 
                 radial-gradient(circle at 75% 75%, rgba(30, 76, 138, 0.3) 0%, transparent 50%)`,
                            }}
                        ></div>
                    </div>

                    {/* Floating Elements */}
                    <div
                        className="absolute top-10 left-10 h-12 w-12 animate-bounce rounded-lg bg-orange-500/20"
                        style={{ animationDuration: '6s' }}
                    ></div>
                    <div
                        className="absolute right-10 bottom-10 h-16 w-16 animate-bounce rounded-lg bg-blue-600/20"
                        style={{ animationDuration: '6s', animationDelay: '-2s' }}
                    ></div>

                    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
                        <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                            Can't Find What You're
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Looking For?</span>
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80">
                            Our inventory is constantly changing. Contact us with your specific requirements, and we'll help you find the perfect
                            building for your needs.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                to="/contact"
                                className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25"
                            >
                                Contact Our Team
                            </Link>
                            <Link
                                to="/contact"
                                className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
                            >
                                Sell Your Building
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Buildings;
