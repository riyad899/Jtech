import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Monitor,
  Code,
  Database,
  Palette,
  Camera,
  Zap,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Tag,
  Filter
} from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Reset hover state when category changes
  useEffect(() => {
    setHoveredProject(null);
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Projects', icon: Monitor },
    { id: 'web', name: 'Web Apps', icon: Globe },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'design', name: 'UI/UX Design', icon: Palette },
    { id: 'backend', name: 'Backend', icon: Database }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2024',
      featured: true,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 2,
      title: 'Food Delivery App',
      category: 'mobile',
      description: 'React Native app with real-time tracking and payment integration',
      technologies: ['React Native', 'Firebase', 'Maps API', 'Payment Gateway'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2024',
      featured: true,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 3,
      title: 'Banking Dashboard',
      category: 'design',
      description: 'Modern banking interface with advanced data visualization',
      technologies: ['Figma', 'Prototyping', 'User Research', 'Design System'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2023',
      featured: false,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 4,
      title: 'Task Management API',
      category: 'backend',
      description: 'RESTful API with authentication, real-time updates, and scalable architecture',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2023',
      featured: false,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'web',
      description: 'Full-featured social platform with real-time messaging and content sharing',
      technologies: ['Next.js', 'Socket.io', 'AWS', 'PostgreSQL'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2024',
      featured: true,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    },
    {
      id: 6,
      title: 'Fitness Tracker App',
      category: 'mobile',
      description: 'Health and fitness tracking app with wearable device integration',
      technologies: ['Flutter', 'Dart', 'HealthKit', 'Charts'],
      image: '/api/placeholder/400/300',
      liveUrl: '#',
      githubUrl: '#',
      completion: '2023',
      featured: false,
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

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
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>

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
            <Code className="w-4 h-4 mr-2" />
            Portfolio & Projects
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Our Work Showcase
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Explore our portfolio of successful projects, from innovative web applications
            to cutting-edge mobile solutions.
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

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-4 xl:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={`${selectedCategory}-${project.id}`}
                  className="group relative bg-brand-light/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer overflow-hidden min-h-[420px] lg:min-h-[400px] xl:min-h-[420px] flex flex-col"
                  variants={cardVariants}
                  layout
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  whileHover={{ y: -10 }}
                >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></motion.div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  FEATURED
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Project Image/Preview */}
                <div className={`w-full h-40 lg:h-36 xl:h-40 bg-gradient-to-br ${project.gradient} rounded-t-3xl relative overflow-hidden flex-shrink-0`}>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white/80"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category === 'web' && <Globe className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10" />}
                    {project.category === 'mobile' && <Smartphone className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10" />}
                    {project.category === 'design' && <Palette className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10" />}
                    {project.category === 'backend' && <Database className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10" />}
                  </motion.div>

                  {/* Overlay with Actions */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.a
                      href={project.liveUrl}
                      className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6 lg:p-4 xl:p-6 space-y-2 lg:space-y-1.5 xl:space-y-2 flex-grow flex flex-col">
                  <div className="flex items-center justify-between flex-shrink-0">
                    <h3 className="font-light text-lg lg:text-base xl:text-lg text-[#0C2F4F] group-hover:text-[#0C2F4F]">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-xs lg:text-xs xl:text-sm text-[#0C2F4F]/70 font-light">
                      <Calendar className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 mr-1" />
                      {project.completion}
                    </div>
                  </div>

                  <p className="text-[#0C2F4F] leading-relaxed text-sm lg:text-xs xl:text-sm font-light flex-grow mb-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 lg:gap-1 xl:gap-2 flex-shrink-0">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className={`px-2 lg:px-1.5 xl:px-2 py-1 bg-gradient-to-r ${project.gradient} text-brand-light text-xs lg:text-xs xl:text-xs font-light rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 lg:px-1.5 xl:px-2 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] text-xs font-light rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 lg:space-x-1.5 xl:space-x-2 pt-2 flex-shrink-0">
                    <motion.a
                      href={project.liveUrl}
                      className={`flex-1 group/btn relative overflow-hidden bg-gradient-to-r ${project.gradient} text-brand-light px-3 lg:px-2 xl:px-3 py-2 lg:py-1.5 xl:py-2 rounded-xl font-light text-xs lg:text-xs xl:text-sm tracking-wide shadow-xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 text-center`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <ExternalLink className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 mr-1 lg:mr-1 xl:mr-2" />
                        <span className="hidden lg:inline">Demo</span>
                        <span className="lg:hidden">Live Demo</span>
                      </span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="flex-1 bg-brand-light/80 border border-[#0C2F4F]/20 text-[#0C2F4F] px-3 lg:px-2 xl:px-3 py-2 lg:py-1.5 xl:py-2 rounded-xl font-light text-xs lg:text-xs xl:text-sm tracking-wide hover:bg-[#0C2F4F]/5 transition-all duration-300 text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 inline mr-1 lg:mr-1 xl:mr-2" />
                      Code
                    </motion.a>
                  </div>
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
                    <Code className="w-8 h-8 text-[#0C2F4F]/50" />
                  </div>
                  <h3 className="text-xl font-light text-[#0C2F4F] mb-2">No Projects Found</h3>
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
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
