import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
  User,
  Building,
  Calendar
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
  };

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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@smarttech.com",
      subtitle: "Get a response within 24 hours",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri, 9 AM - 6 PM EST",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Street, Silicon Valley",
      subtitle: "San Francisco, CA 94105",
      gradient: "from-[#0C2F4F]/10 to-[#0C2F4F]/5"
    }
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "IoT Solutions",
    "Hardware Solutions",
    "Consulting",
    "Other"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="w-3 h-3 mr-1.5" />
            Get In Touch
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-light leading-tight tracking-tight mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Let's Build Something Amazing
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-[#0C2F4F] leading-relaxed font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your ideas into reality? Our team is here to help you every step of the way.
            <span className="text-[#0C2F4F] font-medium"> Start your journey with us today.</span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Contact Information */}
          <motion.div
            className="h-full flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 shadow-xl relative overflow-hidden h-full flex flex-col"
              variants={cardVariants}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 hover:opacity-100 transition-opacity duration-500"
              ></motion.div>

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="w-12 h-12 bg-[#0C2F4F]/10 backdrop-blur-lg rounded-xl flex items-center justify-center mb-6 shadow-lg border border-[#0C2F4F]/20"
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: [1, 1.1, 1.05, 1.08, 1],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Globe className="w-6 h-6 text-[#0C2F4F]" />
                </motion.div>

                <h3 className="font-bold text-lg text-[#0C2F4F] mb-3 font-serif">Contact Information</h3>
                <p className="text-[#0C2F4F] text-sm leading-relaxed font-light mb-4">
                  We're available through multiple channels to assist you with your technology needs.
                </p>

                <div className="space-y-4 flex-grow">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 group cursor-pointer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-8 h-8 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center shadow-sm border border-white/30 group-hover:shadow-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="w-4 h-4 text-[#0C2F4F]/80" />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-[#0C2F4F] font-serif text-sm">{item.title}</h4>
                        <p className="text-[#0C2F4F] text-sm font-medium">{item.details}</p>
                        <p className="text-[#0C2F4F]/70 text-xs">{item.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 pt-4 border-t border-[#0C2F4F]/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center space-x-2 text-[#0C2F4F]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium font-serif">Business Hours</span>
                  </div>
                  <p className="text-[#0C2F4F]/70 text-xs mt-1">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-[#0C2F4F]/70 text-xs">Saturday: 10:00 AM - 4:00 PM EST</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="h-full flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 shadow-xl relative overflow-hidden h-full flex flex-col"
              whileHover={{
                borderColor: "rgba(12, 47, 79, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 hover:opacity-100 transition-opacity duration-500"
              ></motion.div>

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="flex items-center space-x-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-[#0C2F4F]/10 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-lg border border-[#0C2F4F]/20"
                    whileHover={{
                      rotate: [0, -10, 10, -5, 0],
                      scale: [1, 1.1, 1.05, 1.08, 1],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="w-6 h-6 text-[#0C2F4F]" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-[#0C2F4F] font-serif">Send us a Message</h3>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-[#0C2F4F] text-sm font-medium mb-2 font-serif">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300 text-sm"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-[#0C2F4F] text-sm font-medium mb-2 font-serif">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300 text-sm"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-[#0C2F4F] text-sm font-medium mb-2 font-serif">
                        <Building className="w-4 h-4 inline mr-2" />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300 text-sm"
                        placeholder="Your company name (optional)"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-[#0C2F4F] text-sm font-medium mb-2 font-serif">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] transition-all duration-300 text-sm"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-[#0C2F4F] text-sm font-medium mb-2 font-serif">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300 resize-none text-sm flex-grow"
                      placeholder="Tell us about your project or question..."
                    ></textarea>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between mt-auto pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {isSubmitted && (
                      <motion.div
                        className="flex items-center text-green-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Message sent successfully!</span>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Contact Actions */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className="group bg-brand-light/80 backdrop-blur-xl p-6 rounded-2xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-lg hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer text-center"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></motion.div>

              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30 mx-auto"
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: [1, 1.1, 1.05, 1.08, 1],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-6 h-6 text-[#0C2F4F]/80" />
                </motion.div>

                <h3 className="font-bold text-lg text-[#0C2F4F] mb-2 font-serif">{item.title}</h3>
                <p className="text-[#0C2F4F] text-sm font-medium mb-1">{item.details}</p>
                <p className="text-[#0C2F4F]/70 text-xs">{item.subtitle}</p>

                <motion.div
                  className="flex items-center justify-center text-[#0C2F4F] text-sm font-medium mt-4 group-hover:text-[#0C2F4F] transition-colors duration-300"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-serif">Contact Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </section>
  );
};

export default ContactUs;