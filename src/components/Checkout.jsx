import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/summary'); // go to summary if logged in
    } else {
      navigate('/login'); // go to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  return null;
};

export default Checkout;
