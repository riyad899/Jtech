import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, Upload, X, Camera } from 'lucide-react';
import { useAuth } from '../AuthProvider/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from '../Hook/useAxiousPublic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();
  const { createUser, updateUserProfile, googleLogin, loading } = useAuth();
  const { axiosPublic } = useAxiosPublic();

  // Function to check if user already exists
  const checkUserExists = async (email) => {
    try {
      const response = await axiosPublic.get(`/users/email/${encodeURIComponent(email)}`);
      return response.data.success && response.data.user;
    } catch (error) {
      // If 404, user doesn't exist (which is good for registration)
      if (error.response?.status === 404) {
        return false;
      }
      console.error('Error checking user existence:', error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Function to save user data to database
  const saveUserData = async (userData) => {
    try {
      console.log('Attempting to save user data:', userData);

      // Check if user already exists before saving
      const userExists = await checkUserExists(userData.email);
      if (userExists) {
        throw new Error('A user with this email already exists in our database.');
      }

      const response = await axiosPublic.post('/users', userData);
      console.log('User data saved successfully:', response.data);

      // Check the response structure from your enhanced backend
      if (response.data.success === false) {
        throw new Error(response.data.message || 'Failed to save user data');
      }

      toast.success('User profile saved to database!');
      return response.data;
    } catch (error) {
      console.error('Error saving user data:', error);

      // Handle specific error types from your enhanced backend
      if (error.message?.includes('already exists')) {
        toast.error('A user with this email already exists in our database.');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Invalid user data provided.');
      } else if (error.response?.status === 500) {
        toast.error('Server error occurred. Please try again later.');
      } else {
        toast.error('Failed to save user profile. Your account was created but profile data may be incomplete.');
      }

      // Re-throw the error so the calling function can handle it
      throw error;
    }
  };

  // Function to upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    if (!imageFile) return null;

    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=d887aa1f55a982c1a6829f027d626c89`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Image upload failed. Please try again.');
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB.');
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      toast.success('Image selected successfully!');
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!isGoogleUser && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions!');
      return;
    }
    if (!isGoogleUser && formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    try {
      // First check if user already exists in database
      toast.info('Checking if email is available...');
      const userExists = await checkUserExists(formData.email);
      if (userExists) {
        toast.error('A user with this email already exists. Please use a different email or try logging in.');
        return;
      }

      // Upload image first if selected
      let photoURL = null;
      if (selectedImage) {
        toast.info('Uploading your profile image...');
        photoURL = await uploadImageToImgBB(selectedImage);
        if (selectedImage && !photoURL) {
          // Image upload failed, don't proceed
          return;
        }
        toast.success('Profile image uploaded successfully!');
      }

      // Create user account
      const result = await createUser(formData.email, formData.password);

      // Update user profile with name and photo
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await updateUserProfile(fullName, photoURL);

      // Prepare comprehensive user data for database
      const userData = {
        uid: result.user.uid,
        email: result.user.email.toLowerCase(), // Ensure consistent email format
        name: fullName,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone?.trim() || '',
        role: 'user', // Default role for new registrations
        loginMethod: 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoURL: photoURL || null,
        isActive: true, // User is active by default
        emailVerified: result.user.emailVerified || false
      };

      // Save user data to database
      try {
        await saveUserData(userData);
      } catch (dbError) {
        // Database save failed, but Firebase account was created successfully
        console.error('Database save failed:', dbError);
        toast.warning('Account created successfully, but profile save failed. You can update your profile later.');
        // Continue with the registration flow
      }

      // Store user data in localStorage for navbar compatibility
      localStorage.setItem('currentUser', JSON.stringify({
        email: result.user.email,
        name: fullName,
        role: 'user', // Default role for new users
        loginTime: new Date().toISOString(),
        uid: result.user.uid,
        photoURL: photoURL || result.user.photoURL
      }));

      toast.success('🎉 Account created successfully! Welcome to jTech!');

      // Trigger custom event to update navbar
      window.dispatchEvent(new CustomEvent('userLogin', {
        detail: {
          email: result.user.email,
          name: fullName,
          role: 'user',
          loginTime: new Date().toISOString(),
          uid: result.user.uid,
          photoURL: photoURL || result.user.photoURL
        }
      }));

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // First authenticate with Google to get user info
      toast.info('Connecting to Google...');
      const result = await googleLogin();

      // Check if user already exists in database
      toast.info('Checking if account already exists...');
      const userExists = await checkUserExists(result.user.email);
      if (userExists) {
        toast.error('An account with this Google email already exists. Please try logging in instead.');
        return;
      }

      // Set Google user flag and populate form data
      setIsGoogleUser(true);
      const displayName = result.user.displayName || 'Google User';
      const [firstName, ...lastNameParts] = displayName.split(' ');

      setFormData(prev => ({
        ...prev,
        firstName: firstName || 'Google',
        lastName: lastNameParts.join(' ') || 'User',
        email: result.user.email,
        password: '', // Google users don't need password
        confirmPassword: '' // Google users don't need password confirmation
      }));

      // Set Google profile photo as preview if available
      if (result.user.photoURL) {
        setImagePreview(result.user.photoURL);
      }

      // Prepare comprehensive user data for database
      const userData = {
        uid: result.user.uid,
        email: result.user.email.toLowerCase(), // Ensure consistent email format
        name: displayName,
        firstName: (firstName || 'Google').trim(),
        lastName: (lastNameParts.join(' ') || 'User').trim(),
        phone: result.user.phoneNumber || '',
        role: 'user', // Default role for new registrations
        loginMethod: 'google',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoURL: result.user.photoURL || null,
        isActive: true, // User is active by default
        emailVerified: result.user.emailVerified || true // Google emails are typically verified
      };

      // Save user data to database
      try {
        await saveUserData(userData);
      } catch (dbError) {
        // Database save failed, but Google account was created successfully
        console.error('Database save failed:', dbError);
        toast.warning('Account created successfully, but profile save failed. You can update your profile later.');
        // Continue with the registration flow
      }

      // Store user data in localStorage for navbar compatibility
      localStorage.setItem('currentUser', JSON.stringify({
        email: result.user.email,
        name: displayName,
        role: 'user', // Default role for new users
        loginTime: new Date().toISOString(),
        uid: result.user.uid,
        photoURL: result.user.photoURL
      }));

      toast.success('🚀 Google registration successful! Welcome to jTech!');

      // Trigger custom event to update navbar
      window.dispatchEvent(new CustomEvent('userLogin', {
        detail: {
          email: result.user.email,
          name: displayName,
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
      toast.error(error.message || 'Google registration failed. Please try again.');
    }
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

            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                Profile Picture {!isGoogleUser && '(optional)'}
              </label>

              {!imagePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isGoogleUser}
                  />
                  <label
                    htmlFor="profileImage"
                    className={`relative block w-full border-2 border-dashed border-[#0C2F4F]/20 rounded-xl p-6 text-center hover:border-[#0C2F4F]/40 transition-colors duration-300 cursor-pointer bg-white/30 backdrop-blur-sm ${isGoogleUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Camera className="h-12 w-12 text-[#0C2F4F]/40 mx-auto mb-4" />
                    <p className="text-[#0C2F4F]/70 font-medium">
                      {isGoogleUser ? 'Google profile photo will be used' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-[#0C2F4F]/50 text-sm mt-1">
                      {!isGoogleUser && 'PNG, JPG, GIF up to 5MB'}
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#0C2F4F]/20">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                    {!isGoogleUser && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {!isGoogleUser && (
                    <div className="text-center mt-2">
                      <label
                        htmlFor="profileImage"
                        className="text-[#0C2F4F] hover:text-[#0C2F4F]/80 font-medium cursor-pointer text-sm"
                      >
                        Change Image
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Password field - Hidden for Google users */}
            {!isGoogleUser && (
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
            )}

            {/* Confirm Password field - Hidden for Google users */}
            {!isGoogleUser && (
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
            )}

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
                disabled={loading || imageUploading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-brand-light bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] hover:shadow-lg hover:shadow-[#0C2F4F]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {imageUploading ? 'Uploading Image...' : loading ? 'Creating Account...' : isGoogleUser ? 'Complete Registration' : 'Create Account'}
                </span>
                {!loading && !imageUploading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />}
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

            {/* Google Register Button - Hidden after Google registration */}
            {!isGoogleUser && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={loading || imageUploading}
                  className="group relative w-full flex justify-center items-center py-4 px-4 border border-[#0C2F4F]/20 text-lg font-bold rounded-xl text-[#0C2F4F] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C2F4F] transition-all duration-300 hover:scale-105 font-serif disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle className="w-6 h-6 mr-3" />
                  <span className="relative z-10">
                    {loading ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </button>
              </div>
            )}

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

export default Register;