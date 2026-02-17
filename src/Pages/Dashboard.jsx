import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider/AuthContext';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hook/useAxiousPublic';
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Eye,
  Settings,
  UserCheck,
  Menu,
  X,
  Home,
  PieChart,
  Calendar,
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import { ManageUsers, ViewOrders, Analysis, ManageProducts, ManageTeam, ManageServices, ManageJobs, ManageMessages, ManageCourses } from '../Component/Dashboard';

export const Dashboard = () => {
  const { user, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { axiosPublic, productAPI, userAPI } = useAxiosPublic();

  // Dashboard analytics state
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalServices: 0,
    totalTeam: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todayOrders: 0,
    monthlyRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatusStats, setOrderStatusStats] = useState({});
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [Showproducts, setShowProducts] = useState([]);
  const [Showservices, setShowServices] = useState([]);
  useEffect(() => {
    fetch("https://jtech-rho.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {

        let count = 0;
        for (const user of data) {
          count++;

        }


        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
      }, []);


  useEffect(() => {
    fetch("https://jtech-rho.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {

      console.log(data.length)
      setShowProducts(data.length);
      })
      .catch((err) => console.error("Error fetching users:", err));
      }, []);

        useEffect(() => {
    fetch("https://jtech-rho.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {

      console.log(data.length)
      setShowServices(data.length);
      })
      .catch((err) => console.error("Error fetching users:", err));
      }, []);
  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      setUserLoading(true);
      // Only fetch if user exists and has email
      if (!loading && user?.email) {
        try {
          const response = await axiosPublic.get(`/users/email/${user.email}`);
          const userData = response.data;
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to localStorage or basic user info
          const fallbackUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          setCurrentUser(fallbackUser.name ? fallbackUser : { name: 'Admin', email: user?.email || '', role: 'admin' });
        }
      } else if (!loading) {
        // Fallback to localStorage if no authenticated user
        const fallbackUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        setCurrentUser(fallbackUser.name ? fallbackUser : { name: 'Admin', email: '', role: 'admin' });
      }
      setUserLoading(false);
    };

    // Only fetch if we don't have user data already or if user email changed
    if (!currentUser || currentUser.email !== user?.email) {
      fetchUserData();
    }
  }, [user?.email, loading]);

  // Fetch dashboard analytics data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setOverviewLoading(true);

      // Fetch all data concurrently
      const [ordersRes, productsRes, usersRes, servicesRes, teamRes] = await Promise.all([
        axiosPublic.get('/orders').catch(() => ({ data: { data: [] } })),
        productAPI.getProducts().catch(() => ({ data: { data: [] } })),
        userAPI.getUsers().catch(() => ({ data: { data: [] } })),
        axiosPublic.get('/services').catch(() => ({ data: { data: [] } })),
        axiosPublic.get('/team').catch(() => ({ data: { data: [] } }))
      ]);

      const orders = ordersRes.data.data || [];
      const products = productsRes.data.data || [];
      const users = usersRes.data.data || [];
      const services = servicesRes.data.data || [];
      const team = teamRes.data.data || [];

      // Calculate statistics
      calculateDashboardStats(orders, products, users, services, team);

      // Process order data for dashboard
      processOrdersForDashboard(orders);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setOverviewLoading(false);
    }
  };

  const calculateDashboardStats = (orders, products, users, services, team) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'delivered').length;
    const todayOrders = orders.filter(order => new Date(order.orderDate) >= startOfDay).length;
    const monthlyRevenue = orders
      .filter(order => new Date(order.orderDate) >= startOfMonth)
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    setDashboardStats({
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length,
      totalUsers: users.length,
      totalServices: services.length,
      totalTeam: team.length,
      pendingOrders,
      completedOrders,
      todayOrders,
      monthlyRevenue
    });

    // Order status distribution
    const statusCount = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setOrderStatusStats(statusCount);
  };

  const processOrdersForDashboard = (orders) => {
    // Recent orders (last 5)
    const sortedOrders = orders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5);
    setRecentOrders(sortedOrders);

    // Product frequency (top products)
    const productCount = orders.reduce((acc, order) => {
      const productName = order.productName || 'Unknown Product';
      acc[productName] = (acc[productName] || 0) + order.quantity;
      return acc;
    }, {});

    const topProductsList = Object.entries(productCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    setTopProducts(topProductsList);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'orders', label: 'View Orders', icon: ShoppingCart },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'products', label: 'Manage Products', icon: Package },
    { id: 'services', label: 'Manage Service', icon: Wrench },
    { id: 'courses', label: 'Manage Courses', icon: FileText },
    { id: 'team', label: 'Manage Team', icon: UserCheck },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'postjobs', label: 'Post Jobs', icon: Briefcase },
  ];

  // Render different sections based on active selection
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        if (overviewLoading) {
          return (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading dashboard...</span>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">৳{dashboardStats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">Monthly: ৳{dashboardStats.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                    <p className="text-sm text-blue-600">Today: {dashboardStats.todayOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{Showproducts}</p>
                    <p className="text-sm text-purple-600">Services: {Showservices}</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>

                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                    <p className="text-2xl font-bold text-green-600">{dashboardStats.completedOrders}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-orange-600">{dashboardStats.pendingOrders}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {dashboardStats.totalOrders > 0 ?
                        ((dashboardStats.completedOrders / dashboardStats.totalOrders) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(orderStatusStats).map(([status, count]) => {
                    const percentage = dashboardStats.totalOrders > 0 ? (count / dashboardStats.totalOrders * 100).toFixed(1) : 0;
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(status)}`}>
                            {status}
                          </span>
                          <span className="ml-3 text-gray-600">{count} orders</span>
                        </div>
                        <span className="font-semibold text-gray-900">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {topProducts.length > 0 ? topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">Sold {product.count} times</div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-4">No product data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              {recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-100">
                          <td className="py-3 px-4">{order.customerName}</td>
                          <td className="py-3 px-4">{order.productName}</td>
                          <td className="py-3 px-4 font-semibold">৳{order.totalAmount?.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent orders found</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('orders')}
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <ShoppingCart className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">View Orders</div>
                    <div className="text-sm text-gray-600">Manage customer orders</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('products')}
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Package className="h-8 w-8 text-green-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Manage Products</div>
                    <div className="text-sm text-gray-600">Add or edit products</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('users')}
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Users className="h-8 w-8 text-purple-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Manage Users</div>
                    <div className="text-sm text-gray-600">View user accounts</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('analysis')}
                  className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <BarChart3 className="h-8 w-8 text-orange-600 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">View Analytics</div>
                    <div className="text-sm text-gray-600">Detailed reports</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'users':
        return <ManageUsers />;

      case 'orders':
        return <ViewOrders />;

      case 'analysis':
        return <Analysis />;

      case 'products':
        return <ManageProducts />;

      case 'services':
        return <ManageServices />;

      case 'courses':
        return <ManageCourses />;

      case 'team':
        return <ManageTeam />;

      case 'messages':
        return <ManageMessages />;

      case 'postjobs':
        return <ManageJobs />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Back to Home Button */}
        <div className="px-4 py-4 border-b border-gray-200">
          <Link
            to="/"
            className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
          >
            <ArrowLeft className="h-5 w-5 mr-3" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">{navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            {userLoading ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            ) : currentUser?.photoURL || currentUser?.image ? (
              <img
                src={currentUser.photoURL || currentUser.image}
                alt={currentUser.name || 'Admin'}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {(currentUser?.name || 'Admin').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="ml-3">
              {userLoading ? (
                <>
                  <div className="h-4 bg-gray-300 rounded animate-pulse mb-1 w-20"></div>
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16"></div>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser?.role || 'Administrator'}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900 capitalize">
                {activeSection === 'overview' ? 'Dashboard Overview' : navItems.find(item => item.id === activeSection)?.label}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {userLoading ? (
                <>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-500">Welcome back, {currentUser?.name || 'Admin'}</span>
                  {currentUser?.photoURL || currentUser?.image ? (
                    <img
                      src={currentUser.photoURL || currentUser.image}
                      alt={currentUser.name || 'Admin'}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {(currentUser?.name || 'Admin').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};