// AdminUsers.jsx
import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h3>User Management</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button>Promote to Admin</button>
            <button>Disable Account</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
