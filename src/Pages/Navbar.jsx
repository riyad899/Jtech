import React, { useState, useEffect } from 'react';
import { ChevronRight, Monitor, Cpu, Smartphone, Cloud, HardDrive, Zap, Shield, Users, Headphones, Star, ArrowRight, Menu, X, Code, Settings, Database, Wifi, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(lastScrollY > currentScrollY);
      }

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrollY > 50
        ? 'bg-brand-light/90 backdrop-blur-xl shadow-2xl border-b border-[#0C2F4F]/20'
        : 'bg-gradient-to-r from-brand-light via-brand-light to-brand-light'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">

          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
                    <img src={logo} alt="jTech Logo" className="w-20 h-20" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent tracking-tight">
              jTech
            </span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-12">
            <div className="flex items-center space-x-12">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group text-[#0C2F4F] hover:text-[#0C2F4F] transition-all duration-300 text-lg font-medium tracking-wide"
                >
                  <span className="relative z-10 font-serif">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] group-hover:w-full transition-all duration-300 rounded-full"></div>
                  <div className="absolute -inset-2 bg-[#0C2F4F]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/login"
              className="relative group overflow-hidden bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-3 rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              <span className="relative z-10 font-serif">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative group p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute inset-0 bg-[#0C2F4F]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMenuOpen ? (
              <X className="w-7 h-7 text-[#0C2F4F] relative z-10 transform rotate-180 transition-transform duration-300" />
            ) : (
              <Menu className="w-7 h-7 text-[#0C2F4F] relative z-10 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-brand-light/90 to-brand-light/90 backdrop-blur-xl rounded-2xl mt-4 mb-6 p-6 border border-[#0C2F4F]/20 shadow-2xl">
            <div className="flex flex-col space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group text-[#0C2F4F] hover:text-[#0C2F4F] transition-all duration-300 text-lg font-medium tracking-wide font-serif py-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F] group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>
              ))}
              <Link
                to="/login"
                className="mt-4 bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] text-brand-light px-8 py-4 rounded-full font-bold text-lg tracking-wide shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 hover:scale-105 font-serif inline-flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};