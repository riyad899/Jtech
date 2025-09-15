import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center mt-[80px]">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
            Welcome Back
          </h2>
          <p className="mt-2 text-lg text-[#0C2F4F]/70 font-medium">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#0C2F4F]/10 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full pl-10 pr-3 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="relative block w-full pl-10 pr-12 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F] transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F] transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-brand-light bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] hover:shadow-lg hover:shadow-[#0C2F4F]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif"
              >
                <span className="relative z-10">Sign In</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Link to register */}
            <div className="text-center">
              <p className="text-[#0C2F4F]/70 text-lg">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors duration-200 font-serif"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors duration-200 font-medium text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};