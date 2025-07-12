// import React, { useRef, useState, useEffect } from 'react';
// import './Category.css';
// import aquariumtank from '../assets/aquariumtank.jpg';
// import Aquariumessentials from '../assets/Aquariumessentials.jpg';
// import Aquaticplants from '../assets/Aquaticplants.jpg';
// import Plantedaquariumkits from '../assets/Plantedaquariumkits.jpg';
// import Aquariumlighting from '../assets/Aquariumlighting.jpg';
// import Aquariumdecor from '../assets/Aquariumdecor.jpg';
// import livefishes from '../assets/livefishes.jpg';
// import fishfoods from '../assets/fishfood.jpg';
// import aquariumconditioners from '../assets/aquariumconditioners.jpg';
// import aquariumfilters from '../assets/aquariumfilters.jpg';
// import aquariumbreeding from '../assets/aquariumbreeding.jpg';

// const categoriesList = [
//   { name: 'AQUARIUM TANK', img: aquariumtank },
//   { name: 'AQUARIUM ESSENTIALS', img: Aquariumessentials },
//   { name: 'AQUA PLANTS', img: Aquaticplants },
//   { name: 'PLANTED AQUARIUM KITS', img: Plantedaquariumkits },
//   { name: 'AQUARIUM LIGHTING', img: Aquariumlighting },
//   { name: 'AQUARIUM DECOR', img: Aquariumdecor },
//   { name: 'LIVE FISHES', img: livefishes },
//   { name: 'FISH FOODS', img: fishfoods },
//   { name: 'WATER CONDITIONERS & SUPPLEMENTS', img: aquariumconditioners },
//   { name: 'AQUARIUM FILTERS', img: aquariumfilters },
//   { name: 'BREEDING ACCESSORIES', img: aquariumbreeding },
// ];

// export default function Categories() {
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

//   return (
    
//    <div className="category-container">
//   <h2 className="category text-primary my-5 fw-bold">CATEGORIES</h2>
//   <div className="category-inner-container">
//     <div className="carousel-wrapper">
//       <span className="arrow left" onClick={() => scroll('left')}>&#10094;</span>

//       <div className="category-scroll no-scrollbar" ref={scrollRef}>
//         {categoriesList.map(({ img, name }, index) => (
//           <div className="category-card animated-border" key={index}>
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


import React, { useRef, useState } from 'react';
import './Category.css';
import aquariumtank from '../assets/aquariumtank.jpg';
import Aquariumessentials from '../assets/Aquariumessentials.jpg';
import Aquaticplants from '../assets/Aquaticplants.jpg';
import Plantedaquariumkits from '../assets/Plantedaquariumkits.jpg';
import Aquariumlighting from '../assets/Aquariumlighting.jpg';
import Aquariumdecor from '../assets/Aquariumdecor.jpg';
import Livefishes from '../assets/Livefishes.jpg';
import Fishfoods from '../assets/Fishfood.jpg';
import aquariumconditioners from '../assets/aquariumconditioners.jpg';
import aquariumfilters from '../assets/aquariumfilters.jpg';
import aquariumbreeding from '../assets/aquariumbreeding.jpg';

const categoriesList = [
  { name: 'AQUARIUM TANK', img: aquariumtank },
  { name: 'AQUARIUM ESSENTIALS', img: Aquariumessentials },
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

export default function Categories() {
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
      setCurrentSlide((prev) =>
        Math.min(prev + 1, Math.ceil(categoriesList.length / slidesToShow) - 1)
      );
    }
  };

  return (
    <div className="category-container">
      <h2 className="category text-primary my-5 fw-bold">CATEGORIES</h2>
      <div className="category-inner-container">
        <div className="carousel-wrapper">
          <span className="arrow left" onClick={() => scroll('left')}>
            &#10094;
          </span>

          <div className="category-scroll no-scrollbar" ref={scrollRef}>
            {categoriesList.map(({ img, name }, index) => (
              <div className="category-card" key={index}>
                <div className="border-left"></div>
                <div className="border-right"></div>
                <img src={img} alt={name} className="category-image" />
                <h5 className="category-name">{name}</h5>
              </div>
            ))}
          </div>

          <span className="arrow right" onClick={() => scroll('right')}>
            &#10095;
          </span>
        </div>

        <div className="dots">
          {Array.from({
            length: Math.ceil(categoriesList.length / slidesToShow),
          }).map((_, index) => (
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
