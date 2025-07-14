import React from 'react';
import { Card } from 'react-bootstrap';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <Card className="product-card text-center">
      <div className="product-img-container">
        {/* <Card.Img
          variant="top"
          src={product.img}
          alt={product.name}
          className="product-img"
        /> */}
       
  <img src={product.img} alt={product.name} className="product-img" />
  


        <div className="overlay-icons">
  <div className="icon-box">
    <i className="icon fas fa-heart"></i>
  </div>
  <div className="icon-box">
    <i className="icon fas fa-search"></i>
  </div>
  <div className="icon-box">
    <i className="icon fas fa-shopping-cart"></i>
  </div>
</div>

      </div>

      <Card.Body>
        <Card.Title className="product-title">{product.name}</Card.Title>
        <Card.Text>
          <span className="product-offer">{product.offer}</span>
          &nbsp;
          <span className="product-price">{product.price}</span>
        </Card.Text>
       

      </Card.Body>
    </Card>
  );
}

export default ProductCard;
