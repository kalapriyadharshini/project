// import React, { useRef, useState, useEffect } from 'react';
// import './Category.css';
// import aquariumtanks from '../assets/aquariumtank.jpg';
// import Aquaticplants from '../assets/Aquaticplants.jpg';
// import Plantedaquariumkits from '../assets/Plantedaquariumkits.jpg';
// import Aquariumlighting from '../assets/Aquariumlighting.jpg';
// import Aquariumdecor from '../assets/Aquariumdecor.jpg';
// import Livefishes from '../assets/Livefishes.jpg';
// import Fishfoods from '../assets/Fishfood.jpg';
// import aquariumconditioners from '../assets/aquariumconditioners.jpg';
// import aquariumfilters from '../assets/aquariumfilters.jpg';
// import aquariumbreeding from '../assets/aquariumbreeding.jpg';
// import { useNavigate } from 'react-router-dom'; 
// const categoriesList = [
//   { name: 'AQUARIUM TANKs', img: aquariumtanks },
//   { name: 'AQUA PLANTS', img: Aquaticplants },
//   { name: 'PLANTED AQUARIUM KITS', img: Plantedaquariumkits },
//   { name: 'AQUARIUM LIGHTING', img: Aquariumlighting },
//   { name: 'AQUARIUM DECOR', img: Aquariumdecor },
//   { name: 'LIVE FISHES', img: Livefishes },
//   { name: 'FISH FOODS', img: Fishfoods },
//   { name: 'WATER CONDITIONERS & SUPPLEMENTS', img: aquariumconditioners },
//   { name: 'AQUARIUM FILTERS', img: aquariumfilters },
//   { name: 'BREEDING ACCESSORIES', img: aquariumbreeding },
// ];
// const Categories = () => {
//   const navigate = useNavigate();
//   const scrollRef = useRef();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slidesToShow = 4;
//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const width = container.clientWidth;
//     if (direction === 'left') {
//       container.scrollBy({ left: -width, behavior: 'smooth' });
//       setCurrentSlide((prev) => Math.max(prev - 1, 0));
//     } else {
//       container.scrollBy({ left: width, behavior: 'smooth' });
//       setCurrentSlide((prev) => Math.min(prev + 1, Math.ceil(categoriesList.length / slidesToShow) - 1));
//     }
//   };
//     useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("/api/categories");  
//         const enabledCategories = res.data.filter(c => c.status === "Enable");
//         setCategories(enabledCategories);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCategories();
//   }, []);
//   return (
//    <div className="category-container">
//   <h2 className="category text-primary my-5 fw-bold">CATEGORIES</h2>
//   <div className="category-inner-container">
//     <div className="carousel-wrapper">
//       <span className="arrow left" onClick={() => scroll('left')}>&#10094;</span>
//       <div className="category-scroll no-scrollbar" ref={scrollRef}>
//         {categoriesList.map(({ img, name }, index) => (
//           <div
//   className="category-card animated-border"
//   key={index}
//  onClick={() => navigate(`/subcategory/${name.toLowerCase()}`)}
// >
//             <img src={img} alt={name} className="category-image" />
//             <h5 className="category-name">{name}</h5>
//           </div>
//         ))}
//       </div>
//       <span className="arrow right" onClick={() => scroll('right')}>&#10095;</span>
//     </div>
//     <div className="dots">
//       {Array.from({ length: Math.ceil(categoriesList.length / slidesToShow) }).map((_, index) => (
//         <span
//           key={index}
//           className={`dot ${index === currentSlide ? 'active' : ''}`}
//         ></span>
//       ))}
//     </div>
//   </div>
// </div>
//   );
// }
// export default Categories;








import React, { useRef, useState, useEffect } from 'react';
import './Category.css';
import aquariumtanks from '../assets/aquariumtank.jpg';
import Aquaticplants from '../assets/Aquaticplants.jpg';
import Plantedaquariumkits from '../assets/Plantedaquariumkits.jpg';
import Aquariumlighting from '../assets/Aquariumlighting.jpg';
import Aquariumdecor from '../assets/Aquariumdecor.jpg';
import Livefishes from '../assets/Livefishes.jpg';
import Fishfoods from '../assets/Fishfood.jpg';
import aquariumconditioners from '../assets/aquariumconditioners.jpg';
import aquariumfilters from '../assets/aquariumfilters.jpg';
import aquariumbreeding from '../assets/aquariumbreeding.jpg';
import { useNavigate } from 'react-router-dom'; 
 const categoriesList = [
  { name: 'AQUARIUM TANK', img: aquariumtanks },
  { name: 'AQUA PLANTS', img: Aquaticplants },
  { name: 'PLANTED AQUARIUM KITS', img: Plantedaquariumkits },
  { name: 'AQUARIUM LIGHTING', img: Aquariumlighting },
  { name: 'AQUARIUM DECOR', img: Aquariumdecor },
  { name: 'LIVE FISHES', img: Livefishes },
  { name: 'FISH FOODS', img: Fishfoods },
  { name: 'WATER CONDITIONERS & SUPPLEMENTS', img: aquariumconditioners },
  { name: 'AQUARIUM FILTERS', img: aquariumfilters },
  { name: 'BREEDING ACCESSORIES', img: aquariumbreeding },
];
const Categories = () => {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 4;
  const scroll = (direction) => {
    const container = scrollRef.current;
    const width = container.clientWidth;
    if (direction === 'left') {
      container.scrollBy({ left: -width, behavior: 'smooth' });
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    } else {
      container.scrollBy({ left: width, behavior: 'smooth' });
      setCurrentSlide((prev) => Math.min(prev + 1, Math.ceil(categoriesList.length / slidesToShow) - 1));
    }
  };
  return (
   <div className="category-container">
  <h2 className="category text-primary my-5 fw-bold">CATEGORIES</h2>
  <div className="category-inner-container">
    <div className="carousel-wrapper">
      <span className="arrow left" onClick={() => scroll('left')}>&#10094;</span>
      <div className="category-scroll no-scrollbar" ref={scrollRef}>
        {categoriesList.map(({ img, name }, index) => (
          // <div className="category-card animated-border" key={index}>
          <div
  className="category-card animated-border"
  key={index}
//  onClick={() => navigate(`/subcategory/${name.toLowerCase()}`)}
// onClick={() => navigate(`/subcategory/${name}`)}
// onClick={() => navigate(`/subcategory/${encodeURIComponent(name)}`)}
// onClick={() => navigate(`/subcategory/${encodeURIComponent(name)}`)}
onClick={() => navigate(`/subcategory/${encodeURIComponent(name)}`)}


>
            <img src={img} alt={name} className="category-image" />
            <h5 className="category-name">{name}</h5>
          </div>
        ))}
      </div>
      <span className="arrow right" onClick={() => scroll('right')}>&#10095;</span>
    </div>
    <div className="dots">
      {Array.from({ length: Math.ceil(categoriesList.length / slidesToShow) }).map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentSlide ? 'active' : ''}`}
        ></span>
      ))}
    </div>
  </div>
</div>
  );
}
export default Categories;