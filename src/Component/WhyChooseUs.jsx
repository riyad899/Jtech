import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  Users,
  Trophy,
  Zap,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
  X
} from 'lucide-react';

const WhyChooseUs = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Trusted Security",
      description: "Enterprise-grade security protocols to protect your data and digital assets with 99.9% reliability.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5",
      detailedInfo: {
        overview: "Our comprehensive security framework protects your business from cyber threats and ensures data integrity.",
        features: [
          "Multi-layer encryption protocols",
          "Regular security audits and penetration testing",
          "24/7 threat monitoring and response",
          "Compliance with GDPR, HIPAA, and SOC 2",
          "Secure cloud infrastructure",
          "Backup and disaster recovery"
        ],
        benefits: [
          "99.9% uptime guarantee",
          "Zero data breaches in 5+ years",
          "Insurance coverage for data incidents",
          "Dedicated security team"
        ]
      }
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5",
      detailedInfo: {
        overview: "Our dedicated support team is always available to help you resolve issues and optimize your systems.",
        features: [
          "24/7 live chat and phone support",
          "Remote troubleshooting and fixes",
          "Proactive system monitoring",
          "Regular maintenance schedules",
          "Emergency response protocols",
          "Comprehensive documentation"
        ],
        benefits: [
          "Average response time: 2 minutes",
          "95% issues resolved on first contact",
          "Multi-channel support options",
          "Dedicated account managers"
        ]
      }
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Highly skilled professionals with 10+ years of experience in cutting-edge technologies.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5",
      detailedInfo: {
        overview: "Our team consists of industry veterans and certified professionals who stay ahead of technology trends.",
        features: [
          "Senior developers with 10+ years experience",
          "Certified professionals in latest technologies",
          "Continuous learning and training programs",
          "Cross-functional collaboration approach",
          "Agile development methodologies",
          "Code review and quality assurance"
        ],
        benefits: [
          "Faster project delivery",
          "Higher code quality",
          "Best practice implementation",
          "Knowledge transfer and documentation"
        ]
      }
    },

    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Rapid development cycles with agile methodologies ensuring quick time-to-market.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5",
      detailedInfo: {
        overview: "We use proven agile methodologies and modern development tools to deliver projects faster without compromising quality.",
        features: [
          "Agile/Scrum development process",
          "Continuous integration and deployment",
          "Automated testing and quality checks",
          "Regular sprint reviews and demos",
          "Parallel development workflows",
          "Rapid prototyping capabilities"
        ],
        benefits: [
          "50% faster delivery than industry average",
          "Weekly progress updates",
          "Early feedback integration",
          "Reduced time-to-market"
        ]
      }
    },

  ];

  const openModal = (feature) => {
    setSelectedFeature(feature);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = 'unset';
  };

  const stats = [
    { number: "500+", label: "Projects Completed", icon: CheckCircle },
    { number: "98%", label: "Client Satisfaction", icon: Heart },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: TrendingUp }
  ];

  return (
    <section className="py-20 bg-white text-[#0C2F4F] overflow-hidden relative">

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-white border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Star className="w-3 h-3 mr-1.5" />
            Why Choose Us
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-light leading-tight tracking-tight mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Excellence in Every Project
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-[#0C2F4F] leading-relaxed font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We combine cutting-edge technology with proven expertise to deliver solutions that exceed expectations.
            <span className="text-[#0C2F4F] font-medium"> Your success is our priority.</span>
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4  mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[#0C2F4F]/20 transition-all duration-300 border border-[#0C2F4F]/20 mx-auto"
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  scale: [1, 1.1, 1.05, 1.08, 1],
                }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-[#0C2F4F]" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0C2F4F] mb-2 ">{stat.number}</h3>
              <p className="text-[#0C2F4F] text-sm font-light">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
                <motion.div
                  className={`absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></motion.div>              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-[#0C2F4F]/20"
                  whileHover={{
                    rotate: [0, -15, 15, -10, 5, 0],
                    scale: [1, 1.1, 1.05, 1.08, 1],
                    y: [-2, -4, -2, -3, -2]
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <feature.icon className="w-7 h-7 text-[#0C2F4F]" />
                </motion.div>

                <motion.h3
                  className="font-bold text-xl text-[#0C2F4F] mb-4 font-serif"
                  whileHover={{ x: 4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>

                <p className="text-[#0C2F4F] text-sm leading-relaxed mb-6 font-light">
                  {feature.description}
                </p>

                <motion.button
                  className="flex items-center text-[#0C2F4F] text-sm font-medium group-hover:text-[#0C2F4F] transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openModal(feature)}
                >
                  <span className="font-serif">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Decorative Elements */}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-r ${selectedFeature.gradient} bg-[#0C2F4F] text-white rounded-t-3xl`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <selectedFeature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedFeature.title}</h2>
                  <p className="text-xl opacity-90">{selectedFeature.description}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0C2F4F] mb-4">Overview</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedFeature.detailedInfo.overview}
                </p>
              </div>

              {/* Features and Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-bold text-[#0C2F4F] mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {selectedFeature.detailedInfo.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xl font-bold text-[#0C2F4F] mb-4">Benefits</h4>
                  <div className="space-y-3">
                    {selectedFeature.detailedInfo.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </section>
  );
};

export default WhyChooseUs;