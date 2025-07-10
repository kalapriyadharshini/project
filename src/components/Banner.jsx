import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ExampleCarouselImage from './ExampleCarouselImage';
import family from "../assets/family.jpg";
import aquariumtank from "../assets/aquariumtank.jpg";
import TropicalFish from "../assets/TropicalFish.jpg";
import './Banner.css';

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="banner-carousel-wrapper">
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {/* Slide 1 */}
        <Carousel.Item>
          <ExampleCarouselImage src={TropicalFish} alt="Aquarium setup" />
          <div className="caption-wrapper">
            <h1 className='my-5'>Welcome to AquaWorld!!!</h1>
            <p>
               Your destination for vibrant fish, custom tanks, expert care, lighting, live plants & more.
    Dive into a world of underwater beauty with our wide range of exotic species, stylish aquarium setups,
    and personalized customer support. Whether you're a beginner or a seasoned aquarist, AquaWorld offers
    everything you need to build and maintain a thriving aquatic ecosystem at home. Discover the joy of
    aquatic life — one bubble at a time!
            </p>
            <Button variant="primary" size="lg" className='my-5'>Shop Now</Button>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <ExampleCarouselImage src={aquariumtank} alt="Stylish Aquarium Tanks" />
          <div className="caption-wrapper">
            <h3>Stylish Aquarium Tanks</h3>
            <p>Durable, elegant designs to elevate your home decor and aquatic life.Our premium aquarium tanks are built with high-quality materials that ensure long-lasting performancewhile seamlessly blending into your interior style. Whether you prefer minimalist modern setups orclassic aquatic displays, our tanks provide the perfect balance of function and beauty. Create a stunning focal point in any room and offer your fish a safe, spacious, and stylish environment they’ll thrive in.</p>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <ExampleCarouselImage src={family} alt="Happy Aquarium Families" />
          <div className="caption-wrapper">
            <h3>Bring Home Joy</h3>
            <p> Join countless happy families who cherish the joy of bringing vibrant underwater beauty into their homes. Experience the calming, mesmerizing world of aquatic life and create a peaceful, natural oasis that everyone will admire and enjoy. Discover the perfect blend of elegance and tranquility with our carefully curated aquatic designs. Let your home come alive with colors and movement that inspire happiness every day. </p>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  
  );
}

export default Banner;
