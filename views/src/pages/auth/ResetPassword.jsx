// views/src/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // from route
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, { newPassword: password });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="password" placeholder="New Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Reset</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default ResetPassword;
