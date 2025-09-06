// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isLoggedIn = !!user;

//   // from redux
//   const address = useSelector((state) => state.address.address);
//   const paymentMethod = useSelector((state) => state.payment.method);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }

//     if (!address) {
//       navigate('/checkout/address');
//     } else if (!paymentMethod) {
//       navigate('/checkout/payment');
//     } else {
//       navigate('/checkout/summary');
//     }
//   }, [isLoggedIn, address, paymentMethod, navigate]);

//   return null;
// };

// export default Checkout;







// src/pages/Checkout.jsx
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isLoggedIn = !!user;

//   const address = useSelector((state) => state.address.address);
//   const paymentMethod = useSelector((state) => state.payment.method);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login?redirect=checkout'); 
//       return;
//     }

//     if (!address) {
//       navigate('/checkout/address');
//     } else if (!paymentMethod) {
//       navigate('/checkout/payment');
//     } else {
//       navigate('/checkout/summary');
//     }
//   }, [isLoggedIn, address, paymentMethod, navigate]);

//   return null;
// };

// export default Checkout;



// src/pages/Checkout.jsx
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isLoggedIn = !!user;

//   const address = useSelector((state) => state.address.address);
//   const paymentMethod = useSelector((state) => state.payment.method);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login?redirect=checkout');
//     }
//   }, [isLoggedIn, navigate]);

//   if (!isLoggedIn) return null;

//   if (!address) {
//     return <h2>Please enter your address first.</h2>;
//   }

//   if (!paymentMethod) {
//     return <h2>Please choose a payment method.</h2>;
//   }

//   return <h2>Order Summary Page</h2>;
// };
// export default Checkout;

// src/pages/Checkout.jsx
// 





// src/pages/Checkout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout/address");
    }
  }, [isLoggedIn, navigate]);

 

  return null;
};
export default Checkout;
