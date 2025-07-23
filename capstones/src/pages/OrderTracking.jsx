import { useEffect, useState } from "react";
import API from "./api";
import './OrderTracking.css'; 
function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/orders", {
        params: { username }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const res = await API.get(`/api/invoice/${orderId}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('❌ Error downloading invoice:', err);
    }
  };

  return (
    <>
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 && <p className="orders-empty">No orders found.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h3 className="order-id">Order #{order.id}</h3>
          <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Payment ID: {order.paymentId}</p>

          <h4 className="items-title">Items:</h4>
          <div className="order-items">
            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.product.imageUrl} alt={item.product.name} className="item-image" />
                <div className="item-details">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="invoice-btn"
            onClick={() => downloadInvoice(order.id)}
          >
            Download Invoice
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default OrderTracking;
