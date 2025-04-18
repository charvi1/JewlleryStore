// Simple logout button
const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out!");
    // Optionally redirect
  };
  