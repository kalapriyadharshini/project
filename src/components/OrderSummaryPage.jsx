// src/pages/OrderSummaryPage.jsx
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./OrderSummaryPage.css";

// import { clearCart } from "../redux/cartSlice";
// import { clearAddress } from "../redux/addressSlice";
// import { clearPaymentMethod } from "../redux/paymentSlice";

// const OrderSummaryPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
//   const address = useSelector((state) => state.address.address);
//   const paymentMethod = useSelector((state) => state.payment.method) ?? "";

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
//     0
//   );

//   Redirect if any step is missing
//   useEffect(() => {
//     if (cartItems.length === 0) navigate("/cart");
//     else if (!address) navigate("/checkout/address");
//     else if (!paymentMethod) navigate("/checkout/payment");
//   }, [cartItems, address, paymentMethod, navigate]);

//   const handlePlaceOrder = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to place an order");
//         return;
//       }

//       const res = await axios.post(
//         "/api/orders",
//         {
//           products: cartItems.map((item) => ({
//             productId: item.id,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           shippingAddress: address,
//           paymentMethod,
//           totalAmount: subtotal,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const orderId = res.data._id;

//       Clear cart, address, and payment in Redux after successful order
//       dispatch(clearCart());
//       dispatch(clearAddress());
//       dispatch(clearPaymentMethod());

//       Navigate to Order Success page with real order ID
//       navigate("/order-success", { state: { orderId } });
//     } catch (error) {
//       console.error("Order placement failed:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mt-4 text-center">
//         <h3>Your cart is empty.</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="order-summary-page container mt-4">
//       <h2 className="mb-4 text-primary fw-bold text-center">Order Summary</h2>

//       <h5>Cart Items</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th style={{ width: 80 }}>Qty</th>
//               <th style={{ width: 140 }}>Price</th>
//               <th style={{ width: 140 }}>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={`${item.category}-${item.id}`}>
//                 <td>{item.name}</td>
//                 <td>{item.quantity}</td>
//                 <td>₹{Number(item.price).toLocaleString()}</td>
//                 <td>₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan={3} className="text-end fw-bold">
//                 Subtotal:
//               </td>
//               <td className="fw-bold">₹{subtotal.toLocaleString()}</td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>

//       <h5>Shipping Address</h5>
//       {address && (
//         <p>
//           {address.flat}, {address.area}
//           {address.landmark ? `, ${address.landmark}` : ""}, {address.city},{" "}
//           {address.state}, {address.country} - {address.pincode}
//         </p>
//       )}

//       <h5>Payment Method</h5>
//       <p>{paymentMethod}</p>

//       <h4 className="text-end mt-3">Total: ₹{subtotal.toLocaleString()}</h4>

//       <div className="text-end mt-3">
//         <Button className="btn-success" onClick={handlePlaceOrder}>
//           Place Order
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryPage;


// src/pages/OrderSummaryPage.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderSummaryPage.css";
const OrderSummaryPage = () => {
const navigate = useNavigate();
const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
const address = useSelector((state) => state.address.address);
const paymentMethod = useSelector((state) => state.payment.method) ?? "";
const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  // Redirect if any step is missing
  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
    else if (!address) navigate("/checkout/address");
    else if (!paymentMethod) navigate("/checkout/payment");
  }, [cartItems, address, paymentMethod, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order");
        return;
      }
      // Place order API call
      // const res = await axios.post(
      //   "/api/orders",
      const res = await axios.post(
  "http://localhost:5000/api/orders",
        {
          products: cartItems.map((item) => ({
            // productId: item.id,
            productId: item._id || item.id,

            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: address,
          paymentMethod,
          totalAmount: subtotal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const orderId = res.data._id;
      // Navigate to Order Success page first
      navigate("/order-success", { state: { orderId } });
      // Clearing cart/address/payment will now be handled in OrderSuccessPage
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Your cart is empty.</h3>
      </div>
    );
  }
  return (
    <div className="order-summary-page container mt-4">
      <h2 className="mb-4 text-primary fw-bold text-center">Order Summary</h2>
      <h5>Cart Items</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th style={{ width: 80 }}>Qty</th>
              <th style={{ width: 140 }}>Price</th>
              <th style={{ width: 140 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={`${item.category}-${item.id}`}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{Number(item.price).toLocaleString()}</td>
                <td>₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Subtotal:
              </td>
              <td className="fw-bold">₹{subtotal.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <h5>Shipping Address</h5>
      {address && (
        <p>
          {address.flat}, {address.area}
          {address.landmark ? `, ${address.landmark}` : ""}, {address.city},{" "}
          {address.state}, {address.country} - {address.pincode}
        </p>
      )}
      <h5>Payment Method</h5>
      <p>{paymentMethod}</p>
      <h4 className="text-end mt-3">Total: ₹{subtotal.toLocaleString()}</h4>
      <div className="text-end mt-3">
        <Button className="btn-success" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};
export default OrderSummaryPage;
