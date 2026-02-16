import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Send,
  Download,
  CheckCircle,
  Building,
  Star,
  ArrowRight,
  User,
  Mail,
  Phone,
  Upload,
  Briefcase,
  GraduationCap,
  Loader
} from 'lucide-react';
import { toast } from 'react-toastify';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

const Careers = () => {
  const { jobAPI } = useAxiosPublic();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getJobs();
      const jobsData = response.data.data || response.data || [];
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job listings');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };



  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Simulate application submission
    toast.success('Application submitted successfully! We\'ll contact you soon.');
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: ''
    });
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setApplicationData({
      ...applicationData,
      resume: e.target.files[0]
    });
  };

  return (
    <>
      <SEO
        title="Careers at jTech - Join Our Technology Team"
        description="Explore exciting career opportunities at jTech. Join our team of technology professionals and help build innovative solutions. View open positions and apply today."
        keywords="careers at jTech, technology jobs, IT jobs, software developer jobs, job openings, tech careers, work at jTech"
        url="https://jtechvision.com/careers"
        ogImage="https://jtechvision.com/og-careers.jpg"
        twitterImage="https://jtechvision.com/twitter-careers.jpg"
      />
      <div className="pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Career Opportunities
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Join Our Team
            </span>
          </h1>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Be part of our mission to deliver cutting-edge technology solutions.
            Explore exciting career opportunities and grow with us.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader className="w-8 h-8 text-[#0C2F4F] animate-spin" />
                <span className="ml-3 text-[#0C2F4F] text-lg">Loading job opportunities...</span>
              </div>
            ) : jobs.length === 0 ? (
              <motion.div
                className="bg-brand-light/80 backdrop-blur-xl p-12 rounded-3xl border border-[#0C2F4F]/20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Briefcase className="w-16 h-16 text-[#0C2F4F]/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0C2F4F] mb-2">No Open Positions</h3>
                <p className="text-[#0C2F4F]/70">
                  We don't have any open positions at the moment. Please check back later or send us your resume for future opportunities.
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {jobs.map((job) => (
                  <motion.div
                    key={job._id || job.id}
                    className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-300 shadow-xl hover:shadow-[#0C2F4F]/20 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleJobSelect(job)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0C2F4F] mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-full text-sm">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#0C2F4F]">{job.salary}</div>
                        <div className="text-sm text-[#0C2F4F]/70">{job.posted}</div>
                      </div>
                    </div>

                    <p className="text-[#0C2F4F]/80 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-[#0C2F4F]/70">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {job.experience}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <a
                        href={`mailto:jtech6996@gmail.com?subject=Job Application - ${job.title}&body=Hello,%0D%0A%0D%0AI am interested in applying for the ${job.title} position.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AThank you for your consideration.%0D%0A%0D%0ABest regards`}
                        className="flex items-center text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="mr-2">Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Job Details / Application Form */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 shadow-xl sticky top-32"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {selectedJob ? (
                <>
                  <h3 className="text-2xl font-bold text-[#0C2F4F] mb-4">{selectedJob.title}</h3>

                  <div className="space-y-4 mb-6">
                    {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#0C2F4F] mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {selectedJob.requirements.map((req, index) => (
                            <li key={index} className="flex items-start text-sm text-[#0C2F4F]/80">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#0C2F4F] mb-2">Responsibilities:</h4>
                        <ul className="space-y-1">
                          {selectedJob.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start text-sm text-[#0C2F4F]/80">
                              <Star className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedJob.description && (
                      <div>
                        <h4 className="font-semibold text-[#0C2F4F] mb-2">Job Description:</h4>
                        <p className="text-sm text-[#0C2F4F]/80 whitespace-pre-line">{selectedJob.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Application Form */}
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-[#0C2F4F] mb-2">How to Apply:</h4>
                        <p className="text-sm text-[#0C2F4F]/80 mb-3">
                          To apply for this position, please send your resume and cover letter to our email.
                        </p>
                        <a
                          href={`mailto:jtech6996@gmail.com?subject=Job Application - ${selectedJob.title}&body=Hello,%0D%0A%0D%0AI am interested in applying for the ${selectedJob.title} position.%0D%0A%0D%0APosition Details:%0D%0A- Location: ${selectedJob.location}%0D%0A- Department: ${selectedJob.department}%0D%0A- Type: ${selectedJob.type}%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AThank you for your consideration.%0D%0A%0D%0ABest regards`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Click Here to Email Your Application
                        </a>
                        <p className="text-xs text-[#0C2F4F]/60 mt-2">
                          Email: jtech6996@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-16 h-16 text-[#0C2F4F]/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#0C2F4F] mb-2">Select a Position</h3>
                  <p className="text-[#0C2F4F]/70">Click on a job listing to view details and apply</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Careers;