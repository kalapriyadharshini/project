
import crystaltank from '../assets/crystaltank.jpg';
import nanotank from '../assets/nanotank.jpg';
import tank3 from '../assets/tank3.jpg';
import tank4 from '../assets/tank4.jpg';
import plant1 from '../assets/plant1.jpg';
import plant2 from '../assets/plant2.jpg';
import plant3 from '../assets/plant3.jpg';
import plant4 from '../assets/plant4.jpeg';
import kit1 from '../assets/kit1.jpg';
import kit2 from '../assets/kit2.jpg';
import kit3 from '../assets/kit3.jpg';
import kit4 from '../assets/kit4.jpg';
import light1 from '../assets/light1.jpg';
import light2 from '../assets/light2.jpg';
import light3 from '../assets/light3.jpg';
import light4 from '../assets/light4.jpg';
import decor1 from '../assets/decor1.jpg';
import decor2 from '../assets/decor2.jpg';
import decor3 from '../assets/decor3.jpg';
import decor4 from '../assets/decor4.jpg';
import fish1  from '../assets/fish1.jpg';
import fish2 from '../assets/fish2.jpg';
import fish3 from '../assets/fish3.jpg';
import fish4 from '../assets/fish4.jpg';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import food4 from '../assets/food4.jpg';
import conditioner1 from '../assets/conditioner1.jpg';
import conditioner2 from '../assets/conditioner2.jpg';
import conditioner3 from '../assets/conditioner3.jpg';
import conditioner4 from '../assets/conditioner4.jpg';
import filter1 from '../assets/filter1.jpg';
import filter2 from '../assets/filter2.jpg';
import filter3 from '../assets/filter3.jpg';
import filter4 from '../assets/filter4.jpg';
import accessories1 from '../assets/accessories1.jpg';
import accessories2 from '../assets/accessories2.jpg';
import accessories3 from '../assets/accessories3.jpg';
import accessories4 from '../assets/accessories4.jpg';
const productData = {
  "Aquarium Tanks": [
    { name: "3ft Bluevin Tank", price: "₹5800", offer: "₹4999", img: crystaltank },
    { name: "Nano Acrylic Tank 10L", price: "₹3500", offer: "₹2999", img: nanotank },
    { name: "Rimless Cube 18\"", price: "₹4200", offer: "₹3799", img: tank3 },
    { name: "Premium Tank 3ft", price: "₹5800", offer: "₹4999", img: tank4 },
  ],
  "Aqua Plants": [
    { name: "Amazon Sword", price: "₹250", offer: "₹199", img: plant1 },
    { name: "Java Moss", price: "₹350", offer: "₹299", img: plant2 },
    { name: "Anubias Nana", price: "₹450", offer: "₹399", img: plant3 },
    { name: "Dwarf Hairgrass", price: "₹220", offer: "₹179", img: plant4 },
  ],
  "Planted Aquarium kits": [
     { name: "Nano Planted Aquarium Kit - 5L", price: "₹2800", offer: "₹2399",img: kit1 },
    {
      name: "Premium Planted Setup kit- 10L",
      price: "₹4200",
      offer: "₹3799",
      img: kit2,
      
    },
    {
      name: "Bluevin Complete Planted Kit - 15L",
      price: "₹5600",
      offer: "₹4999",
      img: kit3,
     
    },
    {
      name: "Starter Planted Kit with Soil - 12L",
      price: "₹3800",
      offer: "₹3399",
      img: kit4,
     
    },
  ],
  "Aquarium Lighting": [
   
  {
    name: "LED plant  Nano Light - 10W",
    price: "₹1200",
    offer: "₹999",
    img: light1, 
  },
  {
    name: "RGB Plant Grow Light - 18W",
    price: "₹2300",
    offer: "₹1999",
    img: light2,
  },
  {
    name: "Full Spectrum ClipLight - 15W",
    price: "₹1700",
    offer: "₹1499",
    img: light3, 
  },
  {
    name: "Bluevin Slim LED Light - 24W",
    price: "₹2900",
    offer: "₹2599",
    img: light4,
  },
],
"Aquarium Decor": [
  {
    name: "Natural Driftwood (Medium)",
    price: "₹450",
    offer: "₹399",
    img: decor1,
  },
  {
    name: "Ceramic Cave Tunnel (Small)",
    price: "₹300",
    offer: "₹249",
    img: decor2,
  },
  {
    name: "Decorative Pebble Pack (2kg)",
    price: "₹600",
    offer: "₹499",
    img: decor3,
  },
  {
    name: "Resin Castle Decor (large)",
    price: "₹900",
    offer: "₹799",
    img: decor4,
  },
],
"Live Fish": [
   {
    name: "Neon Tetra (Pack of 6)",
    price: "₹350",
    offer: "₹299",
    img: fish1,
  },
   {
    name: "Guppy Fish (Pack of 4)",
    price: "₹280",
    offer: "₹240",
    img: fish2,
  },
   {
    name: "Resin Castle Decor",
    price: "₹250",
    offer: "₹220",
    img: fish3,
  },
   {
    name: "Resin Castle Decor",
    price: "₹400",
    offer: "₹349",
    img: fish4,
  },
],
"Fish Foods": [
   {
    name: "TetraBits Complete (100g)",
    price: "₹220",
    offer: "₹199",
    img: food1,
  },
   {
    name: "Hikari Goldfish Food (250g)",
    price: "₹350",
    offer: "₹299",
    img: food2,
  },
   {
    name: "Optimum Betta Food (30g)",
    price: "₹150",
    offer: "₹129",
    img: food3,
  },
   {
    name: "Taiyo Guppy Mini Bits (100g)",
    price: "₹200",
    offer: "₹175",
    img: food4,
  },
],
"Water Conditioners & Supplements" : [
  {
    name: "Seachem Prime Conditioner (100ml)",
    price: "₹750",
    offer: "₹699",
    img: conditioner1,
  },
  {
    name: "API Stress Coat Water Conditioner - 118ml",
    price: "₹680",
    offer: "₹599",
    img: conditioner2,
  },
  {
    name: "Aquatic Remedies Bio-Bact (50ml)",
    price: "₹450",
    offer: "₹399",
    img: conditioner3,
  },
  {
    name: "Aquatic Remedies Plant Health (100ml)",
    price: "₹350",
    offer: "₹299",
    img: conditioner4,
  },
],
"Aquarium Filters" : [
  {
    name: "Hang-On Filter - 300L/H",
    price: "₹1200",
    offer: "₹999",
    img: filter1,
  },
  {
    name: "InternalFilter - 600L/H",
    price: "₹1500",
    offer: "₹1299",
    img: filter2,
  },
  {
    name: "Sponge Filter Betta Tanks",
    price: "₹450",
    offer: "₹399",
    img: filter3,
  },
  {
    name: "Canister Filter - 1000L/H",
    price: "₹5500",
    offer: "₹4999",
    img: filter4,
  },
],
"Breeding Accessories" : [
   {
    name: "Suction Breeding Box",
    price: "₹500",
    offer: "₹499",
    img: accessories1,
  },
   {
    name: "Shrimp Breeding Net Trap",
    price: "₹300",
    offer: "₹249",
    img: accessories2,
  },
   {
    name: "Egg Incubator Mesh Tray",
    price: "₹450",
    offer: "₹399",
    img: accessories3,
  },
   {
    name: "Guppy Breeding Trap",
    price: "₹350",
    offer: "₹299",
    img: accessories4,
  },
]
  
};

export default productData;
