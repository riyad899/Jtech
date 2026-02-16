import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Send,
  CheckCircle,
  Download,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe
} from 'lucide-react';
import { toast } from 'react-toastify';

const SendResume = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    availability: '',
    resume: null,
    coverLetter: '',
    portfolio: ''
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'IoT Engineer',
    'Product Manager',
    'Data Scientist',
    'QA Engineer',
    'Other'
  ];

  const experienceLevels = [
    'Fresh Graduate',
    '1-2 years',
    '3-5 years',
    '5-8 years',
    '8+ years'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size should be less than 10MB');
        return;
      }
      setFormData({
        ...formData,
        resume: file
      });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc')) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }
      setFormData({
        ...formData,
        resume: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Resume submitted successfully! We\'ll review your application and get back to you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        currentCompany: '',
        expectedSalary: '',
        availability: '',
        resume: null,
        coverLetter: '',
        portfolio: ''
      });
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Submit Your Resume
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Start Your Journey
            </span>
          </h1>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Don't see the perfect position? Send us your resume anyway!
            We're always looking for talented individuals to join our team.
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-2xl font-bold text-[#0C2F4F] mb-6 flex items-center">
                <User className="w-6 h-6 mr-3" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Portfolio/LinkedIn
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="https://your-portfolio.com"
                  />
                </motion.div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-2xl font-bold text-[#0C2F4F] mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3" />
                Professional Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Position of Interest
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] transition-all duration-300"
                  >
                    <option value="">Select a position</option>
                    {positions.map((position, index) => (
                      <option key={index} value={position}>{position}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] transition-all duration-300"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="Your current company"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </motion.div>
              </div>

              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
                  placeholder="e.g., Immediate, 2 weeks notice, etc."
                />
              </motion.div>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-2xl font-bold text-[#0C2F4F] mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Resume & Cover Letter
              </h3>

              {/* File Upload Area */}
              <motion.div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-[#0C2F4F] bg-[#0C2F4F]/5'
                    : 'border-[#0C2F4F]/30 hover:border-[#0C2F4F]/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
              >
                {formData.resume ? (
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-[#0C2F4F] font-medium">{formData.resume.name}</p>
                      <p className="text-[#0C2F4F]/70 text-sm">
                        {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-[#0C2F4F]/50 mx-auto mb-4" />
                    <p className="text-[#0C2F4F] font-medium mb-2">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-[#0C2F4F]/70 text-sm">
                      Supports PDF, DOC, DOCX files up to 10MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </motion.div>

              {/* Cover Letter */}
              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-[#0C2F4F] text-sm font-medium mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself, your experience, and why you'd like to work with us..."
                ></textarea>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-xl font-bold text-lg tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Submit Resume
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F]/80 via-[#0C2F4F]/80 to-[#0C2F4F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SendResume;