import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider/AuthContext';
import { Package, Clock, CheckCircle, XCircle, Eye, X, Trash2 } from 'lucide-react';
import useAxiosPublic from '../Hook/useAxiousPublic';
import SEO from '../utils/SEO';

export const TrackOrder = () => {
  const { user } = useAuth();
  const { orderAPI } = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    // Check if user email exists
    if (!user?.email) {
      console.log("No user email found");
      setLoading(false);
      return;
    }

    fetch("https://jtech-rho.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Convert user email to lowercase string for comparison
          const userEmailLower = String(user.email).toLowerCase().trim();

          // Filter orders that match the user's email
          const userOrders = data.data.filter(order => {
            const orderEmailLower = String(order.email).toLowerCase().trim();
            console.log("Comparing:", orderEmailLower, "===", userEmailLower);
            return orderEmailLower === userEmailLower;
          });

          // Set all user orders at once (not one by one)
          setOrders(userOrders);
          console.log("Found orders:", userOrders.length);
        }

        // Always set loading to false when done
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false); // Set loading false even on error
      });
  }, [user?.email]);

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const openCancelModal = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    setCancellingOrderId(orderToCancel);
    closeCancelModal();

    try {
      const response = await fetch(`https://jtech-rho.vercel.app/orders/${orderToCancel}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the cancelled order from the list
        setOrders(orders.filter(order => order._id !== orderToCancel));

        // If the cancelled order is currently being viewed in modal, close the modal
        if (selectedOrder?._id === orderToCancel) {
          closeModal();
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to cancel order:', errorData);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0C2F4F] mx-auto mb-4"></div>
          <p className="text-[#0C2F4F] font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Track Your Order - Order Status & Delivery Updates | jTech"
        description="Track your jTech order status in real-time. Get updates on your product delivery, view order history, and manage your purchases."
        keywords="track order, order status, delivery tracking, order history, jTech orders, package tracking"
        url="https://jtechvision.com/track-order"
        ogImage="https://jtechvision.com/og-track-order.jpg"
        twitterImage="https://jtechvision.com/twitter-track-order.jpg"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-light to-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-[80px]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent font-serif">
            Track Your Orders
          </h1>
          <p className="mt-2 text-lg text-[#0C2F4F]/70 font-medium">
            Monitor the progress of your orders, {user?.displayName || user?.email || 'Customer'}
          </p>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="h-16 w-16 text-[#0C2F4F]/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#0C2F4F] mb-2 font-serif">No Orders Found</h3>
            <p className="text-[#0C2F4F]/60">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id || order.orderId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#0C2F4F]/10"
              >
                <div className="bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold font-serif text-lg">
                        {order.name || order.customerName || 'Order'}
                      </h3>
                      <p className="text-white/80 text-sm mt-1">
                        ID: {order.orderId || order._id?.slice(-8)}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0C2F4F]/70 text-sm">Date:</span>
                    <span className="text-[#0C2F4F] font-medium text-sm">
                      {new Date(order.createdAt || order.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#0C2F4F]/70 text-sm">Total:</span>
                    <span className="text-[#0C2F4F] font-bold text-lg">
                      Tk {order.totalAmount || order.amount || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#0C2F4F]/10">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-[#0C2F4F]/70 text-sm capitalize">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => viewOrderDetails(order)}
                    className="w-full mt-4 px-4 py-2 bg-[#0C2F4F] text-white rounded-lg hover:bg-[#0C2F4F]/90 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>

                  {/* Cancel Order Button - Only show if order is not already cancelled or delivered */}
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button
                      onClick={() => openCancelModal(order._id)}
                      disabled={cancellingOrderId === order._id}
                      className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>
                        {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel Order'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#0C2F4F] to-[#0C2F4F]/80 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-serif">Order Details</h2>
                  <p className="text-sm text-white/80 mt-1">Order ID: {selectedOrder.orderId || selectedOrder._id}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div>
                  <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Status</h3>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize font-medium">{selectedOrder.status}</span>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Customer Information</h3>
                  <div className="bg-[#0C2F4F]/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Name:</span>
                      <span className="font-medium text-[#0C2F4F]">{selectedOrder.customerName || selectedOrder.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Email:</span>
                      <span className="font-medium text-[#0C2F4F]">{selectedOrder.customerEmail || selectedOrder.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Phone:</span>
                      <span className="font-medium text-[#0C2F4F]">{selectedOrder.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, index) => (
                        <div key={index} className="bg-[#0C2F4F]/5 rounded-xl p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-bold text-[#0C2F4F]">{item.name || item.productName}</h4>
                              <p className="text-sm text-[#0C2F4F]/70 mt-1">
                                Quantity: {item.quantity} × Tk {item.price}
                              </p>
                            </div>
                            <span className="font-bold text-[#0C2F4F]">
                              Tk {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#0C2F4F]/5 rounded-xl p-4">
                        <p className="text-[#0C2F4F]">
                          {selectedOrder.productName || selectedOrder.product || 'No items available'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shippingAddress && (
                  <div>
                    <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Shipping Address</h3>
                    <div className="bg-[#0C2F4F]/5 rounded-xl p-4">
                      <p className="text-[#0C2F4F]">
                        {selectedOrder.shippingAddress.street || selectedOrder.shippingAddress.address}
                        <br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                        <br />
                        {selectedOrder.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Payment Information</h3>
                  <div className="bg-[#0C2F4F]/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Payment Method:</span>
                      <span className="font-medium text-[#0C2F4F]">{selectedOrder.paymentMethod || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Payment Status:</span>
                      <span className={`font-medium ${selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedOrder.paymentStatus || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-[#0C2F4F]/20 pt-2 mt-2">
                      <span className="text-[#0C2F4F]">Total Amount:</span>
                      <span className="text-[#0C2F4F]">Tk {selectedOrder.totalAmount || selectedOrder.amount || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div>
                  <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Order Timeline</h3>
                  <div className="bg-[#0C2F4F]/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#0C2F4F]/70">Order Date:</span>
                      <span className="font-medium text-[#0C2F4F]">
                        {new Date(selectedOrder.createdAt || selectedOrder.date).toLocaleString()}
                      </span>
                    </div>
                    {selectedOrder.updatedAt && (
                      <div className="flex justify-between">
                        <span className="text-[#0C2F4F]/70">Last Updated:</span>
                        <span className="font-medium text-[#0C2F4F]">
                          {new Date(selectedOrder.updatedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes/Additional Info */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-lg font-bold text-[#0C2F4F] mb-3 font-serif">Notes</h3>
                    <div className="bg-[#0C2F4F]/5 rounded-xl p-4">
                      <p className="text-[#0C2F4F]">{selectedOrder.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-[#0C2F4F]/10 p-6 rounded-b-3xl">
                <div className="flex gap-3">
                  {/* Cancel Order Button in Modal - Only show if order is not already cancelled or delivered */}
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                    <button
                      onClick={() => openCancelModal(selectedOrder._id)}
                      disabled={cancellingOrderId === selectedOrder._id}
                      className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>
                        {cancellingOrderId === selectedOrder._id ? 'Cancelling...' : 'Cancel Order'}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 bg-[#0C2F4F] text-white rounded-xl hover:bg-[#0C2F4F]/90 transition-all duration-200 font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0C2F4F] mb-2 font-serif">
                  Cancel Order?
                </h3>
                <p className="text-[#0C2F4F]/70 mb-6">
                  Are you sure you want to cancel this order? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    No, Keep It
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};