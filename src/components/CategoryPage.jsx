import React from "react";
import { useParams } from "react-router-dom";
import productData from "../data/Productdata";
import FilteredProductDisplay from "../components/FilteredProductDisplay";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  // const products = productData[decodedCategory] || [];
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products?category=${decodedCategory}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
}, [decodedCategory]);


  return (
    <div className="container mt-4 text-center">
      <FilteredProductDisplay
        categoryName={decodedCategory}
        products={products}
      />
    </div>
  );
};

export default CategoryPage;

