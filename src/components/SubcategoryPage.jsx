// import React from 'react';
// import { useParams } from 'react-router-dom';
// import productData from '../data/Productdata';

// export default function SubcategoryPage() {
//   const { categoryName } = useParams();

//   const formattedCategory = Object.keys(productData).find(
//     key => key.toLowerCase() === categoryName.toLowerCase()
//   );

//   const categoryProducts = productData[formattedCategory] || [];

//   return (
//     <div style={{ padding: '40px' }}>
//       <h2 className="text-center text-primary fw-bold mb-4">
//         {formattedCategory?.toUpperCase()}
//       </h2>
//       <div className="row">
//         {categoryProducts.map((product, index) => (
//           <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
//             <div className="card h-100 text-center">
//               <img
//                 src={product.img}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ height: '200px', objectFit: 'cover' }}
//               />
//               <div className="card-body">
//                 <h6 className="card-title">{product.name}</h6>
//                 <p>
//                   <span className="text-primary fw-bold me-2">{product.offer}</span>
//                   <span className="text-muted text-decoration-line-through">{product.price}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import productData from '../data/Productdata';
// import ProductCard from './ProductCard';
// import './SubcategoryPage.css';
// const SubcategoryPage = () => {
//   const { categoryName } = useParams();
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const formattedCategory = Object.keys(productData).find(
//     key => key.toLowerCase() === categoryName.toLowerCase()
//   );
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`/api/products?category=${formattedCategory}`);
//         setCategoryProducts(res.data);
//       } catch (err) {
//         console.error('API call failed, falling back to local data', err);
//         const fallbackData = productData[formattedCategory] || [];
//         setCategoryProducts(fallbackData);
//       }
//     };
//     fetchData();
//   }, [formattedCategory]);
//   return (
//     <div className="subcategory-container">
//       <h2 className="subcategory-title text-center fw-bold">
//         {formattedCategory?.toUpperCase()}
//       </h2>
//       <div className="row justify-content-center">
//         {categoryProducts.map((product, index) => (
//           <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3" key={index}>
//             <div className="custom-card-wrapper">
//               <ProductCard product={product} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default SubcategoryPage;







import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import productData from "../data/Productdata";
import ProductCard from "./ProductCard";
import "./SubcategoryPage.css";
const SubcategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Find category key only once when categoryName changes
  const formattedCategory = useMemo(() => {
    if (!categoryName) return null;
    return Object.keys(productData).find(
      (key) => key.toLowerCase() === categoryName.toLowerCase()
    );
  }, [categoryName]);
  useEffect(() => {
    const fetchData = async () => {
      if (!formattedCategory) {
        setError("Category not found.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `/api/products?category=${encodeURIComponent(formattedCategory)}`
        );
        setCategoryProducts(res.data);
        setError("");
      } catch (err) {
        console.error("API call failed, using local data", err);
        const fallbackData = productData[formattedCategory] || [];
        setCategoryProducts(fallbackData);
        if (fallbackData.length === 0) {
          setError("No products found in this category.");
        } else {
          setError("");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formattedCategory]);
  return (
    <div className="subcategory-container">
      <h2 className="subcategory-title text-center fw-bold">
        {formattedCategory?.toUpperCase() || "CATEGORY"}
      </h2>
      {loading ? (
        <p className="text-center mt-4">Loading products...</p>
      ) : error ? (
        <p className="text-center text-danger mt-4">{error}</p>
      ) : (
        <div className="row justify-content-center">
          {categoryProducts.map((product, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3"
              key={product._id || index}
            >
              <div className="custom-card-wrapper">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SubcategoryPage;
