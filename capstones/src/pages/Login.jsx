import { useState, useEffect } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Login({setCartCount, setUsername}) {
  useEffect(() => {
  AOS.init({ duration: 2000, once: true });
}, []);

  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    const res = await API.post('/auth/login', form);

  const token = res.data.token;
    const role = res.data.role;
    const username = res.data.username;



    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    localStorage.setItem('username', res.data.username);

    setMsg('✅ Login successful');

    if(role==='ROLE_USER'){
const countRes = await API.get('/api/cart/count', {
  params: { username }
});
setCartCount(countRes.data);
setUsername(res.data.username);
  navigate('/');
    }
    else{
navigate('/dashboard');
setUsername(res.data.username);
    }

} catch (err) {
    setMsg('❌ Login failed');
    console.error(err);
  }
};


  const handleSendOtp = async () => {
    try {
      const res = await API.post('/auth/send-otp', null, {
        params: { email: email }
      });
      setForgotMsg(res.data || 'OTP sent!');
    } catch (err) {
      console.error(err);
      setForgotMsg('❌ Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await API.post('/auth/verify-otp', null, {
        params: {
          email: email,
          otp: otp,
          newPassword: newPassword
        }
      });
      setForgotMsg(res.data || 'Password reset!');
    } catch (err) {
      console.error(err);
      setForgotMsg('❌ Failed to verify OTP');
    }
  };

  return (
     <div className="login-wrapper">
      <div data-aos="fade-down">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Access your account</p>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button onClick={handleLogin}>Login</button>
        {msg && <p className="status-msg">{msg}</p>}

        {!showForgot && (
          <div className="forgot-link">
            <span onClick={() => setShowForgot(true)}>Forgot Password?</span>
          </div>
        )}

        {showForgot && (
          <div className="forgot-section">
            <h4>Reset Password</h4>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="otp-btn" onClick={handleSendOtp}>Send OTP</button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="reset-btn" onClick={handleVerifyOtp}>Reset Password</button>
            {forgotMsg && <p className="status-msg">{forgotMsg}</p>}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Login;
