// CheckoutAuthPage.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CheckoutAuthPage.css";

const CheckoutAuthPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === loginEmail &&
      storedUser.password === loginPassword
    ) {
      navigate("/order-summary");
    } else {
      setError("Invalid login credentials.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = registerData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all required registration fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(registerData));
    setError("");
    alert("Registration successful! Please login.");
  };

  return (
    <div className="container checkout-auth-container mt-4 mb-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Checkout</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* Register Form */}
        <Col md={6}>
          <h4 className="text-primary">New Customer - Register</h4>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName" className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={registerData.firstName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName" className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="phone" className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={registerData.address}
                onChange={(e) =>
                  setRegisterData({ ...registerData, address: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="password" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="confirmPassword" className="mb-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, confirmPassword: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

             <div className="text-center mt-3">
                <Button variant="primary" type="submit">Register</Button>
            </div> 
          </Form>
        </Col>

        {/* Login Form */}
        <Col md={6}>
          <h4 className="text-primary">Returning Customer - Login</h4>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginEmail" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-3">
                <Button variant="primary" type="submit">Login </Button>
            </div>  
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutAuthPage;
