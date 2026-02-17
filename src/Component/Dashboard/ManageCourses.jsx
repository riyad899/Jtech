import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hook/useAxiousPublic';
import { Plus, Edit, Trash2, Search, X, BookOpen, Save } from 'lucide-react';

export const ManageCourses = () => {
  const { axiosPublic } = useAxiosPublic();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    rating: '',
    instructor: '',
    thumbnail: '',
    level: 'beginner',
    curriculum: [],
    enrolledCount: 0
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // For array fields
  const [currentModule, setCurrentModule] = useState('');

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/courses');
      setCourses(response.data.data || response.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      duration: '',
      price: '',
      rating: '',
      instructor: '',
      thumbnail: '',
      level: 'beginner',
      curriculum: [],
      enrolledCount: 0
    });
    setEditingId(null);
    setError('');
    setSuccess('');
    setCurrentModule('');
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array field additions
  const addModule = () => {
    if (currentModule.trim()) {
      setFormData(prev => ({
        ...prev,
        curriculum: [...prev.curriculum, currentModule.trim()]
      }));
      setCurrentModule('');
    }
  };

  // Remove items from arrays
  const removeModule = (index) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index)
    }));
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data
      const courseData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0,
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        enrolledCount: parseInt(formData.enrolledCount) || 0
      };

      if (editingId) {
        // Update existing course
        await axiosPublic.put(`/courses/${editingId}`, courseData);
        setSuccess('Course updated successfully!');
      } else {
        // Create new course
        await axiosPublic.post('/courses', courseData);
        setSuccess('Course created successfully!');
      }

      fetchCourses();
      resetForm();
      setShowForm(false);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving course:', err);
      setError(err.response?.data?.message || 'Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  // Edit course
  const handleEdit = (course) => {
    setFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      duration: course.duration || '',
      price: course.price || '',
      rating: course.rating || '',
      instructor: course.instructor || '',
      thumbnail: course.thumbnail || '',
      level: course.level || 'beginner',
      curriculum: course.curriculum || [],
      enrolledCount: course.enrolledCount || 0
    });
    setEditingId(course._id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    setLoading(true);
    try {
      await axiosPublic.delete(`/courses/${id}`);
      setSuccess('Course deleted successfully!');
      fetchCourses();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Failed to delete course');
    } finally {
      setLoading(false);
    }
  };

  // Filter courses by search term
  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#0C2F4F]">Manage Courses</h2>
          <p className="text-[#0C2F4F]/60 mt-1">Create, edit, and manage your courses</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center space-x-2 bg-[#0C2F4F] text-white px-6 py-3 rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-300 shadow-lg"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          <span>{showForm ? 'Cancel' : 'Add Course'}</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-[#0C2F4F]/10">
          <h3 className="text-xl font-bold text-[#0C2F4F] mb-6">
            {editingId ? 'Edit Course' : 'Add New Course'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="e.g., Complete Web Development Bootcamp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="e.g., Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="e.g., 12 weeks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Enrolled Students
                </label>
                <input
                  type="number"
                  name="enrolledCount"
                  value={formData.enrolledCount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                placeholder="Course description..."
              />
            </div>

            {/* Curriculum/Modules */}
            <div>
              <label className="block text-sm font-medium text-[#0C2F4F] mb-2">
                Course Modules/Curriculum
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={currentModule}
                  onChange={(e) => setCurrentModule(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addModule())}
                  className="flex-1 px-4 py-2 border border-[#0C2F4F]/20 rounded-lg focus:outline-none focus:border-[#0C2F4F]"
                  placeholder="Add a module and press Enter"
                />
                <button
                  type="button"
                  onClick={addModule}
                  className="px-4 py-2 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-lg hover:bg-[#0C2F4F]/20 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.curriculum.map((module, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-[#0C2F4F]/10 px-3 py-1 rounded-full text-sm text-[#0C2F4F]"
                  >
                    <span>{module}</span>
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-[#0C2F4F] text-white px-6 py-3 rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? 'Saving...' : editingId ? 'Update Course' : 'Create Course'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="px-6 py-3 border border-[#0C2F4F]/20 text-[#0C2F4F] rounded-lg hover:bg-[#0C2F4F]/5 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C2F4F]/40 w-5 h-5" />
        <input
          type="text"
          placeholder="Search courses by title, category, or instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F] transition-colors"
        />
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0C2F4F]/10">
        {loading && !showForm ? (
          <div className="p-8 text-center text-[#0C2F4F]/60">
            Loading courses...
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className="w-16 h-16 text-[#0C2F4F]/20 mx-auto mb-4" />
            <p className="text-[#0C2F4F]/60">
              {searchTerm ? 'No courses found matching your search' : 'No courses yet. Create your first course!'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0C2F4F]/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Instructor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2F4F]">Rating</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0C2F4F]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0C2F4F]/10">
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-[#0C2F4F]/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#0C2F4F]/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-[#0C2F4F]/40" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#0C2F4F]">{course.title}</p>
                          <p className="text-xs text-[#0C2F4F]/60">{course.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#0C2F4F]/10 text-[#0C2F4F]">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#0C2F4F]/70">
                      {course.instructor || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#0C2F4F]">
                        {course.price ? `$${course.price}` : 'Free'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#0C2F4F]/70">
                      {course.enrolledCount || 0}
                    </td>
                    <td className="px-6 py-4">
                      {course.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-[#0C2F4F]">{course.rating}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Course Count */}
      <div className="text-sm text-[#0C2F4F]/60">
        Showing {filteredCourses.length} of {courses.length} courses
      </div>
    </div>
  );
};

export default ManageCourses;
