// import "./SidebarMenu.css"; 
// const categories = [
//   "Aquarium Tanks",
//   "Aqua Plants",
//   "Planted Aquarium Kits",
//   "Aquarium Lighting",
//   "Aquarium Decor",
//   "Live Fish",
//   "Fish Foods",
//   "Water Conditioners & Supplements",
//   "Aquarium Filters",
//   "Breeding Accessories",
// ];
// const SidebarMenu = ({ onClose }) => {
//   return (
//     <div className="sidebar-menu ps-3">
//       <div className="fw-bold text-primary mb-4" onClick={onClose} style={{ cursor: "pointer" }}> ← BACK</div>
//       <div className="d-flex flex-column gap-3">
//         {categories.map((category, index) => (
//           <div key={index} className="fw-semibold text-primary sidebar-item">
//             {category}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default SidebarMenu;

// SidebarMenu.jsx
// import {
//   FaFish,
//   FaLeaf,
//   FaCubes,
//   FaLightbulb,
//   FaHome,
//   FaTrophy,
//   FaUtensils,
//   FaTint,
//   FaFilter,
//   FaEgg
// } from "react-icons/fa";
// import "./SidebarMenu.css";

// const categories = [
//   { name: "Aquarium Tanks", icon: <FaHome /> },
//   { name: "Aqua Plants", icon: <FaLeaf /> },
//   { name: "Planted Aquarium Kits", icon: <FaCubes /> },
//   { name: "Aquarium Lighting", icon: <FaLightbulb /> },
//   { name: "Aquarium Decor", icon: <FaTrophy /> },
//   { name: "Live Fish", icon: <FaFish /> },
//   { name: "Fish Foods", icon: <FaUtensils /> },
//   { name: "Water Conditioners & Supplements", icon: <FaTint /> },
//   { name: "Aquarium Filters", icon: <FaFilter /> },
//   { name: "Breeding Accessories", icon: <FaEgg /> }
// ];

// const SidebarMenu = ({ onClose }) => {
//   return (
//     <div className="sidebar-menu">
//       <div className="sidebar-header" onClick={onClose}>
//         ← BACK
//       </div>
//       <div className="category-list">
//         {categories.map((cat, index) => (
//           <div key={index} className="category-item">
//             <span className="me-2 icon">{cat.icon}</span> {cat.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SidebarMenu;


// impo-2
import { FaFish, FaLeaf, FaCubes, FaLightbulb, FaHome,FaTrophy, FaUtensils, FaTint, FaFilter, FaEgg, FaArrowLeft, } from "react-icons/fa";
import "./SidebarMenu.css";
const categories = [
  { name: "Aquarium Tanks", icon: <FaHome /> },
  { name: "Aqua Plants", icon: <FaLeaf /> },
  { name: "Planted Aquarium kits", icon: <FaCubes /> },
  { name: "Aquarium Lighting", icon: <FaLightbulb /> },
  { name: "Aquarium Decor", icon: <FaTrophy /> },
  { name: "Live Fish", icon: <FaFish /> },
  { name: "Fish Foods", icon: <FaUtensils /> },
  { name: "Water Conditioners & Supplements", icon: <FaTint /> },
  { name: "Aquarium Filters", icon: <FaFilter /> },
  { name: "Breeding Accessories", icon: <FaEgg /> },
];
// const SidebarMenu = ({ onClose }) => {
//   return (
//     <div className="sidebar-menu">
//       <div className="back-button" onClick={onClose}>
//         <FaArrowLeft className="me-2" /> BACK
//       </div>

//       <div className="category-list">
//         {categories.map((cat, index) => (
//           <div key={index} className="sidebar-link">
//             {cat.icon}
//             <span className="ms-2">{cat.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const SidebarMenu = ({ onClose, onSelectCategory }) => {
//   return (
//     <div className="sidebar-menu">
//       <div className="back-button" onClick={onClose}>
//         <FaArrowLeft className="me-2" /> BACK
//       </div>

//       <div className="category-list">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className="sidebar-link"
//             onClick={() => {
//               onSelectCategory(cat.name);
//               onClose(); 
//             }}
//           >
//             {cat.icon}
//             <span className="ms-2">{cat.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const SidebarMenu = ({ onClose, onSelectCategory }) => {
//   return (
//     <div className="sidebar-menu">
//       <div className="back-button" onClick={onClose}>
//         <FaArrowLeft className="me-2" /> BACK
//       </div>

// <SidebarMenu
//   onClose={() => setShowSidebar(false)}
//   onSelectCategory={handleCategorySelect}
// />

//       <div className="category-list">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className="sidebar-link"
//             onClick={() => {
//               onSelectCategory(cat.name);  //  Navigates to category
//               onClose();                   //  Closes sidebar
//             }}
//           >
//             {cat.icon}
//             <span className="ms-2">{cat.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SidebarMenu;



const SidebarMenu = ({ onClose, onSelectCategory }) => {
  return (
    <div className="sidebar-menu">
      <div className="back-button" onClick={onClose}>
        <FaArrowLeft className="me-2" /> BACK
      </div>

      <div className="category-list">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="sidebar-link"
            onClick={() => {
              onSelectCategory(cat.name);  
              onClose();                   
            }}
          >
            {cat.icon}
            <span className="ms-2">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;