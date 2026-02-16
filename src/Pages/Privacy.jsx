import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Globe,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';
import SEO from '../utils/SEO';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide when contacting us or using our services',
        'Technical information about your device and how you interact with our website',
        'Cookies and similar tracking technologies to improve your experience',
        'Professional information when you apply for positions or request services'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'To provide and improve our services',
        'To communicate with you about your projects and inquiries',
        'To send you relevant updates and marketing communications (with your consent)',
        'To analyze website usage and improve user experience',
        'To comply with legal obligations and protect our rights'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Globe,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with trusted service providers who assist us',
        'We may disclose information when required by law or to protect our rights',
        'Anonymous, aggregated data may be shared for business purposes'
      ]
    },
    {
      title: 'Data Security',
      icon: Shield,
      content: [
        'We implement industry-standard security measures to protect your data',
        'All sensitive data is encrypted in transit and at rest',
        'Access to personal information is restricted to authorized personnel only',
        'Regular security audits and updates to maintain protection standards'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - Data Protection & Security | jTech"
        description="Learn about jTech's privacy policy and how we protect your personal information. Understand our data collection, usage, and security practices."
        keywords="privacy policy, data protection, information security, jTech privacy, GDPR compliance, data usage"
        url="https://jtechvision.com/privacy"
        ogImage="https://jtechvision.com/og-privacy.jpg"
        twitterImage="https://jtechvision.com/twitter-privacy.jpg"
        noIndex={true}
      />
      <div className="pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Lock className="w-4 h-4 mr-2" />
            Privacy Policy
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Your Privacy Matters
            </span>
          </h1>
          <p className="text-xl text-[#0C2F4F] leading-relaxed font-light">
            We are committed to protecting your privacy and ensuring the security of your personal information.
            This policy explains how we collect, use, and safeguard your data.
          </p>

          <div className="mt-6 p-4 bg-[#0C2F4F]/10 rounded-xl">
            <p className="text-[#0C2F4F] text-sm">
              <strong>Last updated:</strong> March 1, 2024
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Introduction */}
        <motion.div
          className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 shadow-xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#0C2F4F] mb-4">Our Commitment</h2>
          <p className="text-[#0C2F4F]/80 leading-relaxed">
            At Smart Tech Solutions, we believe that privacy is a fundamental right. We are committed to being
            transparent about our data practices and giving you control over your personal information. This
            privacy policy applies to all our services, websites, and interactions with our company.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#0C2F4F]/10 rounded-xl flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-[#0C2F4F]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0C2F4F]">{section.title}</h3>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * itemIndex }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#0C2F4F]/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Your Rights */}
        <motion.div
          className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 shadow-xl mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-[#0C2F4F]/10 rounded-xl flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-[#0C2F4F]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0C2F4F]">Your Rights</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#0C2F4F] mb-3">You have the right to:</h4>
              <ul className="space-y-2">
                {[
                  'Access your personal data',
                  'Correct inaccurate information',
                  'Delete your personal data',
                  'Restrict processing of your data',
                  'Data portability',
                  'Withdraw consent at any time'
                ].map((right, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-[#0C2F4F]/80 text-sm">{right}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#0C2F4F] mb-3">How to exercise your rights:</h4>
              <p className="text-[#0C2F4F]/80 text-sm mb-4">
                To exercise any of these rights, please contact us using the information below.
                We will respond to your request within 30 days.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#0C2F4F]" />
                  <span className="text-[#0C2F4F] text-sm">privacy@smarttech.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#0C2F4F]" />
                  <span className="text-[#0C2F4F] text-sm">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Updates */}
        <motion.div
          className="bg-brand-light/80 backdrop-blur-xl p-8 rounded-3xl border border-[#0C2F4F]/20 shadow-xl mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold text-[#0C2F4F] mb-4">Policy Updates</h3>
          <p className="text-[#0C2F4F]/80 leading-relaxed mb-4">
            We may update this privacy policy from time to time to reflect changes in our practices or
            for legal, regulatory, or operational reasons. We will notify you of any material changes
            by posting the updated policy on our website and updating the "Last updated" date.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <motion.button
                className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </Link>

            <Link to="/">
              <motion.button
                className="border-2 border-[#0C2F4F] text-[#0C2F4F] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0C2F4F]/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Privacy;