import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Monitor,
  HardDrive,
  Smartphone,
  Wifi,
  Sparkles,
  Send,
  Heart,
  ChevronUp,
  Globe,
  Shield,
  Clock
} from 'lucide-react';
import logo from '../images/logo.png';

export const Footer = () => {
  const [email, setEmail] = useState('');

  // Animation variants
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

  const itemVariants = {
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

  const socialVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.2,
      y: -8,
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const services = [
    { icon: Monitor, name: "Web Development", delay: 0 },
    { icon: HardDrive, name: "Hardware Solutions", delay: 0.1 },
    { icon: Smartphone, name: "Mobile Apps", delay: 0.2 },
    { icon: Wifi, name: "IoT Devices", delay: 0.3 },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", color: "hover:bg-[#0C2F4F]", delay: 0 },
    { icon: Twitter, name: "Twitter", color: "hover:bg-[#0C2F4F]", delay: 0.1 },
    { icon: Instagram, name: "Instagram", color: "hover:bg-[#0C2F4F]", delay: 0.2 },
    { icon: Linkedin, name: "LinkedIn", color: "hover:bg-[#0C2F4F]", delay: 0.3 },
    { icon: Youtube, name: "YouTube", color: "hover:bg-[#0C2F4F]", delay: 0.4 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(254,254,254,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-brand-light/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      ></motion.div>
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-brand-light/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 left-1/3 w-20 h-20 bg-brand-light/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              className="flex items-center space-x-4"
              variants={logoVariants}
              animate="animate"
            >
              <img
                src={logo}
                alt="Smart Tech Solutions Logo"
                className="w-20 h-20 object-contain rounded-2xl border-2 border-brand-light/30 shadow-lg bg-white backdrop-blur-lg p-2"
              />
              <h3 className="text-2xl font-bold font-serif text-brand-light">
                Smart Tech Solutions
              </h3>
            </motion.div>

            <p className="text-brand-light/80 leading-relaxed">
              Delivering cutting-edge technology solutions that transform businesses and accelerate growth in the digital age.
            </p>

            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-brand-light/80 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 8 }}
              >
                <MapPin className="w-5 h-5 text-brand-light" />
                <span>123 Tech Street, Digital City</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 text-brand-light/80 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 8 }}
              >
                <Phone className="w-5 h-5 text-brand-light" />
                <span>+1 (555) 123-4567</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 text-brand-light/80 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 8 }}
              >
                <Mail className="w-5 h-5 text-brand-light" />
                <span>hello@smarttech.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-brand-light mb-6">Our Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="group flex items-center space-x-3 text-brand-light/80 hover:text-brand-light transition-all duration-300 cursor-pointer"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    className="w-8 h-8 bg-brand-light/10 backdrop-blur-lg rounded-lg flex items-center justify-center group-hover:bg-brand-light/20 transition-all duration-300 border border-brand-light/20"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-4 h-4 text-brand-light group-hover:text-brand-light transition-colors duration-300" />
                  </motion.div>
                  <span className="group-hover:font-medium transition-all duration-300">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-brand-light mb-6">Quick Links</h3>
            <div className="space-y-4">
              {['About Us', 'Portfolio', 'Blog', 'Careers', 'Support', 'Privacy Policy'].map((link, index) => (
                <motion.div
                  key={link}
                  className="text-brand-light/80 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                >
                  {link}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-brand-light mb-6">Stay Updated</h3>
            <p className="text-brand-light/80 text-sm leading-relaxed mb-6">
              Subscribe to our newsletter for the latest tech insights and updates.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-brand-light/5 backdrop-blur-xl border border-brand-light/10 rounded-xl text-brand-light placeholder-brand-light/50 focus:border-brand-light/30 focus:outline-none transition-colors duration-300"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light p-2 rounded-lg hover:from-[#0C2F4F]/80 hover:via-[#0C2F4F]/80 hover:to-[#0C2F4F]/80 transition-all duration-300 shadow-lg border border-brand-light/20"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.form>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-brand-light font-serif">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    className="w-10 h-10 bg-brand-light/5 backdrop-blur-xl border border-brand-light/10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-brand-light/20 hover:border-brand-light/30"
                    variants={socialVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: social.delay }}
                    whileHover="hover"
                  >
                    <social.icon className="w-5 h-5 text-brand-light" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              className="flex items-center space-x-2 text-brand-light/70 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span>© 2024 Smart Tech Solutions. Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for innovation</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6 text-sm text-brand-light/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="flex items-center space-x-2 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: -5 }}
              >
                <Shield className="w-4 h-4" />
                <span>Security First</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: -5 }}
              >
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 hover:text-brand-light transition-colors duration-300 cursor-pointer"
                whileHover={{ x: -5 }}
              >
                <Globe className="w-4 h-4" />
                <span>Global Reach</span>
              </motion.div>
            </motion.div>

            <motion.button
              className="flex items-center space-x-2 text-brand-light hover:text-brand-light/80 transition-colors duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium font-serif">Back to Top</span>
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-light/30 to-transparent"></div>
    </footer>
  );
};