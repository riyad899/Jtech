import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hook/useAxiousPublic';

export const ManageProducts = () => {
  const { axiosPublic } = useAxiosPublic();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategories: [], // Array to store up to 4 subcategories
    brand: '',
    price: '',
    rating: '',
    quantity: '',
    image: '',
    description: '',
    processor: '',
    memory: '',
    storage: '',
    display: '',
    graphics: '',
    battery: '',
    weight: '',
    ports: '',
    reviews: []
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      subcategories: [],
      brand: '',
      price: '',
      rating: '',
      quantity: '',
      image: '',
      description: '',
      processor: '',
      memory: '',
      storage: '',
      display: '',
      graphics: '',
      battery: '',
      weight: '',
      ports: '',
      reviews: []
    });
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle subcategory input
  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...formData.subcategories];
    newSubcategories[index] = value;
    setFormData(prev => ({
      ...prev,
      subcategories: newSubcategories
    }));
  };

  // Add subcategory field
  const addSubcategory = () => {
    if (formData.subcategories.length < 4) {
      setFormData(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, '']
      }));
    }
  };

  // Remove subcategory field
  const removeSubcategory = (index) => {
    const newSubcategories = formData.subcategories.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      subcategories: newSubcategories
    }));
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/products');
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Convert price, rating, and quantity to numbers
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rating: parseFloat(formData.rating) || 0,
        quantity: parseInt(formData.quantity) || 0,
        subcategories: formData.subcategories.filter(sub => sub.trim() !== ''), // Remove empty subcategories
        reviews: formData.reviews || []
      };

      if (editingId) {
        // Update existing product
        await axiosPublic.put(`/products/${editingId}`, productData);
        setSuccess('Product updated successfully!');
      } else {
        // Add new product
        await axiosPublic.post('/products', productData);
        setSuccess('Product added successfully!');
      }

      resetForm();
      setShowForm(false);
      fetchProducts(); // Refresh the list

    } catch (err) {
      setError('Operation failed: ' + (err.response?.data?.message || err.message));
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name || '',
      category: product.category || '',
      subcategories: product.subcategories || [],
      brand: product.brand || '',
      price: product.price?.toString() || '',
      rating: product.rating?.toString() || '',
      quantity: product.quantity?.toString() || '',
      image: product.image || '',
      description: product.description || '',
      processor: product.processor || '',
      memory: product.memory || '',
      storage: product.storage || '',
      display: product.display || '',
      graphics: product.graphics || '',
      battery: product.battery || '',
      weight: product.weight || '',
      ports: product.ports || '',
      reviews: product.reviews || []
    });
    setEditingId(product._id || product.id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
      await axiosPublic.delete(`/products/${id}`);
      setSuccess('Product deleted successfully!');
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to delete product: ' + (err.response?.data?.message || err.message));
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) resetForm();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {showForm ? 'Hide Form' : 'Add New Product'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter brand"
                />
              </div>

              {/* Subcategories Section - Full width */}
              <div className="md:col-span-2 lg:col-span-3 border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Subcategories (Optional - Max 4)
                  </label>
                  {formData.subcategories.length < 4 && (
                    <button
                      type="button"
                      onClick={addSubcategory}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      <span className="text-lg">+</span> Add Subcategory
                    </button>
                  )}
                </div>

                {formData.subcategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.subcategories.map((subcategory, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={subcategory}
                          onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Subcategory ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeSubcategory(index)}
                          className="text-red-600 hover:text-red-700 font-medium px-3 py-2 border border-red-300 rounded-md hover:bg-red-50"
                          title="Remove subcategory"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No subcategories added. Click "Add Subcategory" to add up to 4 subcategories.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rating (0-5)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter available quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>

              {/* Technical Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                <input
                  type="text"
                  name="processor"
                  value={formData.processor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter processor details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Memory</label>
                <input
                  type="text"
                  name="memory"
                  value={formData.memory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter memory details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                <input
                  type="text"
                  name="storage"
                  value={formData.storage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter storage details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
                <input
                  type="text"
                  name="display"
                  value={formData.display}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter display details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graphics</label>
                <input
                  type="text"
                  name="graphics"
                  value={formData.graphics}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter graphics details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Battery</label>
                <input
                  type="text"
                  name="battery"
                  value={formData.battery}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter battery details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter weight"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ports</label>
                <input
                  type="text"
                  name="ports"
                  value={formData.ports}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter available ports"
                />
              </div>

              {/* Description - Full width */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              {/* Form Actions */}
              <div className="md:col-span-2 lg:col-span-3 flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset Form
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold">Products List</h2>
            <p className="text-gray-600">Total Products: {products.length}</p>
          </div>

          {loading && !showForm ? (
            <div className="p-6 text-center">
              <div className="text-gray-600">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No products found. Add your first product to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Subcategories</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Brand</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id || product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description?.substring(0, 50)}...</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{product.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {product.subcategories && product.subcategories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {product.subcategories.map((sub, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{product.brand}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        ${product.price?.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.quantity > 10 ? 'bg-green-100 text-green-800' :
                          product.quantity > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.quantity || 0} units
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {product.rating ? `${product.rating}/5` : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id || product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            disabled={loading}
                          >
                            Delete
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
      </div>
    </div>
  );
};
