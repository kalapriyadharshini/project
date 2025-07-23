import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import "./OrderSummaryPage.css";

const OrderSummaryPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    // You can add further logic here (e.g., API call)
    navigate("/order-success");
  };

  return (
    <div className="container mt-4 order-summary-wrapper">
      <h2 className="mb-4 text-center text-primary fw-bold">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-danger fw-bold">No items in cart.</p>
      ) : (
        <>
          <Table bordered hover responsive className="summary-table my-3">
            <thead className="text-center text-primary">
              <tr>
                <th style={{ backgroundColor: "#cbe3f6" }}>Image</th>
                <th style={{ backgroundColor: "#cbe3f6" }}>Product</th>
                <th style={{ backgroundColor: "#cbe3f6" }}>Qty</th>
                <th style={{ backgroundColor: "#cbe3f6" }}>Price</th>
                <th style={{ backgroundColor: "#cbe3f6" }}>Total</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle text-primary">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} width="70" height="70" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <p>
              <strong className="text-primary">Sub-Total:</strong> ₹{subtotal.toFixed(2)}
            </p>
            <h5>
              <strong className="text-primary">Total:</strong> ₹{subtotal.toFixed(2)}
            </h5>

            <Button variant="primary" className="mt-3" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryPage;
