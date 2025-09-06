// import React, { useState } from "react";
// import axios from "axios";
// import './Track.css';

// const Track = () => {
//   const [orderId, setOrderId] = useState("");
//   const [order, setOrder] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchOrder = async () => {
//     if (!orderId) {
//       setError("Please enter an Order ID");
//       return;
//     }
//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Token from localStorage:", localStorage.getItem("token"));

//       const { data } = await axios.get(`/api/orders/${orderId}`, config);
//       setOrder(data);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching order");
//       setOrder(null);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Track Your Order</h2>
//       <input
//         type="text"
//         placeholder="Enter Order ID"
//         value={orderId}
//         onChange={(e) => setOrderId(e.target.value)}
//       />
//       <button onClick={fetchOrder}>Track</button>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {order && (
//         <div>
//           <h3>Order ID: {order._id}</h3>
//           <p>Status: {order.status}</p>
//           <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//           <h4>Products:</h4>
//           <ul>
//             {order.products.map((item) => (
//               <li key={item.productId}>
//                 {item.productId} — Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Track;






import React, { useState } from "react";
import axios from "axios";
import "./Track.css";

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    if (!orderId) {
      setError("Please enter an Order ID");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${orderId}`, config);
      setOrder(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching order");
      setOrder(null);
    }
    setLoading(false);
  };

  return (
    <div className="track-container">
      <h2 className="track-title">Track Your Order</h2>

      <input
        className="track-input"
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button className="track-button" onClick={fetchOrder}>
        Track
      </button>

      {loading && <p className="track-loading">Loading...</p>}
      {error && <p className="track-error">{error}</p>}

      {order && (
        <div className="track-order-details">
          <h3 className="order-id">Order ID: {order._id}</h3>
          <p className="order-status">Status: {order.status}</p>
          <p className="order-date">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <h4 className="products-title">Products:</h4>
          <ul className="products-list">
            {order.products.map((item) => (
              <li className="product-item" key={item.productId}>
                {item.productId} — Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Track;
