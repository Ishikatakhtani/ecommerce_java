import { useEffect, useState } from "react";
import API from "./api";
import './cart.css';
function Cart({ setCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [total, setTotal] = useState(0);

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      setMsg("You must be logged in to see your cart");
      return;
    }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/api/cart", {
        params: { username }
      });
      setCartItems(res.data);
      calculateTotal(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching cart");
    }
  };

  const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.product.price * item.quantity;
    });
    setTotal(sum);
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await API.post(`/api/cart/update`, null, {
        params: { id, quantity: newQuantity },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
     
      const res = await API.post("/api/payment/create-order", {
        amount: total,
        currency: "INR",
        username: username,
      });

      const { orderId, razorpayKey } = res.data;

      const options = {
        key:razorpayKey,
        amount: total * 100, // in paise
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          
         
          await API.post("/api/payment/verify", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            username: username,
          });



    await API.post('/api/cart/checkout', null, {
      params: { username: localStorage.getItem('username') }
    });

    alert('Payment successful! Cart cleared.');


setCartCount(0);

    


          setMsg("Payment successful!");
          fetchCart();
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMsg("Payment failed");
    }
  };

  return (
    
    <>
    
  <div className="cart-table-container">
      <h2 className="cart-title">Your Cart</h2>
      <p className="cart-user">User: {username}</p>
      {msg && <p className="cart-msg">{msg}</p>}
      {!msg && cartItems.length === 0 && <p className="cart-empty">Your cart is empty.</p>}

      {cartItems.length > 0 && (
        <div className="cart-table-wrapper">
          <div className="cart-table-header">
            <div className="col-product">Product</div>
            <div className="col-quantity">Quantity</div>
            <div className="col-price">Price</div>
          </div>

          {cartItems.map((item) => (
            <div className="cart-table-row" key={item.id}>
              <div className="col-product">
                <img src={item.product.imageUrl} alt={item.product.name} className="product-image" />
                <div className="product-details">
                  <h4>{item.product.name}</h4>
                  <p>{item.product.description || 'No description available.'}</p>
                </div>
              </div>

              <div className="col-quantity">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="col-price">₹{item.product.price * item.quantity}</div>
            </div>
          ))}

          <div className="cart-total-section">
            <h3>Total: ₹{total}</h3>
            <button className="pay-btn" onClick={handleCheckout}>Pay with Razorpay</button>
          </div>
        </div>
      )}
    </div>
  
    
    </>
  );
}

export default Cart;




