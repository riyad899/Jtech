import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider/AuthContext';
import useAxiosPublic from '../Hook/useAxiousPublic';
import { User, Mail, Calendar, Shield, Edit3, Save, X, Camera, Trash2, Upload, Lock, Eye, EyeOff, Key } from 'lucide-react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export const Profile = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userData, setUserData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');

  // ImgBB API key - You should move this to environment variables
  const IMGBB_API_KEY = '7ab8cae88bf5c8c6a9a4e6f1c8b8f8a7'; // Replace with your actual ImgBB API key

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      // Only proceed if we have a user email and we're not already loading
      if (!loading && user?.email && !userData) {
        try {
          setFetchLoading(true);
          const response = await axiosPublic.get(`/users/email/${user.email}`);
          const fetchedUserData = response.data;
          setUserData(fetchedUserData);
          setFormData({
            name: fetchedUserData.name || '',
            email: fetchedUserData.email || '',
            photoURL: fetchedUserData.photoURL || ''
          });
          console.log('Fetched user data:', fetchedUserData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Set userData to empty object to prevent infinite retries
          setUserData({});
        } finally {
          setFetchLoading(false);
        }
      } else if (!loading && !user?.email) {
        // No user email available, stop loading
        setFetchLoading(false);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user?.email, loading]); // Remove axiosPublic and userData from dependencies

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling edit
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        photoURL: userData?.photoURL || ''
      });
    } else {
      // Populate form data when entering edit mode
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        photoURL: userData?.photoURL || ''
      });
    }
    setIsEditing(!isEditing);
    setUpdateMessage('');
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
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
      throw error;
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUpdateMessage('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage('Image size should be less than 5MB');
      return;
    }

    try {
      setImageUploadLoading(true);
      setUpdateMessage('Uploading image...');

      const imageUrl = await uploadImageToImgBB(file);

      setFormData(prev => ({
        ...prev,
        photoURL: imageUrl
      }));

      setUpdateMessage('Image uploaded successfully!');

      // Clear message after 3 seconds
      setTimeout(() => {
        setUpdateMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error uploading image:', error);
      setUpdateMessage('Failed to upload image. Please try again.');

      setTimeout(() => {
        setUpdateMessage('');
      }, 5000);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      photoURL: ''
    }));
    setUpdateMessage('Image removed. Remember to save changes.');

    setTimeout(() => {
      setUpdateMessage('');
    }, 3000);
  };

  // Update profile function
  const updateProfile = async () => {
    if (!userData?._id) {
      setUpdateMessage('User ID not found. Please refresh and try again.');
      return;
    }

    try {
      setUpdateLoading(true);
      setUpdateMessage('');

      const response = await axiosPublic.put(`/users/${userData._id}`, {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL
      });

      if (response.data) {
        setUserData(response.data);
        setIsEditing(false);
        setUpdateMessage('Profile updated successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setUpdateMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateMessage('Failed to update profile. Please try again.');

      // Clear error message after 5 seconds
      setTimeout(() => {
        setUpdateMessage('');
      }, 5000);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setUpdateMessage('Please fill in all password fields.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setUpdateMessage('New password must be at least 6 characters long.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setUpdateMessage('New passwords do not match.');
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setUpdateMessage('New password must be different from current password.');
      return;
    }

    setPasswordLoading(true);
    setUpdateMessage('');

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setUpdateMessage('Please log in again to change your password.');
        return;
      }

      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, passwordData.newPassword);

      // Success
      setUpdateMessage('Password changed successfully!');
      setShowChangePasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        setUpdateMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error changing password:', error);

      if (error.code === 'auth/wrong-password') {
        setUpdateMessage('Current password is incorrect.');
      } else if (error.code === 'auth/weak-password') {
        setUpdateMessage('New password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/requires-recent-login') {
        setUpdateMessage('Please log out and log in again before changing your password.');
      } else {
        setUpdateMessage(error.message || 'Failed to change password. Please try again.');
      }

      setTimeout(() => {
        setUpdateMessage('');
      }, 5000);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Display loading state only when actually loading
  if (loading || (fetchLoading && !userData)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0C2F4F]/20 border-t-[#0C2F4F] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0C2F4F] font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Handle case when no user data is available
  if (!user?.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#0C2F4F] font-medium">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-[80px]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
            Profile
          </h1>
          <p className="mt-2 text-lg text-[#0C2F4F]/70 font-medium">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#0C2F4F]/10 p-8">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 text-white text-2xl font-bold flex items-center justify-center overflow-hidden">
                {(isEditing ? formData.photoURL : userData?.photoURL) ? (
                  <img
                    src={isEditing ? formData.photoURL : userData?.photoURL}
                    alt={userData?.name || 'Profile'}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span>{(userData?.name || user?.displayName)?.charAt(0) || 'U'}</span>
                )}
              </div>

              {/* Image Upload/Remove Controls - Only show in edit mode */}
              {isEditing && (
                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                  {/* Upload Image Button */}
                  <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={imageUploadLoading}
                    />
                    {imageUploadLoading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </label>

                  {/* Remove Image Button - Only show if there's an image */}
                  {formData.photoURL && (
                    <button
                      onClick={handleImageRemove}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      disabled={imageUploadLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-[#0C2F4F] font-serif mt-4">
              {userData?.name || user?.displayName || 'User'}
            </h2>
            <p className="text-[#0C2F4F]/70 capitalize">
              {userData?.role || 'user'} Account
            </p>

            {/* Image Upload Instructions - Only show in edit mode */}
            {isEditing && (
              <p className="text-sm text-[#0C2F4F]/50 mt-2">
                Click the camera icon to upload a new image or trash icon to remove current image
              </p>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Update Message */}
            {updateMessage && (
              <div className={`p-4 rounded-xl text-center font-medium ${
                updateMessage.includes('successfully')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {updateMessage}
              </div>
            )}

            <div className="flex items-center space-x-4 p-4 bg-[#0C2F4F]/5 rounded-xl">
              <User className="h-6 w-6 text-[#0C2F4F]" />
              <div className="flex-1">
                <label className="text-sm font-bold text-[#0C2F4F]/70">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2F4F]/30 text-[#0C2F4F]"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-lg font-medium text-[#0C2F4F]">
                    {userData?.name || user?.displayName || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-[#0C2F4F]/5 rounded-xl">
              <Mail className="h-6 w-6 text-[#0C2F4F]" />
              <div className="flex-1">
                <label className="text-sm font-bold text-[#0C2F4F]/70">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2F4F]/30 text-[#0C2F4F]"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-lg font-medium text-[#0C2F4F]">
                    {userData?.email || user?.email || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-[#0C2F4F]/5 rounded-xl">
              <Shield className="h-6 w-6 text-[#0C2F4F]" />
              <div>
                <label className="text-sm font-bold text-[#0C2F4F]/70">Account Type</label>
                <p className="text-lg font-medium text-[#0C2F4F] capitalize">
                  {userData?.role || 'User'} Account
                  {userData?.role === 'admin' && (
                    <span className="ml-2 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-bold">
                      ADMIN
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-[#0C2F4F]/5 rounded-xl">
              <Calendar className="h-6 w-6 text-[#0C2F4F]" />
              <div>
                <label className="text-sm font-bold text-[#0C2F4F]/70">Member Since</label>
                <p className="text-lg font-medium text-[#0C2F4F]">
                  {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  onClick={updateProfile}
                  disabled={updateLoading}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-600/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {updateLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleEditToggle}
                  disabled={updateLoading}
                  className="flex-1 py-3 px-4 border border-red-300 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditToggle}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#0C2F4F]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}

            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="w-full py-3 px-4 border border-[#0C2F4F]/20 text-[#0C2F4F] rounded-xl font-bold hover:bg-[#0C2F4F]/5 transition-all duration-300 flex items-center justify-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#0C2F4F] font-serif">
                  Change Password
                </h3>
                <p className="text-[#0C2F4F]/70 mt-2">
                  Enter your current password and choose a new password.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                {/* Current Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#0C2F4F]/50" />
                    </div>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      required
                      className="block w-full pl-10 pr-10 py-3 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#0C2F4F]/50" />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      required
                      className="block w-full pl-10 pr-10 py-3 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#0C2F4F]/50 mt-1">At least 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#0C2F4F]/50" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      className="block w-full pl-10 pr-10 py-3 border border-[#0C2F4F]/20 placeholder-[#0C2F4F]/50 text-[#0C2F4F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2F4F] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#0C2F4F]/50 hover:text-[#0C2F4F]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePasswordModal(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setUpdateMessage('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 px-4 py-3 bg-[#0C2F4F] text-white rounded-xl hover:bg-[#0C2F4F]/90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Changing...</span>
                      </>
                    ) : (
                      <span>Change Password</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};