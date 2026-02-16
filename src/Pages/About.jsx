import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Target,
  Award,
  Globe,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Shield,
  Heart
} from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

export const About = () => {
  const { teamAPI } = useAxiosPublic();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  // Structured data for About page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About jTech",
    "description": "Learn about jTech's mission, values, and our experienced team of technology professionals. 500+ projects completed, 100+ happy clients, 5+ years of excellence.",
    "url": "https://jtechvision.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "jTech",
      "foundingDate": "2019",
      "numberOfEmployees": "50+",
      "slogan": "Transforming Ideas into Digital Reality"
    }
  };

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await teamAPI.getTeamMembers();
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const stats = [
    { number: "500+", label: "Projects Completed", icon: CheckCircle },
    { number: "100+", label: "Happy Clients", icon: Users },
    { number: "5+", label: "Years Experience", icon: Clock },
    { number: "50+", label: "Team Members", icon: Globe }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly push the boundaries of technology to deliver cutting-edge solutions that give you a competitive advantage."
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Our robust solutions are built to last, ensuring your business operations run smoothly 24/7 with minimal downtime."
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Your success is our priority. We work closely with you to understand your needs and exceed your expectations."
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to customer service and project delivery."
    }
  ];

  // Removed hardcoded team data - now fetched from API

  return (
    <>
      <SEO
        title="About jTech - Our Story, Mission & Expert Team"
        description="Discover jTech's journey in technology innovation. Learn about our mission, core values, and meet our expert team of 50+ professionals. 500+ projects delivered with excellence since 2019."
        keywords="about jTech, company mission, technology team, IT professionals, company values, tech company story, innovation, reliability, customer focus"
        url="https://jtechvision.com/about"
        ogImage="https://jtechvision.com/og-about.jpg"
        twitterImage="https://jtechvision.com/twitter-about.jpg"
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
            About jTech
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
              Our Story
            </span>
          </h1>

          <p className="text-lg text-[#0C2F4F] leading-relaxed font-light max-w-3xl mx-auto">
            We are a passionate team of technology enthusiasts dedicated to transforming businesses through innovative digital solutions and cutting-edge technology.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20">
                <stat.icon className="w-8 h-8 text-[#0C2F4F] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#0C2F4F] mb-2 font-serif">
                  {stat.number}
                </div>
                <div className="text-sm text-[#0C2F4F] font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/5 backdrop-blur-xl p-12 rounded-3xl border border-[#0C2F4F]/20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-[#0C2F4F] mb-6 font-serif">
                  Our Mission
                </h2>
                <p className="text-[#0C2F4F] text-lg leading-relaxed mb-6">
                  To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation. We believe in creating lasting partnerships built on trust, quality, and exceptional service.
                </p>
                <p className="text-[#0C2F4F] leading-relaxed">
                  Since our founding, we've been committed to staying at the forefront of technology trends, ensuring our clients always have access to the most advanced and effective solutions available.
                </p>
              </div>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/20 transition-colors duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30 flex-shrink-0">
                      <value.icon className="w-6 h-6 text-[#0C2F4F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0C2F4F] mb-1 font-serif">
                        {value.title}
                      </h3>
                      <p className="text-sm text-[#0C2F4F] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#0C2F4F] mb-4 font-serif">
              Meet Our Team
            </h2>
            <p className="text-[#0C2F4F] text-lg leading-relaxed max-w-2xl mx-auto">
              Our diverse team of experts brings together years of experience and a passion for innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team && team.length > 0 ? (
              team.map((member, index) => (
                <motion.div
                  key={member._id || member.name}
                  className="group bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                    <img
                      src={member.image || member.photo || 'https://via.placeholder.com/150'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-[#0C2F4F] mb-1 font-serif">
                    {member.name}
                  </h3>
                  <p className="text-[#0C2F4F] text-sm mb-3 font-medium">
                    {member.role || member.position}
                  </p>
                  <p className="text-[#0C2F4F] text-xs leading-relaxed line-clamp-2">
                    {member.bio || member.description || ''}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-[#0C2F4F] py-10">
                Loading team members...
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-[#0C2F4F]/5 via-[#0C2F4F]/5 to-[#0C2F4F]/5 backdrop-blur-xl p-12 rounded-3xl border border-[#0C2F4F]/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#0C2F4F] mb-4 font-serif">
            Ready to Work Together?
          </h2>
          <p className="text-[#0C2F4F] text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate('/contact')}
              className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-xl font-bold text-lg tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get in Touch</span>
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button
              onClick={() => navigate('/services')}
              className="group relative border-2 border-[#0C2F4F] text-[#0C2F4F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0C2F4F]/5 transition-all duration-300 font-serif backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Our Work</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};