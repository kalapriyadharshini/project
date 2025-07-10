
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Form, FormControl, Offcanvas } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaHeart, FaUser, FaShoppingCart, FaHome } from "react-icons/fa";
import './CustomNavbar.css';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false); 

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* XXL - Desktop */}
      {/* <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-5 me-5 justify-content-between">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fs-3 fw-bold text-primary">BLUEVIN</Navbar.Brand>
           <Navbar.Brand as={Link} to="/" className="fs-3 text-dark" style={{ fontWeight: 800, letterSpacing: "1px" }}>
  BLUEVIN
</Navbar.Brand>


          <Form className="mx-auto" style={{ width: "600px" }}>
            <div style={{
              display: "flex", border: "1px solid #ccc", borderRadius: "999px",
              overflow: "hidden", height: "45px", backgroundColor: "#f8f9fa"
            }}>
              <FormControl type="search" placeholder="Search a Product"
                className="border-0 shadow-none"
                style={{
                  flex: 1, paddingLeft: "20px", fontSize: "1rem",
                  borderRadius: "999px 0 0 999px", backgroundColor: "#f8f9fa"
                }}
              />
              <div style={{
                width: "50px", display: "flex", alignItems: "center",
                justifyContent: "center", borderLeft: "2px solid #cce0ff",
                backgroundColor: "#f2f2f2"
              }}>
                <FaSearch color="black" size={20} />
              </div>
            </div>
          </Form> 
            <div className="d-flex align-items-center gap-4">
               <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
                <FaHeart size={20} className="me-2 icon" />
                <span className="fw-semibold text">Wishlist</span>
              </Link>
               <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
                 <FaUser size={20} className="me-2 icon" />
                  <span className="fw-semibold text">Account</span>
               </Link>
              <Link to="/cart" className="nav-hover text-decoration-none d-flex align-items-center">
                <FaShoppingCart size={20} className="icon" />
              </Link>
           </div>
        </Container>
      </Navbar> */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex position-sticky top-0" style={{ zIndex: 999 }}>
  <Container fluid className="ms-5 me-5 justify-content-between">

    {/* Brand Name */}
    <Navbar.Brand as={Link} to="/" className="brand-text">
      BLUEVIN
    </Navbar.Brand>

    {/* Search Bar */}
    <Form className="mx-auto" style={{ width: "600px" }}>
      <div style={{
        display: "flex", border: "1px solid #ccc", borderRadius: "999px",
        overflow: "hidden", height: "45px", backgroundColor: "#f8f9fa"
      }}>
        <FormControl type="search" placeholder="Search a Product"
          className="border-0 shadow-none"
          style={{
            flex: 1, paddingLeft: "20px", fontSize: "1rem",
            borderRadius: "999px 0 0 999px", backgroundColor: "#f8f9fa"
          }}
        />
        <div style={{
          width: "50px", display: "flex", alignItems: "center",
          justifyContent: "center", borderLeft: "2px solid #cce0ff",
          backgroundColor: "#f2f2f2"
        }}>
          <FaSearch color="black" size={20} />
        </div>
      </div>
    </Form>

    {/* Right Icons */}
    <div className="d-flex align-items-center gap-4">
      <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaHeart size={20} className="me-2 icon" />
        <span className="fw-semibold text">Wishlist</span>
      </Link>
      <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaUser size={20} className="me-2 icon" />
        <span className="fw-semibold text">Account</span>
      </Link>
      <Link to="/cart" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaShoppingCart size={20} className="icon" />
      </Link>
    </div>

  </Container>
</Navbar>

      <Navbar bg="dark" variant="dark" className="d-none d-xxl-flex position-sticky " style={{ height: "60px" }}>
        <Container fluid className="ms-5 me-5">
          <Button variant="primary" className="fw-bold text-white"
            onMouseEnter={() => setShowSidebar(true)} 
          >
            <FaBars className="me-2" /> BROWSE ALL CATEGORIES
          </Button>

          <div className="position-absolute start-50 top-50 translate-middle">
            <Nav className="fw-semibold d-flex align-items-center justify-content-center">
              <Nav.Link as={Link} to="/" className="text-white top-nav-hover mx-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop" className="text-white top-nav-hover mx-3">Shop</Nav.Link>
              <Nav.Link as={Link} to="/track" className="text-white top-nav-hover mx-3">Track Your Order</Nav.Link>
              <Nav.Link as={Link} to="/aboutus" className="text-white top-nav-hover mx-3">About Us</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
       {/* Tablet */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-none d-md-flex d-xxl-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-3 me-3">
          <div className="d-flex align-items-center gap-2 me-3">
           <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
            <FaBars size={22} />
          </div>
          <FaSearch size={22} className="ms-auto me-3 text-dark" />
          <div className="d-flex align-items-center gap-4">
      <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaHeart size={20} className="me-2 icon" />
        <span className="fw-semibold text">Wishlist</span>
      </Link>
      <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaUser size={20} className="me-2 icon" />
        <span className="fw-semibold text">Account</span>
      </Link>
      <Link to="/cart" className="nav-hover text-decoration-none d-flex align-items-center">
        <FaShoppingCart size={20} className="icon" />
      </Link>
    </div>
        </Container>
      </Navbar>
       {/* Mobile */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-flex d-md-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-1 me-1">
          <FaBars size={22} className="text-dark" />
          <div className="d-flex flex-column align-items-center text-center">
          <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
          </div>
          <FaSearch size={22} className="text-dark" />
        </Container>
      </Navbar>
      
      {/* Mobile Bottom Nav (Static only) */}
      <div className="mobile-bottom-nav d-md-none" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "grey", borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-around", padding: "10px 0", zIndex: 1000 }}>
        <Button variant="link" className={`nav-icon ${isActive("/search") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/search")}>
          <FaSearch size={20} />
        </Button>
        <Button variant="link" className={`nav-icon ${isActive("/wishlist") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/wishlist")}>
          <FaHeart size={20} />
        </Button>
        <Button variant="link" className={`nav-icon ${isActive("/cart") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/cart")}>
          <FaShoppingCart size={20} />
        </Button>
        <Button variant="link" className={`nav-icon ${isActive("/profile") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/profile")}>
          <FaUser size={20} />
        </Button>
        <Button variant="link" className={`nav-icon ${isActive("/") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/")}>
          <FaHome size={20} />
        </Button>
      </div>

      {/* Sidebar Offcanvas shown only when triggered */}
      {/* <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} scroll backdrop={false} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CategorySidebar onClose={() => setShowSidebar(false)} />
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
};

export default CustomNavbar;
