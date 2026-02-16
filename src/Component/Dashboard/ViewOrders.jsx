import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hook/useAxiousPublic';

export const ViewOrders = () => {
  const { axiosPublic, serviceOrderAPI } = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [serviceOrders, setServiceOrders] = useState([]);
  const [combinedOrders, setCombinedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'products', 'services'

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      // Fetch both product orders and service orders
      const [productOrdersRes, serviceOrdersRes] = await Promise.all([
        axiosPublic.get('/orders').catch(() => ({ data: { success: true, data: [] } })),
        serviceOrderAPI.getAllServiceOrders().catch(() => ({ data: { success: true, data: [] } }))
      ]);

      const productOrders = productOrdersRes.data.success ? productOrdersRes.data.data : [];
      const serviceOrdersData = serviceOrdersRes.data.data || serviceOrdersRes.data || [];

      // Add order type to distinguish between product and service orders
      const taggedProductOrders = productOrders.map(order => ({
        ...order,
        orderType: 'product'
      }));

      const taggedServiceOrders = serviceOrdersData.map(order => ({
        ...order,
        orderType: 'service',
        customerName: order.name || order.customerName,
        phoneNumber: order.phone || order.phoneNumber
      }));

      setOrders(taggedProductOrders);
      setServiceOrders(taggedServiceOrders);

      // Combine and sort all orders by date (newest first)
      const combined = [...taggedProductOrders, ...taggedServiceOrders].sort((a, b) => {
        const dateA = new Date(a.orderDate || a.createdAt);
        const dateB = new Date(b.orderDate || b.createdAt);
        return dateB - dateA;
      });

      setCombinedOrders(combined);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus, orderType) => {
    try {
      setUpdating(true);

      if (orderType === 'service') {
        // Update service order
        const response = await serviceOrderAPI.updateServiceOrderStatus(orderId, newStatus);

        if (response.data.success || response.data) {
          // Update local state
          const updatedServiceOrders = serviceOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          );
          setServiceOrders(updatedServiceOrders);

          // Update combined orders
          setCombinedOrders(combinedOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          ));
          setEditingStatus(null);
        }
      } else {
        // Update product order
        const response = await axiosPublic.patch(`/orders/${orderId}/status`, {
          status: newStatus
        });

        if (response.data.success) {
          // Update local state
          const updatedOrders = orders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          );
          setOrders(updatedOrders);

          // Update combined orders
          setCombinedOrders(combinedOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          ));
          setEditingStatus(null);
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  // Update payment status
  const updatePaymentStatus = async (orderId, newPaymentStatus, orderType) => {
    try {
      setUpdating(true);

      if (orderType === 'service') {
        // Update service order payment
        const response = await serviceOrderAPI.updateServiceOrderPayment(orderId, {
          paymentStatus: newPaymentStatus
        });

        if (response.data.success || response.data) {
          // Update local state
          const updatedServiceOrders = serviceOrders.map(order =>
            order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          );
          setServiceOrders(updatedServiceOrders);

          // Update combined orders
          setCombinedOrders(combinedOrders.map(order =>
            order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          ));
          setEditingPayment(null);
        }
      } else {
        // Update product order payment
        const response = await axiosPublic.patch(`/orders/${orderId}/payment`, {
          paymentStatus: newPaymentStatus
        });

        if (response.data.success) {
          // Update local state
          const updatedOrders = orders.map(order =>
            order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          );
          setOrders(updatedOrders);

          // Update combined orders
          setCombinedOrders(combinedOrders.map(order =>
            order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          ));
          setEditingPayment(null);
        }
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert('Failed to update payment status');
    } finally {
      setUpdating(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
        </div>
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders ({combinedOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Product Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Service Orders ({serviceOrders.length})
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">

                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order/Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone Number</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'all' ? combinedOrders :
                activeTab === 'products' ? orders : serviceOrders).map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
             
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">
                      {order.serviceName || order.productName || 'N/A'}
                    </div>
                    {order.serviceCategory && (
                      <div className="text-xs text-gray-500">{order.serviceCategory}</div>
                    )}
                    {order.whatsappNumber && (
                      <div className="text-xs text-green-600">📱 {order.whatsappNumber}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">{order.phoneNumber}</td>
                  <td className="py-3 px-4 capitalize">{order.paymentMethod}</td>
                  <td className="py-3 px-4 font-mono text-sm">
                    {order.transactionId || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatDate(order.orderDate || order.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    {editingStatus === order._id ? (
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value, order.orderType)}
                        disabled={updating}
                        className="px-2 py-1 border rounded text-xs"
                      >
                        <option value="pending">Pending</option>
                        {order.orderType === 'service' && <option value="confirmed">Confirmed</option>}
                        {order.orderType === 'service' && <option value="in-progress">In Progress</option>}
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer ${getStatusColor(order.status)}`}
                        onClick={() => setEditingStatus(order._id)}
                        title="Click to edit"
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingPayment === order._id ? (
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(order._id, e.target.value, order.orderType)}
                        disabled={updating}
                        className="px-2 py-1 border rounded text-xs"
                      >
                        <option value="pending">Pending</option>
                        {order.orderType === 'service' && <option value="verified">Verified</option>}
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer ${getPaymentStatusColor(order.paymentStatus)}`}
                        onClick={() => setEditingPayment(order._id)}
                        title="Click to edit"
                      >
                        {order.paymentStatus || 'pending'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold">৳{order.totalAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(activeTab === 'all' ? combinedOrders :
          activeTab === 'products' ? orders : serviceOrders).length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {activeTab === 'all' ? 'No orders found' :
               activeTab === 'products' ? 'No product orders found' :
               'No service orders found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};