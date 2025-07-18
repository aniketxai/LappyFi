import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Package, Truck, CheckCircle } from 'lucide-react';

const Orders = ({ toast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: '#3426',
      customer: 'John Doe',
      email: 'john@example.com',
      products: [
        { name: 'Wireless Headphones', quantity: 1, price: 10799 }
      ],
      total: 10799,
      status: 'completed',
      date: '2024-01-15',
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: '#3425',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      products: [
        { name: 'Laptop Stand', quantity: 1, price: 7499 },
        { name: 'USB-C Cable', quantity: 2, price: 2099 }
      ],
      total: 11697,
      status: 'processing',
      date: '2024-01-14',
      address: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: '#3424',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      products: [
        { name: 'USB-C Cable', quantity: 1, price: 2099 }
      ],
      total: 2099,
      status: 'pending',
      date: '2024-01-13',
      address: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: '#3423',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      products: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 16699 }
      ],
      total: 16699,
      status: 'shipped',
      date: '2024-01-12',
      address: '321 Elm St, Houston, TX 77001'
    },
    {
      id: '#3422',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      products: [
        { name: 'Phone Case', quantity: 1, price: 1699 }
      ],
      total: 1699,
      status: 'cancelled',
      date: '2024-01-11',
      address: '654 Maple Dr, Phoenix, AZ 85001'
    },
  ]);

  const statuses = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    const order = orders.find(o => o.id === orderId);
    toast.info('Order Status Updated', `Order ${orderId} status changed to ${newStatus}.`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Package size={16} className="text-yellow-500" />;
      case 'processing': return <Edit size={16} className="text-blue-500" />;
      case 'shipped': return <Truck size={16} className="text-purple-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      default: return null;
    }
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Order Details - {order.id}</h3>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <p><strong>Name:</strong> {order.customer}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Order Date:</strong> {order.date}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-badge status-${order.status} ml-2`}>
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p>{order.address}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Order Items</h4>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <td>₹{product.price}</td>
                      <td>₹{(product.quantity * product.price)}</td>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                        <td>${(product.quantity * product.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-right mt-4">
                <p className="text-xl font-bold">Total: ₹{order.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="orders">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            {filteredOrders.length} orders found
          </span>
        </div>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4">
          <div className="search-container flex-1">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td className="font-medium">₹{order.total}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        className="form-select"
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        style={{width: '120px', padding: '0.25rem 0.5rem', fontSize: '0.75rem'}}
                      >
                        {statuses.filter(s => s !== 'all').map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default Orders;