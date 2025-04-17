import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        EmailId: email,
        Password1: password
      });
      localStorage.setItem('token', res.data.token);
      // Decode token to get role
      const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
      const role = tokenPayload.RoleId;

      // Redirect based on role
      if (role === 2) navigate('/'); // Seller
      else if (role === 3) navigate('/admin/dashboard'); // Admin
      else navigate('/products'); // Customer default
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
