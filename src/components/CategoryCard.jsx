// src/components/CategoryCard.jsx
import React from 'react';
import './Category.css';
const CategoryCard = ({ image, title, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={image} alt={title} className="category-image" />
      <div className="category-title">{title}</div>
    </div>
  );
};
export default CategoryCard;
