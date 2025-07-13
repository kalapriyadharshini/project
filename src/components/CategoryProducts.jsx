import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import productData from '../data/Productdata';

import './CategoryProducts.css';

function CategoryProducts() {
  return (
    <>
      {Object.entries(productData).map(([category, products]) => (
        <div className="section-container my-4" key={category}>
          <h2 className="text-primary text-center mb-4">{category.toUpperCase()}</h2>
          <Row xs={12} sm={6} md={4} lg={5} className="gx-0 gy-0 product-row">
            {products.map((product, index) => (
              <Col key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          
        </div>
      ))}
    </>
  );
}

export default CategoryProducts;
