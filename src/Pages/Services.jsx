import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Monitor,
  Smartphone,
  Cloud,
  Database,
  Code,
  Settings,
  Wifi,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Filter,
  Search,
  Loader2,
  AlertCircle,
  DollarSign,
  Clock,
  User,
  Tag,
  Eye
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

// Default service icons mapping
const serviceIcons = {
  web: Monitor,
  mobile: Smartphone,
  cloud: Cloud,
  database: Database,
  security: Shield,
  code: Code,
  wifi: Wifi,
  consulting: Users,
  development: Code,
  design: Sparkles,
  default: Settings
};

// Demo services data


export const Services = () => {
  const { serviceAPI } = useAxiosPublic();

  // Structured data for Services page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "jTech IT Services",
    "description": "Comprehensive technology services including web development, mobile app development, cloud computing, database management, security solutions, and IT consulting.",
    "provider": {
      "@type": "Organization",
      "name": "jTech"
    },
    "serviceType": ["Web Development", "Mobile App Development", "Cloud Computing", "Database Management", "IT Security", "IT Consulting"]
  };

  // State management
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    fetchServices();
    fetchCategories();
    fetchProviders();
  }, []);

  // Reset hover state when category changes
  useEffect(() => {
    setHoveredService(null);
  }, [selectedCategory]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch services from API
      const response = await serviceAPI.getServices();
      const servicesData = response.data;

      setServices(servicesData);
      setFilteredServices(servicesData);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Fetch categories from API
      const response = await serviceAPI.getServiceCategories();
      const categoriesData = response.data;

      // Format categories with icons
      const formattedCategories = [
        { id: 'all', name: 'All Services', icon: Settings },
        ...categoriesData.map(category => ({
          id: category.toLowerCase(),
          name: category.charAt(0).toUpperCase() + category.slice(1),
          icon: serviceIcons[category.toLowerCase()] || serviceIcons.default
        }))
      ];

      setCategories(formattedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback: Extract unique categories from services if available
      if (services.length > 0) {
        const uniqueCategories = [...new Set(services.map(service => service.category))];
        const formattedCategories = [
          { id: 'all', name: 'All Services', icon: Settings },
          ...uniqueCategories.map(category => ({
            id: category.toLowerCase(),
            name: category.charAt(0).toUpperCase() + category.slice(1),
            icon: serviceIcons[category.toLowerCase()] || serviceIcons.default
          }))
        ];
        setCategories(formattedCategories);
      } else {
        // Ultimate fallback
        setCategories([
          { id: 'all', name: 'All Services', icon: Settings }
        ]);
      }
    }
  };

  const fetchProviders = async () => {
    try {
      // Fetch providers from API
      const response = await serviceAPI.getServiceProviders();
      const providersData = response.data;
      setProviders(['all', ...providersData]);
    } catch (err) {
      console.error('Error fetching providers:', err);
      // Fallback: Extract unique providers from services if available
      if (services.length > 0) {
        const uniqueProviders = [...new Set(services.map(service => service.provider))];
        setProviders(['all', ...uniqueProviders]);
      } else {
        setProviders(['all']);
      }
    }
  };

  // Update categories when services change (fallback)
  useEffect(() => {
    if (services.length > 0 && categories.length <= 1) {
      fetchCategories();
    }
  }, [services]);

  // Filter services based on all criteria
  const handleFilterServices = async () => {
    try {
      setLoading(true);
      setError(null);

      let filtered = [...services];

      // Apply search term filter
      if (searchTerm.trim()) {
        filtered = filtered.filter(service =>
          service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(service =>
          service.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Apply status filter
      if (selectedStatus !== 'all') {
        filtered = filtered.filter(service =>
          service.status?.toLowerCase() === selectedStatus.toLowerCase()
        );
      }

      // Apply provider filter
      if (selectedProvider !== 'all') {
        filtered = filtered.filter(service =>
          service.provider === selectedProvider
        );
      }

      // Apply price range filter
      if (priceRange.min || priceRange.max) {
        filtered = filtered.filter(service => {
          const price = parseFloat(service.price) || 0;
          const min = priceRange.min ? parseFloat(priceRange.min) : 0;
          const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
          return price >= min && price <= max;
        });
      }

      setFilteredServices(filtered);
    } catch (err) {
      console.error('Error filtering services:', err);
      setError('Failed to filter services.');
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = async (categoryId) => {
    try {
      setSelectedCategory(categoryId);
      setLoading(true);
      setError(null);

      if (categoryId === 'all') {
        // Fetch all services
        const response = await serviceAPI.getServices();
        setFilteredServices(response.data);
      } else {
        // Fetch services by category
        const response = await serviceAPI.getServicesByCategory(categoryId);
        setFilteredServices(response.data);
      }
    } catch (err) {
      console.error('Error filtering by category:', err);
      setError('Failed to filter services by category.');
      // Fallback to client-side filtering
      if (categoryId === 'all') {
        setFilteredServices(services);
      } else {
        const filtered = services.filter(service =>
          service.category?.toLowerCase() === categoryId.toLowerCase()
        );
        setFilteredServices(filtered);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedProvider('all');
    setPriceRange({ min: '', max: '' });
    fetchServices();
  };

  const getServiceIcon = (category) => {
    return serviceIcons[category?.toLowerCase()] || serviceIcons.default;
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `TK${price}`;
    }
    return price || 'Contact for pricing';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Loading state
  if (loading && services.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0C2F4F] animate-spin mx-auto mb-4" />
          <p className="text-lg text-[#0C2F4F]">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && services.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="px-6 py-3 bg-[#0C2F4F] text-white rounded-lg hover:bg-[#0A2540] transition-colors"
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
        title="IT Services - Web Development, Mobile Apps & Cloud Solutions | jTech"
        description="Explore jTech's comprehensive IT services: custom web development, mobile app solutions, cloud computing, database management, security, and IT consulting. Get expert technology solutions for your business."
        keywords="IT services, web development services, mobile app development, cloud computing, database management, IT security, IT consulting, software development, technology services"
        url="https://jtechvision.com/services"
        ogImage="https://jtechvision.com/og-services.jpg"
        twitterImage="https://jtechvision.com/twitter-services.jpg"
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-3 h-3 mr-1.5" />
            Our Services
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
              Technology Solutions
            </span>
          </h1>

          <p className="text-lg text-[#0C2F4F] leading-relaxed font-light max-w-3xl mx-auto">
            We provide comprehensive technology services designed to accelerate your business growth and digital transformation journey.
          </p>
        </motion.div>




        {/* Loading state for filtering */}
        {loading && services.length > 0 && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 text-[#0C2F4F] animate-spin mx-auto mb-2" />
            <p className="text-[#0C2F4F]">Filtering services...</p>
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

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {!loading && filteredServices.length > 0 ? (
              filteredServices.map((service, index) => {
                const IconComponent = getServiceIcon(service.category);
                return (
                  <motion.div
                    key={service._id}
                    className="relative group bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer overflow-hidden"
                    variants={cardVariants}
                    layout
                    onMouseEnter={() => setHoveredService(service._id)}
                    onMouseLeave={() => setHoveredService(null)}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="relative z-10">
                      {/* Status Badge */}
                      {service.status && (
                        <div className="absolute top-0 right-0 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      )}

                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                        whileHover={{
                          rotate: [0, -10, 10, -5, 0],
                          scale: [1, 1.1, 1.05, 1.08, 1],
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-8 h-8 object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <IconComponent
                          className="w-8 h-8 text-[#0C2F4F]/80"
                          style={{display: service.image ? 'none' : 'block'}}
                        />
                      </motion.div>

                      <h3 className="font-bold text-xl text-[#0C2F4F] mb-3 font-serif">
                        {service.title}
                      </h3>

                      <p className="text-[#0C2F4F] text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Service Details */}
                      <div className="space-y-2 mb-6">
                        {service.category && (
                          <div className="flex items-center text-sm text-[#0C2F4F]">
                            <Tag className="w-4 h-4 text-[#0C2F4F] mr-2 flex-shrink-0" />
                            Category: {service.category}
                          </div>
                        )}
                        {service.duration && (
                          <div className="flex items-center text-sm text-[#0C2F4F]">
                            <Clock className="w-4 h-4 text-[#0C2F4F] mr-2 flex-shrink-0" />
                            Duration: {service.duration}
                          </div>
                        )}
                        {service.provider && (
                          <div className="flex items-center text-sm text-[#0C2F4F]">
                            <User className="w-4 h-4 text-[#0C2F4F] mr-2 flex-shrink-0" />
                            Provider: {service.provider}
                          </div>
                        )}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-1">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-[#0C2F4F]">
                                <CheckCircle className="w-4 h-4 text-[#0C2F4F] mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                            {service.features.length > 3 && (
                              <div className="text-sm text-[#0C2F4F]/70">
                                +{service.features.length - 3} more features
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#0C2F4F]">
                          {formatPrice(service.price)}
                        </span>

                        <div className="flex gap-2">
                          <Link to={`/service/${service._id}`}>
                            <motion.button
                              className="group relative overflow-hidden bg-white border-2 border-[#0C2F4F] text-[#0C2F4F] px-3 py-2 rounded-xl font-bold text-sm tracking-wide hover:bg-[#0C2F4F] hover:text-white transition-all duration-300 font-serif"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="relative z-10">View</span>
                              <Eye className="inline-block w-4 h-4 ml-1 group-hover:scale-110 transition-transform duration-300" />
                            </motion.button>
                          </Link>

                          <Link to={`/buy-service/${service._id}`}>
                            <motion.button
                              className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-4 py-2 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="relative z-10">Order</span>
                              <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : !loading ? (
              <div className="col-span-full text-center py-16">
                <div className="bg-white rounded-3xl p-16 shadow-xl border border-[#0C2F4F]/10 max-w-lg mx-auto">
                  <Settings className="w-20 h-20 text-[#0C2F4F]/40 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-[#0C2F4F] mb-4 font-serif">No Services Found</h3>
                  <p className="text-[#0C2F4F]/60 font-serif text-lg mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-[#0C2F4F] hover:bg-[#0A2540] text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/5 backdrop-blur-xl p-12 rounded-3xl border border-[#0C2F4F]/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#0C2F4F] mb-4 font-serif">
            Ready to Transform Your Business?
          </h2>
          <p className="text-[#0C2F4F] text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that meets your unique requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-xl font-bold text-lg tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button
              className="group relative border-2 border-[#0C2F4F] text-[#0C2F4F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0C2F4F]/5 transition-all duration-300 font-serif backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Schedule Consultation</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};