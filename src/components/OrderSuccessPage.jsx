import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrderSuccessPage.css";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Auto-redirect after 3 sec

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-success-wrapper d-flex flex-column align-items-center justify-content-center">
      <div className="success-box text-center">
        <h2 className="text-success fw-bold">🎉 Order Placed Successfully!</h2>
        <p className="text-secondary">Thank you for shopping with us.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
