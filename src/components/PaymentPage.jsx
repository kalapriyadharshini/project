// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentMethod } from "../redux/paymentSlice";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const address = useSelector((state) => state.address.address);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const savedMethod = useSelector((state) => state.payment.method);

  const [paymentMethod, setPaymentMethodLocal] = useState(savedMethod || "");
  const [error, setError] = useState("");

  // don’t allow skipping address or empty cart
  useEffect(() => {
    if (!cartItems?.length) navigate("/cart");
    else if (!address) navigate("/checkout/address");
  }, [address, cartItems, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    dispatch(setPaymentMethod(paymentMethod));
    navigate("/checkout/summary");
  };

  return (
    <div className="payment-page container mt-4" style={{ maxWidth: 600 }}>
      <h2>Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        {["UPI", "NetBanking", "Credit/Debit Card", "COD"].map((method) => (
          <div className="form-check mt-2" key={method}>
            <input
              className="form-check-input"
              type="radio"
              id={method}
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => {
                setPaymentMethodLocal(e.target.value);
                if (error) setError("");
              }}
            />
            <label className="form-check-label" htmlFor={method}>
              {method}
            </label>
          </div>
        ))}

        {error && <div className="text-danger my-3">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Continue to Order Summary
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
