import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const AddCategoryForm = ({ category, onClose, onCategoryAdded }) => {
  const [formData, setFormData] = useState({ categoryName: "", status: "Enable" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // prefill when editing
  useEffect(() => {
    if (category) {
      setFormData({
        _id: category._id,
        categoryName: category.name || category.categoryName,
        status: category.status,
      });
    }
  }, [category]);
  // validation
  const validateField = (name, value) => {
    if (!value || !value.trim()) return "This field is required";
    return "";
  };
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({ categoryName: true, status: true });
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };
  const getValidationClass = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "is-invalid" : "is-valid";
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   try {
  //     if (category) {
  //       await axios.put(`http://localhost:5000/api/categories/${category._id}`, {
  //         name: formData.categoryName,
  //         status: formData.status,
  //       });
  //       alert("Category updated successfully!");
  //     } else {
  //       await axios.post("http://localhost:5000/api/categories/save", {
  //         name: formData.categoryName,
  //         status: formData.status,
  //       });
  //       alert("Category added successfully!");
  //     }
  //     setFormData({ categoryName: "", status: "Enable" });
  //     setErrors({});
  //     setTouched({});
  //     if (onCategoryAdded) onCategoryAdded(); 
  //     if (onClose) onClose(); 
  //   } catch (error) {
  //     console.error("Error saving category:", error);
  //     alert("Failed to save category.");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    await axios.post("http://localhost:5000/api/categories/save", {
      _id: category?._id,   // include _id if editing
      name: formData.categoryName,
      status: formData.status,
    });

    alert(category ? "Category updated successfully!" : "Category added successfully!");

    setFormData({ categoryName: "", status: "Enable" });
    setErrors({});
    setTouched({});
    if (onCategoryAdded) onCategoryAdded();
    if (onClose) onClose();
  } catch (error) {
    console.error("Error saving category:", error);
    alert("Failed to save category.");
  }
};

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              placeholder="Enter category name"
              value={formData.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getValidationClass("categoryName")}
            />
            {errors.categoryName && (
              <Form.Control.Feedback type="invalid">{errors.categoryName}</Form.Control.Feedback>
            )}
            {!errors.categoryName && touched.categoryName && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getValidationClass("status")}
            >
              <option>Enable</option>
              <option>Disable</option>
            </Form.Select>
            {errors.status && (
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            )}
            {!errors.status && touched.status && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-3">
        <Button type="submit" variant="primary">
          {category ? "Update Category" : "Add Category"}
        </Button>
        {onClose && (
          <Button variant="secondary" onClick={onClose} className="ms-2">
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default AddCategoryForm;
