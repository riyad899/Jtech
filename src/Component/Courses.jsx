import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, ArrowRight, GraduationCap } from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';

export const Courses = () => {
  const { axiosPublic } = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/courses');
      const allCourses = response.data.data || response.data || [];
      // Get only the latest 6 courses
      setCourses(allCourses.slice(0, 6));
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-brand-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0C2F4F] mb-4">Loading Courses...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-brand-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center space-x-2 bg-[#0C2F4F]/10 px-6 py-3 rounded-full mb-6">
            <GraduationCap className="w-6 h-6 text-[#0C2F4F]" />
            <span className="text-[#0C2F4F] font-semibold">Learn & Grow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C2F4F] mb-4">
            Latest Courses
          </h2>
          <p className="text-lg text-[#0C2F4F]/70 max-w-2xl mx-auto">
            Expand your skills with our expertly crafted courses designed for modern learners
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {courses.map((course) => (
            <motion.div
              key={course._id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0C2F4F]/20 to-[#0C2F4F]/10">
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
              <div className="p-6">
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
                    {course.students !== undefined && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center space-x-3 bg-[#0C2F4F] text-white px-8 py-4 rounded-xl hover:bg-[#0C2F4F]/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span className="text-lg font-semibold">View All Courses</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
