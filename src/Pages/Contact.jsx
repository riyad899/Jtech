import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

export const Contact = () => {
  const { messageAPI } = useAxiosPublic();

  // Structured data for Contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact jTech",
    "description": "Get in touch with jTech for technology solutions, project inquiries, or support. We're here to help transform your business with innovative IT solutions.",
    "url": "https://jtechvision.com/contact"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
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

    try {
      // Prepare message data according to backend API requirements
      // Send empty strings as null
      const messageData = {
        fullName: formData.name,
        email: formData.email,
        companyName: formData.company.trim() || null,
        serviceInterestedIn: formData.subject.trim() || null,
        message: formData.message
      };

      // Submit the entire form data object to /messages endpoint
      const response = await messageAPI.submitMessage(messageData);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Show toast notification
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting message:', error);

      // Show error toast
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "jtech6996@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+8801969576277",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Savar, Dhaka, Bangladesh",
      description: "Come say hello at our office"
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon-Fri: 9:00 AM - 6:00 PM",
      description: "Weekend support available"
    }
  ];

  return (
    <>
      <SEO
        title="Contact jTech - Get in Touch for Technology Solutions"
        description="Contact jTech for your technology needs. Reach out for project inquiries, IT consulting, support, or any questions. Our expert team is ready to help transform your business."
        keywords="contact jTech, IT support, technology consulting, project inquiry, business contact, tech support, get in touch"
        url="https://jtechvision.com/contact"
        ogImage="https://jtechvision.com/og-contact.jpg"
        twitterImage="https://jtechvision.com/twitter-contact.jpg"
        structuredData={structuredData}
      />
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
            Get in Touch
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
              Contact Us
            </span>
          </h1>

          <p className="text-lg text-[#0C2F4F] leading-relaxed font-light max-w-3xl mx-auto">
            Ready to transform your business with cutting-edge technology? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-light text-[#0C2F4F] mb-4 font-serif">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-12 h-12 text-[#0C2F4F] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#0C2F4F] mb-2 font-serif">
                  Message Sent Successfully!
                </h3>
                <p className="text-[#0C2F4F] text-sm">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <motion.button
                  className="mt-4 text-[#0C2F4F] underline hover:no-underline transition-all duration-300 text-sm"
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0C2F4F] font-medium mb-1.5 font-serif text-sm">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0C2F4F]/50" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-white/50 border border-[#0C2F4F]/20 rounded-xl focus:border-[#0C2F4F]/50 focus:outline-none transition-colors duration-300 text-[#0C2F4F] placeholder-[#0C2F4F]/50 text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#0C2F4F] font-medium mb-1.5 font-serif text-sm">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#0C2F4F]/50" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-white/50 border border-[#0C2F4F]/20 rounded-xl focus:border-[#0C2F4F]/50 focus:outline-none transition-colors duration-300 text-[#0C2F4F] placeholder-[#0C2F4F]/50 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#0C2F4F] font-medium mb-1.5 font-serif text-sm">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-white/50 border border-[#0C2F4F]/20 rounded-xl focus:border-[#0C2F4F]/50 focus:outline-none transition-colors duration-300 text-[#0C2F4F] placeholder-[#0C2F4F]/50 text-sm"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-[#0C2F4F] font-medium mb-1.5 font-serif text-sm">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-white/50 border border-[#0C2F4F]/20 rounded-xl focus:border-[#0C2F4F]/50 focus:outline-none transition-colors duration-300 text-[#0C2F4F] placeholder-[#0C2F4F]/50 text-sm"
                    placeholder="Project inquiry, consultation, etc."
                  />
                </div>

                <div>
                  <label className="block text-[#0C2F4F] font-medium mb-1.5 font-serif text-sm">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#0C2F4F]/50" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-3 py-2.5 bg-white/50 border border-[#0C2F4F]/20 rounded-xl focus:border-[#0C2F4F]/50 focus:outline-none transition-colors duration-300 text-[#0C2F4F] placeholder-[#0C2F4F]/50 resize-none text-sm"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif disabled:opacity-50"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-brand-light border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="w-3.5 h-3.5 mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>

                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-light text-[#0C2F4F] mb-4 font-serif">
                Get in Touch
              </h2>
              <p className="text-[#0C2F4F] leading-relaxed mb-6 text-sm">
                We're here to help you bring your ideas to life. Choose the best way to reach us.
              </p>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="group bg-brand-light/80 backdrop-blur-xl p-5 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30 flex-shrink-0">
                      <info.icon className="w-5 h-5 text-[#0C2F4F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0C2F4F] mb-1 font-serif text-sm">
                        {info.title}
                      </h3>
                      <p className="text-[#0C2F4F] font-medium mb-0.5 text-sm">
                        {info.value}
                      </p>
                      <p className="text-xs text-[#0C2F4F]/70">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};