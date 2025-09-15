import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Monitor, Cpu, Smartphone, Cloud, HardDrive, Zap, Shield, Users, Headphones, Star, ArrowRight, Menu, X, Code, Settings, Database, Wifi, Sparkles } from 'lucide-react';
import ServiceSlider from '../Component/ServiceSlider';
import Services from '../Component/Services';
import Shop from '../Component/Shop';
import Portfolio from '../Component/Portfolio';
import Features from '../Component/Features';
import Team from '../Component/Team';
import WhyChooseUs from '../Component/WhyChooseUs';
import ContactUs from '../Component/ContactUs';


export const Home = () => {
  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  // Individual card variants with unique movements
  const cardVariants = {
    webSolutions: {
      initial: { x: -100, y: -50, opacity: 0, rotate: -15, scale: 0.7 },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 80,
          damping: 12
        }
      },
      hover: {
        x: [0, -15, 10, -5, 0],
        y: [0, -10, 5, -3, 0],
        rotate: [0, -3, 2, -1, 0],
        scale: 1.08,
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      }
    },
    hardware: {
      initial: { x: -80, y: 120, opacity: 0, rotate: 20, scale: 0.6 },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.4,
          ease: "easeOut",
          type: "spring",
          stiffness: 70,
          damping: 15,
          delay: 0.2
        }
      },
      hover: {
        x: [0, 12, -8, 4, 0],
        y: [0, -12, 8, -4, 0],
        rotate: [0, 5, -3, 2, 0],
        scale: 1.12,
        transition: {
          duration: 0.7,
          ease: "easeInOut"
        }
      }
    },
    mobileApps: {
      initial: { x: 120, y: -80, opacity: 0, rotate: -25, scale: 0.8 },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.3,
          ease: "easeOut",
          type: "spring",
          stiffness: 90,
          damping: 10,
          delay: 0.4
        }
      },
      hover: {
        x: [0, -10, 15, -6, 0],
        y: [0, -15, 8, -4, 0],
        rotate: [0, -4, 3, -1, 0],
        scale: 1.1,
        transition: {
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    },
    iotDevices: {
      initial: { x: 100, y: 100, opacity: 0, rotate: 30, scale: 0.5 },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 1.5,
          ease: "easeOut",
          type: "spring",
          stiffness: 60,
          damping: 18,
          delay: 0.6
        }
      },
      hover: {
        x: [0, 8, -12, 6, 0],
        y: [0, -8, 12, -6, 0],
        rotate: [0, 6, -4, 2, 0],
        scale: 1.15,
        transition: {
          duration: 0.9,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(12,47,79,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#0C2F4F]/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                @Smart Technology Solutions
              </motion.div>

              {/* Static Header */}
              <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
                  Smart IT Solutions
                </span>
              </h1>

              <motion.p
                className="text-base md:text-lg text-[#0C2F4F] leading-relaxed font-light max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                From cutting-edge Web Development to innovative IoT Devices –
                <span className="text-[#0C2F4F] font-medium"> We Deliver Technology</span> that accelerates your growth.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="group relative overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-2xl hover:shadow-[#0C2F4F]/30 transition-all duration-300 font-serif"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Explore Our Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>

              <motion.button
                className="group relative border-2 border-[#0C2F4F] text-[#0C2F4F] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0C2F4F]/5 transition-all duration-300 font-serif backdrop-blur-sm hover:border-[#0C2F4F]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F]/10 to-[#0C2F4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Service Cards */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                {/* Web Solutions Card */}
                <motion.div
                  className="group bg-brand-light/80 backdrop-blur-xl p-10 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer"
                  variants={cardVariants.webSolutions}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></motion.div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                      whileHover={{
                        rotate: [0, -15, 15, -10, 5, 0],
                        scale: [1, 1.1, 1.05, 1.08, 1],
                        y: [-4, -6, -3, -5, -4]
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                    >
                      <Monitor className="w-7 h-7 text-[#0C2F4F]/80" />
                    </motion.div>
                    <motion.h3
                      className="font-bold text-lg text-[#0C2F4F] mb-2 font-serif"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      Web Solutions
                    </motion.h3>
                    <p className="text-[#0C2F4F] text-sm leading-relaxed">Modern, responsive websites that drive results</p>
                  </div>
                </motion.div>

                {/* Hardware Card */}
                <motion.div
                  className="group bg-brand-light/80 backdrop-blur-xl p-10 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer"
                  variants={cardVariants.hardware}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></motion.div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                      whileHover={{
                        rotate: [0, 25, -20, 15, -10, 0],
                        scale: [1, 1.15, 1.08, 1.12, 1],
                        y: [-4, -8, -5, -6, -4]
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut"
                      }}
                    >
                      <HardDrive className="w-7 h-7 text-[#0C2F4F]/80" />
                    </motion.div>
                    <motion.h3
                      className="font-bold text-lg text-[#0C2F4F] mb-2 font-serif"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      Hardware
                    </motion.h3>
                    <p className="text-[#0C2F4F] text-sm leading-relaxed">Premium components for every tech need</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-5 mt-8">
                {/* Mobile Apps Card */}
                <motion.div
                  className="group bg-brand-light/80 backdrop-blur-xl p-10 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer"
                  variants={cardVariants.mobileApps}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></motion.div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                      whileHover={{
                        rotate: [0, -30, 25, -15, 10, 0],
                        scale: [1, 1.2, 1.12, 1.16, 1],
                        y: [-5, -9, -6, -8, -5]
                      }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut"
                      }}
                    >
                      <Smartphone className="w-7 h-7 text-[#0C2F4F]/80" />
                    </motion.div>
                    <motion.h3
                      className="font-bold text-lg text-[#0C2F4F] mb-2 font-serif"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      Mobile Apps
                    </motion.h3>
                    <p className="text-[#0C2F4F] text-sm leading-relaxed">Native and cross-platform app development</p>
                  </div>
                </motion.div>

                {/* IoT Devices Card */}
                <motion.div
                  className="group bg-brand-light/80 backdrop-blur-xl p-10 rounded-3xl border border-[#0C2F4F]/20 hover:border-[#0C2F4F]/50 transition-all duration-500 shadow-xl hover:shadow-[#0C2F4F]/20 relative overflow-hidden cursor-pointer"
                  variants={cardVariants.iotDevices}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0C2F4F]/3 to-[#0C2F4F]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></motion.div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-white/30"
                      whileHover={{
                        rotate: [0, 35, -30, 20, -15, 0],
                        scale: [1, 1.25, 1.18, 1.22, 1],
                        y: [-5, -10, -8, -9, -5]
                      }}
                      transition={{
                        duration: 1.4,
                        ease: "easeInOut"
                      }}
                    >
                      <Wifi className="w-7 h-7 text-[#0C2F4F]/80" />
                    </motion.div>
                    <motion.h3
                      className="font-bold text-lg text-[#0C2F4F] mb-2 font-serif"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      IoT Devices
                    </motion.h3>
                    <p className="text-[#0C2F4F] text-sm leading-relaxed">Smart connected solutions for modern living</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#0C2F4F]/20 to-[#0C2F4F]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#0C2F4F]/20 to-[#0C2F4F]/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
      <ServiceSlider/>
      <WhyChooseUs/>
      <Services/>
      <Shop/>
      <Portfolio/>

      <Features/>
      <Team/>
      <ContactUs/>


    </section>
  )
}