// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import productData from "../data/Productdata";
// import "./SearchResults.css"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     const results = [];
//     Object.values(productData).forEach((category) => {
//       category.forEach((product) => {
//         if (
//           product.name.toLowerCase().includes(query) ||
//           product.description.toLowerCase().includes(query) ||
//           product.brand.toLowerCase().includes(query)
//         ) {
//           results.push(product);
//         }
//       });
//     });
//     setFilteredProducts(results);
//   }, [query]);

//   return (
//     <div className="search-results-container">
//       <h2 className="mb-4">Search Results for "{query}"</h2>
//       {filteredProducts.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="product-grid">
//           {filteredProducts.map((item) => (
//             <div key={item.id} className="product-card">
//               <img src={item.img} alt={item.name} />
//               <h4>{item.name}</h4>
//               <p>{item.brand}</p>
//               <p>
//                 <span className="offer-price">{item.offer}</span>{" "}
//                 <span className="actual-price">{item.price}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;



import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css"; // Optional styling
const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        // axios.get(`http://localhost:5000/api/search?q=${query}`);
        // const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
        // setFilteredProducts(res.data);
        const res = await axios.get(`http://localhost:5000/api/search?q=${query}`); // ✅ now works
        setFilteredProducts(res.data); 
      } catch (err) {
        console.error("Search error:", err);
      }
    };
    if (query) {
      fetchSearchResults();
    }
  }, [query]);
  return (
    <div className="search-results-container">
      <h4 className="mb-4 text-primary">Search Results for "{query}"</h4>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.brand}</p>
              <p>
                <span className="offer-price">{item.offer}</span>{" "}
                <span className="actual-price">{item.price}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;
