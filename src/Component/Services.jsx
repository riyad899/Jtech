import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  ShoppingCart,
  Cloud,
  Code,
  Database,
  Shield,
  Zap,
  Monitor,
  Cpu,
  ChevronRight,
  Star,
  X,
  Clock,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Web Development',
      icon: Globe,
      description: 'Custom websites and web applications built with modern technologies',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Secure'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Our web development services combine cutting-edge technology with intuitive design to create powerful digital experiences. We specialize in responsive, fast-loading websites that convert visitors into customers.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
      timeline: '4-8 weeks',
      startingPrice: '$5,000'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native Performance', 'Cross Platform', 'App Store Ready', 'Push Notifications'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Transform your ideas into powerful mobile applications that engage users across all platforms. Our team creates intuitive, high-performance apps that deliver exceptional user experiences.',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
      timeline: '6-12 weeks',
      startingPrice: '$8,000'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      icon: Palette,
      description: 'Beautiful and intuitive user interfaces that enhance user experience',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Create stunning digital experiences with our comprehensive UI/UX design services. We focus on user-centered design principles to craft interfaces that are both beautiful and functional.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
      timeline: '3-6 weeks',
      startingPrice: '$3,000'
    },
    {
      id: 4,
      title: 'Digital Marketing',
      icon: TrendingUp,
      description: 'Comprehensive digital marketing strategies to grow your business',
      features: ['SEO & SEM', 'Social Media', 'Content Marketing', 'Analytics'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Amplify your online presence with data-driven digital marketing strategies. We help businesses reach their target audience and achieve measurable growth through comprehensive marketing campaigns.',
      technologies: ['Google Analytics', 'SEMrush', 'HubSpot', 'Mailchimp', 'Facebook Ads', 'Google Ads'],
      timeline: '2-4 weeks setup',
      startingPrice: '$2,000/month'
    },
    {
      id: 5,
      title: 'E-commerce Solutions',
      icon: ShoppingCart,
      description: 'Complete online store solutions with payment integration',
      features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Multi-vendor'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Launch your online business with our comprehensive e-commerce solutions. From custom storefronts to complex marketplace platforms, we build scalable solutions that drive sales.',
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'BigCommerce'],
      timeline: '6-10 weeks',
      startingPrice: '$7,000'
    },
    {
      id: 6,
      title: 'Cloud Services',
      icon: Cloud,
      description: 'Scalable cloud infrastructure and deployment solutions',
      features: ['Auto Scaling', 'Load Balancing', 'Backup Solutions', '99.9% Uptime'],
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      detailedDescription: 'Modernize your infrastructure with robust cloud solutions that scale with your business. We provide secure, reliable cloud services that ensure your applications are always available.',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
      timeline: '2-6 weeks',
      startingPrice: '$1,500/month'
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
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
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>

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
            <Star className="w-4 h-4 mr-2" />
            Our Services
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            From innovative web solutions to cutting-edge mobile apps, we deliver
            technology services that drive your business forward.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-4 xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                className={`group relative bg-brand-light/80 backdrop-blur-xl p-6 lg:p-4 xl:p-6 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer overflow-hidden min-h-[400px] lg:min-h-[450px] xl:min-h-[400px] flex flex-col ${
                  hoveredCard === service.id ? 'hover:shadow-2xl' : ''
                }`}
                variants={cardVariants}
                layout
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10 }}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></motion.div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 lg:mb-3 xl:mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}
                    whileHover={{
                      rotate: [0, -10, 10, -5, 0],
                      scale: [1, 1.1, 1.05, 1.08, 1],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-brand-light" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-light text-lg lg:text-base xl:text-lg text-[#0C2F4F] mb-3 lg:mb-2 xl:mb-3 group-hover:text-[#0C2F4F] flex-shrink-0">
                    {service.title}
                  </h3>
                  <p className="text-[#0C2F4F] mb-4 lg:mb-3 xl:mb-4 leading-relaxed font-light text-sm lg:text-xs xl:text-sm flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 lg:space-y-1 xl:space-y-2 mb-4 lg:mb-3 xl:mb-4 flex-shrink-0">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center text-xs lg:text-xs xl:text-sm text-[#0C2F4F] font-light"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`w-1.5 h-1.5 lg:w-1 lg:h-1 xl:w-1.5 xl:h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-2 lg:mr-1.5 xl:mr-2 flex-shrink-0`}></div>
                        <span className="line-clamp-1">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className={`group/btn relative overflow-hidden bg-gradient-to-r ${service.gradient} text-brand-light px-4 lg:px-3 xl:px-4 py-2 lg:py-1.5 xl:py-2 rounded-xl font-light text-xs lg:text-xs xl:text-sm tracking-wide shadow-xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 w-full flex-shrink-0 mt-auto`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(service)}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Learn More
                      <ChevronRight className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 ml-1 lg:ml-1 xl:ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-r ${selectedService.gradient} text-white rounded-t-3xl`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center`}>
                  <selectedService.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedService.title}</h2>
                  <p className="text-xl opacity-90">{selectedService.description}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0C2F4F] mb-4">About This Service</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedService.detailedDescription}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-bold text-[#0C2F4F] mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {selectedService.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-bold text-[#0C2F4F] mb-4">Technologies We Use</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-[#0C2F4F] mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Timeline</div>
                    <div className="font-bold text-[#0C2F4F]">{selectedService.timeline}</div>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-[#0C2F4F] mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Starting Price</div>
                    <div className="font-bold text-[#0C2F4F]">{selectedService.startingPrice}</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 text-[#0C2F4F] mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Service Rating</div>
                    <div className="font-bold text-[#0C2F4F]">4.9/5 ⭐</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
            
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Services;
