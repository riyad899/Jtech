import React from 'react';
import { motion } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "SEO Optimization", "Fast Loading", "Mobile-First"],
      price: "Starting at $999",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["Native Performance", "Cross-Platform", "Push Notifications", "App Store Ready"],
      price: "Starting at $2,999",
      popular: true
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: ["AWS/Azure/GCP", "Auto Scaling", "Load Balancing", "24/7 Monitoring"],
      price: "Starting at $499/month",
      popular: false
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Comprehensive database design, optimization, and management",
      features: ["Performance Tuning", "Data Migration", "Backup Solutions", "Security"],
      price: "Starting at $299/month",
      popular: false
    },
    {
      icon: Wifi,
      title: "IoT Solutions",
      description: "Smart device integration and IoT ecosystem development",
      features: ["Device Integration", "Real-time Analytics", "Remote Monitoring", "Custom Hardware"],
      price: "Starting at $1,999",
      popular: false
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security audits and protection solutions",
      features: ["Security Audits", "Penetration Testing", "Compliance", "24/7 Protection"],
      price: "Starting at $799/month",
      popular: false
    }
  ];

  return (
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

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`relative group bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer overflow-hidden ${
                service.popular
                  ? 'border-[#0C2F4F]/50 ring-2 ring-[#0C2F4F]/20'
                  : 'border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: [1, 1.1, 1.05, 1.08, 1],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-8 h-8 text-[#0C2F4F]/80" />
                </motion.div>

                <h3 className="font-bold text-xl text-[#0C2F4F] mb-3 font-serif">
                  {service.title}
                </h3>

                <p className="text-[#0C2F4F] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-[#0C2F4F]">
                      <CheckCircle className="w-4 h-4 text-[#0C2F4F] mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0C2F4F] font-serif">
                    {service.price}
                  </span>

                  <motion.button
                    className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-4 py-2 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Get Quote</span>
                    <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
  );
};