// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const Orders = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       fetchOrders();
//     }
//   }, []);
//   const fetchOrders = async () => {
//     try {
   
// const token = localStorage.getItem("token");
// const res = await axios.get("/api/orders/myorders", {
//   headers: { Authorization: `Bearer ${token}` }
// });

//       setOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };
//   return (
//     <div className="container mt-4">
//       <h2 className="text-primary fw-bold text-center">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>You have not placed any orders yet.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="border rounded p-3 mb-3">
//               <h5 className="fw-bold">Order ID: {order._id}</h5>
//               <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//               <p><strong>Total:</strong> ₹{order.totalAmount}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <ul>
//                 {order.products.map((product, index) => (
//   <li key={index}>
//     Product ID: {product.productId} x {product.quantity}
//   </li>
// ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Orders;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css"; 

// const Orders = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       fetchOrders();
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/orders/myorders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   return (
//     <div className="orders-container mt-4">
//       <h2 className="orders-title text-left">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="orders-empty">You have not placed any orders yet.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="order-card mb-3">
//               <h5 className="order-id">Order ID: {order._id}</h5>
//               <p className="order-detail"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//               <p className="order-detail"><strong>Total:</strong> ₹{order.totalAmount}</p>
//               <p className="order-detail"><strong>Status:</strong> {order.status}</p>
//               <ul className="order-product-list">
//                 {order.products.map((product, index) => (
//                   <li key={index} className="order-product-item">
//                     Product ID: {product.productId} x {product.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css"; 

// const Orders = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       fetchOrders();
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/orders/myorders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   return (
//     <div className="orders-container mt-4">
//       <h2 className="orders-title text-left">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="orders-empty">You have not placed any orders yet.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="order-card mb-3">
//               <h5 className="order-id">Order ID: {order._id}</h5>
//               <p className="order-detail">
//                 <strong>Date:</strong>{" "}
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//               <p className="order-detail">
//                 <strong>Total:</strong> ₹{order.totalAmount}
//               </p>
//               <p className="order-detail">
//                 <strong>Status:</strong>{" "}
//                 <span className={`status-badge ${order.status || "unknown"}`}>
//                   {(order.status || "Unknown").toUpperCase()}
//                 </span>
//               </p>
//               <ul className="order-product-list">
//                 {order.products.map((product, index) => (
//                   <li key={index} className="order-product-item">
//                     Product ID: {product.productId} x {product.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";

// const Orders = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       fetchOrders();
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/orders/myorders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   const renderStatusBadge = (status) => {
//     const baseClass = "status-badge";
//     const statusClass = {
//       pending: "pending",
//       processing: "processing",
//       shipped: "shipped",
//       delivered: "delivered",
//       cancelled: "cancelled",
//     }[status] || "unknown";

//     return (
//       <span className={`${baseClass} ${statusClass}`}>
//         {status?.toUpperCase() || "UNKNOWN"}
//       </span>
//     );
//   };

//   return (
//     <div className="orders-container mt-4">
//       <h2 className="orders-title text-left">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="orders-empty">You have not placed any orders yet.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="order-card mb-3">
//               <h5 className="order-id">Order ID: {order._id}</h5>
//               <p className="order-detail">
//                 <strong>Date:</strong>{" "}
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//               <p className="order-detail">
//                 <strong>Total:</strong> ₹{order.totalAmount}
//               </p>
//               <p className="order-detail">
//                 <strong>Status:</strong> {renderStatusBadge(order.status)}
//               </p>
//               <ul className="order-product-list">
//                 {order.products.map((product, index) => (
//                   <li key={index} className="order-product-item">
//                     Product ID: {product.productId} x {product.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4; // 👈 change to 6 if needed

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ reverse the orders (latest → oldest)
      setOrders(res.data.orders.reverse());
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const renderStatusBadge = (status) => {
    const baseClass = "status-badge";
    const statusClass = {
      pending: "pending",
      processing: "processing",
      shipped: "shipped",
      delivered: "delivered",
      cancelled: "cancelled",
    }[status] || "unknown";

    return (
      <span className={`${baseClass} ${statusClass}`}>
        {status?.toUpperCase() || "UNKNOWN"}
      </span>
    );
  };

  // ✅ Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="orders-container mt-4">
      <h2 className="orders-title text-left">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">You have not placed any orders yet.</p>
      ) : (
        <div>
          {currentOrders.map((order) => (
            <div key={order._id} className="order-card mb-3">
              <h5 className="order-id">Order ID: {order._id}</h5>
              <p className="order-detail">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="order-detail">
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p className="order-detail">
                <strong>Status:</strong> {renderStatusBadge(order.status)}
              </p>
              <ul className="order-product-list">
                {order.products.map((product, index) => (
                  <li key={index} className="order-product-item">
                    Product ID: {product.productId} x {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ✅ Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination mt-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
