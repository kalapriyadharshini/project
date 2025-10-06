// import React, { useEffect } from "react";
// import "./OrderSuccessPage.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button, Card } from "react-bootstrap";
// import { useDispatch } from "react-redux";

// import { clearCart } from "../redux/cartSlice";
// import { clearAddress } from "../redux/addressSlice";
// import { clearPaymentMethod } from "../redux/paymentSlice";

// const OrderSuccessPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     Reset everything AFTER order success
//     dispatch(clearCart());
//     dispatch(clearAddress());
//     dispatch(clearPaymentMethod());
//   }, [dispatch]);

//   Get the orderId passed via state
//   const orderId = location.state?.orderId;

//   const handleViewOrders = () => {
//     navigate("/orders");
//   };

//   const handleContinueShopping = () => {
//     navigate("/");
//   };

//   return (
//     <div className="order-success-page">
//       <Card className="order-success-card shadow-lg">
//         <Card.Body>
//           <h2>Order Placed Successfully!</h2>
//           {orderId && (
//             <p className="mb-2">
//               Your Order ID: <strong>{orderId}</strong>
//             </p>
//           )}
//           <p className="mb-4">
//             Thank you for shopping with us. Your order has been confirmed and
//             will be processed shortly.
//           </p>
//           <div className="d-flex justify-content-center gap-3">
//             <Button variant="primary" onClick={handleViewOrders}>
//               View My Orders
//             </Button>
//             <Button variant="primary" onClick={handleContinueShopping}>
//               Continue Shopping
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default OrderSuccessPage;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { clearAddress } from "../redux/addressSlice";
import { clearPaymentMethod } from "../redux/paymentSlice";
import "./OrderSuccessPage.css";
const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Clear cart, address, and payment after order success
    dispatch(clearCart());
    dispatch(clearAddress());
    dispatch(clearPaymentMethod());
    // Redirect to homepage after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);
  return (
    <div className="order-success-page">
      <h2>Order Placed Successfully!</h2>
      <p>
        Thank you for shopping with us. Your order has been confirmed and will
        be processed shortly.
      </p>
      <p className="redirect-note">Redirecting to homepage...</p>
    </div>
  );
};
export default OrderSuccessPage;
