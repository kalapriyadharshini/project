
import productData from "../data/Productdata";
import FilteredProductDisplay from "../components/FilteredProductDisplay";

const MainDisplay = () => {
  const selectedCategory = "Aquarium Tanks";
  const products = productData[selectedCategory] || [];

  return (
    <div className="container mt-4">
      <FilteredProductDisplay
        categoryName={selectedCategory}
        products={products}
      />
    </div>
  );
};

export default MainDisplay;
