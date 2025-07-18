// import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Button, Form, FormControl, Offcanvas } from "react-bootstrap";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaBars, FaSearch, FaHeart, FaUser, FaShoppingCart, FaHome } from "react-icons/fa";
// import './CustomNavbar.css';
// import SidebarMenu from './SidebarMenu'; 
// const CustomNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const handleCategorySelect = (category) => {
//   navigate(`/category/${encodeURIComponent(category)}`);
// };
//    let hoverTimeout = null;
//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   const isActive = (path) => location.pathname === path;
//   return (
//     <>
//       XXL DESKTOP NAVBAR
//       <div className="sticky-top">
//       <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex sticky-top p-0 m-0" style={{ zIndex: 999 }}>
//         <Container fluid className="ms-5 me-5 justify-content-between">
//           <Navbar.Brand as={Link} to="/" className="brand-text">BLUEVIN</Navbar.Brand>
//           <Form className="mx-auto" style={{ width: "600px" }}>
//             <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "999px",  overflow: "hidden", height: "45px", backgroundColor: "#f8f9fa" }}>
//               <FormControl type="search" placeholder="Search a Product" className="border-0 shadow-none" style={{ flex: 1, paddingLeft: "20px", fontSize: "1rem",  borderRadius: "999px 0 0 999px", backgroundColor: "#f8f9fa" }} />
//               <div style={{  width: "50px", display: "flex", alignItems: "center",  justifyContent: "center", borderLeft: "2px solid #cce0ff",  backgroundColor: "#f2f2f2" }}>
//                 <FaSearch color="black" size={20} />
//               </div>
//             </div>
//           </Form>
//           <div className="d-flex align-items-center gap-4">
//             <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
//               <FaHeart size={20} className="me-2 icon" />
//               <span className="fw-semibold text">Wishlist</span>
//             </Link>
//             <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
//               <FaUser size={20} className="me-2 icon" />
//               <span className="fw-semibold text">Account</span>
//             </Link>
//             <Link to="/cart" className="nav-hover text-decoration-none d-flex align-items-center">
//               <FaShoppingCart size={20} className="icon" />
//             </Link>
//           </div>
//         </Container>
//       </Navbar>

//       XXL DARK CATEGORY NAVBAR
//       <Navbar bg="dark" variant="dark" className="d-none d-xxl-flex sticky-top-1" style={{ height: "60px" }}>
//         <Container fluid className="ms-5 me-5">
//         <Button variant="primary" className="fw-bold text-white"onClick={() => {
//          if (screenWidth >= 1440) setShowSidebar(true);
//           }} >
//          <FaBars className="me-2" /> BROWSE ALL CATEGORIES
//        </Button>
//           <div className="position-absolute start-50 top-50 translate-middle">
//             <Nav className="fw-semibold d-flex align-items-center justify-content-center">
//               <Nav.Link as={Link} to="/" className="text-white top-nav-hover mx-3">Home</Nav.Link>
//               <Nav.Link as={Link} to="/shop" className="text-white top-nav-hover mx-3">Shop</Nav.Link>
//               <Nav.Link as={Link} to="/track" className="text-white top-nav-hover mx-3">Track Your Order</Nav.Link>
//               <Nav.Link as={Link} to="/aboutus" className="text-white top-nav-hover mx-3">About Us</Nav.Link>
//             </Nav>
//           </div>
//         </Container>
//       </Navbar>
//       </div>
//       Tablet
//        <Navbar className="py-2 bg-light-blue shadow-sm d-none d-md-flex d-xxl-none position-sticky top-0" style={{ zIndex: 999 }}>
//         <Container fluid className="ms-3 me-3">
//           <div className="d-flex align-items-center gap-2 me-3">
//            <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
//              {/* <FaBars size={22} /> */}
//              <FaBars
//   size={22}
//   style={{ cursor: 'pointer' }}
//   onClick={() => setShowSidebar(true)}
//   onMouseEnter={() => {
//     if (screenWidth >= 768 && screenWidth < 1400) {
//       setShowSidebar(true);
//     }
//   }}
// />
//            </div>
//           <FaSearch size={22} className="ms-auto me-3 text-dark" />
//           <div className="d-flex align-items-center gap-4">
//       <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
//         <FaHeart size={20} className="me-2 icon" />
//         <span className="fw-semibold text">Wishlist</span>
//        </Link>
//        <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
//          <FaUser size={20} className="me-2 icon" />
//          <span className="fw-semibold text">Account</span>
//        </Link>
//       <Link to="/cart" className="nav-hover text-decoration-none d-flex align-items-center">         <FaShoppingCart size={20} className="icon" />       </Link>
//      </div>
//          </Container>
//        </Navbar>
// <Navbar
//   className="py-2 bg-light-blue shadow-sm d-flex d-md-none position-sticky top-0"
//   style={{ zIndex: 999 }}
// >
//   <Container fluid className="ms-1 me-1">
//     <div
//       className="cursor-hover"
//       onMouseEnter={() => {
//         if (screenWidth <= 425) setShowSidebar(true);
//       }}
//     >
//       <FaBars size={24} className="text-dark" />
//     </div>

//     <div className="d-flex flex-column align-items-center text-center">
//       <Link
//         to="/"
//         style={{ textDecoration: 'none' }}
//         className="brand-text fs-5"
//       >
//         BLUEVIN
//       </Link>
//     </div>
//     <FaSearch size={22} className="text-dark" />
//   </Container>
// </Navbar>
//       MOBILE BOTTOM NAV
//       <div className="mobile-bottom-nav d-md-none" style={{
//         position: "fixed", bottom: 0, left: 0, right: 0, background: "grey",
//         borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-around",
//         padding: "10px 0", zIndex: 1000
//       }}>
//         <Button variant="link" className={`nav-icon ${isActive("/search") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/search")}>
//           <FaSearch size={20} />
//         </Button>
//         <Button variant="link" className={`nav-icon ${isActive("/wishlist") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/wishlist")}>
//           <FaHeart size={20} />
//         </Button>
//         <Button variant="link" className={`nav-icon ${isActive("/cart") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/cart")}>
//           <FaShoppingCart size={20} />
//         </Button>
//         <Button variant="link" className={`nav-icon ${isActive("/profile") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/profile")}>
//           <FaUser size={20} />
//         </Button>
//         <Button variant="link" className={`nav-icon ${isActive("/") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/")}>
//           <FaHome size={20} />
//         </Button>
//       </div>
//       SIDEBAR OFFCANVAS
//   <Offcanvas
//   show={showSidebar}
//   onHide={() => setShowSidebar(false)}
//   scroll
//   backdrop={false}
//   placement="start"
//   className="custom-sidebar"
// >
//  <Offcanvas.Body
//   className="px-3 py-2"
//   onMouseEnter={() => {
//     if (hoverTimeout) {
//       clearTimeout(hoverTimeout);
//       hoverTimeout = null;
//     }
//     setShowSidebar(true);
//   }}
//   onMouseLeave={() => {
//     hoverTimeout = setTimeout(() => {
//       setShowSidebar(false);
//     }, 200); 
//   }}
// >
//   <SidebarMenu
//     onClose={() => setShowSidebar(false)}
//     onSelectCategory={handleCategorySelect}
//   />
// </Offcanvas.Body>
// </Offcanvas>
//     </>
//   );
// };
// export default CustomNavbar;




// src/components/CustomNavbar.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Nav,
//   Container,
//   Button,
//   Form,
//   FormControl,
//   Offcanvas,
//   Badge,
// } from "react-bootstrap";
// import {
//   FaBars,
//   FaSearch,
//   FaHeart,
//   FaUser,
//   FaShoppingCart,
//   FaHome,
// } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import './CustomNavbar.css';
// import SidebarMenu from './SidebarMenu';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   toggleDropdown,
//   removeFromCart,

// } from '../redux/cartSlice';
// import CartDropdown from './CartDropdown';



// const CustomNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [selectedCategory, setSelectedCategory] = useState(null);
// const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const showCartDropdown = useSelector((state) => state.cart.showDropdown);
//   const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const handleCategorySelect = (category) => {
//     navigate(`/category/${encodeURIComponent(category)}`);
//   };

//   let hoverTimeout = null;
//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       {/* XXL DESKTOP NAVBAR */}
//       <div className="sticky-top">
//         <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex sticky-top p-0 m-0" style={{ zIndex: 999 }}>
//           <Container fluid className="ms-5 me-5 justify-content-between">
//             <Navbar.Brand as={Link} to="/" className="brand-text">BLUEVIN</Navbar.Brand>
//             <Form className="mx-auto" style={{ width: "600px" }}>
//               <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "999px", overflow: "hidden", height: "45px", backgroundColor: "#f8f9fa" }}>
//                 <FormControl type="search" placeholder="Search a Product" className="border-0 shadow-none" style={{ flex: 1, paddingLeft: "20px", fontSize: "1rem", borderRadius: "999px 0 0 999px", backgroundColor: "#f8f9fa" }} />
//                 <div style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "2px solid #cce0ff", backgroundColor: "#f2f2f2" }}>
//                   <FaSearch color="black" size={20} />
//                 </div>
//               </div>
//             </Form>
//             <div className="d-flex align-items-center gap-4 position-relative">
//               <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
//                 <FaHeart size={20} className="me-2 icon" />
//                 <span className="fw-semibold text">Wishlist</span>
//               </Link>
//               <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
//                 <FaUser size={20} className="me-2 icon" />
//                 <span className="fw-semibold text">Account</span>
//               </Link>

//  <div
//   className="position-relative"
//   onMouseEnter={() => dispatch(toggleDropdown())}
//   onMouseLeave={() => dispatch(toggleDropdown())}
//   style={{ cursor: 'pointer' }}
// >
//   <FaShoppingCart size={20} className="icon position-relative" />

//   {totalQuantity > 0 ? (
//     <Badge
//       bg="danger"
//       pill
//       className="position-absolute top-0 start-100 translate-middle"
//     >
//       {totalQuantity}
//     </Badge>
//   ) : (
//     <span className="ms-2 small text-muted">Cart: 0</span>
//   )}

//   {showCartDropdown && (
//     <div
//       className="position-absolute bg-white border rounded shadow p-2"
//       style={{ right: 0, top: '30px', zIndex: 1000, width: '280px' }}
//     >
//       <CartDropdown
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         onRemoveItem={(id) => dispatch(removeFromCart(id))}
//       />
//     </div>
//   )}
// </div>

//             </div>
//           </Container>
//         </Navbar>

import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  Offcanvas,
  Badge,
} from "react-bootstrap";
import {
  FaBars,
  FaSearch,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './CustomNavbar.css';
import SidebarMenu from './SidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown, removeFromCart } from '../redux/cartSlice';
import CartDropdown from './CartDropdown';


const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
 const dispatch = useDispatch();
  const { cartItems, showCartDropdown, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => dispatch(toggleDropdown(true));
  const handleMouseLeave = () => dispatch(toggleDropdown(false));

  const handleCategorySelect = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

 

  return (
    <>
      {/* XXL DESKTOP NAVBAR */}
      <div className="sticky-top">
        <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex sticky-top p-0 m-0" style={{ zIndex: 999 }}>
          <Container fluid className="ms-5 me-5 justify-content-between">
            <Navbar.Brand as={Link} to="/" className="brand-text">BLUEVIN</Navbar.Brand>

            <Form className="mx-auto" style={{ width: "600px" }}>
              <div style={{
                display: "flex",
                border: "1px solid #ccc",
                borderRadius: "999px",
                overflow: "hidden",
                height: "45px",
                backgroundColor: "#f8f9fa"
              }}>
                <FormControl
                  type="search"
                  placeholder="Search a Product"
                  className="border-0 shadow-none"
                  style={{
                    flex: 1,
                    paddingLeft: "20px",
                    fontSize: "1rem",
                    borderRadius: "999px 0 0 999px",
                    backgroundColor: "#f8f9fa"
                  }}
                />
                <div style={{
                  width: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: "2px solid #cce0ff",
                  backgroundColor: "#f2f2f2"
                }}>
                  <FaSearch color="black" size={20} />
                </div>
              </div>
            </Form>

            <div className="d-flex align-items-center gap-4 position-relative">
              <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
                <FaHeart size={20} className="me-2 icon" />
                <span className="fw-semibold text">Wishlist</span>
              </Link>

              <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
                <FaUser size={20} className="me-2 icon" />
                <span className="fw-semibold text">Account</span>
              </Link>
     <div
      className="position-relative me-3"
      style={{ cursor: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FaShoppingCart size={20} className="icon  position-relative " />
      
      {totalQuantity > 0 && (
        <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle">
          {totalQuantity}
        </Badge>
      )}

      {showCartDropdown && (
        <div
          className="position-absolute"
          style={{
            top: '30px',
            right: 0,
            zIndex: 1000,
            transition: 'all 0.2s ease',
          }}
        >
          <CartDropdown
            cartItems={cartItems}
            totalPrice={totalPrice}
            onRemoveItem={(id) => dispatch(removeFromCart(id))}
          />
        </div>
      )}
    </div>
              
            </div>
          </Container>
        </Navbar>



        {/* XXL CATEGORY NAVBAR */}
        <Navbar bg="dark" variant="dark" className="d-none d-xxl-flex sticky-top-1" style={{ height: "60px" }}>
          <Container fluid className="ms-5 me-5">
            <Button variant="primary" className="fw-bold text-white" onClick={() => {
              if (screenWidth >= 1440) setShowSidebar(true);
            }}>
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
      </div>

      {/* Tablet */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-none d-md-flex d-xxl-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-3 me-3">
          <div className="d-flex align-items-center gap-2 me-3">
            <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
            <FaBars size={22} style={{ cursor: 'pointer' }} onClick={() => setShowSidebar(true)} onMouseEnter={() => {
              if (screenWidth >= 768 && screenWidth < 1400) {
                setShowSidebar(true);
              }
            }} />
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

      {/* Mobile Top Navbar */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-flex d-md-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-1 me-1">
          <div className="cursor-hover" onMouseEnter={() => {
            if (screenWidth <= 425) setShowSidebar(true);
          }}>
            <FaBars size={24} className="text-dark" />
          </div>
          <div className="d-flex flex-column align-items-center text-center">
            <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
          </div>
          <FaSearch size={22} className="text-dark" />
        </Container>
      </Navbar>

      {/* Mobile Bottom Nav */}
      <div className="mobile-bottom-nav d-md-none" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, background: "grey",
        borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-around",
        padding: "10px 0", zIndex: 1000
      }}>
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

      {/* Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        scroll
        backdrop={false}
        placement="start"
        className="custom-sidebar"
      >
        <Offcanvas.Body
          className="px-3 py-2"
          onMouseEnter={() => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
              hoverTimeout = null;
            }
            setShowSidebar(true);
          }}
          onMouseLeave={() => {
            hoverTimeout = setTimeout(() => {
              setShowSidebar(false);
            }, 200);
          }}
        >
          <SidebarMenu
            onClose={() => setShowSidebar(false)}
            onSelectCategory={handleCategorySelect}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;