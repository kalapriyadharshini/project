// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   removeFromWishlist,
//   setWishlist,
//   selectWishlistItems,
// } from '../redux/wishlistSlice';
// import { Link } from 'react-router-dom';
// import './Wishlist.css';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector(selectWishlistItems);

 
//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     dispatch(setWishlist(storedWishlist));
//   }, [dispatch]);

 
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const handleRemove = (productId) => {
//     dispatch(removeFromWishlist(productId));
//   };

//   return (
//     <div className="wishlist-container">
//       <h2 className="wishlist-title">My Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="empty-wishlist">
//           <p>Your wishlist is empty.</p>
//           <Link to="/" className="btn btn-primary mt-3">
//             Go to Shop
//           </Link>
//         </div>
//       ) : (
//         <div className="wishlist-grid">
//           {wishlistItems.map((item) => (
//             <div className="wishlist-card" key={item.id}>
//               <img src={item.image} alt={item.title} className="wishlist-image" />
//               <div className="wishlist-info">
//                 <h5 className="wishlist-name">{item.title}</h5>
//                 <p className="wishlist-price">₹{item.price}</p>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;





// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromWishlist, setWishlist, selectWishlistItems } from '../redux/wishlistSlice';
// import { addToCart } from '../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import './Wishlist.css';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector(selectWishlistItems);

//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     dispatch(setWishlist(storedWishlist));
//   }, [dispatch]);

//   const handleRemove = (productId) => {
//     dispatch(removeFromWishlist(productId));
//   };

//   const handleAddToCart = (item) => {
//     dispatch(
//       addToCart({
//         id: item.id,
//         name: item.title,
//         price: item.price,
//         image: item.image,
//         quantity: 1,
//       })
//     );
//   };

//   return (
//     <div className="wishlist-container px-3 py-5">
//       <h2 className="wishlist-title text-center mb-4">My Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="empty-wishlist text-center">
//           <p>Your wishlist is empty.</p>
//           <Link to="/" className="btn btn-primary mt-3">
//             Go to Shop
//           </Link>
//         </div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="table wishlist-table text-center align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>IMAGE</th>
//                   <th>PRODUCT NAME</th>
//                   <th>PRICE</th>
//                   <th>AVAILABILITY</th>
//                   <th>ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlistItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <img src={item.image} alt={item.title} style={{ width: '80px', height: 'auto' }} />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>In Stock</td>
//                     <td>
//                       <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleRemove(item.id)}>
//                         <i className="fas fa-times"></i>
//                       </button>
//                       <button className="btn btn-outline-success btn-sm" onClick={() => handleAddToCart(item)}>
//                         <i className="fas fa-shopping-cart"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="text-center mt-4">
//             <Link to="/" className="btn btn-success me-3">CONTINUE SHOPPING</Link>
//             <Link to="/order-summary" className="btn btn-success">CHECK OUT</Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;





// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromWishlist, setWishlist, selectWishlistItems } from '../redux/wishlistSlice';
// import { addToCart } from '../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import './Wishlist.css';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector(selectWishlistItems);

//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     dispatch(setWishlist(storedWishlist));
//   }, [dispatch]);

//   const handleRemove = (productId) => {
//     dispatch(removeFromWishlist(productId));
//   };

//   const handleAddToCart = (item) => {
//     dispatch(
//       addToCart({
//         id: item.id,
//         name: item.title,
//         price: item.price,
//         image: item.image,
//         quantity: 1,
//       })
//     );
//   };

//   return (
//     <div className="wishlist-container">
//       <h2 className="wishlist-title">My Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="empty-wishlist text-center">
//           <p>Your wishlist is empty.</p>
//           <Link to="/" className="btn btn-primary mt-3">Go to Shop</Link>
//         </div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="table wishlist-table align-middle text-center">
//               <thead className="wishlist-header">
//                 <tr>
//                   <th>IMAGE</th>
//                   <th>PRODUCT NAME</th>
//                   <th>PRICE</th>
//                   <th>AVAILABILITY</th>
//                   <th>ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlistItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <img src={item.image} alt={item.title} className="wishlist-img" />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>In Stock</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm me-2"
//                         onClick={() => handleRemove(item.id)}
//                       >
//                         <i className="fas fa-times"></i>
//                       </button>
//                       <button
//                         className="btn btn-outline-success btn-sm"
//                         onClick={() => handleAddToCart(item)}
//                       >
//                         <i className="fas fa-shopping-cart"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="wishlist-buttons text-center mt-4">
//             <Link to="/" className="btn btn-green me-3">CONTINUE SHOPPING</Link>
//              <Link
//   to="/order-summary"
//   className="btn btn-green"
//   onClick={() => {
//     wishlistItems.forEach((item) => {
//       dispatch(
//         addToCart({
//           id: item.id,
//           name: item.title,
//           price: item.price,
//           image: item.image,
//           quantity: 1,
//         })
//       );
//     });
//   }}
// >
//   CHECK OUT
// </Link>

//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './Wishlist.css';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const token = localStorage.getItem('token');

//   const fetchWishlist = async () => {
//     try {
//       const response = await axios.get('/api/wishlist', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlistItems(response.data);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const handleRemove = async (productId) => {
//     try {
//       await axios.post(
//         '/api/wishlist/remove',
//         { id: productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlistItems(prev => prev.filter(item => item.id !== productId));
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const handleAddToCart = (item) => {
//     dispatch(
//       addToCart({
//         id: item.id,
//         name: item.title,
//         price: item.price,
//         image: item.image,
//         quantity: 1,
//       })
//     );
//   };

//   const handleCheckoutAll = () => {
//     wishlistItems.forEach((item) => {
//       dispatch(
//         addToCart({
//           id: item.id,
//           name: item.title,
//           price: item.price,
//           image: item.image,
//           quantity: 1,
//         })
//       );
//     });
//   };

//   return (
//     <div className="wishlist-container">
//       <h2 className="wishlist-title">My Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="empty-wishlist text-center">
//           <p>Your wishlist is empty.</p>
//           <Link to="/" className="btn btn-primary mt-3">Go to Shop</Link>
//         </div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="table wishlist-table align-middle text-center">
//               <thead className="wishlist-header">
//                 <tr>
//                   <th>IMAGE</th>
//                   <th>PRODUCT NAME</th>
//                   <th>PRICE</th>
//                   <th>AVAILABILITY</th>
//                   <th>ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlistItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <img src={item.image} alt={item.title} className="wishlist-img" />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>In Stock</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm me-2"
//                         onClick={() => handleRemove(item.id)}
//                       >
//                         <i className="fas fa-times"></i>
//                       </button>
//                       <button
//                         className="btn btn-outline-success btn-sm"
//                         onClick={() => handleAddToCart(item)}
//                       >
//                         <i className="fas fa-shopping-cart"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="wishlist-buttons text-center mt-4">
//             <Link to="/" className="btn btn-green me-3">CONTINUE SHOPPING</Link>
//             <Link
//               to="/order-summary"
//               className="btn btn-green"
//               onClick={handleCheckoutAll}
//             >
//               CHECK OUT
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;





// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Wishlist.css';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   const fetchWishlist = async () => {
//     try {
//       const response = await axios.get('/api/wishlist', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlistItems(response.data);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchWishlist();
//   }, [token]);

//   const handleRemove = async (productId) => {
//     try {
//       await axios.post(
//         '/api/wishlist/remove',
//         { id: productId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const handleAddToCart = (item) => {
//     dispatch(
//       addToCart({
//         id: item.id,
//         name: item.title,
//         price: item.price,
//         image: item.image,
//         quantity: 1,
//       })
//     );
//   };

//   const handleCheckoutAll = () => {
//     wishlistItems.forEach((item) => {
//       dispatch(
//         addToCart({
//           id: item.id,
//           name: item.title,
//           price: item.price,
//           image: item.image,
//           quantity: 1,
//         })
//       );
//     });
//   };

//   return (
//     <div className="wishlist-container">
//       <h2 className="wishlist-title fw-bold">My Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="empty-wishlist text-center">
//           <p>Your wishlist is empty.</p>
//           <Link to="/" className="btn btn-primary mt-3">Go to Shop</Link>
//         </div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="table wishlist-table align-middle text-center">
//               <thead className="wishlist-header">
//                 <tr>
//                   <th>IMAGE</th>
//                   <th>PRODUCT NAME</th>
//                   <th>PRICE</th>
//                   <th>AVAILABILITY</th>
//                   <th>ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlistItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <img src={item.image} alt={item.title} className="wishlist-img" />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>In Stock</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm me-2"
//                         onClick={() => handleRemove(item.id)}
//                       >
//                         <i className="fas fa-times"></i>
//                       </button>
//                       <button
//                         className="btn btn-outline-success btn-sm"
//                         onClick={() => handleAddToCart(item)}
//                       >
//                         <i className="fas fa-shopping-cart"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="wishlist-buttons  text-center mt-4">
//             <Link to="/" className="btn btn-green me-3">CONTINUE SHOPPING</Link>
//             <Link
//               to="/order-summary"
//               className="btn btn-green"
//               onClick={handleCheckoutAll}
//             >
//               CHECK OUT
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;








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
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
  };

  const handleCheckoutAll = () => {
    wishlistItems.forEach((item) => {
      dispatch(
        addToCart({
          id: item.id,
          name: item.title,
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
                        onClick={() => handleRemove(item.id)}
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
