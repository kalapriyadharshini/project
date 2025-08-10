import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await axios.post(
        '/api/wishlist/remove',
        { id: productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlistItems((prev) => prev.filter((item) => (item.id || item._id) !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleAddToCart = (item) => {
    const productId = item.id || item._id;
    if (!productId) {
      console.error('Wishlist item missing id:', item);
      return;
    }
    dispatch(
      addToCart({
        id: productId,
        name: item.title || item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
  };

  const handleCheckoutAll = () => {
    wishlistItems.forEach((item) => {
      const productId = item.id || item._id;
      if (!productId) {
        console.error('Wishlist item missing id:', item);
        return;
      }
      dispatch(
        addToCart({
          id: productId,
          name: item.title || item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        })
      );
    });
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title fw-bold">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist text-center">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="btn btn-primary mt-3">Go to Shop</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table wishlist-table align-middle text-center">
              <thead className="wishlist-header">
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th>PRICE</th>
                  <th>AVAILABILITY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <td>
                      <img src={item.image} alt={item.title} className="wishlist-img" />
                    </td>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>In Stock</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => handleRemove(item.id || item._id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="wishlist-buttons text-center mt-4">
            <Link to="/" className="btn btn-green me-3">CONTINUE SHOPPING</Link>
            <Link
              to="/order-summary"
              className="btn btn-green"
              onClick={handleCheckoutAll}
            >
              CHECK OUT
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
