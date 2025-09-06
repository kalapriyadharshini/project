// src/pages/OrderSuccessPage.jsx
import React, { useEffect } from "react";
import "./OrderSuccessPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./OrderSuccessPage.css";
import { clearCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart AFTER reaching success page
    dispatch(clearCart());
  }, [dispatch]);

  // Get the orderId passed via state
  const orderId = location.state?.orderId;

  const handleViewOrders = () => {
    navigate("/orders"); // Dedicated orders history page
  };

  const handleContinueShopping = () => {
    navigate("/"); // Go back to home/shop
  };

  return (
    <div className="order-success-page">
      <Card className="order-success-card shadow-lg p-4 text-center">
        <Card.Body>
          <h2 className="text-success mb-3">Order Placed Successfully!</h2>
          {orderId && (
            <p className="mb-2">Your Order ID: <strong>{orderId}</strong></p>
          )}
          <p className="mb-4">
            Thank you for shopping with us. Your order has been confirmed and
            will be processed shortly.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" onClick={handleViewOrders}>
              View My Orders
            </Button>
            <Button variant="outline-secondary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
