import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }
    console.log('Registration form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center mt-[80px]">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
            Create Account
          </h2>
          <p className="mt-2 text-lg text-[#0C2F4F]/70 font-medium">
            Join the jTech community today
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#0C2F4F]/10 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name field */}
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="relative block w-full pl-10 pr-3 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Last Name field */}
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="relative block w-full pl-10 pr-3 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

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

            {/* Phone field */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="relative block w-full pl-10 pr-3 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
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
                  autoComplete="new-password"
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

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="relative block w-full pl-10 pr-12 py-4 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F] transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F] transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#0C2F4F] focus:ring-[#0C2F4F] border-[#0C2F4F]/30 rounded"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-[#0C2F4F]/70 font-medium">
                  I agree to the{' '}
                  <Link to="#" className="text-[#0C2F4F] hover:text-[#0C2F4F]/80 font-bold">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-[#0C2F4F] hover:text-[#0C2F4F]/80 font-bold">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-brand-light bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] hover:shadow-lg hover:shadow-[#0C2F4F]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif"
              >
                <span className="relative z-10">Create Account</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Link to login */}
            <div className="text-center">
              <p className="text-[#0C2F4F]/70 text-lg">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors duration-200 font-serif"
                >
                  Sign in
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