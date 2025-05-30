// BuildingDetails.tsx - Updated to always show building with ID 1

// Move your buildingsData object here or import it from a separate file
const buildingsData = {
    1: {
        id: 1,
        title: 'Hall No.1',
        status: 'SALE',
        type: 'halls',
        category: 'Industrial Halls',
        construction: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        description:
            'This impressive industrial hall features modern steel construction with excellent insulation properties. Perfect for manufacturing, warehousing, or distribution operations. The building includes high-quality sandwich panels and Ytong blocks for optimal thermal performance.',
        location: 'Industrial District, Netherlands',
        yearBuilt: '2018',
        price: 'Contact for Price',
        images: [
            'https://www.tradingbv.com/wp-content/uploads/2025/02/Schermafbeelding-2024-10-16-134435.png',
            'https://www.tradingbv.com/wp-content/uploads/2024/06/20240523_101558000_iOS-2048x1152.jpg',
            'https://www.tradingbv.com/wp-content/uploads/2025/02/4.png',
            'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        ],
        specifications: [
            { name: 'Main Hall', dimensions: '75 x 225 m', area: '16,875 m²' },
            { name: 'Office Space', dimensions: '20 x 30 m', area: '600 m²' },
            { name: 'Loading Dock', dimensions: '15 x 40 m', area: '600 m²' },
        ],
        totalArea: '16,875 m²',
        hasVideo: true,
        videoUrls: ['https://example.com/video1'],
        features: [
            'Steel frame construction',
            'Insulated roof panels',
            'Large clear span',
            'Multiple loading docks',
            'Office facilities',
            'Parking area',
        ],
    },
};

const BuildingDetails = () => {
    // Always get building with ID 1
    const building = buildingsData[1];

    // If building not found, show error message
    if (!building) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">Building Not Found</h1>
                    <p className="text-gray-600">The building data is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img src={building.images[0]} alt={building.title} className="h-full w-full object-cover" />
                <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center text-white">
                        <h1 className="mb-4 text-5xl font-bold">{building.title}</h1>
                        <div className="inline-block rounded-full bg-orange-500 px-4 py-2">
                            <span className="font-semibold">{building.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800">Description</h2>
                            <p className="text-lg leading-relaxed text-gray-600">{building.description}</p>
                        </div>

                        {/* Image Gallery */}
                        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800">Gallery</h2>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {building.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${building.title} - Image ${index + 1}`}
                                        className="h-48 w-full rounded-lg object-cover shadow-md transition-shadow hover:shadow-lg"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800">Features</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {building.features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-1">
                        {/* Basic Info */}
                        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-medium text-gray-500">Category:</span>
                                    <span className="ml-2 text-gray-800">{building.category}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Location:</span>
                                    <span className="ml-2 text-gray-800">{building.location}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Year Built:</span>
                                    <span className="ml-2 text-gray-800">{building.yearBuilt}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Total Area:</span>
                                    <span className="ml-2 text-lg font-bold text-gray-800">{building.totalArea}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Price:</span>
                                    <span className="ml-2 font-bold text-gray-800">{building.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Construction Details */}
                        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Construction</h2>
                            <p className="leading-relaxed text-gray-600">{building.construction}</p>
                        </div>

                        {/* Specifications */}
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Specifications</h2>
                            <div className="space-y-4">
                                {building.specifications.map((spec, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-3">
                                        <div className="font-semibold text-gray-800">{spec.name}</div>
                                        <div className="text-sm text-gray-600">{spec.dimensions}</div>
                                        <div className="text-sm font-medium text-orange-500">{spec.area}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingDetails;
