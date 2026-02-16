import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPublic from '../Hook/useAxiousPublic';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../AuthProvider/AuthContext';
import {
  Monitor,
  Smartphone,
  Headphones,
  Cpu,
  HardDrive,
  Keyboard,
  Mouse,
  Wifi,
  Camera,
  Battery,
  Star,
  ShoppingCart,
  Eye,
  Filter,
  Search,
  ShoppingBag,
  Plus,
  CheckCircle,
  X
} from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const { productAPI } = useAxiosPublic();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts();
        // Limit to 6 products only
        const limitedProducts = response.data.slice(0, 6);
        setProducts(limitedProducts);
        setError('');
      } catch (err) {
        setError('Failed to fetch products: ' + (err.response?.data?.message || err.message));
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once

  // Helper functions for product card design
  const getCategoryIcon = (category) => {
    const icons = {
      computers: Monitor,
      mobile: Smartphone,
      audio: Headphones,
      accessories: Keyboard,
      laptop: Monitor,
      phone: Smartphone,
      gaming: Cpu,
      electronics: Monitor
    };
    return icons[category?.toLowerCase()] || Monitor;
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
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>

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
            <ShoppingCart className="w-4 h-4 mr-2" />
            Our Shop
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Premium Tech Store
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Discover the latest technology products with competitive prices and exceptional quality.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C2F4F]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {products.length > 0 ? (
                products.map((product) => {
                  const IconComponent = getCategoryIcon(product.category);
                  const isExpensive = product.price > 1000;
                  const isMidRange = product.price > 500 && product.price <= 1000;
                  const isBudget = product.price <= 500;

                  return (
                    <motion.div
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#0C2F4F]/20 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                      variants={cardVariants}
                      layout
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      whileHover={{ y: -10 }}
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
                        <div className="mb-4">
                          <span className={`text-2xl font-bold ${getPriceColor(product.price)}`}>
                            TK{product.price}
                          </span>
                          {product.price > 100 && (
                            <span className="text-sm text-[#0C2F4F]/40 line-through ml-2">
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
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  className="col-span-full flex flex-col items-center justify-center py-20"
                  variants={cardVariants}
                >
                  <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-[#0C2F4F]/40 mx-auto mb-4" />
                    <p className="text-xl mb-2 text-[#0C2F4F]/70">
                      No products found
                    </p>
                    <p className="text-sm mb-6 text-[#0C2F4F]/50">
                      No products available at the moment
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
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
    </section>
  );
};

export default Shop;
