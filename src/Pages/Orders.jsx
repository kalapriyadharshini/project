import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Orders = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, []);
  const fetchOrders = async () => {
    try {
      // const res = await axios.get(`/api/orders/${storedUser._id}`);
      // You must send the token in headers too for auth-protected routes
const token = localStorage.getItem("token");
const res = await axios.get("/api/orders/myorders", {
  headers: { Authorization: `Bearer ${token}` }
});

      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-primary">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-3 mb-3">
              <h5>Order ID: {order._id}</h5>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                {/* {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} – ₹{item.price}
                  </li>
                ))} */}
                {order.products.map((product, index) => (
  <li key={index}>
    Product ID: {product.productId} x {product.quantity}
  </li>
))}

              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Orders;



