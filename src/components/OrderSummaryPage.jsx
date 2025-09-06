// src/pages/OrderSummaryPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrderSummaryPage.css";
const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
  const address = useSelector((state) => state.address.address);
  const paymentMethod = useSelector((state) => state.payment.method) ?? "";

  // Redirect if any step is missing
  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
    else if (!address) navigate("/checkout/address");
    else if (!paymentMethod) navigate("/checkout/payment");
  }, [cartItems, address, paymentMethod, navigate]);
  

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // const handlePlaceOrder = () => {
  //   Generate fake order ID
  //   const fakeOrderId = Math.floor(Math.random() * 1000000);

  //   Navigate first
  //   navigate("/order-success", { state: { orderId: fakeOrderId } });

  //   Clear cart after navigation to avoid redirect issues
  //   dispatch(clearCart());
  // };
  const handlePlaceOrder = () => {
  const fakeOrderId = Math.floor(Math.random() * 1000000);

  // Only navigate — do NOT clear cart here
  navigate("/order-success", { state: { orderId: fakeOrderId } });
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
        <Button variant="success" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
