import { useEffect, useState } from "react";
import API from "./api";
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (pageNumber = 0) => {
    try {
      const res = await API.get("/api/admin/orders", {
        params: { page: pageNumber, size: 2 },
      });
      setOrders(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, []);

  const handlePageChange = (newPage) => {
    fetchOrders(newPage);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/api/admin/orders/${orderId}/status`, null, {
        params: { status: newStatus },
      });

    fetchOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await API.delete(`/api/admin/orders/${orderId}`);
    
      fetchOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="orders-container">
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.username}</p>
            <div className="status-select">
              <label><strong>Status:</strong></label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="order-items">
            <h4>Items:</h4>
            {order.items.map((item) => (
              <p key={item.id}>
                {item.product.name} × {item.quantity}
              </p>
            ))}
          </div>

          <button className="delete-btn" onClick={() => handleDeleteOrder(order.id)}>
            Delete Order
          </button>
        </div>
      ))}

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={page === index ? 'active' : ''}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default AdminOrders;
