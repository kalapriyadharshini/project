// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTrashAlt } from 'react-icons/fa';
// import './CartDropdown.css';
// const CartDropdown = ({ cartItems = [], totalPrice = 0, onRemoveItem }) => {
//   const safeTotal = Number(totalPrice || 0).toFixed(2);
//   return (
//     <div className="cart-dropdown">
//       {(!cartItems || cartItems.length === 0) ? (
//         <p className="text-center text-muted m-0">Your shopping cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-items-scroll">
//             {cartItems.map((item, index) => {
//               const safeItemPrice = Number(item.price || 0).toFixed(2);
//               const safeItemTotal = Number(item.totalPrice || (item.price * item.quantity) || 0).toFixed(2);

//               return (
//                 <div className="cart-item d-flex mb-2" key={`${item.id}-${index}`}>
//                   <img
//   src={item.image}
//   alt={item.name}
//   width="50"
//   height="50"
//   className="me-2"
// />
//                   <div className="flex-grow-1">
//                     <div className="fw-semibold small">{item.name || 'Unnamed Item'}</div>
//                     <div className="d-flex justify-content-between small">
//                       <span className="text-muted">₹{safeItemPrice} × {item.quantity || 1}</span>
//                       <span className="fw-bold ">₹{safeItemTotal}</span>
//                     </div>
//                   </div>
//                   <button
//                     className="btn btn-sm btn-light text-primary ms-2"
//                     onClick={() => onRemoveItem(item.id)}
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <span className="fw-bold">Total: ₹{safeTotal}</span>
//           </div>
//           <div className="d-flex gap-2 mt-3">
//             <Link to="/cart" className="btn btn-primary w-50">View Cart</Link>
//             <Link to="/checkout" className="btn btn-primary w-50">Checkout</Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default CartDropdown;


// impo
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; 
// import { FaTrashAlt } from 'react-icons/fa';
// import './CartDropdown.css';

// const CartDropdown = ({
//   cartItems = [],
//   totalPrice = 0,
//   onRemoveItem,
//   setCartOpen = () => {}, 
// }) => {
//   const safeTotal = Number(totalPrice || 0).toFixed(2);
//   const navigate = useNavigate();

//   const handleViewCart = () => {
//     setCartOpen(false);   
//     navigate('/cart');     
//   };

//   return (
//     <div className="cart-dropdown">
//       {(!cartItems || cartItems.length === 0) ? (
//         <p className="text-center text-muted m-0">Your shopping cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-items-scroll">
//             {cartItems.map((item, index) => {
//               const safeItemPrice = Number(item.price || 0).toFixed(2);
//               const safeItemTotal = Number(item.totalPrice || (item.price * item.quantity) || 0).toFixed(2);

//               return (
//                 <div className="cart-item d-flex mb-2" key={`${item.id}-${index}`}>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     width="50"
//                     height="50"
//                     className="me-2"
//                   />
//                   <div className="flex-grow-1">
//                     <div className="fw-semibold small">{item.name || 'Unnamed Item'}</div>
//                     <div className="d-flex justify-content-between small">
//                       <span className="text-muted">₹{safeItemPrice} × {item.quantity || 1}</span>
//                       <span className="fw-bold">₹{safeItemTotal}</span>
//                     </div>
//                   </div>
//                   <button
//                     className="btn btn-sm btn-light text-primary ms-2"
//                     onClick={() => onRemoveItem(item.id)}
//                     title="Remove Item" 
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <span className="fw-bold">Total: ₹{safeTotal}</span>
//           </div>

//           <div className="d-flex gap-2 mt-3">
//             <button className="btn btn-primary w-50" onClick={handleViewCart}>
//               View Cart
//             </button>
//             <Link to="/checkout" className="btn btn-primary w-50">
//               Checkout
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartDropdown;









// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './CartDropdown.css';

// const CartDropdown = ({ cartItems, onClose, safeTotal }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="cart-dropdown">
//       <div className="cart-items-scroll">
//         {cartItems.length > 0 ? (
//           cartItems.map((item, index) => (
//             <div key={index} className="cart-item">
//               <img src={item.img} alt={item.name} className="cart-item-image" />
//               <div>
//                 <div className="cart-item-name">{item.name}</div>
//                 <div className="cart-item-price">{item.offer}</div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center">Your cart is empty</div>
//         )}
//       </div>

//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <span className="fw-bold">Total: ₹{safeTotal}</span>
//       </div>

//       <div className="d-flex gap-2 mt-3">
//         <button
//           className="btn btn-primary w-50"
//           onClick={() => {
//             if (typeof onClose === 'function') {
//               onClose();
//             }
//             navigate('/cart');
//           }}
//         >
//           View Cart
//         </button>
//         <Link to="/checkout" className="btn btn-primary w-50">
//           Checkout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CartDropdown;




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './CartDropdown.css';
const CartDropdown = ({
  cartItems = [],
  totalPrice = 0,
  onRemoveItem = () => {},
  setCartOpen = () => {},
}) => {
  const navigate = useNavigate();
  const safeTotal = Number(totalPrice || 0).toFixed(2);
  const handleViewCart = () => {
    if (typeof setCartOpen === 'function') {
      setCartOpen(false);
    }
    navigate('/cart');
  };
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
                    src={item.image || item.img}
                    alt={item.name}
                    width="50"
                    height="50"
                    className="me-2"
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{item.name || 'Unnamed Item'}</div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">₹{safeItemPrice} × {item.quantity || 1}</span>
                      {/* <span className="fw-bold">₹{safeItemTotal}</span> */}
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light text-primary ms-2"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove Item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })}
          </div>
          {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fw-bold total">Total: ₹{safeTotal}</span>
          </div> */}
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary w-50" onClick={handleViewCart}>
              View Cart
            </button>
            <Link to="/checkout" className="btn btn-primary check w-50">
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default CartDropdown;
