import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './CartDropdown.css';

const CartDropdown = ({ cartItems = [], totalPrice = 0, onRemoveItem }) => {
  const safeTotal = Number(totalPrice || 0).toFixed(2);

  return (
    <div className="cart-dropdown">
      {(!cartItems || cartItems.length === 0) ? (
        <p className="text-center text-muted m-0">Your shopping cart is empty!</p>
      ) : (
        <>
          <div className="cart-items-scroll">
            {cartItems.map((item, index) => {
              const safeItemPrice = Number(item.price || 0).toFixed(2);
              const safeItemTotal = Number(item.totalPrice || (item.price * item.quantity) || 0).toFixed(2);

              return (
                <div className="cart-item d-flex mb-2" key={`${item.id}-${index}`}>
                  <img
  src={item.image}
  alt={item.name}
  width="50"
  height="50"
  className="me-2"
/>
 

                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{item.name || 'Unnamed Item'}</div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">₹{safeItemPrice} × {item.quantity || 1}</span>
                      <span className="fw-bold">₹{safeItemTotal}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light text-danger ms-2"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fw-bold">Total: ₹{safeTotal}</span>
          </div>

          <div className="d-flex gap-2 mt-3">
            <Link to="/cart" className="btn btn-dark w-50">View Cart</Link>
            <Link to="/checkout" className="btn btn-warning w-50">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
