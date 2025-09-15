import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  ShoppingCart,
  Cloud,
  Lightbulb,
  Wrench,
  Monitor,
  Code,
  Database,
  Shield
} from 'lucide-react';

const ServiceSlider = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);
  const sliderRef = useRef(null);

  const services = [
    {
      id: 1,
      name: 'Web Development',
      icon: Globe,
      description: 'Custom websites & web applications',
      details: 'Full-stack development using React, Next.js, Node.js, and modern frameworks. Responsive design, SEO optimization, and performance tuning.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Cross-Browser Compatible'],
      timeline: '2-8 weeks'
    },
    {
      id: 2,
      name: 'Mobile Apps',
      icon: Smartphone,
      description: 'iOS & Android applications',
      details: 'Native and cross-platform mobile app development with React Native, Flutter, or native Swift/Kotlin. App Store optimization included.',
      features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Support'],
      timeline: '3-12 weeks'
    },
    {
      id: 3,
      name: 'UI/UX Design',
      icon: Palette,
      description: 'Beautiful user interfaces',
      details: 'User-centered design process including wireframing, prototyping, user testing, and visual design. Focus on accessibility and usability.',
      features: ['User Research', 'Prototyping', 'Accessibility', 'Design Systems'],
      timeline: '1-6 weeks'
    },
    {
      id: 4,
      name: 'Digital Marketing',
      icon: TrendingUp,
      description: 'SEO & social media marketing',
      details: 'Comprehensive digital marketing strategies including SEO, PPC, social media management, content marketing, and analytics tracking.',
      features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Analytics'],
      timeline: 'Ongoing'
    },
    {
      id: 5,
      name: 'E-commerce',
      icon: ShoppingCart,
      description: 'Online store solutions',
      details: 'Complete e-commerce platforms with payment integration, inventory management, order processing, and customer analytics.',
      features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Customer Portal'],
      timeline: '4-10 weeks'
    },
    {
      id: 6,
      name: 'Cloud Services',
      icon: Cloud,
      description: 'Scalable cloud infrastructure',
      details: 'AWS, Azure, and Google Cloud deployment, auto-scaling, monitoring, backup solutions, and cloud migration services.',
      features: ['Auto-Scaling', 'Load Balancing', 'Backup & Recovery', 'Cost Optimization'],
      timeline: '1-4 weeks'
    },
    {
      id: 7,
      name: 'Consulting',
      icon: Lightbulb,
      description: 'Strategic technology advice',
      details: 'Technology strategy planning, digital transformation consulting, architecture reviews, and technology stack recommendations.',
      features: ['Tech Strategy', 'Architecture Review', 'Best Practices', 'Cost Analysis'],
      timeline: '1-8 weeks'
    },
    {
      id: 8,
      name: 'Support',
      icon: Wrench,
      description: '24/7 technical support',
      details: 'Round-the-clock technical support, bug fixes, performance monitoring, security updates, and maintenance services.',
      features: ['24/7 Monitoring', 'Quick Response', 'Security Updates', 'Performance Tuning'],
      timeline: 'Ongoing'
    },
    {
      id: 9,
      name: 'Software Development',
      icon: Monitor,
      description: 'Custom software solutions',
      details: 'Enterprise software development, desktop applications, workflow automation, and legacy system modernization.',
      features: ['Custom Solutions', 'Enterprise Grade', 'Workflow Automation', 'Legacy Migration'],
      timeline: '6-20 weeks'
    },
    {
      id: 10,
      name: 'API Development',
      icon: Code,
      description: 'RESTful & GraphQL APIs',
      details: 'Scalable API development with proper documentation, authentication, rate limiting, and comprehensive testing.',
      features: ['RESTful APIs', 'GraphQL', 'Authentication', 'Rate Limiting'],
      timeline: '2-8 weeks'
    },
    {
      id: 11,
      name: 'Database Design',
      icon: Database,
      description: 'Efficient data management',
      details: 'Database architecture, optimization, migration, backup strategies, and performance tuning for SQL and NoSQL databases.',
      features: ['Schema Design', 'Performance Tuning', 'Data Migration', 'Backup Strategy'],
      timeline: '1-6 weeks'
    },
    {
      id: 12,
      name: 'Security Services',
      icon: Shield,
      description: 'Cybersecurity solutions',
      details: 'Security audits, penetration testing, compliance assessments, security implementation, and ongoing monitoring.',
      features: ['Security Audit', 'Penetration Testing', 'Compliance', 'Threat Monitoring'],
      timeline: '2-8 weeks'
    },
    {
      id: 13,
      name: 'DevOps',
      icon: Cloud,
      description: 'CI/CD & deployment automation',
      details: 'Continuous integration/deployment pipelines, infrastructure as code, monitoring, and automated testing workflows.',
      features: ['CI/CD Pipeline', 'Infrastructure as Code', 'Automated Testing', 'Monitoring'],
      timeline: '2-6 weeks'
    },
    {
      id: 14,
      name: 'AI & Machine Learning',
      icon: Lightbulb,
      description: 'Intelligent automation solutions',
      details: 'Machine learning model development, AI integration, natural language processing, and predictive analytics solutions.',
      features: ['ML Models', 'AI Integration', 'NLP Solutions', 'Predictive Analytics'],
      timeline: '4-16 weeks'
    },
    {
      id: 15,
      name: 'Quality Assurance',
      icon: Shield,
      description: 'Testing & validation services',
      details: 'Comprehensive testing strategies including automated testing, performance testing, security testing, and quality audits.',
      features: ['Automated Testing', 'Performance Testing', 'Security Testing', 'Quality Audits'],
      timeline: '1-4 weeks'
    },
    {
      id: 16,
      name: 'Maintenance',
      icon: Wrench,
      description: 'Ongoing support & updates',
      details: 'Regular updates, bug fixes, performance optimization, security patches, and feature enhancements for existing systems.',
      features: ['Regular Updates', 'Bug Fixes', 'Security Patches', 'Feature Enhancements'],
      timeline: 'Ongoing'
    },
  ];

  const duplicatedServices = [...services, ...services, ...services];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !isPlaying) return;

    let animationId;
    let position = 0;
    const speed = 0.4;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= slider.scrollWidth / 3) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
    setHoveredService(null);
  };

  return (
    <div className="relative mt-[100px] p-8">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-50"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-300/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Slider Container */}
      <div
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          className="flex gap-6 will-change-transform py-8 px-6"
          style={{ width: 'fit-content' }}
        >
          {duplicatedServices.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredService === `${service.id}-${index}`;

            return (
              <div
                key={`${service.id}-${index}`}
                className={`
                  flex-shrink-0 w-80 h-64 relative group cursor-pointer
                  transform transition-all duration-500 ease-out
                  ${isHovered ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-2'}
                `}
                onMouseEnter={() => setHoveredService(`${service.id}-${index}`)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Card Background with Glass Effect */}
                <div className={`
                  absolute inset-0 rounded-3xl backdrop-blur-xl
                  bg-brand-light/80 border border-[#0C2F4F]/20
                  transition-all duration-500
                  ${isHovered ? 'shadow-xl shadow-[#0C2F4F]/20 border-[#0C2F4F]/50' : 'shadow-xl shadow-[#0C2F4F]/20'}
                `}>
                  {/* Subtle Border Animation */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
                    ${isHovered ? 'opacity-100' : ''}
                  `}>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-100 to-white animate-pulse opacity-30"></div>
                  </div>
                </div>

                {/* Floating Icon */}
                <div className={`
                  absolute -top-6 left-8 w-12 h-12 rounded-2xl
                  bg-white/20 backdrop-blur-md border border-white/30
                  flex items-center justify-center
                  shadow-2xl shadow-gray-400/25
                  transform transition-all duration-500
                  ${isHovered ? 'rotate-12 scale-110 shadow-3xl bg-white/30 border-white/40' : 'group-hover:rotate-6 group-hover:scale-105'}
                `}>
                  <IconComponent className={`w-6 h-6 drop-shadow-lg transition-colors duration-500 ${isHovered ? 'text-[#0C2F4F]' : 'text-[#0C2F4F]/80'}`} />

                  {/* Icon Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-gray-200/30
                    blur-xl opacity-0 transition-opacity duration-500
                    ${isHovered ? 'opacity-60' : ''}
                  `}></div>

                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col p-10 pt-10 overflow-hidden">
                  {/* Timeline Badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] text-xs rounded-full font-light">
                    {service.timeline}
                  </div>

                  <h3 className={`
                    text-lg font-light text-[#0C2F4F] mb-2
                    transform transition-all duration-500
                    ${isHovered ? 'translate-x-2' : ''}
                  `}>
                    {service.name}
                  </h3>

                  <p className={`
                    text-[#0C2F4F] text-sm mb-3 leading-relaxed font-light
                    transform transition-all duration-500 delay-75
                    ${isHovered ? 'translate-x-2' : ''}
                  `}>
                    {service.description}
                  </p>

                  {/* Detailed Description */}
                  <p className={`
                    text-[#0C2F4F]/70 text-xs mb-4 leading-relaxed font-light
                    transform transition-all duration-500 delay-100
                    ${isHovered ? 'translate-x-2 text-[#0C2F4F]' : ''}
                  `}>
                    {service.details}
                  </p>

                  {/* Features List */}


                  {/* Animated Accent Line */}
                  <div className={`
                    mt-auto h-0.5 bg-[#0c2f4f] rounded-full
                    transform origin-left transition-all duration-500 delay-200
                    ${isHovered ? 'scale-x-100' : 'scale-x-0'}
                  `}></div>

                  {/* Hover Effect Particles */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-[#0c2f4f] rounded-full animate-ping opacity-60"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Corner Accent */}
                <div className={`
                  absolute bottom-0 right-0 w-16 h-16
                  bg-gray-100 opacity-30 rounded-tl-3xl rounded-br-2xl
                  transform transition-all duration-500
                  ${isHovered ? 'scale-125 opacity-50 bg-[#0c2f4f]' : ''}
                `}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>

        {/* Edge Glow Effects */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-20"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Bottom Reflection */}
      <div className="absolute -bottom-8 left-8 right-8 h-16 bg-gradient-to-b from-gray-200/20 to-transparent blur-xl rounded-3xl"></div>
    </div>
  );
};

export default ServiceSlider;