// import React from 'react';
// import { Card } from 'react-bootstrap';
// import './ProductCard.css';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// function ProductCard({ product }) {
//   const dispatch = useDispatch();
//   const handleAddToCart = () => {
//     const cleanedPrice = parseFloat(
//       (product.offer || product.price).replace(/[^0-9.]/g, '')
//     );
//     dispatch(
//       addToCart({
//         id: `${product.name}-${product.img}`,
//         name: product.name,
//         price: cleanedPrice,
//         image: product.img,
//         quantity: 1,
//       })
//     );
//   };
// const imageSrc = product.img;
//   return (
//     <Card className="product-card">
//       <div className="product-img-container">
//         <img src={imageSrc} alt={product.name} className="product-img" />
//         <div className="overlay-icons">
//           <div className="icon-box">
//             <i className="icon fas fa-heart"></i>
//           </div>
//           <div className="icon-box">
//             <i className="icon fas fa-search"></i>
//           </div>
//           <div className="icon-box" onClick={handleAddToCart}>
//             <i className="icon fas fa-shopping-cart"></i>
//           </div>
//         </div>
//       </div>
//       <Card.Body>
//         <Card.Title className="product-title text-center">{product.name}</Card.Title>
//         <Card.Text className="price text-center">
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }
// export default ProductCard;




// import { Card } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';


// function ProductCard({ product }) {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     const cleanedPrice = parseFloat(
//       (product.offer || product.price).replace(/[^0-9.]/g, '')
//     );

    
//     dispatch(
//   addToCart({
//     id: product.id, 
//     name: product.name,
//     price: cleanedPrice,
//     image: product.img,
//     quantity: 1,
//   })
// );
//   }

//   const imageSrc = product.img;

//   return (
//     <Card className="product-card">
//       <div className="product-img-container">
//         <Link to={`/product/${encodeURIComponent(product.name)}`}>
//           <img src={imageSrc} alt={product.name} className="product-img" />
//         </Link>
//         <div className="overlay-icons">
//           <div className="icon-box">
//             <i className="icon fas fa-heart"></i>
//           </div>
//           <div className="icon-box">
//             <i className="icon fas fa-search"></i>
//           </div>
//           <div className="icon-box" onClick={handleAddToCart}>
//             <i className="icon fas fa-shopping-cart"></i>
//           </div>
//         </div>
//       </div>
//       <Card.Body>
//         <Card.Title className="product-title text-center">{product.name}</Card.Title>
//         <Card.Text className="price text-center">
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProductCard;





// import { Card } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';
// import { addToWishlist } from '../redux/wishlistSlice'; 

// function ProductCard({ product }) {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     const cleanedPrice = parseFloat(
//       (product.offer || product.price).replace(/[^0-9.]/g, '')
//     );

//     dispatch(
//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: cleanedPrice,
//         image: product.img,
//         quantity: 1,
//       })
//     );
//   };

//   const handleAddToWishlist = () => {
//     dispatch(
//       addToWishlist({
//         id: product.id,
//         title: product.name,
//         price: parseFloat((product.offer || product.price).replace(/[^0-9.]/g, '')),
//         image: product.img,
//       })
//     );
//   };

//   const imageSrc = product.img;

//   return (
//     <Card className="product-card">
//       <div className="product-img-container">
//         <Link to={`/product/${encodeURIComponent(product.name)}`}>
//           <img src={imageSrc} alt={product.name} className="product-img" />
//         </Link>
//         <div className="overlay-icons">
//           <div className="icon-box" onClick={handleAddToWishlist}> 
//             <i className="icon fas fa-heart"></i>
//           </div>
//           <div className="icon-box">
//             <i className="icon fas fa-search"></i>
//           </div>
//           <div className="icon-box" onClick={handleAddToCart}>
//             <i className="icon fas fa-shopping-cart"></i>
//           </div>
//         </div>
//       </div>
//       <Card.Body>
//         <Card.Title className="product-title text-center">{product.name}</Card.Title>
//         <Card.Text className="price text-center">
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProductCard;





import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import axios from 'axios';
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); // Token from login
  const handleAddToCart = () => {
    const cleanedPrice = parseFloat(
      (product.offer || product.price).replace(/[^0-9.]/g, '')
    );
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: cleanedPrice,
        image: product.img,
        quantity: 1,
      })
    );
  };
  const handleAddToWishlist = async () => {
    const payload = {
      id: product.id,
      title: product.name,
      price: parseFloat((product.offer || product.price).replace(/[^0-9.]/g, '')),
      image: product.img,
    };
    try {
      await axios.post('/api/wishlist/add', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Added to Wishlist');
    } catch (error) {
      console.error('Wishlist Add Error:', error);
      alert('Failed to add to wishlist');
    }
  };
  return (
    <Card className="product-card">
      <div className="product-img-container">
        <Link to={`/product/${encodeURIComponent(product.name)}`}>
          <img src={product.img} alt={product.name} className="product-img" />
        </Link>
        <div className="overlay-icons">
          <div className="icon-box" onClick={handleAddToWishlist}>
            <i className="icon fas fa-heart"></i>
          </div>
          <div className="icon-box">
            <i className="icon fas fa-search"></i>
          </div>
          <div className="icon-box" onClick={handleAddToCart}>
            <i className="icon fas fa-shopping-cart"></i>
          </div>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="product-title text-center">{product.name}</Card.Title>
        <Card.Text className="price text-center">
          <span className="product-offer">{product.offer}</span>
          &nbsp;
          <span className="product-price">{product.price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
