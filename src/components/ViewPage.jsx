import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ViewPage.css";

const ViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (window.innerWidth <= 425) {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleRemove = (productId) => dispatch(removeFromCart(productId));
  const handleIncrease = (productId) => dispatch(increaseQty(productId));
  const handleDecrease = (productId) => dispatch(decreaseQty(productId));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4 cart-page-wrapper">
      <h2 className="mb-4  text-center text-primary fw-bold">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center fw-bold" style={{ color: '#003366'}} >Your cart is empty!!!</p>
      ) : (
        <>
          <Table bordered hover responsive className="cart-table my-2">
            <thead className="text-center text-primary ">
             <tr>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Product ID</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Image</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Product Name</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Quantity</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Unit Price</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Total</th>
              <th style={{ color: '#003366', backgroundColor: '#cbe3f6' }}>Action</th>
             </tr>
            </thead>
            <tbody className="text-center align-middle text-primary">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="80"
                      height="80"
                      className="me-2"
                    />
                  </td>
  
                  <td className="text-center">{item.name}</td>
                  <td>
                    <div className="qty-group">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </Button>
                      <span className="qty-number">{item.quantity}</span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      ×
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="summary-section text-end">
            <p>
              <strong style={{ color: '#003366'}}>Sub-Total:</strong> ₹{subtotal.toFixed(2)}
            </p>
            <h5>
              <strong style={{ color: '#003366'}}>Total:</strong> ₹{subtotal.toFixed(2)}
            </h5>

            <div className="d-flex justify-content-end mt-3 gap-2">
              <Button
                variant="primary"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button variant="primary" onClick={() => navigate("/checkout")}>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPage;
