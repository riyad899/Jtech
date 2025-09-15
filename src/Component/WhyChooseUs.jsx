import React from 'react';
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
  TrendingUp
} from 'lucide-react';

const WhyChooseUs = () => {
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
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Highly skilled professionals with 10+ years of experience in cutting-edge technologies.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },

    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Rapid development cycles with agile methodologies ensuring quick time-to-market.",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },

  ];

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

                <motion.div
                  className="flex items-center text-[#0C2F4F] text-sm font-medium group-hover:text-[#0C2F4F] transition-colors duration-300"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-serif">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Decorative Elements */}

    </section>
  );
};

export default WhyChooseUs;