import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const Adduser = ({ editData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
    status: "Active",
    permissions: [],
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  // Pre-fill form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        _id: editData._id, // include _id for editing
        name: editData.name,
        email: editData.email,
        role: editData.role,
        password: "", // leave blank, user can set new password if needed
        confirmPassword: "",
        status: editData.status,
        permissions: editData.permissions || [],
      });
    }
  }, [editData]);
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Full name is required";
      else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name must contain only letters";
    }
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
    }
    if (!editData || (editData && value)) {
      if (name === "password") {
        if (!value && !editData) error = "Password is required";
        else if (
          value &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be 8+ chars, include uppercase, lowercase, number, special char";
        }
      }
      if (name === "confirmPassword") {
        if (!value && formData.password) error = "Confirm password is required";
        else if (value !== formData.password) error = "Passwords do not match";
      }
    }
    if (name === "permissions") {
      if (!value || value.length === 0) error = "Select at least one permission";
    }
    return error;
  };
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = { ...formData };
    if (type === "checkbox") {
      let updatedPermissions = [...formData.permissions];
      if (checked) updatedPermissions.push(value);
      else updatedPermissions = updatedPermissions.filter((p) => p !== value);
      updatedFormData.permissions = updatedPermissions;
    } else {
      updatedFormData[name] = value;
    }
    setFormData(updatedFormData);
    // validate on change
    const error = validateField(name, updatedFormData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
    // email duplicate check only when adding
    if (!editData && name === "email" && value) {
      try {
        const res = await axios.get("http://localhost:5000/api/admins");
        const exists = res.data.some((u) => u.email === value);
        if (exists) setErrors((prev) => ({ ...prev, email: "Email already exists" }));
      } catch (err) {
        console.error("Error checking email", err);
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setValidated(true);
  //   const newErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     const error = validateField(key, formData[key]);
  //     if (error) newErrors[key] = error;
  //   });
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }
  //   try {
  //     await axios.post("http://localhost:5000/api/admins/save", formData);
  //     alert(editData ? "User updated successfully!" : "User added successfully!");
  //     setFormData({
  //       name: "",
  //       email: "",
  //       role: "Admin",
  //       password: "",
  //       confirmPassword: "",
  //       status: "Active",
  //       permissions: [],
  //     });
  //     setErrors({});
  //     setValidated(false);

  //     if (onSuccess) onSuccess();
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Error submitting user");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setValidated(true);
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) newErrors[key] = error;
  });
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  try {
    // Only send password if it is filled
    const submitData = { ...formData };
    if (!submitData.password) delete submitData.password;
    const res = await axios.post(
      "http://localhost:5000/api/admins/save",
      submitData
    );
    alert(editData ? "User updated successfully!" : "User added successfully!");
    // reset form
    setFormData({
      name: "",
      email: "",
      role: "Admin",
      password: "",
      confirmPassword: "",
      status: "Active",
      permissions: [],
    });
    setErrors({});
    setValidated(false);
    // Pass updated user to parent
    if (onSuccess) onSuccess(res.data);

  } catch (error) {
    alert(error.response?.data?.message || "Error submitting user");
  }
};
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder={editData ? "Enter new password (optional)" : "Enter password"}
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required={!editData}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder={editData ? "Confirm new password" : "Confirm password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              required={!editData && !!formData.password}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
              <option>Admin</option>
              <option>Manager</option>
              <option>Inventory</option>
              <option>Support</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Role is required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} required>
              <option>Active</option>
              <option>Disabled</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Status is required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Permissions</Form.Label>
        <div>
          {["Dashboard","User","Categories", "Products", "Customers", "Orders", "Inventory","Reports","Settings"].map((perm) => (
            <Form.Check
              key={perm}
              inline
              type="checkbox"
              label={perm}
              value={perm}
              checked={formData.permissions.includes(perm)}
              onChange={handleChange}
            />
          ))}
        </div>
        {errors.permissions && <div className="text-danger">{errors.permissions}</div>}
      </Form.Group>
      <div className="d-flex justify-content-center gap-2">
        <Button variant="secondary" type="reset" onClick={() => editData && onSuccess?.()}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {editData ? "Update User" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};
export default Adduser;
