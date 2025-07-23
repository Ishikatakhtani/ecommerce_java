import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import API from './pages/api';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/Product';
import VProducts from './pages/viewproduct';
import Cart from './pages/cart';
import OrderTracking from './pages/OrderTracking';
import AdminOrders from './pages/AdminOrders';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        background: 'linear-gradient(90deg, #0066ff, #00c897)',
        color: '#fff',
        textAlign: 'center',
        padding: '30px 10px',
        fontFamily: 'Poppins, sans-serif',
        marginTop: '60px'
      }}
    >
      <div className="footer-logo">
        <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Plume</h2>
      </div>
      <div className="footer-bottom">
        <p style={{ color: '#eaeaea' }}>&copy; 2025 Plume . All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const fetchCartCount = async () => {
      if (username && role !== "ADMIN") {
        try {
          const res = await API.get("/api/cart/count", {
            params: { username }
          });
          setCartCount(res.data);
        } catch (err) {
          console.error("Error fetching cart count:", err);
        }
      }
    };
    fetchCartCount();
  }, [username, role]);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setRole(null);
    setCartCount(0);
    window.location.href = "/login";
  };

  function Navbar() {
    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: 'linear-gradient(90deg, #0066ff, #00c897)',
          padding: '12px 0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontWeight: 'bold', fontSize: '22px', color: '#fff' }}
          >
            <i className="fas fa-store me-2"></i>Plume
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!username && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ color: '#fff' }}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{ color: '#fff' }}>
                      Login
                    </Link>
                  </li>
                </>
              )}

              {username && role === "ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products" style={{ color: '#fff' }}>
                      Show Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product" style={{ color: '#fff' }}>
                      Add Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/orders" style={{ color: '#fff' }}>
                      Admin Orders
                    </Link>
                  </li>
                </>
              )}

              {/* {username && role !== "ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products" style={{ color: '#fff' }}>
                      Show Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={{ color: '#fff' }}>
                      <i className="fas fa-shopping-cart me-1"></i>Cart
                      {cartCount > 0 && (
                        <span
                          className="badge bg-danger ms-1"
                          style={{
                            borderRadius: '12px',
                            fontSize: '12px',
                            padding: '4px 8px',
                            boxShadow: '0 0 0 2px #fff',
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders" style={{ color: '#fff' }}>
                      Track Orders
                    </Link>
                  </li>
                </>
              )}

              {username && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: '#fff', padding: '6px 10px' }}
                  >
                    <span>{username}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )} */}
{/*               
            </ul>
          </div>
        </div>

      </nav> */}

     
        

          
                 

              <li className="nav-item">
                <Link className="nav-link" to="/products" style={{ color: '#fff' }}>
                  Show Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart" style={{ color: '#fff' }}>
                  <i className="fas fa-shopping-cart me-1"></i>Cart
                  {cartCount > 0 && (
                    <span
                      className="badge bg-danger ms-1"
                      style={{
                        borderRadius: '12px',
                        fontSize: '12px',
                        padding: '4px 8px',
                        boxShadow: '0 0 0 2px #fff',
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/orders" style={{ color: '#fff' }}>
                  Track Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders" style={{ color: '#fff' }}>
                  Admin Orders
                </Link>
              </li>

              {username && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: '#fff', padding: '6px 10px' }}
                  >
                    <span>{username}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setCartCount={setCartCount} setUsername={setUsername} setRole={setRole} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<ProductForm />} />
          <Route path="/products" element={<VProducts />} />
          <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route
            path="/product/:id"
            element={<ProductDetails setCartCount={setCartCount} />}
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
