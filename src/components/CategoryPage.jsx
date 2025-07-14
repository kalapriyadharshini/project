
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import productData from '../data/Productdata'; 
// import ProductCard from './ProductCard'; 

// const CategoryPage = () => {
//   const { categoryName } = useParams();
//   const decodedCategory = decodeURIComponent(categoryName);

//   console.log("Decoded Category:", decodedCategory);
//   console.log("Products:", productData[decodedCategory]);


//   const products = productData[decodedCategory] || [];

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">{decodedCategory}</h2>

//       {products.length === 0 ? (
//         <p className="text-danger">No products found in this category.</p>
//       ) : (
//         <div className="row">
//           {products.map((product, index) => (
//             <div key={index} className="col-md-3 mb-4">
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;


// pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import productData from "../data/Productdata";
import FilteredProductDisplay from "../components/FilteredProductDisplay";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const products = productData[decodedCategory] || [];

  return (
    <div className="container mt-4">
      <FilteredProductDisplay
        categoryName={decodedCategory}
        products={products}
      />
    </div>
  );
};

export default CategoryPage;

