import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Customers = ({ toast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      joinDate: '2023-08-15',
      totalOrders: 12,
      totalSpent: 121078,
      status: 'active',
      lastOrderDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      joinDate: '2023-06-22',
      totalOrders: 8,
      totalSpent: 74193,
      status: 'active',
      lastOrderDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Chicago, IL 60601',
      joinDate: '2023-11-03',
      totalOrders: 3,
      totalSpent: 19498,
      status: 'active',
      lastOrderDate: '2024-01-13'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+1 (555) 321-0987',
      address: '321 Elm St, Houston, TX 77001',
      joinDate: '2023-04-18',
      totalOrders: 15,
      totalSpent: 174767,
      status: 'vip',
      lastOrderDate: '2024-01-12'
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      phone: '+1 (555) 654-3210',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      joinDate: '2023-09-07',
      totalOrders: 1,
      totalSpent: 1699,
      status: 'inactive',
      lastOrderDate: '2023-12-01'
    },
  ]);

  const statuses = ['all', 'active', 'vip', 'inactive'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-completed';
      case 'vip': return 'status-processing';
      case 'inactive': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const CustomerDetailsModal = ({ customer, onClose }) => {
    if (!customer) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Customer Details</h3>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{customer.name}</h4>
                    <span className={`status-badge ${getStatusColor(customer.status)}`}>
                      {customer.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{customer.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>Joined: {customer.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Order Statistics</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {customer.totalOrders}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{customer.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-semibold">
                      {customer.lastOrderDate}
                    </div>
                    <div className="text-sm text-gray-600">Last Order</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="customers">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customers</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            {filteredCustomers.length} customers found
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {customers.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Customers</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {customers.filter(c => c.status === 'vip').length}
            </div>
            <div className="text-sm text-gray-600">VIP Customers</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ₹{customers.reduce((total, c) => total + c.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {customers.reduce((total, c) => total + c.totalOrders, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4">
          <div className="search-container flex-1">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{width: '150px'}}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <div className="font-medium">{customer.totalOrders}</div>
                      <div className="text-sm text-gray-500">orders</div>
                    </div>
                  </td>
                  <td className="font-medium">₹{customer.totalSpent.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-sm btn-warning">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal 
          customer={selectedCustomer} 
          onClose={() => setSelectedCustomer(null)} 
        />
      )}
    </div>
  );
};

export default Customers;