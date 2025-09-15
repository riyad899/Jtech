import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Globe,
  Clock,
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Code,
  Palette,
  TrendingUp,
  Settings,
  Lock,
  Wifi,
  Monitor,
  Headphones
} from 'lucide-react';

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);


  const additionalFeatures = [
    { name: 'Cloud Integration', icon: Cloud, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'Mobile First', icon: Smartphone, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'Clean Code', icon: Code, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'Modern Design', icon: Palette, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'Analytics', icon: TrendingUp, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'API Ready', icon: Settings, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'Secure Auth', icon: Lock, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' },
    { name: 'PWA Support', icon: Wifi, gradient: 'from-[#0C2F4F] to-[#0C2F4F]' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
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
            <Zap className="w-4 h-4 mr-2" />
            Features
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Cutting-edge technology meets intuitive design. Discover the features
            that make our solutions stand out from the competition.
          </p>
        </motion.div>

        {/* Main Features Grid */}


        {/* Additional Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
 

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-brand-light/80 backdrop-blur-xl rounded-2xl border border-[#0C2F4F]/20 shadow-xl hover:shadow-[#0C2F4F]/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <IconComponent className="w-8 h-8 text-brand-light" />
                  </motion.div>
                  <h4 className="font-light text-lg text-[#0C2F4F]">
                    {feature.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          className="bg-brand-light/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 shadow-xl p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-[#0C2F4F] font-light">
              See how we compare against the competition
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#0C2F4F]/20">
                  <th className="text-left py-4 px-6 font-light text-[#0C2F4F]">Feature</th>
                  <th className="text-center py-4 px-6 font-light text-[#0C2F4F]">Our Platform</th>
                  <th className="text-center py-4 px-6 font-light text-[#0C2F4F]/70">Competitors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Performance', us: '99.9% Uptime', them: '95% Uptime' },
                  { feature: 'Security', us: 'Bank-level', them: 'Basic SSL' },
                  { feature: 'Scalability', us: 'Auto-scaling', them: 'Manual' },
                  { feature: 'Support', us: '24/7 Live', them: 'Email only' },
                  { feature: 'Updates', us: 'Real-time', them: 'Daily sync' }
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-[#0C2F4F]/10 hover:bg-[#0C2F4F]/5 transition-colors duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-4 px-6 font-light text-[#0C2F4F]">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-full text-sm font-light">
                        ✓ {row.us}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-[#0C2F4F]/5 text-[#0C2F4F]/70 rounded-full text-sm font-light">
                        {row.them}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
