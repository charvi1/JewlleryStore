// src/components/admin/UserStats.jsx
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#FF8042"];

const UserStats = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const roleData = [
    {
      name: "Admin",
      value: users.filter((user) => user.role === "admin").length,
    },
    {
      name: "User",
      value: users.filter((user) => user.role !== "admin").length,
    },
  ];

  const signupsByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const signupData = Object.entries(signupsByDate).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
      {/* Pie Chart */}
      <div style={{ width: "400px", height: "300px" }}>
        <h3>Users by Role</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={roleData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ width: "600px", height: "300px" }}>
        <h3>User Signups</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={signupData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStats;
