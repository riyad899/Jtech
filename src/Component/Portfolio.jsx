import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Smartphone,
  Monitor,
  Code,
  Database,
  Palette,
  Camera,
  Zap,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Tag,
  Filter,
  CheckCircle,
  Clock,
  User,
  ArrowRight,
  Eye,
  Settings,
  Cloud,
  Shield,
  Wifi,
  Users,
  Sparkles
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';

// Service icons mapping
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

const Portfolio = () => {
  const { serviceAPI } = useAxiosPublic();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);

  // Fetch services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await serviceAPI.getServices();
        const servicesData = response.data.data || response.data || [];
        // Show only 6 services for portfolio
        setServices(servicesData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const getServiceIcon = (category) => {
    return serviceIcons[category?.toLowerCase()] || serviceIcons.default;
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `Tk${price}`;
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

  return (
    <section className="py-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-light tracking-wide backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Code className="w-4 h-4 mr-2" />
            Portfolio & Projects
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Explore our range of professional services designed to help your business grow
            and succeed in the digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 min-h-[420px] animate-pulse"
                  variants={cardVariants}
                >
                  <div className="w-16 h-16 bg-[#0C2F4F]/10 rounded-xl mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-[#0C2F4F]/10 rounded w-3/4"></div>
                    <div className="h-4 bg-[#0C2F4F]/10 rounded w-full"></div>
                    <div className="h-4 bg-[#0C2F4F]/10 rounded w-2/3"></div>
                    <div className="flex space-x-2 pt-4">
                      <div className="h-8 bg-[#0C2F4F]/10 rounded flex-1"></div>
                      <div className="h-8 bg-[#0C2F4F]/10 rounded flex-1"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => {
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
                        <span className="text-lg font-bold text-[#0C2F4F] font-serif">
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
            ) : (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center py-20"
                variants={cardVariants}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0C2F4F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-[#0C2F4F]/50" />
                  </div>
                  <h3 className="text-xl font-light text-[#0C2F4F] mb-2">No Services Found</h3>
                  <p className="text-[#0C2F4F]/70 font-light">Services will appear here once available</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
