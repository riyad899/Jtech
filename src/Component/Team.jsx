import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Coffee
} from 'lucide-react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  // Function to handle modal opening
  const openModal = (member) => {
    setSelectedMember(member);
    document.body.classList.add('modal-open');
  };

  // Function to handle modal closing
  const closeModal = () => {
    setSelectedMember(null);
    document.body.classList.remove('modal-open');
  };

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Thompson',
      position: 'CEO & Founder',
      department: 'Leadership',
      image: '/api/placeholder/300/300',
      bio: 'Visionary leader with 10+ years of experience in tech industry. Passionate about innovation and building amazing products.',
      skills: ['Strategic Planning', 'Product Vision', 'Team Leadership', 'Business Development'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '10+ Years'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'CTO',
      department: 'Technology',
      image: '/api/placeholder/300/300',
      bio: 'Technical architect and full-stack developer. Expert in scalable systems and modern web technologies.',
      skills: ['System Architecture', 'Full-Stack Development', 'Cloud Computing', 'DevOps'],
      social: {
        linkedin: '#',
        github: '#',
        email: 'sarah@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '8+ Years'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      position: 'Lead Designer',
      department: 'Design',
      image: '/api/placeholder/300/300',
      bio: 'Creative designer focused on user experience and beautiful interfaces. Award-winning UI/UX expert.',
      skills: ['UI/UX Design', 'User Research', 'Prototyping', 'Design Systems'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '7+ Years'
    },
    {
      id: 4,
      name: 'Emma Williams',
      position: 'Frontend Developer',
      department: 'Development',
      image: '/api/placeholder/300/300',
      bio: 'React specialist with expertise in modern frontend frameworks and performance optimization.',
      skills: ['React', 'JavaScript', 'TypeScript', 'Performance Optimization'],
      social: {
        github: '#',
        linkedin: '#',
        email: 'emma@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '5+ Years'
    },
    {
      id: 5,
      name: 'David Kim',
      position: 'Backend Developer',
      department: 'Development',
      image: '/api/placeholder/300/300',
      bio: 'Database expert and API architect. Specializes in high-performance backend systems and microservices.',
      skills: ['Node.js', 'Python', 'Database Design', 'API Development'],
      social: {
        github: '#',
        linkedin: '#',
        email: 'david@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '6+ Years'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      position: 'Mobile Developer',
      department: 'Development',
      image: '/api/placeholder/300/300',
      bio: 'Mobile app specialist with expertise in both iOS and Android development using React Native and Flutter.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      social: {
        github: '#',
        linkedin: '#',
        email: 'lisa@company.com'
      },
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
      experience: '4+ Years'
    }
  ];

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
    }
  };

  return (
    <>
      {/* Add CSS to hide navbar when modal is open */}
      <style jsx global>{`
        body.modal-open header {
          display: none !important;
        }
      `}</style>

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
            <Users className="w-4 h-4 mr-2" />
            Our Team
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Meet the Dream Team
            </span>
          </h2>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Talented individuals working together to create exceptional digital experiences.
            Meet the people behind our success.
          </p>
        </motion.div>



        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="group relative flex flex-col items-center cursor-pointer"
              variants={cardVariants}
              layout
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              whileHover={{ y: -10 }}
            >
              {/* Main Circular Card */}
              <motion.div
                className="relative w-40 h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                {/* Profile Image (Avatar with Initials) */}
                <div className="w-full h-full flex items-center justify-center text-white text-2xl lg:text-3xl xl:text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Hover Button */}
                <motion.button
                  className={`absolute inset-0 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredMember === member.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onClick={() => openModal(member)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                    <span className="text-white font-medium text-xs lg:text-sm">View Profile</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Position Label */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-light text-lg lg:text-xl text-[#0C2F4F] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm lg:text-base font-light text-[#0C2F4F]/80">
                  {member.position}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Member Details Modal */}
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-8 bg-gradient-to-br from-[#0C2F4F] to-[#1a4d6b] text-white rounded-t-3xl">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-lg">×</span>
                </button>

                <div className="flex items-center space-x-6">
                  {/* Large Profile Circle */}
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div>
                    <h2 className="text-3xl font-light mb-2">{selectedMember.name}</h2>
                    <p className="text-xl opacity-90 mb-2">{selectedMember.position}</p>
                    <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm">
                      {selectedMember.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {/* Experience Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-light text-gray-800">About</span>
                  <span className="bg-[#0C2F4F]/10 text-[#0C2F4F] px-4 py-2 rounded-full text-sm font-medium">
                    {selectedMember.experience}
                  </span>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-light text-gray-800 mb-4">Skills & Expertise</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMember.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#0C2F4F] rounded-full"></div>
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contact & Social */}
                <div>
                  <h3 className="text-xl font-light text-gray-800 mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`mailto:${selectedMember.social.email}`}
                      className="flex items-center space-x-3 px-4 py-3 bg-[#0C2F4F] text-white rounded-xl hover:bg-[#0C2F4F]/90 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>

                    {selectedMember.social.linkedin && (
                      <a
                        href={selectedMember.social.linkedin}
                        className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {selectedMember.social.github && (
                      <a
                        href={selectedMember.social.github}
                        className="flex items-center space-x-3 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {selectedMember.social.twitter && (
                      <a
                        href={selectedMember.social.twitter}
                        className="flex items-center space-x-3 px-4 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Join Our Team CTA */}
        <motion.div
          className="text-center mt-12 bg-brand-light/80 backdrop-blur-xl p-6 rounded-xl border border-[#0C2F4F]/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-[#0C2F4F] to-[#0C2F4F] rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Coffee className="w-6 h-6 text-brand-light" />
          </motion.div>

          <h3 className="text-xl md:text-2xl font-light mb-3">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Want to Join Our Team?
            </span>
          </h3>
          <p className="text-base text-[#0C2F4F] mb-5 leading-relaxed font-light max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] text-brand-light px-6 py-2.5 rounded-lg font-light text-sm tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Open Positions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              className="group relative border-2 border-[#0C2F4F]/20 text-[#0C2F4F] px-6 py-2.5 rounded-lg font-light text-sm hover:bg-[#0C2F4F]/5 transition-all duration-300 backdrop-blur-sm hover:border-[#0C2F4F]/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Send Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F]/10 to-[#0C2F4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Team;
