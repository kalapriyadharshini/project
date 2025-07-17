import React from 'react';
import { Link } from 'react-router-dom';

const CartDropdown = ({ cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} width="40" />
              <div>{item.name}</div>
              <small>₹{item.price} × {item.quantity}</small>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div>Total: ₹{total}</div>
          <div>
            <Link to="/cart">View Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
