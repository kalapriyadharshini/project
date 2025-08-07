import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../data/Productdata';
import './ProductDetails.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom'; 


const ProductDetails = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const dispatch = useDispatch();

   const handleAddToCart = () => {
  const cleanedPrice =
    typeof product.price === "string"
      ? Number(product.price.replace(/[^\d.]/g, "")) 
      : product.price;

  const productToAdd = {
    ...product,
    price: cleanedPrice,
    image: product.img, 
  };

  dispatch(addToCart(productToAdd));
};
const navigate = useNavigate();

const handleBuyNow = () => {
  const cleanedPrice =
    typeof product.price === "string"
      ? Number(product.price.replace(/[^\d.]/g, ""))
      : product.price;

  const productToAdd = {
    ...product,
    price: cleanedPrice,
    image: product.img,
  };

  dispatch(addToCart(productToAdd));
  navigate("/checkout"); //  takes user directly to checkout login page
};

//   const dispatch = useDispatch();
// const handleAddToCart = () => {
//   dispatch(addToCart(product));
// };


  // Flatten all product arrays
  // const allProducts = Object.values(productData).flat();
  // const product = allProducts.find(p => p.name === decodedName);
   

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${decodedName}`); // backend route should decode name
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProduct();
}, [decodedName]);




  if (!product) {
    return (
      <div className="product-details-container">
        <h2 className="product-title">Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-image-wrapper">
          <img src={product.img} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h2 className="product-title text-primary">{product.name}</h2>

          <p><strong>Product ID:</strong> {product.id}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Description:</strong> {product.description}</p>

          <div className="product-price">
            <span className="offer-price">{product.offer}</span>
            

            <span className="original-price">{product.price}</span>
          </div>
          {/* <div className="product-rating">
           <strong>Rating:</strong> {product.rating?.stars} <span style={{ color: '#f5b301' }}>⭐</span>
          </div> */}
           <div className="product-rating">
  <strong>Rating:</strong> {product.rating?.stars}
  <span style={{ color: '#007bff', marginLeft: '8px' }}>
    {Array.from({ length: 5 }, (_, i) => {
      const full = i + 1 <= Math.floor(product.rating?.stars || 0);
      const half = !full && i < product.rating?.stars;
      return full ? '★' : half ? '☆' : '✩';
    })}
  </span>
</div>


          <div className="product-features">
            <strong>Features:</strong>
            <ul>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
             <div className="product-buttons">
  {/* <button className="btn-add-to-cart">Add to Cart</button> */}
  <button className="btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>

  {/* <button className="btn-buy-now">Buy Now</button> */}
  <button className="btn-buy-now" onClick={handleBuyNow}>Buy Now</button>

</div>
          </div>
        </div>
      </div>
     

    </div>
  );
};

export default ProductDetails;
