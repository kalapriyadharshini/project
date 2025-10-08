// import React from 'react';
// import { useParams } from 'react-router-dom';
// import productData from '../data/Productdata';
// import './ProductDetails.css';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { useNavigate } from 'react-router-dom'; 
// const ProductDetails = () => {
//   const { name } = useParams();
//   const decodedName = decodeURIComponent(name);
//   const dispatch = useDispatch();
//    const handleAddToCart = () => {
//   const cleanedPrice =
//     typeof product.price === "string"
//       ? Number(product.price.replace(/[^\d.]/g, "")) 
//       : product.price;
//   const productToAdd = {
//     ...product,
//     price: cleanedPrice,
//     image: product.img, 
//   };
//   dispatch(addToCart(productToAdd));
// };
// const navigate = useNavigate();
// const handleBuyNow = () => {
//   const cleanedPrice =
//     typeof product.price === "string"
//       ? Number(product.price.replace(/[^\d.]/g, ""))
//       : product.price;
//   const productToAdd = {
//     ...product,
//     price: cleanedPrice,
//     image: product.img,
//   };
//   dispatch(addToCart(productToAdd));
//   navigate("/checkout"); 
// };
//   useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/api/products/${decodedName}`); 
//       setProduct(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchProduct();
// }, [decodedName]);
//   if (!product) {
//     return (
//       <div className="product-details-container">
//         <h2 className="product-title">Product Not Found</h2>
//         <p>The product you are looking for does not exist.</p>
//       </div>
//     );
//   }
//   return (
//     <div className="product-details-container">
//       <div className="product-details-content">
//         <div className="product-image-wrapper">
//           <img src={product.img} alt={product.name} className="product-image" />
//         </div>
//         <div className="product-info">
//           <h2 className="product-title text-primary">{product.name}</h2>

//           <p><strong>Product ID:</strong> {product.id}</p>
//           <p><strong>Brand:</strong> {product.brand}</p>
//           <p><strong>Description:</strong> {product.description}</p>

//           <div className="product-price">
//             <span className="offer-price">{product.offer}</span>
            

//             <span className="original-price">{product.price}</span>
//           </div>
//            <div className="product-rating">
//   <strong>Rating:</strong> {product.rating?.stars}
//   <span style={{ color: '#007bff', marginLeft: '8px' }}>
//     {Array.from({ length: 5 }, (_, i) => {
//       const full = i + 1 <= Math.floor(product.rating?.stars || 0);
//       const half = !full && i < product.rating?.stars;
//       return full ? '★' : half ? '☆' : '✩';
//     })}
//   </span>
// </div>
//           <div className="product-features">
//             <strong>Features:</strong>
//             <ul>
//               {product.features?.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//              <div className="product-buttons">
//   <button className="btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
//   <button className="btn-buy-now" onClick={handleBuyNow}>Buy Now</button>
// </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductDetails;




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
          {/* <img src={product.img} alt={product.name} className="product-img" /> */}
          <img
  src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
  alt={product.name}
  className="product-img"
/>

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
