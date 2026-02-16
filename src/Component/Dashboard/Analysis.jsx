import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Package, ShoppingCart, DollarSign, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import useAxiosPublic from '../../Hook/useAxiousPublic';

export const Analysis = () => {
  const { axiosPublic, productAPI, userAPI } = useAxiosPublic();
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    products: [],
    users: [],
    services: [],
    team: []
  });
  const [stats, setStats] = useState({
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
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatusDistribution, setOrderStatusDistribution] = useState({});
  const [paymentMethodStats, setPaymentMethodStats] = useState({});
  const [monthlyTrends, setMonthlyTrends] = useState([]);
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

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

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

      setDashboardData({ orders, products, users, services, team });

      // Calculate statistics
      calculateStats(orders, products, users, services, team);

      // Process order data for analysis
      processOrderAnalytics(orders);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orders, products, users, services, team) => {
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

    setStats({
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
  };

  const processOrderAnalytics = (orders) => {
    // Recent orders (last 5)
    const sortedOrders = orders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5);
    setRecentOrders(sortedOrders);

    // Order status distribution
    const statusCount = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setOrderStatusDistribution(statusCount);

    // Payment method statistics
    const paymentCount = orders.reduce((acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
      return acc;
    }, {});
    setPaymentMethodStats(paymentCount);

    // Product frequency (top products)
    const productCount = orders.reduce((acc, order) => {
      const productName = order.productName || 'Unknown Product';
      acc[productName] = (acc[productName] || 0) + order.quantity;
      return acc;
    }, {});

    const topProductsList = Object.entries(productCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
    setTopProducts(topProductsList);

    // Monthly trends (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= monthStart && orderDate <= monthEnd;
      });

      const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        orders: monthOrders.length,
        revenue: monthRevenue
      });
    }
    setMonthlyTrends(monthlyData);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading analytics...</span>
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
              <p className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">Monthly: ৳{stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              <p className="text-sm text-blue-600">Today: {stats.todayOrders}</p>
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

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-4">
            {Object.entries(orderStatusDistribution).map(([status, count]) => {
              const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders * 100).toFixed(1) : 0;
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {Object.entries(paymentMethodStats).map(([method, count]) => {
              const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders * 100).toFixed(1) : 0;
              return (
                <div key={method} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                      {method}
                    </span>
                    <span className="ml-3 text-gray-600">{count} orders</span>
                  </div>
                  <span className="font-semibold text-gray-900">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-3">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{month.month}</div>
                  <div className="text-sm text-gray-600">{month.orders} orders</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">৳{month.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
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
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
            <div className="text-sm text-gray-600">Completed Orders</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
            <div className="text-sm text-gray-600">Pending Orders</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.todayOrders}</div>
            <div className="text-sm text-gray-600">Today's Orders</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};