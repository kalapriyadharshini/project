// src/admin/pages/AddProduct.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./AddProduct.css"; // custom styling

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    name: "",
    description: "",
    size: "",
    price: "",
    stock: "",
    image: null,
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    // TODO: connect with backend API
  };

  return (
    <div className="content-area p-4">
      {/* Page Header */}
      {/* <div className="page-header mb-4">
        <h5 className="module-title">Product Module . Add Product</h5>
      </div> */}

      {/* Form Card */}
      <Card className="form-card shadow-sm">
        <Card.Body>
          <h4 className="form-title mb-3">Add Product</h4>
          <p className="form-subtitle">Use the below form to add new product details</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Category */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Type</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    <option value="Fish">Fish</option>
                    <option value="Plant">Plant</option>
                    <option value="Aquarium">Aquarium</option>
                    <option value="Food">Food</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Decoration">Decoration</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Subcategory */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subcategory (e.g., Goldfish, Betta)"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Product Name */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Price */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Size */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Size / Volume</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Small, Medium, Large, 50L Tank"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Stock */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Stock Quantity"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Product Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              {/* Status */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Image */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit */}
            <div className="text-end">
              <Button type="submit" className="submit-btn">
                Submit Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProduct;
