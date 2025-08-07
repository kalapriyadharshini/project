import productData from "../data/Productdata";
import FilteredProductDisplay from "../components/FilteredProductDisplay";
const MainDisplay = () => {
  // const selectedCategory = "Aquarium Tanks";
  // const products = productData[selectedCategory] || [];
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products?category=Aquarium Tanks`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
}, []);

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
