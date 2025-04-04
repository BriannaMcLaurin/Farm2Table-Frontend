import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './OrderTable.css';

const backendURL = "http://localhost:8080/orders";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [searchType, setSearchType] = useState('ID');
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    buyerName: "",
    product: "",
    price: "",
    date: "",
    status: "",
    trackingNumber: "",
    carrier: ""
  });

  const fetchOrders = () => {
    axios.get(backendURL)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (orderId, status) => {
    axios.put(`http://localhost:8080/orders/${orderId}?status=${status}`)
      .then(() => fetchOrders())
      .catch(err => console.error(err));
  };

  const deleteOrder = (orderId) => {
    axios.delete(`http://localhost:8080/orders/${orderId}`)
      .then(() => fetchOrders())
      .catch(err => console.error(err));
  };

  // Pagination
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Filter logic
  const filteredOrders = orders
    .filter(order => {
      let matchesSearch = true;
      if (searchValue) {
        if (searchType === 'ID') matchesSearch = order.orderId.includes(searchValue);
        if (searchType === 'Product Name') matchesSearch = order.product.toLowerCase().includes(searchValue.toLowerCase());
        if (searchType === 'Buyer Name') matchesSearch = order.buyerName.toLowerCase().includes(searchValue.toLowerCase());
      }
      let matchesStatus = filterStatus === '' || order.status === filterStatus;
      let matchesDate = true;
      if (selectedDate) {
        const orderDate = new Date(order.date + ' 00:00'); 
        const selected = new Date(selectedDate);
        matchesDate = isSameDay(orderDate, selected);
      }
      return matchesSearch && matchesStatus && matchesDate;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`; 
  };

  const trackOrder = (orderId) => {
    axios.get(`http://localhost:8080/orders/track/${orderId}`)
      .then(res => alert("Tracking Info:\n" + JSON.stringify(res.data, null, 2)))
      .catch(err => alert("Tracking Failed!"));
  };

  const handleAddOrder = () => {
    axios.post("http://localhost:8080/orders", newOrder)
      .then(() => {
        fetchOrders();
        setShowAddModal(false);
        setNewOrder({});
      })
      .catch(err => alert("Error adding order"));
  };

  return (
    <div className="order-table-container">
      <h2>Order Management</h2>

      <div className="filters">
        <select value={searchType} onChange={e => setSearchType(e.target.value)}>
          <option value="ID">By ID</option>
          <option value="Product Name">By Product Name</option>
          <option value="Buyer Name">By Buyer/Seller Name</option>
        </select>

        <input
          type="text"
          placeholder={`Search ${searchType}`}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>

        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          placeholderText="Select date for orders"
        />
      </div>

      <button className="add-order-button" onClick={() => setShowAddModal(true)}>
        Add New Order
      </button>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-state">No orders found</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.buyerName}</td>
                <td>{order.product}</td>
                <td>${order.price}</td>
                <td>{formatDate(order.date)}</td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase().replace(" ", "-")}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button view-button" onClick={() => trackOrder(order.orderId)}>
                      Track
                    </button>
                    <button className="action-button edit-button" onClick={() => updateStatus(order.orderId, 'Delivered')}>
                      Mark Delivered
                    </button>
                    <button className="action-button delete-button" onClick={() => deleteOrder(order.orderId)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Order</h3>
            <input 
              placeholder="Order ID" 
              onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })} 
            />
            <input 
              placeholder="Buyer Name" 
              onChange={(e) => setNewOrder({ ...newOrder, buyerName: e.target.value })} 
            />
            <input 
              placeholder="Product" 
              onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })} 
            />
            <input 
              placeholder="Price" 
              type="number" 
              onChange={(e) => setNewOrder({ ...newOrder, price: parseFloat(e.target.value) })} 
            />
            <input 
              placeholder="Date (e.g. 3/27/25)" 
              onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })} 
            />
            <input 
              placeholder="Status" 
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })} 
            />
            <input 
              placeholder="Tracking Number" 
              onChange={(e) => setNewOrder({ ...newOrder, trackingNumber: e.target.value })} 
            />
            <input 
              placeholder="Carrier" 
              onChange={(e) => setNewOrder({ ...newOrder, carrier: e.target.value })} 
            />
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="modal-submit" onClick={handleAddOrder}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTable;