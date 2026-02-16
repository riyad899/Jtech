import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Mail,
  MailOpen,
  Trash2,
  Search,
  Filter,
  X,
  Eye,
  Calendar,
  User,
  Building,
  MessageSquare,
  Tag,
  RefreshCw,
  ChevronDown,
  CheckCircle,
  Clock,
  Archive,
  AlertCircle
} from 'lucide-react';
import useAxiosPublic from '../../Hook/useAxiousPublic';

export const ManageMessages = () => {
  const { messageAPI } = useAxiosPublic();

  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0
  });

  // Fetch all messages
  useEffect(() => {
    fetchMessages();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [messages, searchQuery, statusFilter, serviceFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getAllMessages();
      const messagesData = response.data.messages || response.data.data || response.data || [];
      setMessages(messagesData);
      calculateStats(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (messagesData) => {
    const stats = {
      total: messagesData.length,
      unread: messagesData.filter(m => m.status === 'unread').length,
      read: messagesData.filter(m => m.status === 'read').length,
      replied: messagesData.filter(m => m.status === 'replied').length,
      archived: messagesData.filter(m => m.status === 'archived').length
    };
    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...messages];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.fullName?.toLowerCase().includes(query) ||
        msg.email?.toLowerCase().includes(query) ||
        msg.companyName?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(msg => msg.serviceInterestedIn === serviceFilter);
    }

    setFilteredMessages(filtered);
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);

    // Mark as read if unread
    if (message.status === 'unread') {
      try {
        await messageAPI.updateMessageStatus(message._id, 'read');
        // Update local state
        const updatedMessages = messages.map(m =>
          m._id === message._id ? { ...m, status: 'read' } : m
        );
        setMessages(updatedMessages);
        calculateStats(updatedMessages);
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await messageAPI.deleteMessage(messageId);
      const updatedMessages = messages.filter(m => m._id !== messageId);
      setMessages(updatedMessages);
      calculateStats(updatedMessages);
      toast.success('Message deleted successfully');
      setShowMessageModal(false);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      await messageAPI.updateMessageStatus(messageId, newStatus);
      const updatedMessages = messages.map(m =>
        m._id === messageId ? { ...m, status: newStatus } : m
      );
      setMessages(updatedMessages);
      calculateStats(updatedMessages);
      toast.success(`Message marked as ${newStatus}`);

      // Update selected message if it's open
      if (selectedMessage?._id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread': return <Mail className="w-4 h-4" />;
      case 'read': return <MailOpen className="w-4 h-4" />;
      case 'replied': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'replied': return 'bg-green-100 text-green-700 border-green-200';
      case 'archived': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  // Get unique services for filter
  const uniqueServices = [...new Set(messages
    .map(m => m.serviceInterestedIn)
    .filter(s => s))];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Read</p>
              <p className="text-2xl font-bold text-gray-600">{stats.read}</p>
            </div>
            <MailOpen className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Replied</p>
              <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.archived}</p>
            </div>
            <Archive className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, company, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Services</option>
            {uniqueServices.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Active Filters */}
        {(searchQuery || statusFilter !== 'all' || serviceFilter !== 'all') && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                Search: {searchQuery}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                />
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                Status: {statusFilter}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setStatusFilter('all')}
                />
              </span>
            )}
            {serviceFilter !== 'all' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                Service: {serviceFilter}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setServiceFilter('all')}
                />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading messages...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No messages found</p>
            {(searchQuery || statusFilter !== 'all' || serviceFilter !== 'all') && (
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <motion.tr
                    key={message._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      message.status === 'unread' ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        <span className="capitalize">{message.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {message.status === 'unread' && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <span className={`font-medium ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{message.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {message.companyName || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {message.serviceInterestedIn ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {message.serviceInterestedIn}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {message.message}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewMessage(message)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {showMessageModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Message Details</h3>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Status and Actions */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedMessage.status)}`}>
                      {getStatusIcon(selectedMessage.status)}
                      <span className="capitalize">{selectedMessage.status}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Sender Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <p className="text-gray-900 font-medium">{selectedMessage.fullName}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <p className="text-gray-900">{selectedMessage.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4" />
                        Company Name
                      </label>
                      <p className="text-gray-900">
                        {selectedMessage.companyName || <span className="text-gray-400">Not provided</span>}
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Tag className="w-4 h-4" />
                        Service Interested In
                      </label>
                      <p className="text-gray-900">
                        {selectedMessage.serviceInterestedIn ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {selectedMessage.serviceInterestedIn}
                          </span>
                        ) : (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Received on {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <button
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Message
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
