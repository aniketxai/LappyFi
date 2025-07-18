import React from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Eye } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics = ({ isDarkMode, toast }) => {
  // Sample analytics data
  const revenueData = [
    { month: 'Jan', revenue: 996000, profit: 398400, expenses: 597600 },
    { month: 'Feb', revenue: 1245000, profit: 498000, expenses: 747000 },
    { month: 'Mar', revenue: 1494000, profit: 597600, expenses: 896400 },
    { month: 'Apr', revenue: 1826000, profit: 730400, expenses: 1095600 },
    { month: 'May', revenue: 2075000, profit: 830000, expenses: 1245000 },
    { month: 'Jun', revenue: 2324000, profit: 929600, expenses: 1394400 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#10b981' },
    { name: 'Books', value: 20, color: '#f59e0b' },
    { name: 'Home & Garden', value: 15, color: '#ef4444' },
    { name: 'Sports', value: 5, color: '#8b5cf6' },
  ];

  const trafficData = [
    { source: 'Organic Search', visitors: 4500, percentage: 45 },
    { source: 'Direct', visitors: 2800, percentage: 28 },
    { source: 'Social Media', visitors: 1500, percentage: 15 },
    { source: 'Email', visitors: 800, percentage: 8 },
    { source: 'Referral', visitors: 400, percentage: 4 },
  ];

  const performanceMetrics = [
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Order Value',
      value: '₹10,583',
      change: '+₹1,021',
      isPositive: true,
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Page Views',
      value: '45.2K',
      change: '+8.1%',
      isPositive: true,
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-2.4%',
      isPositive: true,
      icon: TrendingDown,
      color: 'text-orange-600'
    },
  ];

  // Chart theme colors based on dark mode
  const chartTheme = {
    grid: isDarkMode ? '#334155' : '#e2e8f0',
    text: isDarkMode ? '#94a3b8' : '#64748b',
    background: isDarkMode ? 'transparent' : 'transparent',
    tooltip: {
      background: isDarkMode ? '#1e293b' : '#ffffff',
      border: isDarkMode ? '#475569' : '#e2e8f0',
      text: isDarkMode ? '#e2e8f0' : '#1e293b'
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label, labelFormatter, formatter }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="custom-tooltip"
          style={{
            backgroundColor: chartTheme.tooltip.background,
            border: `1px solid ${chartTheme.tooltip.border}`,
            borderRadius: '8px',
            padding: '12px',
            boxShadow: isDarkMode 
              ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            color: chartTheme.tooltip.text,
            pointerEvents: 'none'
          }}
        >
          <p className="font-medium mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${typeof entry.value === 'number' ? 
                (entry.dataKey === 'revenue' || entry.dataKey === 'profit' || entry.dataKey === 'expenses' ? 
                  `₹${entry.value.toLocaleString()}` : 
                  entry.value.toLocaleString()) : 
                entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleChartClick = (data, index) => {
    if (data && data.activePayload) {
      const clickedData = data.activePayload[0]?.payload;
      if (clickedData) {
        toast.info('Chart Data', `${clickedData.month}: Revenue ₹${clickedData.revenue?.toLocaleString()}`);
      }
    }
  };

  return (
    <div className="analytics">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex gap-2">
          <select className="form-select" style={{width: '120px'}}>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} ${metric.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue & Profit Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} onClick={handleChartClick}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sales by Category</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Traffic Sources</h3>
        </div>
        <div className="space-y-4">
          {trafficData.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-medium">{source.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  {source.visitors.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 w-8 text-right">
                  {source.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;