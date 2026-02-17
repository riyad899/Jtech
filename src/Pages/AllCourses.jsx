import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, ArrowRight, GraduationCap, Search, Filter, Grid, List } from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

export const AllCourses = () => {
  const { axiosPublic } = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedCategory, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/courses');
      const allCourses = response.data.data || response.data || [];
      setCourses(allCourses);
      setFilteredCourses(allCourses);

      // Extract unique categories
      const uniqueCategories = [...new Set(allCourses.map(course => course.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "jTech Courses",
    "description": "Browse our comprehensive collection of technology courses",
    "numberOfItems": courses.length,
    "itemListElement": courses.map((course, index) => ({
      "@type": "Course",
      "position": index + 1,
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "Organization",
        "name": "jTech"
      }
    }))
  };

  return (
    <>
      <SEO
        title="All Courses - jTech Learning Platform"
        description="Explore our comprehensive collection of technology courses. Learn web development, mobile apps, cloud computing, and more with expert instructors."
        keywords="online courses, technology courses, web development courses, programming courses, IT training, jTech courses"
        url="https://jtechvision.com/courses"
        ogImage="https://jtechvision.com/og-courses.jpg"
        twitterImage="https://jtechvision.com/twitter-courses.jpg"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-light">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-[#0C2F4F] to-[#0C2F4F]/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <GraduationCap className="w-6 h-6" />
                <span className="font-semibold">Learning Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                All Courses
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover our comprehensive collection of courses designed to help you master modern technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C2F4F]/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F] transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#0C2F4F]" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F] transition-colors bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2 bg-[#0C2F4F]/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-[#0C2F4F] text-white' : 'text-[#0C2F4F]'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-[#0C2F4F] text-white' : 'text-[#0C2F4F]'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-[#0C2F4F]/60">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <BookOpen className="w-20 h-20 text-[#0C2F4F]/20 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0C2F4F] mb-2">No courses found</h3>
                <p className="text-[#0C2F4F]/60">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    variants={cardVariants}
                    whileHover={{ y: -10, scale: viewMode === 'grid' ? 1.02 : 1.01 }}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    {/* Course Image */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0C2F4F]/20 to-[#0C2F4F]/10 ${
                      viewMode === 'list' ? 'w-64 h-auto' : 'h-48'
                    }`}>
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-[#0C2F4F]/30" />
                        </div>
                      )}
                      {course.category && (
                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-[#0C2F4F]">
                          {course.category}
                        </span>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-6 flex-1">
                      <h3 className="text-xl font-bold text-[#0C2F4F] mb-3 line-clamp-2 group-hover:text-[#0C2F4F]/80 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-[#0C2F4F]/70 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Meta */}
                      <div className="flex items-center justify-between mb-4 text-sm text-[#0C2F4F]/60">
                        <div className="flex items-center space-x-4">
                          {course.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                          )}
                          {course.enrolledCount !== undefined && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.enrolledCount}</span>
                            </div>
                          )}
                        </div>
                        {course.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#0C2F4F]/10">
                        <div>
                          {course.price ? (
                            <div className="flex items-baseline space-x-2">
                              <span className="text-2xl font-bold text-[#0C2F4F]">
                                ${course.price}
                              </span>
                              {course.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${course.originalPrice}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-green-600">Free</span>
                          )}
                        </div>
                        <Link
                          to={`/course/${course._id}`}
                          className="inline-flex items-center space-x-2 bg-[#0C2F4F] text-white px-4 py-2 rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-300 group-hover:space-x-3"
                        >
                          <span className="text-sm font-semibold">View</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllCourses;
