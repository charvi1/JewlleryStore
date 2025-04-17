// AdminOrders.jsx
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error(error));
  }, []);

  const handleOrderUpdate = (id, status) => {
    fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then(() => {
        setOrders(orders.map(order => order._id === id ? {...order, status} : order));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h3>Order Management</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - {order.status}
            <button onClick={() => handleOrderUpdate(order._id, 'shipped')}>Mark as Shipped</button>
            <button onClick={() => handleOrderUpdate(order._id, 'delivered')}>Mark as Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
