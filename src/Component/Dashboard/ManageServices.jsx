import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Eye, Wrench, Link, AlertTriangle } from 'lucide-react';
import useAxiosPublic from '../../Hook/useAxiousPublic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    provider: '',
    status: 'active',
    features: [],
    demoWorks: []
  });

  const [currentDemoWork, setCurrentDemoWork] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    completed: ''
  });

  const { serviceAPI } = useAxiosPublic();

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getServices();
      console.log('Fetched services:', response.data);

      // Sort services to show latest at top (by _id which contains timestamp in MongoDB)
      const sortedServices = response.data.sort((a, b) => {
        // Try to sort by _id (MongoDB ObjectId contains timestamp)
        const idA = a._id || a.id;
        const idB = b._id || b.id;

        // MongoDB ObjectIds can be compared as strings (newer = greater)
        if (idA && idB) {
          return idB.localeCompare(idA);
        }

        // Fallback: sort by any createdAt field if available
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }

        return 0;
      });

      setServices(sortedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      // No fallback data - show empty state if API fails
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle features array
  const handleFeaturesChange = (e) => {
    const features = e.target.value.split(',').map(feature => feature.trim()).filter(feature => feature);
    setFormData(prev => ({ ...prev, features }));
  };

  // Handle technologies array for demo work
  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setCurrentDemoWork(prev => ({ ...prev, technologies }));
  };

  // Handle demo work input changes
  const handleDemoWorkChange = (e) => {
    const { name, value } = e.target;
    setCurrentDemoWork(prev => ({ ...prev, [name]: value }));
  };

  // Add demo work to the list
  const addDemoWork = () => {
    if (!currentDemoWork.title || !currentDemoWork.description) {
      toast.warning('Please fill in demo work title and description', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const newDemoWork = {
      id: formData.demoWorks.length + 1,
      ...currentDemoWork
    };

    setFormData(prev => ({
      ...prev,
      demoWorks: [...prev.demoWorks, newDemoWork]
    }));

    // Reset current demo work form
    setCurrentDemoWork({
      title: '',
      description: '',
      image: '',
      technologies: [],
      completed: ''
    });

    toast.success('Demo work added!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Remove demo work from the list
  const removeDemoWork = (index) => {
    setFormData(prev => ({
      ...prev,
      demoWorks: prev.demoWorks.filter((_, i) => i !== index)
    }));
    toast.info('Demo work removed', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      provider: '',
      status: 'active',
      features: [],
      demoWorks: []
    });
    setCurrentDemoWork({
      title: '',
      description: '',
      image: '',
      technologies: [],
      completed: ''
    });
    setEditingService(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingService) {
        const serviceId = editingService._id || editingService.id;
        await serviceAPI.updateService(serviceId, formData);
        toast.success('Service updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        await serviceAPI.addService(formData);
        toast.success('Service added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Error saving service. Please try again.', {
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

  // Handle edit
  const handleEdit = (service) => {
    setFormData({
      title: service.title || '',
      description: service.description || '',
      category: service.category || '',
      price: service.price || '',
      duration: service.duration || '',
      provider: service.provider || '',
      status: service.status || 'active',
      features: service.features || [],
      demoWorks: service.demoWorks || []
    });
    setEditingService(service);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      setLoading(true);

      const serviceId = serviceToDelete._id || serviceToDelete.id;

      console.log('Deleting service:', serviceToDelete);
      console.log('Service ID being used:', serviceId);

      if (!serviceId) {
        throw new Error('Service ID not found');
      }

      const response = await serviceAPI.deleteService(serviceId);
      console.log('Delete response:', response);

      toast.success('Service deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchServices();
      setShowDeleteModal(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error('Error deleting service:', error);
      console.error('Service to delete:', serviceToDelete);

      let errorMessage = 'Error deleting service. Please try again.';

      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.message) {
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
    setServiceToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Service Management</h2>
            <button
              onClick={() => setShowForm(true)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        {/* Services Table */}
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
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Provider</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id || service.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{service.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                          {service.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{service.provider || 'N/A'}</td>
                      <td className="py-3 px-4 font-medium text-green-600">${service.price}</td>
                      <td className="py-3 px-4 text-sm">{service.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service)}
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
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
              {services.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No services found. Add your first service!
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
                  {editingService ? (
                    <>
                      <Edit className="h-5 w-5" />
                      <span>Edit Service</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add New Service</span>
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
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span>Basic Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Service Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter service title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select Category</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Provider *</label>
                    <input
                      type="text"
                      name="provider"
                      value={formData.provider}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., TechSolutions Inc"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 2000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 4-6 weeks"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Description</h4>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Detailed description of the service..."
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Features</h4>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Features (comma-separated) *</label>
                  <input
                    type="text"
                    value={formData.features.join(', ')}
                    onChange={handleFeaturesChange}
                    placeholder="Responsive Design, SEO Optimization, Database Integration"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate features with commas</p>
                  {formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Demo Works Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <span>Demo Works / Portfolio</span>
                  </span>
                  <span className="text-sm text-gray-500">({formData.demoWorks.length} items)</span>
                </h4>

                {/* Current Demo Works List */}
                {formData.demoWorks.length > 0 && (
                  <div className="mb-6 space-y-3">
                    {formData.demoWorks.map((demo, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{demo.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{demo.description}</p>
                          {demo.technologies && demo.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {demo.technologies.map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {demo.completed && (
                            <p className="text-xs text-gray-500 mt-2">Completed: {demo.completed}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDemoWork(index)}
                          className="ml-4 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Demo Work Form */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                  <p className="text-sm font-semibold text-blue-900 mb-3">Add New Demo Work</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Demo Title</label>
                      <input
                        type="text"
                        name="title"
                        value={currentDemoWork.title}
                        onChange={handleDemoWorkChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., E-commerce Website"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={currentDemoWork.image}
                        onChange={handleDemoWorkChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={currentDemoWork.description}
                        onChange={handleDemoWorkChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Brief description of the demo work"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={currentDemoWork.technologies.join(', ')}
                        onChange={handleTechnologiesChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                      <input
                        type="date"
                        name="completed"
                        value={currentDemoWork.completed}
                        onChange={handleDemoWorkChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addDemoWork}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Demo Work</span>
                  </button>
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
                  <span>{loading ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && serviceToDelete && (
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
                    Delete Service
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-gray-900">
                      {serviceToDelete.title}
                    </span>
                    ? This action cannot be undone.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700">
                      <strong>Warning:</strong> All data associated with this service will be permanently removed.
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
                  <span>{loading ? 'Deleting...' : 'Delete Service'}</span>
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