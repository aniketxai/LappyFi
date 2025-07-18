import React from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = ({ isDarkMode }) => {
  // Sample data
  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 198 },
    { month: 'Mar', sales: 5000, orders: 321 },
    { month: 'Apr', sales: 4500, orders: 289 },
    { month: 'May', sales: 6000, orders: 378 },
    { month: 'Jun', sales: 5500, orders: 341 },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹54,239',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,429',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: '342',
      change: '+5.1%',
      isPositive: true,
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Total Customers',
      value: '2,156',
      change: '-2.3%',
      isPositive: false,
      icon: Users,
      color: 'text-orange-600'
    },
  ];

  // Chart theme colors based on dark mode
  const chartTheme = {
    grid: isDarkMode ? '#334155' : '#e2e8f0',
    text: isDarkMode ? '#94a3b8' : '#64748b',
    background: isDarkMode ? '#1e293b' : '#ffffff',
    tooltip: {
      background: isDarkMode ? '#334155' : '#ffffff',
      border: isDarkMode ? '#475569' : '#e2e8f0',
      text: isDarkMode ? '#e2e8f0' : '#1e293b'
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="custom-tooltip"
          style={{
            backgroundColor: chartTheme.tooltip.background,
            border: `1px solid ${chartTheme.tooltip.border}`,
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            color: chartTheme.tooltip.text
          }}
        >
          <p className="font-medium mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const recentOrders = [
    { id: '#3426', customer: 'John Doe', product: 'Wireless Headphones', amount: '₹10,799', status: 'completed' },
    { id: '#3425', customer: 'Jane Smith', product: 'Laptop Stand', amount: '₹7,499', status: 'processing' },
    { id: '#3424', customer: 'Bob Johnson', product: 'USB-C Cable', amount: '₹2,099', status: 'pending' },
    { id: '#3423', customer: 'Alice Brown', product: 'Bluetooth Speaker', amount: '₹16,699', status: 'completed' },
    { id: '#3422', customer: 'Charlie Wilson', product: 'Phone Case', amount: '₹1,699', status: 'cancelled' },
  ];

  return (
    <div className="dashboard">
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sales Overview</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: chartTheme.text, fontSize: 12 }}
                axisLine={{ stroke: chartTheme.grid }}
                tickLine={{ stroke: chartTheme.grid }}
              />
              <YAxis 
                tick={{ fill: chartTheme.text, fontSize: 12 }}
                axisLine={{ stroke: chartTheme.grid }}
                tickLine={{ stroke: chartTheme.grid }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Order Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: chartTheme.text, fontSize: 12 }}
                axisLine={{ stroke: chartTheme.grid }}
                tickLine={{ stroke: chartTheme.grid }}
              />
              <YAxis 
                tick={{ fill: chartTheme.text, fontSize: 12 }}
                axisLine={{ stroke: chartTheme.grid }}
                tickLine={{ stroke: chartTheme.grid }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="orders" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Orders</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td className="font-medium">{order.amount}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;