import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemove = (productId) => dispatch(removeFromCart(productId));
  const handleIncrease = (productId) => dispatch(increaseQty(productId));
  const handleDecrease = (productId) => dispatch(decreaseQty(productId));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4 cart-page-wrapper">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table bordered hover responsive className="cart-table">
            <thead className="text-center text-primary">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                {/* <th>Model</th> */}
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle text-primary">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                     {/* <img
                      src={item.img}
                      alt={item.name}
                      className="cart-img-thumb"
                    />  */}
                    <img
  src={item.image}
  alt={item.name}
  width="80"
  height="80"
  className="me-2 "
/>

                  </td>
                  <td className="text-start ">{item.name}</td>
                  {/* <td>{item.model || "N/A"}</td> */}
                  <td>
                    <div className="qty-group">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </Button>
                      <span className="qty-number">{item.quantity}</span>
                      <Button
                        variant="light"
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
                      variant="danger"
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
              <strong>Sub-Total:</strong> ₹{subtotal.toFixed(2)}
            </p>
            <h5>
              <strong>Total:</strong> ₹{subtotal.toFixed(2)}
            </h5>

            <div className="d-flex justify-content-end mt-3 gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
              <Button variant="primary">Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
