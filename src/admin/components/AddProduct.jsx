import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import axios from "axios";
import "./AddProduct.css";
const AddProduct = ({ mode = "add", product = null, onClose, refreshList }) => {
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
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  // Prefill form for edit/view
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && product) {
      setFormData({
        category: product.category || "",
        subcategory: product.subcategory || "",
        name: product.name || "",
        description: product.description || "",
        size: product.size || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || null,
        status: product.status || "Available",
      });
      if (product.image) setPreviewImage(`http://localhost:5000/${product.image}`);
    }
  }, [mode, product]);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };
  fetchCategories();
}, []);
  const validateField = (name, value) => {
    let error = "";
    if (name === "category" && !value) error = "Category is required";
    if (name === "name" && (!value || !value.trim())) error = "Product name is required";
    if (name === "price" && (value === "" || value === null || Number(value) <= 0))
      error = "Valid price is required";
    if (name === "size" && (!value || !value.trim())) error = "Size is required";
    if (name === "description" && (!value || !value.trim())) error = "Description is required";
    if (name === "stock" && (value === "" || value === null)) error = "Stock is required";
    if (name === "image" && mode === "add" && !value) error = "Product image is required";
    return error;
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = files ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(files[0]);
    }
    // Live validation
    const error = validateField(name, updatedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "view") return;
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setValidated(true);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (mode === "add") {
        await axios.post("http://localhost:5000/api/adminproducts", data);
        alert("Product added successfully!");
      } else if (mode === "edit" && product?._id) {
        await axios.put(`http://localhost:5000/api/adminproducts/${product._id}`, data);
        alert("Product updated successfully!");
      }
      refreshList?.();
      onClose?.();
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Failed to submit product. Check console.");
    }
  };
  const isReadOnly = mode === "view";
  return (
    <div className="content-area p-4">
      <Card className="form-card shadow-sm">
        <Card.Body>
          <h4 className="form-title mb-3">
            {mode === "add" && "Add Product"}
            {mode === "edit" && "Edit Product"}
            {mode === "view" && "View Product"}
          </h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Type</Form.Label>
                  {/* <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                    isValid={validated && !errors.category && formData.category !== ""}
                    disabled={isReadOnly}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option value="Fish">Fish</option>
                    <option value="Plant">Plant</option>
                    <option value="Aquarium">Aquarium</option>
                    <option value="Food">Food</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Decoration">Decoration</option>
                  </Form.Select> */}
                  <Form.Select
  name="category"
  value={formData.category}
  onChange={handleChange}
  isInvalid={!!errors.category}
  isValid={validated && !errors.category && formData.category !== ""}
  disabled={isReadOnly}
  required
>
  <option value="">-- Select Category --</option>
  {categories
    .filter((cat) => cat.status === "Enable")
    .map((cat) => (
      <option key={cat._id} value={cat.name}>
        {cat.name}
      </option>
    ))}
</Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    isValid={validated && !errors.name && formData.name.trim() !== ""}
                    disabled={isReadOnly}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                    isValid={validated && !errors.price && Number(formData.price) > 0}
                    disabled={isReadOnly}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Small, Medium, Large, 50L Tank"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    isInvalid={validated && !!errors.size}
                    isValid={validated && !errors.size && formData.size.trim() !== ""}
                    disabled={isReadOnly}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Stock Quantity"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    isInvalid={!!errors.stock}
                    isValid={validated && !errors.stock && formData.stock !== ""}
                    disabled={isReadOnly}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isReadOnly}
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Product Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                isValid={validated && !errors.description && formData.description.trim() !== ""}
                disabled={isReadOnly}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  {/* {previewImage && <Image src={previewImage} thumbnail width={150} className="mb-2" />} */}
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    isInvalid={!!errors.image}
                    isValid={validated && !!formData.image && !errors.image}
                    disabled={isReadOnly}
                    required={mode === "add"}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {!isReadOnly && (
              <div className="text-center">
                <Button type="submit" className="submit-btn">
                  {mode === "add" ? "Add Product" : "Update Product"}
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default AddProduct;
