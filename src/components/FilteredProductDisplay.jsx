// import React, { useState, useMemo } from "react";
// import ProductCard from "./ProductCard";
// import FilterSortBar from "./FilterSortBar";

// const FilteredProductDisplay = ({ categoryName, products }) => {
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [sortType, setSortType] = useState("");

//   const filteredProducts = useMemo(() => {
//     let result = products.map((p) => ({
//       ...p,
//       priceValue: parseInt(p.offer.replace(/[₹,]/g, ""))
//     }));

//     result = result.filter((p) => p.priceValue <= priceRange[1]);

//     if (sortType === "name") {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortType === "price") {
//       result.sort((a, b) => a.priceValue - b.priceValue);
//     }

//     return result;
//   }, [products, priceRange, sortType]);

//   return (
//     <>
//       <h4 className="mb-3">{categoryName}</h4>

//       <FilterSortBar
//         sortType={sortType}
//         setSortType={setSortType}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//       />

//       <div className="row">
//         {filteredProducts.map((product, index) => (
//           <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default FilteredProductDisplay;

// components/FilteredProductDisplay.jsx
import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import FilterSortBar from "./FilterSortBar";

const FilteredProductDisplay = ({ categoryName, products }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortType, setSortType] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.map((p) => ({
      ...p,
      priceValue: parseInt(p.offer.replace(/[\u20b9,]/g, "")),
    }));

    result = result.filter((p) => p.priceValue <= priceRange[1]);

    if (sortType === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    }

    return result;
  }, [products, priceRange, sortType]);

  return (
    <>
      <h4 className="mb-3">{categoryName}</h4>

      <FilterSortBar
        sortType={sortType}
        setSortType={setSortType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div className="row">
        {filteredProducts.map((product, index) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" key={index}>

            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilteredProductDisplay;
