import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Cloud,
  Database,
  Code,
  Settings,
  Wifi,
  Shield,
  Users,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Star,
  Calendar,
  Clock,
  User,
  Tag,
  DollarSign,
  Eye,
  ExternalLink,
  Github,
  Globe,
  Play,
  ArrowRight
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

const serviceIcons = {
  web: Monitor,
  mobile: Smartphone,
  cloud: Cloud,
  database: Database,
  security: Shield,
  code: Code,
  wifi: Wifi,
  consulting: Users,
  development: Code,
  design: Sparkles,
  default: Settings
};

const SingleService = () => {
  const { id } = useParams();
  const { serviceAPI } = useAxiosPublic();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    // Fetch service from API
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await serviceAPI.getService(id);
        setService(response.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getServiceIcon = (category) => {
    return serviceIcons[category?.toLowerCase()] || serviceIcons.default;
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `TK${price}`;
    }
    return price || 'Contact for pricing';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C2F4F] mx-auto mb-4"></div>
          <p className="text-lg text-[#0C2F4F]">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0C2F4F] mb-4">
            {error || 'Service Not Found'}
          </h1>
          <p className="text-[#0C2F4F]/70 mb-6">
            {error ? 'Please try again later.' : 'The service you are looking for does not exist.'}
          </p>
          <Link to="/services" className="inline-flex items-center text-[#0C2F4F] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getServiceIcon(service.category);

  return (
    <>
      <SEO
        title={`${service.title} - Professional IT Service | jTech`}
        description={`${service.description?.substring(0, 155) || `Get professional ${service.title} from jTech. Expert ${service.category} solutions tailored to your business needs.`}`}
        keywords={`${service.title}, ${service.category} service, IT services, ${service.provider || 'jTech'}, technology solutions`}
        url={`https://jtechvision.com/service/${id}`}
        ogImage={service.image || 'https://jtechvision.com/og-services.jpg'}
        twitterImage={service.image || 'https://jtechvision.com/twitter-services.jpg'}
        type="service"
      />
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/services"
            className="inline-flex items-center text-[#0C2F4F] hover:text-[#0A2540] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </Link>
        </motion.div>

        {/* Service Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-[#0C2F4F]/10 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-[#0C2F4F]" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-light text-[#0C2F4F] mb-4 font-serif">
                {service.title}
              </h1>
              <p className="text-lg text-[#0C2F4F]/80 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-[#0C2F4F] mr-2" />
                  <div>
                    <p className="text-sm text-[#0C2F4F]/60">Price</p>
                    <p className="font-semibold text-[#0C2F4F]">{formatPrice(service.price)}</p>
                  </div>
                </div>

                {service.duration && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#0C2F4F] mr-2" />
                    <div>
                      <p className="text-sm text-[#0C2F4F]/60">Duration</p>
                      <p className="font-semibold text-[#0C2F4F]">{service.duration}</p>
                    </div>
                  </div>
                )}

                {service.provider && (
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-[#0C2F4F] mr-2" />
                    <div>
                      <p className="text-sm text-[#0C2F4F]/60">Provider</p>
                      <p className="font-semibold text-[#0C2F4F]">{service.provider}</p>
                    </div>
                  </div>
                )}

                {service.category && (
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-[#0C2F4F] mr-2" />
                    <div>
                      <p className="text-sm text-[#0C2F4F]/60">Category</p>
                      <p className="font-semibold text-[#0C2F4F] capitalize">{service.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link to={`/buy-service/${service._id}`}>
                <motion.button
                  className="bg-gradient-to-r from-[#0C2F4F] to-[#0A2540] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        {service.features && service.features.length > 0 && (
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 p-8 mb-12 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-light text-[#0C2F4F] mb-6 font-serif">Service Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-[#0C2F4F]/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-[#0C2F4F]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Demo Works Section */}
        {service.demoWorks && service.demoWorks.length > 0 && (
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-light text-[#0C2F4F] mb-8 font-serif">Our Previous Work</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.demoWorks.map((work, index) => (
              <motion.div
                key={work.id}
                className="group bg-gradient-to-br from-white to-[#0C2F4F]/5 rounded-2xl overflow-hidden border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/40 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedWork(work)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Play className="w-8 h-8 text-white mx-auto" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0C2F4F] mb-2 group-hover:text-[#0A2540] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-[#0C2F4F]/70 text-sm mb-4 line-clamp-2">
                    {work.description}
                  </p>

                  {work.technologies && work.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {work.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] text-xs rounded-full">
                          +{work.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {work.completed && (
                      <div className="flex items-center text-sm text-[#0C2F4F]/60">
                        <Calendar className="w-4 h-4 mr-1" />
                        {work.completed}
                      </div>
                    )}
                    <Eye className="w-4 h-4 text-[#0C2F4F] group-hover:text-[#0A2540] transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}
      </div>

      {/* Work Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0C2F4F] mb-4">{selectedWork.title}</h3>
                <p className="text-[#0C2F4F]/80 mb-6">{selectedWork.description}</p>

                {selectedWork.technologies && selectedWork.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-[#0C2F4F] mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedWork.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {selectedWork.completed && (
                    <div className="flex items-center text-[#0C2F4F]/60">
                      <Calendar className="w-4 h-4 mr-1" />
                      Completed: {selectedWork.completed}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 bg-[#0C2F4F] text-white rounded-lg hover:bg-[#0A2540] transition-colors">
                      <Globe className="w-4 h-4 mr-2" />
                      Live Demo
                    </button>
                    <button className="flex items-center px-4 py-2 border border-[#0C2F4F] text-[#0C2F4F] rounded-lg hover:bg-[#0C2F4F]/5 transition-colors">
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default SingleService;