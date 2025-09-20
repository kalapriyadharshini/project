import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const Adduser = () => {
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
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Full name is required";
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Name must contain only letters";
    }
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }
    if (name === "password") {
      if (!value) error = "Password is required";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      ) {
        error =
          "Password must be 8+ chars, include uppercase, lowercase, number, special char";
      }
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm password is required";
      else if (value !== formData.password) error = "Passwords do not match";
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
      if (checked) {
        updatedPermissions.push(value);
      } else {
        updatedPermissions = updatedPermissions.filter((p) => p !== value);
      }
      updatedFormData.permissions = updatedPermissions;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);

    // validate on change
    const error = validateField(name, updatedFormData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));

    // email duplicate check
    if (name === "email" && value) {
      try {
        const res = await axios.get("http://localhost:5000/api/admins");
        const exists = res.data.some((u) => u.email === value);
        if (exists) {
          setErrors((prev) => ({ ...prev, email: "Email already exists" }));
        }
      } catch (err) {
        console.error("Error checking email", err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    // validate all fields
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
      const res = await axios.post("http://localhost:5000/api/admins", formData);
      alert("User added successfully!");

      localStorage.setItem("currentDashboardUser", JSON.stringify(res.data));

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
    } catch (error) {
      alert(error.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add User</h3>
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
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Role + Status */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Inventory</option>
                <option>Support</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Role is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option>Active</option>
                <option>Disabled</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Status is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Password + Confirm */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Permissions */}
        <Form.Group className="mb-3">
          <Form.Label>Permissions</Form.Label>
          <div>
            {["Categories", "Products", "Customers", "Orders", "Inventory"].map(
              (perm) => (
                <Form.Check
                  key={perm}
                  inline
                  type="checkbox"
                  label={perm}
                  value={perm}
                  checked={formData.permissions.includes(perm)}
                  onChange={handleChange}
                />
              )
            )}
          </div>
          {errors.permissions && (
            <div className="text-danger">{errors.permissions}</div>
          )}
        </Form.Group>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Adduser;
