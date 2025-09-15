import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Heart,
  Filter,
  Search
} from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Reset hover state when category changes
  useEffect(() => {
    setHoveredProduct(null);
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Products', icon: Monitor },
    { id: 'computers', name: 'Computers', icon: Monitor },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'accessories', name: 'Accessories', icon: Keyboard }
  ];

  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'computers',
      price: 2499,
      originalPrice: 2799,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviews: 128,
      features: ['M2 Pro Chip', '32GB RAM', '1TB SSD', 'Liquid Retina XDR'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'mobile',
      price: 999,
      originalPrice: 1199,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 256,
      features: ['A17 Pro Chip', '128GB Storage', 'Pro Camera', 'Titanium Design'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'audio',
      price: 299,
      originalPrice: 399,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviews: 89,
      features: ['Noise Canceling', '30hr Battery', 'Hi-Res Audio', 'Quick Charge'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 4,
      name: 'Gaming Setup',
      category: 'computers',
      price: 1899,
      originalPrice: 2299,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviews: 67,
      features: ['RTX 4080', '32GB DDR5', '1TB NVMe', '144Hz Monitor'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      category: 'accessories',
      price: 149,
      originalPrice: 199,
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviews: 234,
      features: ['Cherry MX Blue', 'RGB Backlight', 'Wireless', 'Hot-Swappable'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 6,
      name: 'Samsung Galaxy S24',
      category: 'mobile',
      price: 799,
      originalPrice: 999,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 178,
      features: ['Snapdragon 8 Gen 3', '256GB Storage', 'AI Camera', '5G Ready'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

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

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-light text-sm tracking-wide transition-all duration-300 backdrop-blur-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-[#0C2F4F]/50 hover:bg-[#0C2F4F]/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[600px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={`${selectedCategory}-${product.id}`}
                  className="group relative bg-brand-light/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer overflow-hidden"
                  variants={cardVariants}
                  layout
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  whileHover={{ y: -10 }}
                >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></motion.div>

              {/* Sale Badge */}
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-white px-3 py-1 rounded-full text-xs font-bold">
                  SALE
                </div>
              )}

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-[#0C2F4F] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              <div className="relative z-10 p-10">
                {/* Product Image Placeholder */}
                <div className={`w-full h-48 bg-gradient-to-br ${product.gradient} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="text-white/80 text-6xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {product.category === 'computers' && <Monitor className="w-16 h-16" />}
                    {product.category === 'mobile' && <Smartphone className="w-16 h-16" />}
                    {product.category === 'audio' && <Headphones className="w-16 h-16" />}
                    {product.category === 'accessories' && <Keyboard className="w-16 h-16" />}
                  </motion.div>

                  {/* Quick View Button */}
                  <motion.button
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye className="w-8 h-8 text-white" />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <h3 className="font-light text-lg text-[#0C2F4F] group-hover:text-[#0C2F4F]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-[#0C2F4F] fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#0C2F4F] font-light">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-[#0C2F4F] font-light">
                        <div className={`w-2 h-2 bg-gradient-to-r ${product.gradient} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-light text-[#0C2F4F]">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-[#0C2F4F]/70 line-through font-light">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    className={`group/btn relative overflow-hidden bg-gradient-to-r ${product.gradient} text-brand-light px-6 py-3 rounded-xl font-light text-sm tracking-wide shadow-xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 w-full`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center py-20"
                variants={cardVariants}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0C2F4F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-[#0C2F4F]/50" />
                  </div>
                  <h3 className="text-xl font-light text-[#0C2F4F] mb-2">No Products Found</h3>
                  <p className="text-[#0C2F4F]/70 font-light">Try selecting a different category</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-2xl font-light text-lg tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Shop;
