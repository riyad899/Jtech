import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Settings,
  User,
  MapPin,
  CreditCard,
  ChevronLeft,
  Package,
  CheckCircle,
  Loader2,
  AlertCircle,
  Star,
  Phone,
  MessageCircle
} from 'lucide-react';
import { AuthContext } from '../AuthProvider/AuthContext';
import useAxiosPublic from '../Hook/useAxiousPublic';
import BkashImage from '../assets/Images/Bkash.png';
import NagadImage from '../assets/Images/Nagad.jpg';
import QRCodeImage from '../assets/Images/QR Code.jpeg';

const BuyService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { serviceAPI, axiosPublic } = useAxiosPublic();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    paymentMethod: '',
    quantity: 1,
    transactionId: '',
    serviceRequirements: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Payment methods for services (WhatsApp first, as recommended)
  const paymentMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Consultation',
      icon: '💬',
      description: 'Discuss requirements via WhatsApp - Recommended',
      color: 'bg-green-500',
      whatsappNumber: '+8801712345678',
      isPreferred: true
    },
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
    }
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await serviceAPI.getService(id);
        const foundService = response.data;

        if (!foundService) {
          throw new Error('Service not found');
        }

        setService(foundService);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err.response?.data?.message || err.message || 'Service not found');
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || user.name || '',
        phone: user.phone || ''
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

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in your service: ${service?.title}.

Service Details:
- Service: ${service?.title}
- Category: ${service?.category}
- Price: ${service?.price ? `TK${service?.price}` : 'Contact for pricing'}

My Requirements:
${formData.serviceRequirements || 'Please provide more details about this service.'}

Contact Information:
- Name: ${formData.name}
- Phone: ${formData.phone}
- WhatsApp: ${formData.whatsappNumber || formData.phone}

Please let me know the next steps to proceed with this service.`;

    const whatsappURL = `https://wa.me/${paymentMethods[0].whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Bangladeshi phone number';
    }

    if (!formData.whatsappNumber.trim()) {
      errors.whatsappNumber = 'WhatsApp number is required';
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.whatsappNumber.replace(/\s/g, ''))) {
      errors.whatsappNumber = 'Please enter a valid WhatsApp number';
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Please select a payment method';
    }

    if (!formData.serviceRequirements.trim()) {
      errors.serviceRequirements = 'Please describe your service requirements';
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

    // For WhatsApp method, just open WhatsApp
    if (formData.paymentMethod === 'whatsapp') {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.whatsappNumber.trim()) {
        setFormErrors({
          name: !formData.name.trim() ? 'Name is required for WhatsApp contact' : '',
          phone: !formData.phone.trim() ? 'Phone is required for WhatsApp contact' : '',
          whatsappNumber: !formData.whatsappNumber.trim() ? 'WhatsApp number is required for contact' : ''
        });
        return;
      }
      handleWhatsAppContact();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        serviceName: service.title,
        serviceImage: service.image,
        serviceCategory: service.category,
        name: formData.name,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || formData.phone,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId || null,
        quantity: formData.quantity || 1,
        serviceRequirements: formData.serviceRequirements,
        servicePrice: service.price || 0,
        totalAmount: service.price ? (service.price * formData.quantity) : 0
      };

      // Send service order to the buyservices endpoint
      const response = await axiosPublic.post('/buyservices', orderData);

      console.log('Service order placed successfully:', response.data);

      // Show success modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error placing service order:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place service order. Please try again.';
      alert(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/services');
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `TK${price}`;
    }
    return price || 'Contact for pricing';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F] flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0C2F4F] animate-spin mx-auto mb-4" />
          <p className="text-lg text-[#0C2F4F]">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-4">Service Not Found</h2>
            <p className="text-lg text-red-700 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) return null;

  const totalAmount = service.price ? (service.price * formData.quantity) : 0;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 text-[#0C2F4F]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <Link to="/services" className="text-[#0D3050] hover:text-[#0C2F4F] transition-colors">Services</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-[#0C2F4F]/40" />
            <span className="text-[#0C2F4F]/60">Order Service</span>
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
          <h1 className="text-3xl font-bold text-[#0C2F4F] mb-2">Order Service</h1>
          <p className="text-[#0C2F4F]/70">Provide your details and requirements to place your service order</p>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
            <p className="text-green-800 text-sm">
              <span className="font-semibold">💬 WhatsApp Recommended!</span> Get instant consultation and personalized service
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6 sticky top-32">
              <h2 className="text-xl font-semibold text-[#0C2F4F] mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Service Summary
              </h2>

              {/* Service Info */}
              <div className="flex items-start space-x-4 mb-4 p-4 bg-[#0C2F4F]/5 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0C2F4F]/10 to-[#0C2F4F]/20 rounded-lg flex items-center justify-center">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <Settings className="w-8 h-8 text-[#0C2F4F]/60" style={{display: service.image ? 'none' : 'flex'}} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0C2F4F] mb-1">{service.title}</h3>
                  <p className="text-sm text-[#0C2F4F]/60 mb-2">{service.category}</p>
                  {service.provider && (
                    <p className="text-sm text-[#0C2F4F]/60 mb-2">Provider: {service.provider}</p>
                  )}
                  {formData.whatsappNumber && (
                    <p className="text-sm text-[#0C2F4F]/60 mb-2">📱 WhatsApp: {formData.whatsappNumber}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#0D3050]">{formatPrice(service.price)}</span>
                  </div>
                </div>
              </div>

              {/* Service Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-[#0C2F4F] mb-2">Included Features:</h4>
                  <div className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-[#0C2F4F]">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              {service.price && (
                <div className="space-y-2 py-4 border-t border-[#0C2F4F]/20">
                  <div className="flex justify-between">
                    <span className="text-[#0C2F4F]/70">Service Price</span>
                    <span className="font-medium text-[#0C2F4F]">TK{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#0C2F4F] pt-2 border-t border-[#0C2F4F]/20">
                    <span>Total</span>
                    <span>TK{totalAmount}</span>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Professional Service</span>
                </div>
                <p className="text-xs text-green-700 mt-1">Quality guaranteed with expert consultation</p>
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

                  {/* Phone */}
                  <div>
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
                </div>

                {/* WhatsApp Number */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 ${
                      formErrors.whatsappNumber ? 'border-red-500' : 'border-[#0C2F4F]/20'
                    }`}
                    placeholder="e.g., 01712345678 (Your WhatsApp number)"
                  />
                  {formErrors.whatsappNumber && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.whatsappNumber}</p>
                  )}
                  <p className="text-xs text-[#0C2F4F]/60 mt-1">
                    We'll contact you on this WhatsApp number for service discussion
                  </p>
                </div>

                {/* Service Requirements */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0C2F4F]/70 mb-2">
                    Service Requirements & Information *
                  </label>
                  <textarea
                    name="serviceRequirements"
                    value={formData.serviceRequirements}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3050] bg-brand-light/50 text-[#0C2F4F] placeholder-[#0C2F4F]/50 resize-none ${
                      formErrors.serviceRequirements ? 'border-red-500' : 'border-[#0C2F4F]/20'
                    }`}
                    placeholder="Please describe your specific requirements, timeline, budget expectations, and any other relevant details for this service..."
                  />
                  {formErrors.serviceRequirements && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.serviceRequirements}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-brand-light/80 backdrop-blur-xl border border-[#0C2F4F]/20 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#0C2F4F] mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Contact & Payment Method
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === method.id
                            ? 'border-[#0D3050] bg-[#0D3050]/5'
                            : 'border-[#0C2F4F]/20 hover:border-[#0C2F4F]/40'
                        } ${method.isPreferred ? 'ring-2 ring-green-200 bg-green-50' : ''}`}
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
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-semibold text-[#0C2F4F]">{method.name}</h3>
                              {method.isPreferred && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#0C2F4F]/70">{method.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Contact Details */}
                      {formData.paymentMethod === method.id && method.id === 'whatsapp' && (
                        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-3">🎯 WhatsApp Order Process</h4>
                          <div className="bg-white p-3 rounded-lg border border-green-200 mb-3">
                            <p className="text-lg font-bold text-green-800">{method.whatsappNumber}</p>
                            <p className="text-sm text-green-700">Click "Place Order via WhatsApp" to start your order</p>
                          </div>
                          <div className="text-sm text-green-700 space-y-1">
                            <p className="font-medium">📋 Your order process:</p>
                            <ol className="list-decimal list-inside space-y-1 ml-4">
                              <li>Send order details via WhatsApp instantly</li>
                              <li>Get personalized consultation and quote</li>
                              <li>Discuss timeline and service specifications</li>
                              <li>Confirm order and payment method</li>
                              <li>Receive order confirmation and next steps</li>
                            </ol>
                          </div>
                          <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
                            <strong>Why WhatsApp?</strong> Get instant responses, real-time consultation, and direct communication with our service team.
                          </div>
                        </div>
                      )}

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
                                <p className="text-sm text-[#0C2F4F]/70">
                                  Amount: {service.price ? `TK${service.price * formData.quantity}` : 'To be determined'}
                                </p>
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
                          </div>

                          {/* Instructions */}
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h6 className="font-semibold text-blue-800 mb-2">How to pay:</h6>
                            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                              <li>Open your {method.name} app</li>
                              <li>Send payment to {method.number}</li>
                              <li>Copy the transaction ID from confirmation</li>
                              <li>Enter the transaction ID above and submit</li>
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
                {formData.paymentMethod === 'whatsapp' ? (
                  <button
                    type="submit"
                    disabled={processing}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      processing
                        ? 'bg-[#0C2F4F]/20 text-[#0C2F4F]/40 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Place Order via WhatsApp 🚀</span>
                  </button>
                ) : (
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
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <Settings className="w-5 h-5" />
                        <span>Submit Service Request - {service.price ? `TK${totalAmount}` : 'Quote on Contact'}</span>
                      </>
                    )}
                  </button>
                )}

                <p className="text-xs text-[#0C2F4F]/60 mt-3 text-center">
                  By submitting this request, you agree to our terms and conditions and privacy policy
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
                Order Request Submitted Successfully! 🎉
              </h2>
              <p className="text-[#0C2F4F]/70 mb-6 leading-relaxed">
                Thank you for placing your service order!
              </p>

              {/* Order Details Summary */}
              <div className="bg-[#0C2F4F]/5 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-[#0C2F4F] mb-2">Order Summary:</h3>
                <div className="space-y-1 text-sm text-[#0C2F4F]/70">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{service?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WhatsApp:</span>
                    <span className="font-medium">{formData.whatsappNumber}</span>
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
                  {service.price && (
                    <div className="flex justify-between border-t border-[#0C2F4F]/20 pt-2 mt-2">
                      <span className="font-semibold">Service Price:</span>
                      <span className="font-bold text-[#0D3050]">TK{service.price * formData.quantity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSuccessModalClose}
                  className="py-3 px-4 bg-[#0D3050] text-white rounded-lg hover:bg-[#0A2540] transition-colors font-medium"
                >
                  Continue Browsing Services
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

export default BuyService;