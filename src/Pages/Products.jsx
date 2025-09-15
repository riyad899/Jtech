import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Filter, Star, ShoppingCart, Monitor, Smartphone, Cpu, HardDrive, Headphones, Camera, Gamepad2, Tablet, Watch, Speaker, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

const productsData = [
    // Laptops
    { id: 1, name: "MacBook Pro 16", category: "laptops", brand: "Apple", price: 2499, rating: 4.8, image: "/api/placeholder/300/200", description: "Powerful laptop for professionals with M3 chip and stunning display" },
    { id: 2, name: "Dell XPS 13", category: "laptops", brand: "Dell", price: 1299, rating: 4.6, image: "/api/placeholder/300/200", description: "Ultra-portable business laptop with premium build quality" },
    { id: 3, name: "HP Spectre x360", category: "laptops", brand: "HP", price: 1199, rating: 4.5, image: "/api/placeholder/300/200", description: "Convertible premium laptop with 360-degree hinge design" },
    { id: 4, name: "Lenovo ThinkPad X1", category: "laptops", brand: "Lenovo", price: 1599, rating: 4.7, image: "/api/placeholder/300/200", description: "Business-grade reliability with military-spec durability" },
    { id: 5, name: "ASUS ZenBook 14", category: "laptops", brand: "ASUS", price: 899, rating: 4.4, image: "/api/placeholder/300/200", description: "Sleek ultrabook with OLED display and premium design" },
    { id: 6, name: "MSI Creator 15", category: "laptops", brand: "MSI", price: 1899, rating: 4.6, image: "/api/placeholder/300/200", description: "Content creator laptop with RTX graphics and color-accurate display" },

    // Smartphones
    { id: 7, name: "iPhone 15 Pro", category: "smartphones", brand: "Apple", price: 999, rating: 4.9, image: "/api/placeholder/300/200", description: "Latest iPhone with titanium build and advanced camera system" },
    { id: 8, name: "Samsung Galaxy S24", category: "smartphones", brand: "Samsung", price: 899, rating: 4.7, image: "/api/placeholder/300/200", description: "AI-powered smartphone with exceptional display technology" },
    { id: 9, name: "Google Pixel 8", category: "smartphones", brand: "Google", price: 699, rating: 4.6, image: "/api/placeholder/300/200", description: "Pure Android experience with computational photography" },
    { id: 10, name: "OnePlus 12", category: "smartphones", brand: "OnePlus", price: 799, rating: 4.5, image: "/api/placeholder/300/200", description: "Flagship killer performance with ultra-fast charging" },
    { id: 11, name: "Xiaomi 14 Pro", category: "smartphones", brand: "Xiaomi", price: 649, rating: 4.4, image: "/api/placeholder/300/200", description: "Premium features at competitive pricing with Leica cameras" },
    { id: 12, name: "iPhone 15", category: "smartphones", brand: "Apple", price: 799, rating: 4.8, image: "/api/placeholder/300/200", description: "Standard iPhone with USB-C and improved camera capabilities" },

    // Tablets
    { id: 13, name: "iPad Pro 12.9", category: "tablets", brand: "Apple", price: 1099, rating: 4.8, image: "/api/placeholder/300/200", description: "Professional tablet with M2 chip and Liquid Retina display" },
    { id: 14, name: "Samsung Galaxy Tab S9", category: "tablets", brand: "Samsung", price: 849, rating: 4.6, image: "/api/placeholder/300/200", description: "Premium Android tablet with S Pen included" },
    { id: 15, name: "iPad Air", category: "tablets", brand: "Apple", price: 599, rating: 4.7, image: "/api/placeholder/300/200", description: "Versatile tablet with M1 chip and all-day battery life" },
    { id: 16, name: "Microsoft Surface Pro 9", category: "tablets", brand: "Microsoft", price: 999, rating: 4.5, image: "/api/placeholder/300/200", description: "2-in-1 tablet that replaces your laptop with Windows 11" },

    // Monitors
    { id: 17, name: "LG UltraWide 34", category: "monitors", brand: "LG", price: 699, rating: 4.7, image: "/api/placeholder/300/200", description: "34-inch curved monitor perfect for productivity" },
    { id: 18, name: "ASUS ProArt 27", category: "monitors", brand: "ASUS", price: 599, rating: 4.6, image: "/api/placeholder/300/200", description: "Color-accurate display for creative professionals" },
    { id: 19, name: "Dell UltraSharp 24", category: "monitors", brand: "Dell", price: 299, rating: 4.5, image: "/api/placeholder/300/200", description: "Professional monitor with excellent color accuracy" },
    { id: 20, name: "Samsung Odyssey G7", category: "monitors", brand: "Samsung", price: 549, rating: 4.6, image: "/api/placeholder/300/200", description: "Gaming monitor with 1000R curve and 240Hz refresh rate" },
    { id: 21, name: "BenQ PD3200U", category: "monitors", brand: "BenQ", price: 799, rating: 4.5, image: "/api/placeholder/300/200", description: "32-inch 4K monitor designed for designers and photographers" },

    // Audio
    { id: 22, name: "Sony WH-1000XM5", category: "audio", brand: "Sony", price: 399, rating: 4.8, image: "/api/placeholder/300/200", description: "Industry-leading noise-canceling headphones" },
    { id: 23, name: "AirPods Pro 2", category: "audio", brand: "Apple", price: 249, rating: 4.7, image: "/api/placeholder/300/200", description: "Premium wireless earbuds with spatial audio" },
    { id: 24, name: "JBL Charge 5", category: "audio", brand: "JBL", price: 179, rating: 4.6, image: "/api/placeholder/300/200", description: "Portable Bluetooth speaker with powerful sound" },
    { id: 25, name: "Bose QuietComfort 45", category: "audio", brand: "Bose", price: 329, rating: 4.7, image: "/api/placeholder/300/200", description: "Premium noise-canceling headphones with exceptional comfort" },
    { id: 26, name: "Sennheiser HD 660S", category: "audio", brand: "Sennheiser", price: 499, rating: 4.8, image: "/api/placeholder/300/200", description: "Audiophile open-back headphones with natural sound" },

    // Gaming
    { id: 27, name: "Steam Deck", category: "gaming", brand: "Valve", price: 399, rating: 4.5, image: "/api/placeholder/300/200", description: "Handheld gaming PC with access to Steam library" },
    { id: 28, name: "Xbox Series X", category: "gaming", brand: "Microsoft", price: 499, rating: 4.8, image: "/api/placeholder/300/200", description: "Next-gen gaming console with 4K gaming support" },
    { id: 29, name: "PlayStation 5", category: "gaming", brand: "Sony", price: 499, rating: 4.8, image: "/api/placeholder/300/200", description: "Revolutionary gaming console with SSD and haptic feedback" },
    { id: 30, name: "Nintendo Switch OLED", category: "gaming", brand: "Nintendo", price: 349, rating: 4.6, image: "/api/placeholder/300/200", description: "Hybrid console with enhanced OLED screen" },

    // Accessories
    { id: 31, name: "Apple Watch Ultra 2", category: "accessories", brand: "Apple", price: 799, rating: 4.7, image: "/api/placeholder/300/200", description: "Rugged smartwatch designed for extreme conditions" },
    { id: 32, name: "Logitech MX Master 3S", category: "accessories", brand: "Logitech", price: 99, rating: 4.6, image: "/api/placeholder/300/200", description: "Professional wireless mouse with precision tracking" },
    { id: 33, name: "Apple Magic Keyboard", category: "accessories", brand: "Apple", price: 179, rating: 4.5, image: "/api/placeholder/300/200", description: "Wireless keyboard with scissor mechanism and Touch ID" },
    { id: 34, name: "Anker PowerCore 26800", category: "accessories", brand: "Anker", price: 69, rating: 4.6, image: "/api/placeholder/300/200", description: "High-capacity portable charger for multiple devices" },
    { id: 35, name: "Samsung Galaxy Watch 6", category: "accessories", brand: "Samsung", price: 329, rating: 4.5, image: "/api/placeholder/300/200", description: "Advanced smartwatch with health monitoring features" }
];

const categories = [
    { id: 'all', name: 'All Products', icon: Monitor, count: 35 },
    { id: 'laptops', name: 'Laptops', icon: Monitor, count: 6 },
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone, count: 6 },
    { id: 'tablets', name: 'Tablets', icon: Tablet, count: 4 },
    { id: 'monitors', name: 'Monitors', icon: Monitor, count: 5 },
    { id: 'audio', name: 'Audio', icon: Headphones, count: 5 },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: 4 },
    { id: 'accessories', name: 'Accessories', icon: Watch, count: 5 }
];

const brands = ['All Brands', 'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Google', 'Sony', 'LG', 'ASUS', 'OnePlus', 'JBL', 'Valve', 'Microsoft', 'Logitech', 'Xiaomi', 'MSI', 'BenQ', 'Bose', 'Sennheiser', 'Nintendo', 'Anker'];
const priceRanges = ['All Prices', 'Under $300', '$300 - $600', '$600 - $1000', '$1000 - $1500', 'Over $1500'];
const ratings = ['All Ratings', '4.5+ Stars', '4.0+ Stars', '3.5+ Stars'];

export const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
    const [selectedRating, setSelectedRating] = useState('All Ratings');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    const filteredProducts = useMemo(() => {
        return productsData.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const brandMatch = selectedBrand === 'All Brands' || product.brand === selectedBrand;
            const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            let priceMatch = true;
            if (selectedPriceRange !== 'All Prices') {
                const price = product.price;
                switch (selectedPriceRange) {
                    case 'Under $300': priceMatch = price < 300; break;
                    case '$300 - $600': priceMatch = price >= 300 && price <= 600; break;
                    case '$600 - $1000': priceMatch = price >= 600 && price <= 1000; break;
                    case '$1000 - $1500': priceMatch = price >= 1000 && price <= 1500; break;
                    case 'Over $1500': priceMatch = price > 1500; break;
                }
            }

            let ratingMatch = true;
            if (selectedRating !== 'All Ratings') {
                const rating = product.rating;
                switch (selectedRating) {
                    case '4.5+ Stars': ratingMatch = rating >= 4.5; break;
                    case '4.0+ Stars': ratingMatch = rating >= 4.0; break;
                    case '3.5+ Stars': ratingMatch = rating >= 3.5; break;
                }
            }

            return categoryMatch && brandMatch && priceMatch && ratingMatch && searchMatch;
        });
    }, [selectedCategory, selectedBrand, selectedPriceRange, selectedRating, searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedBrand, selectedPriceRange, selectedRating, searchTerm]);

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedBrand('All Brands');
        setSelectedPriceRange('All Prices');
        setSelectedRating('All Ratings');
        setSearchTerm('');
        setCurrentPage(1);
    };

    // Reset scroll position when component mounts (route change)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Instant scroll to top without animation
        window.scrollTo(0, 0);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-[#f8fafc] pt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent tracking-tight font-serif mb-6">
                        Our Products
                    </h1>
                    <p className="text-xl text-[#0C2F4F]/70 max-w-2xl mx-auto font-serif">
                        Discover our premium collection of cutting-edge technology products
                    </p>
                </div>

                {/* Search Bar with Filters */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
                        {/* Left Side - Category and Filters */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Category Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-[#0C2F4F] text-white px-6 py-3 pr-10 rounded-xl font-serif font-semibold shadow-lg hover:bg-[#0C2F4F]/90 transition-all duration-300 focus:ring-2 focus:ring-[#0C2F4F]/20 focus:outline-none appearance-none cursor-pointer"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id} className="bg-white text-[#0C2F4F]">
                                            {category.name} ({category.count})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                            </div>

                            {/* Filters Toggle Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="bg-white text-[#0C2F4F] border-2 border-[#0C2F4F] px-6 py-3 rounded-xl font-serif font-semibold flex items-center gap-3 shadow-lg hover:bg-[#0C2F4F]/10 transition-all duration-300"
                            >
                                <Filter className="w-5 h-5" />
                                Advanced Filters
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Right Side - Search Bar */}
                        <div className="relative flex-1 max-w-lg">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C2F4F]/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 border-2 border-[#0C2F4F]/20 rounded-2xl focus:ring-2 focus:ring-[#0C2F4F]/20 focus:border-[#0C2F4F] font-serif text-lg bg-white shadow-lg"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0C2F4F]/40 hover:text-[#0C2F4F] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Expandable Filters Panel */}
                    <div className={`overflow-hidden transition-all duration-500 ${showFilters ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#0C2F4F]/10 max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Brand Filter */}
                                <div>
                                    <label className="block text-[#0C2F4F] font-serif font-semibold mb-3">Brand</label>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full p-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:ring-2 focus:ring-[#0C2F4F]/20 focus:border-[#0C2F4F] font-serif bg-white shadow-md"
                                    >
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <label className="block text-[#0C2F4F] font-serif font-semibold mb-3">Price Range</label>
                                    <select
                                        value={selectedPriceRange}
                                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                                        className="w-full p-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:ring-2 focus:ring-[#0C2F4F]/20 focus:border-[#0C2F4F] font-serif bg-white shadow-md"
                                    >
                                        {priceRanges.map(range => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <label className="block text-[#0C2F4F] font-serif font-semibold mb-3">Rating</label>
                                    <select
                                        value={selectedRating}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                        className="w-full p-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:ring-2 focus:ring-[#0C2F4F]/20 focus:border-[#0C2F4F] font-serif bg-white shadow-md"
                                    >
                                        {ratings.map(rating => (
                                            <option key={rating} value={rating}>{rating}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <div className="mt-6 text-center">
                                <button
                                    onClick={clearFilters}
                                    className="bg-[#0C2F4F]/10 text-[#0C2F4F] px-6 py-3 rounded-xl font-serif font-semibold hover:bg-[#0C2F4F]/20 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-8">
                    <p className="text-[#0C2F4F]/70 font-serif text-lg">
                        Showing <span className="font-bold text-[#0C2F4F]">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of <span className="font-bold text-[#0C2F4F]">{filteredProducts.length}</span> products
                    </p>
                    {totalPages > 1 && (
                        <p className="text-[#0C2F4F]/70 font-serif text-lg">
                            Page <span className="font-bold text-[#0C2F4F]">{currentPage}</span> of <span className="font-bold text-[#0C2F4F]">{totalPages}</span>
                        </p>
                    )}
                </div>

                {/* Products Grid - 5 items per row with bigger cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-[#0C2F4F]/10"
                        >
                            {/* Product Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-[#0C2F4F]/5 to-[#0C2F4F]/10 p-8 flex items-center justify-center">
                                <div className="w-full h-full bg-[#0C2F4F]/10 rounded-2xl flex items-center justify-center">
                                    <Monitor className="w-16 h-16 text-[#0C2F4F]/40" />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <h3 className="font-serif font-bold text-[#0C2F4F] text-lg mb-3 line-clamp-2 group-hover:text-[#0C2F4F] transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-[#0C2F4F]/60 text-sm mb-4 font-serif line-clamp-3 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-[#0C2F4F]/60 font-serif font-semibold">({product.rating})</span>
                                </div>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#0C2F4F] font-serif">
                                        ${product.price}
                                    </span>
                                    <button className="bg-[#0C2F4F] text-white p-2 rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-300 hover:scale-110">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#0C2F4F]/10">
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-serif font-semibold transition-all duration-300 ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-[#0C2F4F] text-white hover:bg-[#0C2F4F]/90 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1 mx-4">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        const isCurrentPage = pageNumber === currentPage;

                                        // Show first page, last page, current page, and pages around current
                                        const showPage = pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            Math.abs(pageNumber - currentPage) <= 1;

                                        if (!showPage) {
                                            // Show ellipsis
                                            if (pageNumber === 2 && currentPage > 4) {
                                                return <span key={pageNumber} className="px-2 text-[#0C2F4F]/50">...</span>;
                                            }
                                            if (pageNumber === totalPages - 1 && currentPage < totalPages - 3) {
                                                return <span key={pageNumber} className="px-2 text-[#0C2F4F]/50">...</span>;
                                            }
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => goToPage(pageNumber)}
                                                className={`w-10 h-10 rounded-xl font-serif font-semibold transition-all duration-300 ${isCurrentPage
                                                        ? 'bg-[#0C2F4F] text-white shadow-md'
                                                        : 'bg-gray-100 text-[#0C2F4F] hover:bg-[#0C2F4F]/10 hover:shadow-md'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-serif font-semibold transition-all duration-300 ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-[#0C2F4F] text-white hover:bg-[#0C2F4F]/90 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Products Found */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-3xl p-16 shadow-xl border border-[#0C2F4F]/10 max-w-lg mx-auto">
                            <Monitor className="w-20 h-20 text-[#0C2F4F]/40 mx-auto mb-6" />
                            <h3 className="text-3xl font-bold text-[#0C2F4F] mb-4 font-serif">No Products Found</h3>
                            <p className="text-[#0C2F4F]/60 font-serif text-lg mb-6">Try adjusting your search or filters to see more products.</p>
                            <button
                                onClick={clearFilters}
                                className="bg-[#0C2F4F] text-white px-8 py-3 rounded-xl font-serif font-semibold hover:bg-[#0C2F4F]/90 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};