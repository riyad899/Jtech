import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthProvider/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../Hook/useAxiousPublic';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, googleLogin, resetPassword, loading } = useAuth();
  const { axiosPublic } = useAxiosPublic();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Directly proceed with Firebase authentication
      const result = await signIn(formData.email, formData.password);

      // Store user data in localStorage for navbar compatibility
      localStorage.setItem('currentUser', JSON.stringify({
        email: result.user.email,
        name: result.user.displayName || result.user.email.split('@')[0],
        role: 'user', // Default role for Firebase users
        loginTime: new Date().toISOString(),
        uid: result.user.uid,
        photoURL: result.user.photoURL
      }));

      toast.success('🎉 Login successful! Welcome back!');

      // Trigger custom event to update navbar
      window.dispatchEvent(new CustomEvent('userLogin', {
        detail: {
          email: result.user.email,
          name: result.user.displayName || result.user.email.split('@')[0],
          role: 'user',
          loginTime: new Date().toISOString(),
          uid: result.user.uid,
          photoURL: result.user.photoURL
        }
      }));

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      // Handle specific Firebase authentication errors
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email. Please register first.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address format.');
      } else if (error.code === 'auth/user-disabled') {
        toast.error('This account has been disabled. Please contact support.');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed login attempts. Please try again later.');
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      toast.success('✅ Password reset email sent! Please check your inbox and spam folder.');
      setShowForgotPasswordModal(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error.code, error.message);

      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address format.');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please try again later.');
      } else if (error.code === 'auth/missing-email') {
        toast.error('Please enter an email address.');
      } else {
        toast.error(error.message || 'Failed to send reset email. Please try again.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('=== GOOGLE LOGIN STARTED ===');
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

      // Authenticate with Google
      const result = await googleLogin();
      console.log('Google auth successful, user email:', result.user.email);

      // Check if user exists in database, if not create them
      try {
        console.log('Checking if user exists in database...');
        const checkResponse = await axiosPublic.get(`/users/email/${result.user.email}`);
        console.log('User exists in database:', checkResponse.data);

        // User exists, update their login time
        console.log('Updating user login time...');
        const updateResponse = await axiosPublic.patch(`/users/${checkResponse.data._id}`, {
          updatedAt: new Date().toISOString(),
          photoURL: result.user.photoURL
        });
        console.log('User updated successfully:', updateResponse.data);

      } catch (error) {
        console.log('Error checking user:', error.response?.status, error.message);

        // User doesn't exist (404), show message to register
        if (error.response?.status === 404) {
          console.log('User not found in database, prompting to register...');
          toast.error('⚠️ Account not found! Please register with Google first.');

          setTimeout(() => {
            navigate('/register');
          }, 2000);

          return; // Stop the login process
        } else {
          console.error('Unexpected error checking user:', error);
          throw error;
        }
      }

      console.log('Storing user in localStorage...');
      // Store user data in localStorage for navbar compatibility
      localStorage.setItem('currentUser', JSON.stringify({
        email: result.user.email,
        name: result.user.displayName,
        role: 'user', // Default role for Firebase users
        loginTime: new Date().toISOString(),
        uid: result.user.uid,
        photoURL: result.user.photoURL
      }));

      toast.success('🚀 Google login successful! Welcome back!');

      console.log('Dispatching userLogin event...');
      // Trigger custom event to update navbar
      window.dispatchEvent(new CustomEvent('userLogin', {
        detail: {
          email: result.user.email,
          name: result.user.displayName,
          role: 'user',
          loginTime: new Date().toISOString(),
          uid: result.user.uid,
          photoURL: result.user.photoURL
        }
      }));

      console.log('Google login flow completed successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('=== GOOGLE LOGIN ERROR ===');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Full error:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Google sign-in was cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup was blocked. Please allow popups and try again.');
      } else {
        toast.error(error.message || 'Google login failed. Please try again.');
      }
    }
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
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="font-medium text-[#0C2F4F] hover:text-[#0C2F4F]/80 transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-brand-light bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] hover:shadow-lg hover:shadow-[#0C2F4F]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? 'Signing In...' : 'Sign In'}
                </span>
                {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#0C2F4F]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-[#0C2F4F]/70 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="group relative w-full flex justify-center items-center py-4 px-4 border border-[#0C2F4F]/20 text-lg font-bold rounded-xl text-[#0C2F4F] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FcGoogle className="w-6 h-6 mr-3" />
                <span className="relative z-10">
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </span>
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

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-[#0C2F4F] font-serif">
                Reset Password
              </h3>
              <p className="text-[#0C2F4F]/70 mt-2">
                Enter your email address and we'll send you a link to reset your password. Please check your spam folder if you don't receive it within a few minutes.
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#0C2F4F]/50" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetEmail('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 px-4 py-3 bg-[#0C2F4F] text-white rounded-xl hover:bg-[#0C2F4F]/90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};