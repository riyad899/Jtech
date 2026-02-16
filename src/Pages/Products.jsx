import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Monitor, Smartphone, Tablet, Headphones, Gamepad2, Watch, Search, Filter, Eye, ShoppingCart, Truck, Calendar, Zap, Loader2, AlertCircle, Plus, CheckCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../AuthProvider/AuthContext';
import SEO from '../utils/SEO';

// Default category icons mapping
const categoryIcons = {
    laptops: Monitor,
    smartphones: Smartphone,
    tablets: Tablet,
    monitors: Monitor,
    audio: Headphones,
    gaming: Gamepad2,
    accessories: Watch,
    default: ShoppingBag
};

export const Products = () => {
    const navigate = useNavigate();
    const { productAPI } = useAxiosPublic();
    const { addToCart } = useCart();
    const { user } = useAuth();

    // Structured data for Products page
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "jTech Products Store",
        "description": "Shop the latest technology products including laptops, smartphones, tablets, monitors, audio equipment, gaming accessories, and more at jTech.",
        "url": "https://jtechvision.com/products"
    };

    // State management
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [minRating, setMinRating] = useState('');
    const [brands, setBrands] = useState(['all']);
    const [showFilters, setShowFilters] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    // Fetch all products and categories on component mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productAPI.getProducts();
            const productsData = response.data;
            setProducts(productsData);
            setFilteredProducts(productsData);

            // Extract unique brands from products
            const uniqueBrands = ['all', ...new Set(productsData.map(product => product.brand))];
            setBrands(uniqueBrands);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            // Try to fetch categories from API first
            const response = await productAPI.getCategories();
            const categoriesData = response.data;

            // Format categories with icons and subcategories
            const formattedCategories = [
                { id: 'all', name: 'All Products', icon: ShoppingBag, subcategories: [] }
            ];

            // Group products by category to extract subcategories
            const categoryMap = {};
            products.forEach(product => {
                if (!categoryMap[product.category]) {
                    categoryMap[product.category] = new Set();
                }
                if (product.subcategories && Array.isArray(product.subcategories)) {
                    product.subcategories.forEach(sub => categoryMap[product.category].add(sub));
                }
            });

            categoriesData.forEach(category => {
                const categoryId = category.toLowerCase();
                const subcategories = categoryMap[category] ? Array.from(categoryMap[category]) : [];

                formattedCategories.push({
                    id: categoryId,
                    name: category.charAt(0).toUpperCase() + category.slice(1),
                    icon: categoryIcons[categoryId] || categoryIcons.default,
                    subcategories: subcategories
                });
            });

            setCategories(formattedCategories);
        } catch (err) {
            console.error('Error fetching categories, using products data:', err);
            // Fallback: extract categories from products if API endpoint doesn't exist
            if (products.length > 0) {
                const categoryMap = {};

                products.forEach(product => {
                    if (!categoryMap[product.category]) {
                        categoryMap[product.category] = new Set();
                    }
                    if (product.subcategories && Array.isArray(product.subcategories)) {
                        product.subcategories.forEach(sub => categoryMap[product.category].add(sub));
                    }
                });

                const formattedCategories = [
                    { id: 'all', name: 'All Products', icon: ShoppingBag, subcategories: [] }
                ];

                Object.keys(categoryMap).forEach(category => {
                    const categoryId = category.toLowerCase();
                    const subcategories = Array.from(categoryMap[category]);

                    formattedCategories.push({
                        id: categoryId,
                        name: category.charAt(0).toUpperCase() + category.slice(1),
                        icon: categoryIcons[categoryId] || categoryIcons.default,
                        subcategories: subcategories
                    });
                });

                setCategories(formattedCategories);
            } else {
                // If no products, just show "All Products"
                setCategories([
                    { id: 'all', name: 'All Products', icon: ShoppingBag, subcategories: [] }
                ]);
            }
        }
    };

    // Advanced search with API
    const handleAdvancedSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const searchParams = {};

            if (searchTerm.trim()) {
                searchParams.name = searchTerm.trim();
            }

            if (selectedCategory !== 'all') {
                searchParams.category = selectedCategory;
            }

            if (selectedSubcategory !== 'all') {
                searchParams.subcategory = selectedSubcategory;
            }

            if (selectedBrand !== 'all') {
                searchParams.brand = selectedBrand;
            }

            if (priceRange.min) {
                searchParams.minPrice = priceRange.min;
            }

            if (priceRange.max) {
                searchParams.maxPrice = priceRange.max;
            }

            if (minRating) {
                searchParams.minRating = minRating;
            }

            // If no filters are applied, fetch all products
            if (Object.keys(searchParams).length === 0) {
                await fetchProducts();
                return;
            }

            const response = await productAPI.searchProducts(searchParams);
            const searchResults = response.data;
            setFilteredProducts(searchResults);
        } catch (err) {
            console.error('Error searching products:', err);
            setError('Failed to search products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle category change
    const handleCategoryChange = async (categoryId) => {
        try {
            setSelectedCategory(categoryId);
            setSelectedSubcategory('all'); // Reset subcategory when changing category
            setLoading(true);
            setError(null);

            if (categoryId === 'all') {
                await fetchProducts();
            } else {
                const response = await productAPI.getProductsByCategory(categoryId);
                setFilteredProducts(response.data);
            }
        } catch (err) {
            console.error('Error filtering by category:', err);
            setError('Failed to filter products by category.');
        } finally {
            setLoading(false);
        }
    };

    // Handle subcategory change
    const handleSubcategoryChange = async (subcategory) => {
        try {
            setSelectedSubcategory(subcategory);
            setLoading(true);
            setError(null);

            if (subcategory === 'all') {
                // Show all products in the selected category
                if (selectedCategory === 'all') {
                    await fetchProducts();
                } else {
                    const response = await productAPI.getProductsByCategory(selectedCategory);
                    setFilteredProducts(response.data);
                }
            } else {
                // Filter products by subcategory
                const allProducts = selectedCategory === 'all' ? products :
                    (await productAPI.getProductsByCategory(selectedCategory)).data;

                const filtered = allProducts.filter(product =>
                    product.subcategories && product.subcategories.includes(subcategory)
                );
                setFilteredProducts(filtered);
            }
        } catch (err) {
            console.error('Error filtering by subcategory:', err);
            setError('Failed to filter products by subcategory.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle category dropdown
    const toggleCategoryExpansion = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Handle brand change
    const handleBrandChange = async (brand) => {
        try {
            setSelectedBrand(brand);
            setLoading(true);
            setError(null);

            if (brand === 'all') {
                await fetchProducts();
            } else {
                const response = await productAPI.getProductsByBrand(brand);
                setFilteredProducts(response.data);
            }
        } catch (err) {
            console.error('Error filtering by brand:', err);
            setError('Failed to filter products by brand.');
        } finally {
            setLoading(false);
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedSubcategory('all');
        setSelectedBrand('all');
        setPriceRange({ min: '', max: '' });
        setMinRating('');
        fetchProducts();
    };

    const getCategoryIcon = (category) => {
        return categoryIcons[category?.toLowerCase()] || categoryIcons.default;
    };

    const getPriceColor = (price) => {
        return 'text-[#0D3050]';
    };

    // Handle add to cart with success modal
    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProduct(product);
        setShowSuccessModal(true);

        // Auto hide modal after 0.5 seconds
        setTimeout(() => {
            setShowSuccessModal(false);
            setAddedProduct(null);
        }, 500);
    };

    // Update categories when products change (fallback)
    useEffect(() => {
        if (products.length > 0 && categories.length <= 1) {
            fetchCategories();
        }
    }, [products]);

    // Reset scroll position when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle card click - prevent navigation if user is selecting text
    const handleCardClick = (productId, e) => {
        // Check if user is selecting text
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            e.stopPropagation();
            return;
        }
        navigate(`/product/${productId}`);
    };

    // Loading state
    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#0C2F4F] animate-spin mx-auto mb-4" />
                    <p className="text-lg text-[#0C2F4F]">Loading products...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && products.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="px-6 py-3 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Shop Technology Products - Laptops, Smartphones & Accessories | jTech"
                description="Browse and buy the latest technology products at jTech. Shop laptops, smartphones, tablets, monitors, audio equipment, gaming accessories, and more with fast delivery and secure checkout."
                keywords="buy laptops, buy smartphones, technology products, computer hardware, gaming accessories, audio equipment, tech shop, electronics store"
                url="https://jtechvision.com/products"
                ogImage="https://jtechvision.com/og-products.jpg"
                twitterImage="https://jtechvision.com/twitter-products.jpg"
                structuredData={structuredData}
            />
            <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] overflow-hidden relative">
            {/* Background Pattern Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-5xl font-light leading-tight tracking-tight">
                        <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
                            All Products
                        </span>
                    </h1>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products by name, brand, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C2F4F] bg-white/80 backdrop-blur-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAdvancedSearch}
                                disabled={loading}
                                className="px-6 py-3 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                Search
                            </button>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-6 py-3 border border-[#0C2F4F] text-[#0C2F4F] rounded-lg hover:bg-[#0C2F4F]/5 transition-colors flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Brand Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C2F4F] bg-white"
                                        >
                                            {brands.map(brand => (
                                                <option key={brand} value={brand}>
                                                    {brand === 'all' ? 'All Brands' : brand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                                        <input
                                            type="number"
                                            placeholder="Min price"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C2F4F] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                                        <input
                                            type="number"
                                            placeholder="Max price"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C2F4F] bg-white"
                                        />
                                    </div>

                                    {/* Rating Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                                        <select
                                            value={minRating}
                                            onChange={(e) => setMinRating(e.target.value)}
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C2F4F] bg-white"
                                        >
                                            <option value="">Any Rating</option>
                                            <option value="4">4+ Stars</option>
                                            <option value="3">3+ Stars</option>
                                            <option value="2">2+ Stars</option>
                                            <option value="1">1+ Stars</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={handleAdvancedSearch}
                                        disabled={loading}
                                        className="px-4 py-2 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors disabled:opacity-50"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Category Filter Buttons */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Main Categories */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

                            return (
                                <div key={category.id} className="relative">
                                    <motion.button
                                        onClick={() => {
                                            if (hasSubcategories) {
                                                toggleCategoryExpansion(category.id);
                                            }
                                            handleCategoryChange(category.id);
                                        }}
                                        disabled={loading}
                                        className={`flex items-center px-6 py-3 rounded-xl font-light text-sm tracking-wide transition-all duration-300 backdrop-blur-sm disabled:opacity-50 ${
                                            selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-white shadow-lg'
                                                : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-[#0C2F4F]/50 hover:bg-[#0C2F4F]/5'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconComponent className="w-4 h-4 mr-2" />
                                        {category.name}
                                        {hasSubcategories && (
                                            expandedCategories[category.id] ?
                                            <ChevronUp className="w-4 h-4 ml-2" /> :
                                            <ChevronDown className="w-4 h-4 ml-2" />
                                        )}
                                    </motion.button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Subcategories - Show only for expanded categories */}
                    <AnimatePresence>
                        {categories.map((category) => {
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            const isExpanded = expandedCategories[category.id] && selectedCategory === category.id;

                            if (!hasSubcategories || !isExpanded) return null;

                            return (
                                <motion.div
                                    key={`sub-${category.id}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                                        <motion.button
                                            onClick={() => handleSubcategoryChange('all')}
                                            disabled={loading}
                                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                                selectedSubcategory === 'all'
                                                    ? 'bg-[#0C2F4F]/80 text-white'
                                                    : 'bg-white/60 text-gray-600 border border-gray-200 hover:border-[#0C2F4F]/30 hover:bg-[#0C2F4F]/5'
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            All {category.name}
                                        </motion.button>
                                        {category.subcategories.map((subcategory) => (
                                            <motion.button
                                                key={subcategory}
                                                onClick={() => handleSubcategoryChange(subcategory)}
                                                disabled={loading}
                                                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                                    selectedSubcategory === subcategory
                                                        ? 'bg-[#0C2F4F]/80 text-white'
                                                        : 'bg-white/60 text-gray-600 border border-gray-200 hover:border-[#0C2F4F]/30 hover:bg-[#0C2F4F]/5'
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {subcategory}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Loading state for filtering */}
                {loading && products.length > 0 && (
                    <div className="text-center py-8">
                        <Loader2 className="w-8 h-8 text-[#0C2F4F] animate-spin mx-auto mb-2" />
                        <p className="text-[#0C2F4F]">Filtering products...</p>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                    {!loading && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const IconComponent = getCategoryIcon(product.category);
                            const isExpensive = product.price > 1000;
                            const isMidRange = product.price > 500 && product.price <= 1000;
                            const isBudget = product.price <= 500;

                            return (
                                <div
                                    key={product._id}
                                    onClick={(e) => handleCardClick(product._id, e)}
                                    className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#0C2F4F]/20 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="w-full h-full bg-gradient-to-br from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{display: product.image ? 'none' : 'flex'}}>
                                            <IconComponent className="w-16 h-16 text-[#0C2F4F]/60" />
                                        </div>

                                        {/* Price Badge */}
                                        <div className="absolute top-3 right-3 space-y-2">
                                            {isExpensive && (
                                                <span className="block bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    Premium
                                                </span>
                                            )}
                                            {isMidRange && (
                                                <span className="block bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    Popular
                                                </span>
                                            )}
                                            {isBudget && (
                                                <span className="block bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    Budget
                                                </span>
                                            )}
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute bottom-3 left-3 bg-[#0C2F4F]/80 backdrop-blur-sm text-brand-light px-3 py-1 rounded-full text-xs font-medium capitalize">
                                            {product.category}
                                        </div>

                                        {/* View Overlay */}
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <Eye className="text-brand-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Brand & Title */}
                                        <div className="mb-2">
                                            <span className="text-xs text-[#0C2F4F]/60 font-semibold uppercase tracking-wide">
                                                {product.brand}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-[#0C2F4F]">
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm mb-3 line-clamp-2 text-[#0C2F4F]/70">
                                            {product.description}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-[#0C2F4F]/20'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-[#0C2F4F]/70 font-medium">({product.rating || 0})</span>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                                            <span className={`text-2xl font-bold ${getPriceColor(product.price)} select-text cursor-text`}>
                                                TK{product.price}
                                            </span>
                                            {product.price > 100 && (
                                                <span className="text-sm text-[#0C2F4F]/40 line-through ml-2 select-text cursor-text">
                                                    TK{Math.round(product.price * 1.2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/buy-product/${product._id}`);
                                                }}
                                                className="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#0D3050] hover:bg-[#0A2540] text-white focus:ring-[#0D3050]"
                                            >
                                                <ShoppingBag className="w-4 h-4 inline mr-2" />
                                                Buy Now
                                            </button>
                                            {user && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(product);
                                                    }}
                                                    className="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    title="Add to Cart"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : !loading ? (
                        <div className="col-span-full text-center py-16">
                            <ShoppingBag className="w-16 h-16 text-[#0C2F4F]/40 mx-auto mb-4" />
                            <p className="text-xl mb-2 text-[#0C2F4F]/70">
                                No products found matching your criteria
                            </p>
                            <p className="text-sm mb-6 text-[#0C2F4F]/50">
                                Try adjusting your search or filters to find what you're looking for
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-[#0D3050] hover:bg-[#0A2540] text-white"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : null}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 border border-[#0C2F4F]/10"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="text-center">
                                {/* Success Icon */}
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-[#0C2F4F] mb-2">
                                    Added to Cart!
                                </h3>

                                {/* Product Info */}
                                {addedProduct && (
                                    <div className="text-sm text-[#0C2F4F]/70 mb-4">
                                        <span className="font-medium">{addedProduct.name}</span> has been added to your cart.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </>
    );
};