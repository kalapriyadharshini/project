// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import ProductCard from './ProductCard';
// import productData from '../data/Productdata';
// import './CategoryProducts.css';
// function CategoryProducts() {
//   return (
//     <>
//       {Object.entries(productData).map(([category, products]) => (
//         <div className="section-container my-4" key={category}>
//           <h2 className="text-primary text-center py-5 mb-4 fw-bold">{category.toUpperCase()}</h2>
//  <Row xs={12} sm={6} md={4} lg={5} className="gx-0 gy-0 product-row">
//             {products.map((product, index) => (
//               <Col key={index}>
//                 <ProductCard product={product} />
//               </Col>
//             ))}
//           </Row>
//         </div>
//       ))}
//     </>
//   );
// }
// export default CategoryProducts;





import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from "axios";
import "./CategoryProducts.css";
function CategoryProducts() {
  const [productsByCategory, setProductsByCategory] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/products"); // fetch all products
        const res = await axios.get("http://localhost:5000/api/adminproducts");
        const products = res.data;
        // Group products by category
        // const grouped = products.reduce((acc, product) => {
        //   const cat = product.category || "Uncategorized";
        //   if (!acc[cat]) acc[cat] = [];
        //   acc[cat].push(product);
        //   return acc;
        // }, {});
        // only include products with status "Available"
const grouped = products
  .filter(p => p.status === "Available")  // <--- add this filter
  .reduce((acc, product) => {
    const cat = product.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});
        setProductsByCategory(grouped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div className="section-container my-4" key={category}>
          <h2 className="text-primary text-center py-5 mb-4 fw-bold">
            {category.toUpperCase()}
          </h2>
          <Row xs={12} sm={6} md={4} lg={5} className="gx-0 gy-0 product-row">
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
}
export default CategoryProducts;



