import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, Users, Star, ChevronRight, Play, CheckCircle,
  Award, Target, Globe, MessageCircle, Share2, BookmarkPlus, ArrowLeft
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

export const SingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosPublic } = useAxiosPublic();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(`/courses/${id}`);
      setCourse(response.data.data || response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0C2F4F] mx-auto mb-4"></div>
          <p className="text-[#0C2F4F] text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-light flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-[#0C2F4F]/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0C2F4F] mb-2">Course Not Found</h2>
          <p className="text-[#0C2F4F]/60 mb-6">{error || 'The course you are looking for does not exist.'}</p>
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 bg-[#0C2F4F] text-white px-6 py-3 rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "jTech"
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor
    },
    "offers": {
      "@type": "Offer",
      "price": course.price || 0,
      "priceCurrency": "USD"
    },
    "aggregateRating": course.rating ? {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "ratingCount": course.enrolledCount || 0
    } : undefined
  };

  return (
    <>
      <SEO
        title={`${course.title} - jTech Courses`}
        description={course.description}
        keywords={`${course.category}, online course, ${course.title}, jTech courses`}
        url={`https://jtechvision.com/course/${course._id}`}
        ogImage={course.thumbnail || "https://jtechvision.com/og-course.jpg"}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-light">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-[#0C2F4F] to-[#0C2F4F]/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {course.category && (
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {course.category}
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
                <p className="text-xl text-white/90 mb-8">{course.description}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  {course.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(course.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-white/40'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  )}
                  {course.enrolledCount !== undefined && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>{course.enrolledCount} students</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span className="capitalize">{course.level}</span>
                    </div>
                  )}
                </div>

                {/* Instructor */}
                {course.instructor && (
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {course.instructor.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Instructor</p>
                      <p className="font-semibold">{course.instructor}</p>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center space-x-2 bg-white text-[#0C2F4F] px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 shadow-lg">
                    <Play className="w-5 h-5" />
                    <span>Enroll Now</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <BookmarkPlus className="w-5 h-5" />
                    <span>Save for Later</span>
                  </button>
                </div>
              </motion.div>

              {/* Course Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full h-96 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-32 h-32 text-white/30" />
                    </div>
                  )}
                  {course.price && (
                    <div className="absolute top-6 right-6 bg-white text-[#0C2F4F] px-6 py-3 rounded-xl shadow-lg">
                      <p className="text-3xl font-bold">${course.price}</p>
                    </div>
                  )}
                  {!course.price && (
                    <div className="absolute top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
                      <p className="text-2xl font-bold">Free</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* What You'll Learn */}
                {course.curriculum && course.curriculum.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                  >
                    <h2 className="text-3xl font-bold text-[#0C2F4F] mb-6 flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8" />
                      <span>Course Curriculum</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.curriculum.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-[#0C2F4F]/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-3xl font-bold text-[#0C2F4F] mb-6">About This Course</h2>
                  <p className="text-[#0C2F4F]/80 text-lg leading-relaxed whitespace-pre-line">
                    {course.description}
                  </p>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Includes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                >
                  <h3 className="text-xl font-bold text-[#0C2F4F] mb-6">This course includes:</h3>
                  <div className="space-y-4">
                    {course.duration && (
                      <div className="flex items-center space-x-3 text-[#0C2F4F]/80">
                        <Clock className="w-5 h-5 text-[#0C2F4F]" />
                        <span>{course.duration} of content</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 text-[#0C2F4F]/80">
                      <Globe className="w-5 h-5 text-[#0C2F4F]" />
                      <span>Online access</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[#0C2F4F]/80">
                      <Award className="w-5 h-5 text-[#0C2F4F]" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[#0C2F4F]/80">
                      <MessageCircle className="w-5 h-5 text-[#0C2F4F]" />
                      <span>Instructor support</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#0C2F4F]/10">
                    <button className="w-full bg-[#0C2F4F] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#0C2F4F]/90 transition-all duration-300 shadow-lg mb-3">
                      Enroll Now
                    </button>
                    <button className="w-full border-2 border-[#0C2F4F] text-[#0C2F4F] px-6 py-3 rounded-xl font-semibold hover:bg-[#0C2F4F]/5 transition-all duration-300">
                      Add to Wishlist
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-4 text-[#0C2F4F]/60">
                    <button className="hover:text-[#0C2F4F] transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleCourse;
