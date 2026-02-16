import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Eye, User, Mail, Linkedin, Github, Twitter, Link, AlertTriangle, Upload, Camera, ImageIcon } from 'lucide-react';
import useAxiosPublic from '../../Hook/useAxiousPublic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    bio: '',
    skills: [],
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      email: ''
    },
    experience: '',
    image: '/api/placeholder/300/300',
    gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
    bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
  });

  const { teamAPI } = useAxiosPublic();

  // ImgBB API configuration
  const IMGBB_API_KEY = 'd887aa1f55a982c1a6829f027d626c89';
  const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

  // Image upload to ImgBB
  const uploadToImgBB = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      console.log('Uploading image to ImgBB...');
      const response = await fetch(IMGBB_UPLOAD_URL, {
        method: 'POST',
        body: uploadFormData,
      });

      console.log('ImgBB response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('ImgBB error response:', errorData);
        throw new Error(`ImgBB upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('ImgBB response data:', data);

      if (!data.success) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      return data.data.url;
    } catch (error) {
      console.error('Error uploading to ImgBB:', error);
      throw error;
    }
  };

  // Handle image file selection
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      setImageUploading(true);
      console.log('Starting image upload for file:', file.name, 'Size:', file.size);

      const imageUrl = await uploadToImgBB(file);
      console.log('Image uploaded successfully:', imageUrl);

      // Update form data with the new image URL
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));

      console.log('Form data updated with image URL:', imageUrl);

      toast.success('Image uploaded successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error uploading image:', error);

      let errorMessage = 'Failed to upload image. Please try again.';

      if (error.message.includes('ImgBB upload failed')) {
        errorMessage = 'Image hosting service error. Please try again or use a different image.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setImageUploading(false);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  // Fetch team members from API
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getTeamMembers();
      console.log('Fetched team members:', response.data);
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Keep existing static data as fallback for now
      setTeamMembers([
        { id: 1, name: 'Alice Johnson', position: 'Manager', department: 'Management', email: 'alice@company.com', joinDate: '2023-01-15', experience: '5+ Years' },
        { id: 2, name: 'Bob Smith', position: 'Developer', department: 'Development', email: 'bob@company.com', joinDate: '2023-03-20', experience: '3+ Years' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: { ...prev.social, [socialField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle skills array
  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      department: '',
      bio: '',
      skills: [],
      social: {
        linkedin: '',
        github: '',
        twitter: '',
        email: ''
      },
      experience: '',
      image: '/api/placeholder/300/300',
      gradient: 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    });
    setEditingMember(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.position.trim() || !formData.department.trim()) {
      toast.error('Please fill in all required fields (Name, Position, Department)', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      setLoading(true);

      // Create a clean copy of form data
      const submitData = {
        ...formData,
        name: formData.name.trim(),
        position: formData.position.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        experience: formData.experience.trim(),
        // Include the image URL
        image: formData.image || '/api/placeholder/300/300',
        // Include gradients for styling
        gradient: formData.gradient || 'from-[#0C2F4F] to-[#0C2F4F]',
        bgGradient: formData.bgGradient || 'from-[#0C2F4F]/5 to-[#0C2F4F]/5',
        // Ensure skills is always an array
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        // Ensure social is always an object
        social: {
          linkedin: formData.social?.linkedin?.trim() || '',
          github: formData.social?.github?.trim() || '',
          twitter: formData.social?.twitter?.trim() || '',
          email: formData.social?.email?.trim() || ''
        }
      };

      console.log('Submitting data:', submitData);
      console.log('Image URL being sent:', submitData.image);

      if (editingMember) {
        // Use both _id and id to ensure compatibility
        const memberId = editingMember._id || editingMember.id;
        console.log('Updating member with ID:', memberId);

        if (!memberId) {
          throw new Error('Member ID not found');
        }

        const response = await teamAPI.updateTeamMember(memberId, submitData);
        console.log('Update response:', response);

        toast.success('Team member updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log('Adding new member');
        const response = await teamAPI.addTeamMember(submitData);
        console.log('Add response:', response);

        toast.success('Team member added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      fetchTeamMembers();
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
      console.error('Form data being submitted:', formData);
      console.error('Editing member:', editingMember);

      let errorMessage = 'Error saving team member. Please try again.';

      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);

        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid data provided. Please check your input.';
        } else if (error.response.status === 404) {
          errorMessage = 'Team member not found. Please refresh and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        // Something else happened
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (member) => {
    console.log('Editing member:', member);
    console.log('Member image URL:', member.image);

    setFormData({
      name: member.name || '',
      position: member.position || '',
      department: member.department || '',
      bio: member.bio || '',
      skills: member.skills || [],
      social: {
        linkedin: member.social?.linkedin || '',
        github: member.social?.github || '',
        twitter: member.social?.twitter || '',
        email: member.social?.email || member.email || ''
      },
      experience: member.experience || '',
      image: member.image || '/api/placeholder/300/300',
      gradient: member.gradient || 'from-[#0C2F4F] to-[#0C2F4F]',
      bgGradient: member.bgGradient || 'from-[#0C2F4F]/5 to-[#0C2F4F]/5'
    });
    setEditingMember(member);
    setShowForm(true);

    console.log('Form data set for editing with image:', member.image || '/api/placeholder/300/300');
  };

  // Handle delete
  const handleDelete = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      setLoading(true);

      // Use either _id or id field from the member object
      const memberId = memberToDelete._id || memberToDelete.id;

      console.log('Deleting member:', memberToDelete);
      console.log('Member ID being used:', memberId);

      if (!memberId) {
        throw new Error('Member ID not found');
      }

      const response = await teamAPI.deleteTeamMember(memberId);
      console.log('Delete response:', response);

      toast.success('Team member deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchTeamMembers();
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Error deleting team member:', error);
      console.error('Member to delete:', memberToDelete);

      let errorMessage = 'Error deleting team member. Please try again.';

      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.message) {
        // Something else happened
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
            <button
              onClick={() => setShowForm(true)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Experience</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id || member.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{member.name}</td>
                      <td className="py-3 px-4">{member.position}</td>
                      <td className="py-3 px-4">{member.department}</td>
                      <td className="py-3 px-4">{member.social?.email || member.email}</td>
                      <td className="py-3 px-4">{member.experience}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {teamMembers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No team members found. Add your first team member!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  {editingMember ? (
                    <>
                      <Edit className="h-5 w-5" />
                      <span>Edit Team Member</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add New Team Member</span>
                    </>
                  )}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>Profile Image</span>
                </label>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                      {formData.image && formData.image !== '/api/placeholder/300/300' ? (
                        <img
                          src={formData.image}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <User className="h-12 w-12 mx-auto mb-2" />
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                        dragActive
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                      } ${imageUploading ? 'opacity-75' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {imageUploading ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                          <p className="text-sm text-gray-600">Uploading image...</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Drop your image here, or{' '}
                            <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                              browse
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={imageUploading}
                              />
                            </label>
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF, WebP up to 5MB
                          </p>
                        </div>
                      )}
                    </div>

                    {formData.image && formData.image !== '/api/placeholder/300/300' && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '/api/placeholder/300/300' }))}
                          className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                        >
                          <X className="h-4 w-4" />
                          <span>Remove image</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Senior Developer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Engineering"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5+ Years"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Brief description about the team member..."
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  placeholder="React, JavaScript, Node.js, etc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center space-x-2">
                  <Link className="h-5 w-5" />
                  <span>Social Links</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="social.email"
                      value={formData.social.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="email@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </label>
                    <input
                      type="url"
                      name="social.linkedin"
                      value={formData.social.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </label>
                    <input
                      type="url"
                      name="social.github"
                      value={formData.social.github}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </label>
                    <input
                      type="url"
                      name="social.twitter"
                      value={formData.social.twitter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Confirm Delete</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Delete Team Member
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-gray-900">
                      {memberToDelete.name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700">
                      <strong>Warning:</strong> All data associated with this team member will be permanently removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={loading}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 rounded-lg flex items-center space-x-2 transition-colors font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{loading ? 'Deleting...' : 'Delete Member'}</span>
                </button>
              </div>
            </div>
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
        toastClassName="shadow-lg"
      />
    </div>
  );
};