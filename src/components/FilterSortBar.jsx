
// import React from "react";

// const FilterSortBar = ({ sortType, setSortType, priceRange, setPriceRange }) => {
//   return (
//     <div className="d-flex justify-content-between align-items-center my-3 px-2 flex-wrap">

//       <select
//         value={sortType}
//         onChange={(e) => setSortType(e.target.value)}
//         className="form-select w-auto"
//       >
//         <option value="">Sort By</option>
//         <option value="name">Name (A-Z)</option>
//         <option value="price">Price (Low to High)</option>
//         <option value="price">Price (High to Low)</option>
//       </select>
//       <div className="d-flex align-items-center gap-2">
//         <label className="fw-bold">Price: 0 - ₹{priceRange[1]}</label>
//         <input
//           type="range"
//           min={0}
//           max={10000}
//           value={priceRange[1]}
//           onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
//           className="form-range"
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterSortBar;






// components/FilterSortBar.jsx
import React from "react";

const FilterSortBar = ({ sortType, setSortType, priceRange, setPriceRange }) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 px-2 flex-wrap">
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="form-select w-auto"
      >
        <option value="">Sort By</option>
        <option value="name">Name (A-Z)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
      </select>

      <div className="d-flex align-items-center gap-2">
        <label className="fw-bold">Price: 0 - ₹{priceRange[1]}</label>
        <input
          type="range"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="form-range"
        />
      </div>
    </div>
  );
};

export default FilterSortBar;

