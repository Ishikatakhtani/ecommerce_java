import { useState,useEffect } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Register() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/register', form);
      setMsg(res.data);
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.errors || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box" data-aos="fade-down">
        <h2>Join Our Store</h2>
        <p className="subtitle">Create your account and start shopping smarter</p>

        <input name="username" onChange={handleChange} placeholder="Username" />
        <input name="email" onChange={handleChange} placeholder="Email Address" />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" />

        <button onClick={handleSubmit}>Create Account</button>

         <p className="error-msg">{msg}</p>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
