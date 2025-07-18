// import React from 'react';
// import { Card } from 'react-bootstrap';
// import './ProductCard.css';
// function ProductCard({ product }) {
//   return (
//     <Card className="product-card text-center">
//       <div className="product-img-container">     
//           <img src={product.img} alt={product.name} className="product-img" />
//       <div className="overlay-icons">
//   <div className="icon-box">
//     <i className="icon fas fa-heart"></i>
//   </div>
//   <div className="icon-box">
//     <i className="icon fas fa-search"></i>
//   </div>
//   <div className="icon-box">
//     <i className="icon fas fa-shopping-cart"></i>
//   </div>
// </div>
//       </div>
//       <Card.Body>
//         <Card.Title className="product-title">{product.name}</Card.Title>
//         <Card.Text>
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }
// export default ProductCard;

// src/components/ProductCard.jsx
// import React from 'react';
// import { Card } from 'react-bootstrap';
// import './ProductCard.css';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';

// function ProductCard({ product }) {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <Card className="product-card text-center">
//       <div className="product-img-container">
//         <img src={product.img} alt={product.name} className="product-img" />
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
//         <Card.Title className="product-title">{product.name}</Card.Title>
//         <Card.Text>
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProductCard;



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

//   return (
//     <Card className="product-card text-center">
//       <div className="product-img-container">
//         <img src={product.img} alt={product.name} className="product-img" />
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
//         <Card.Title className="product-title">{product.name}</Card.Title>
//         <Card.Text>
//           <span className="product-offer">{product.offer}</span>
//           &nbsp;
//           <span className="product-price">{product.price}</span>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProductCard;

import React from 'react';
import { Card } from 'react-bootstrap';
import './ProductCard.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';




function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cleanedPrice = parseFloat(
      (product.offer || product.price).replace(/[^0-9.]/g, '')
    );

    dispatch(
      addToCart({
        id: `${product.name}-${product.img}`,
        name: product.name,
        price: cleanedPrice,
        image: product.img,
        quantity: 1,
      })
    );
  };

const imageSrc = product.img;


  return (
    <Card className="product-card text-center">
      <div className="product-img-container">
        <img src={imageSrc} alt={product.name} className="product-img" />
        <div className="overlay-icons">
          <div className="icon-box">
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
        <Card.Title className="product-title">{product.name}</Card.Title>
        <Card.Text>
          <span className="product-offer">{product.offer}</span>
          &nbsp;
          <span className="product-price">{product.price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
