import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Mail,
  MapPin,
  CreditCard,
  ChevronLeft,
  Package,
  CheckCircle,
  Loader2,
  AlertCircle,
  Phone
} from 'lucide-react';
import { AuthContext } from '../AuthProvider/AuthContext';
import { useCart } from '../Context/CartContext';
import useAxiosPublic from '../Hook/useAxiousPublic';
import BkashImage from '../assets/Images/Bkash.png';
import NagadImage from '../assets/Images/Nagad.jpg';
import QRCodeImage from '../assets/Images/QR Code.jpeg';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useCart();
  const { axiosPublic } = useAxiosPublic();

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Get cart data from navigation state or context
  const stateCartItems = location.state?.cartItems || cartItems;
  const cartTotal = location.state?.cartTotal || stateCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    transactionId: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Payment methods
  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: BkashImage,
      description: 'Pay with bKash mobile wallet',
      color: 'bg-pink-500',
      number: '01712345678',
      qrCode: QRCodeImage
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: NagadImage,
      description: 'Pay with Nagad mobile wallet',
      color: 'bg-orange-500',
      number: '01787654321',
      qrCode: QRCodeImage
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive the products',
      color: 'bg-green-500'
    }
  ];

  // Redirect if cart is empty
  useEffect(() => {
    if (!stateCartItems || stateCartItems.length === 0) {
      navigate('/products');
    }
  }, [stateCartItems, navigate]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentMethodChange = (methodId) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: methodId,
      transactionId: '' // Reset transaction ID when payment method changes
    }));

    // Show payment details for bkash and nagad
    setShowPaymentDetails(methodId === 'bkash' || methodId === 'nagad');

    // Clear payment method error
    if (formErrors.paymentMethod) {
      setFormErrors(prev => ({
        ...prev,
        paymentMethod: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Bangladeshi phone number';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Please provide a detailed address';
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Please select a payment method';
    }

    // Validate transaction ID for bkash and nagad
    if ((formData.paymentMethod === 'bkash' || formData.paymentMethod === 'nagad') && !formData.transactionId.trim()) {
      errors.transactionId = 'Transaction ID is required for mobile wallet payments';
    } else if ((formData.paymentMethod === 'bkash' || formData.paymentMethod === 'nagad') && formData.transactionId.trim().length < 6) {
      errors.transactionId = 'Please enter a valid transaction ID';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      // Create orders for each cart item
      const orderPromises = stateCartItems.map(item => {
        const orderData = {
          productName: item.name,
          productImage: item.image,
          quantity: item.quantity,
          paymentMethod: formData.paymentMethod,
          transactionId: formData.transactionId || null,
          customerName: formData.name,
          phoneNumber: formData.phone,
          address: formData.address,
          email: formData.email,
          totalAmount: item.price * item.quantity,
          productPrice: item.price,
          orderDate: new Date().toISOString(),
          status: 'pending'
        };

        return axiosPublic.post('/orders', orderData);
      });

      // Wait for all orders to be created
      await Promise.all(orderPromises);

      console.log('All orders placed successfully');

      // Clear the cart
      clearCart();

      // Show success modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error placing orders:', error);
      alert('Failed to place orders. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/products');
  };

  if (!stateCartItems || stateCartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <Link to="/products" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Products</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <span className="text-[#0C2F4F]/60">Checkout</span>
          </div>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-2 flex items-center space-x-2 text-[#0C2F4F]/70 hover:text-[#0C2F4F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0C2F4F] mb-2">Complete Your Purchase</h1>
          <p className="text-[#0C2F4F]/70">Fill in your details to place your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6 sticky top-32">
              <h2 className="text-xl font-semibold text-[#0C2F4F] mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Summary ({stateCartItems.length} items)
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {stateCartItems.map((item) => (
                  <div key={item._id} className="flex items-start space-x-3 p-3 bg-[#0C2F4F]/5 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0C2F4F]/10 to-[#0C2F4F]/20 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <Package className="w-6 h-6 text-[#0C2F4F]/60" style={{display: item.image ? 'none' : 'flex'}} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#0C2F4F] truncate">{item.name}</h3>
                      <p className="text-xs text-[#0C2F4F]/60">TK{item.price} x {item.quantity}</p>
                      <p className="text-sm font-bold text-[#0D3050]">TK{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-[#0C2F4F]/20">
                <div className="flex justify-between">
                  <span className="text-[#0C2F4F]/70">Subtotal</span>
                  <span className="font-medium text-[#0C2F4F]">TK{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0C2F4F]/70">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#0C2F4F] pt-2 border-t border-[#0C2F4F]/20">
                  <span>Total</span>
                  <span>TK{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#0C2F4F] mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 ${
                        formErrors.name ? 'border-red-500' : 'border-[#0C2F4F]/20'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 ${
                        formErrors.email ? 'border-red-500' : 'border-[#0C2F4F]/20'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 ${
                      formErrors.phone ? 'border-red-500' : 'border-[#0C2F4F]/20'
                    }`}
                    placeholder="e.g., 01712345678"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 resize-none ${
                      formErrors.address ? 'border-red-500' : 'border-[#0C2F4F]/20'
                    }`}
                    placeholder="Enter your complete delivery address including area, district, and postal code"
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#0C2F4F] mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === method.id
                            ? 'border-[#0D3050] bg-[#0D3050]/5'
                            : 'border-[#0C2F4F]/20 hover:border-[#0C2F4F]/40'
                        }`}
                        onClick={() => handlePaymentMethodChange(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={() => handlePaymentMethodChange(method.id)}
                            className="text-[#0D3050] focus:ring-[#0D3050]"
                          />
                          <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center text-white text-lg overflow-hidden`}>
                            {typeof method.icon === 'string' && (method.icon.startsWith('http') || method.icon.endsWith('.png') || method.icon.endsWith('.jpg')) ? (
                              <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                            ) : (
                              <span>{method.icon}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0C2F4F]">{method.name}</h3>
                            <p className="text-sm text-[#0C2F4F]/70">{method.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details Dropdown for bKash and Nagad */}
                      {formData.paymentMethod === method.id && (method.id === 'bkash' || method.id === 'nagad') && (
                        <div className="mt-3 p-4 bg-[#0C2F4F]/5 border border-[#0C2F4F]/20 rounded-lg">
                          <h4 className="font-semibold text-[#0C2F4F] mb-3">Payment Instructions</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Payment Number */}
                            <div>
                              <h5 className="font-medium text-[#0C2F4F]/80 mb-2">Send Money To:</h5>
                              <div className="bg-white p-3 rounded-lg border border-[#0C2F4F]/10">
                                <p className="text-lg font-bold text-[#0C2F4F]">{method.number}</p>
                                <p className="text-sm text-[#0C2F4F]/70">Amount: TK{cartTotal.toFixed(2)}</p>
                              </div>
                            </div>

                            {/* QR Code */}
                            <div>
                              <h5 className="font-medium text-[#0C2F4F]/80 mb-2">Or Scan QR Code:</h5>
                              <div className="bg-white p-3 rounded-lg border border-[#0C2F4F]/10 flex justify-center">
                                <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                                  <img src={method.qrCode} alt={`${method.name} QR Code`} className="w-full h-full object-cover rounded" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Transaction ID Input */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                              Transaction ID *
                            </label>
                            <input
                              type="text"
                              name="transactionId"
                              value={formData.transactionId}
                              onChange={handleInputChange}
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 ${
                                formErrors.transactionId ? 'border-red-500' : 'border-[#0C2F4F]/20'
                              }`}
                              placeholder={`Enter your ${method.name} transaction ID`}
                            />
                            {formErrors.transactionId && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.transactionId}</p>
                            )}
                            <p className="text-xs text-[#0C2F4F]/60 mt-2">
                              Please enter the transaction ID you received after sending money to complete your order.
                            </p>
                          </div>

                          {/* Instructions */}
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h6 className="font-semibold text-blue-800 mb-2">How to pay:</h6>
                            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                              <li>Open your {method.name} app</li>
                              <li>Send TK{cartTotal.toFixed(2)} to {method.number}</li>
                              <li>Copy the transaction ID from the confirmation message</li>
                              <li>Enter the transaction ID above and place your order</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {formErrors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-2">{formErrors.paymentMethod}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6">
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    processing
                      ? 'bg-[#0C2F4F]/20 text-[#0C2F4F]/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0D3050] to-[#0C2F4F] hover:from-[#0A2540] hover:to-[#0A2540] text-white transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D3050]'
                  }`}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Orders...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Place Order - TK{cartTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-[#0C2F4F]/60 mt-3 text-center">
                  By placing this order, you agree to our terms and conditions and privacy policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-blur bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 relative">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-[#0C2F4F] mb-4">
                Orders Placed Successfully!
              </h2>
              <p className="text-[#0C2F4F]/70 mb-6 leading-relaxed">
                Thank you for your orders! We have received your payment details and will process your orders shortly.
                You will receive confirmation emails with tracking information.
              </p>

              {/* Order Details Summary */}
              <div className="bg-[#0C2F4F]/5 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-[#0C2F4F] mb-2">Order Summary:</h3>
                <div className="space-y-1 text-sm text-[#0C2F4F]/70">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-medium">{stateCartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium capitalize">{formData.paymentMethod}</span>
                  </div>
                  {formData.transactionId && (
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-medium">{formData.transactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#0C2F4F]/20 pt-2 mt-2">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-[#0D3050]">TK{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {user && (
                  <button
                    onClick={() => navigate('/track-order')}
                    className="flex-1 py-3 px-4 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors font-medium"
                  >
                    Track Orders
                  </button>
                )}
                <button
                  onClick={handleSuccessModalClose}
                  className="flex-1 py-3 px-4 border border-[#0C2F4F]/20 text-[#0C2F4F] rounded-lg hover:bg-[#0C2F4F]/5 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={handleSuccessModalClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#0C2F4F]/40 hover:text-[#0C2F4F] hover:bg-[#0C2F4F]/10 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
