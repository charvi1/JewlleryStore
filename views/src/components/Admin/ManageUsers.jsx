// components/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/auth/all-users", {
        headers: { Authorization: token },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">User Management</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserId}>
              <td className="border p-2">{user.UserId}</td>
              <td className="border p-2">{user.UserName}</td>
              <td className="border p-2">{user.EmailId}</td>
              <td className="border p-2">{user.RoleId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
