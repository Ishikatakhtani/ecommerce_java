// Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import API from './api';
import './Dashboard.css';

function Dashboard() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        let res;
        if (role === 'ROLE_ADMIN') {
          res = await API.get('/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else if (role === 'ROLE_USER') {
          res = await API.get('/user/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        setMsg(res.data);
      } catch (err) {
        console.error(err);
        setMsg('Token invalid or expired');
        localStorage.clear();
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate, role]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>{msg}</p>

      {role === 'ROLE_ADMIN' && (
        <div className="dashboard-links">
          <Link to="/product">Add Product</Link>
          <Link to="/admin/orders">Manage Orders</Link>
        </div>
      )}

      <button className="logout-button" onClick={() => {
        localStorage.clear();
        navigate('/login');
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
