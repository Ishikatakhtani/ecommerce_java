// // Dashboard.jsx
// import { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; 
// import API from './api';
// import './Dashboard.css';
// import Sidebar from './Sidebar';
// import "./sidebar.css"; 
// function Dashboard() {
//   const [msg, setMsg] = useState('');
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchDashboard = async () => {
//       try {
//         let res;
//         if (role === 'ROLE_ADMIN') {
//           res = await API.get('/admin/dashboard', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//         } else if (role === 'ROLE_USER') {
//           res = await API.get('/user/dashboard', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//         }
//         setMsg(res.data);
//       } catch (err) {
//         console.error(err);
//         setMsg('Token invalid or expired');
//         localStorage.clear();
//         navigate('/login');
//       }
//     };

//     fetchDashboard();
//   }, [navigate, role]);

//   return (
//     <>
   
   
//     <div className="dashboard-container">
//        <div><Sidebar/></div>
//       <h2>Dashboard</h2>
//       <p>{msg}</p>

//       {role === 'ROLE_ADMIN' && (
//         <div className="dashboard-links">
//           <Link to="/product">Add Product</Link>
//           <Link to="/admin/orders">Manage Orders</Link>
//         </div>
//       )}

//       <button className="logout-button" onClick={() => {
//         localStorage.clear();
//         navigate('/login');
//       }}>
//         Logout
//       </button>
//     </div>
   
//      </>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from 'react';
import { FaBox, FaShoppingCart } from "react-icons/fa";
import Sidebar from './Sidebar';
import API from './api';

function Dashboard() {
  const [topProducts, setTopProducts] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch top 5 products
        const topProductsRes = await API.get('/admin/products/top-products');
        setTopProducts(topProductsRes.data);

        // Fetch total products count
        const productsCountRes = await API.get('/admin/products/total-count');
        setProductsCount(productsCountRes.data.count);

        // Fetch total orders count
     const ordersCountRes = await API.get('/api/orders/total-count');
        setOrdersCount(ordersCountRes.data.count);

      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-area">
        <div className="topbar">
          <div className="profile">
            <span>👤</span>
            <span className="username">Admin</span>
          </div>
        </div>

        <div className="content-area">
          <h1>Dashboard</h1>
          <p>Welcome to your admin panel.</p>

          <div className="dashboard" style={{ display: "flex", alignItems: "flex-start" }}>
            {/* === Top Products Table === */}
            <div>
              <h2>Top 5 Products</h2>
              {topProducts.length === 0 ? (
                <p>No top products yet.</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Sold Count</th>
                      <th>Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.soldCount}</td>
                        <td>₹{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* === Sidebar Info Cards === */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "flex-end",
                marginLeft: "30px"
              }}
            >
              {/* Orders Card */}
              <div
                className="card shadow-sm bg-light d-flex align-items-center text-center"
                style={{ padding: "15px", maxWidth: "200px", width: "100%", paddingTop: "5%" }}
              >
                <FaShoppingCart size={24} className="mb-2 text-primary" />
                <h6 style={{ marginBottom: 4, fontSize: "14px" }}>Orders Placed</h6>
                <p style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{ordersCount}</p>
              </div>

              {/* Products Card */}
              <div
                className="card shadow-sm bg-light d-flex align-items-center text-center"
                style={{ padding: "15px", maxWidth: "200px", width: "100%" }}
              >
                <FaBox size={24} className="mb-2 text-success" />
                <h6 style={{ marginBottom: 4, fontSize: "14px" }}>Total Products</h6>
                <p style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{productsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
