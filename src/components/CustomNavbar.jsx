// import React, { useState, useEffect , useRef } from "react";
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
// import { toggleDropdown, removeFromCart } from '../redux/cartSlice';
// import CartDropdown from './CartDropdown';



// const CustomNavbar = () => {
//   const hoverTimeout = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [selectedCategory, setSelectedCategory] = useState(null);
  
//  const dispatch = useDispatch();
//   const { cartItems, showCartDropdown, totalQuantity, totalPrice } = useSelector((state) => state.cart);

//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => dispatch(toggleDropdown(true));
//   const handleMouseLeave = () => dispatch(toggleDropdown(false));
//   const [showMobileCartDropdown, setShowMobileCartDropdown] = useState(false);
//  const handleMobileCartToggle = () => {
//     setShowMobileCartDropdown((prev) => !prev);
//   };



//   const handleCategorySelect = (category) => {
//     navigate(`/category/${encodeURIComponent(category)}`);
//   };

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
//         <Navbar className="py-2 bg-light-blue shadow-sm d-none d-xxl-flex sticky-top p-0 m-0" style={{ zIndex: 999 }}>
//           <Container fluid className="ms-5 me-5 justify-content-between">
//             <Navbar.Brand as={Link} to="/" className="brand-text">BLUEVIN</Navbar.Brand>

//             <Form className="mx-auto" style={{ width: "600px" }}>
//               <div style={{
//                 display: "flex",
//                 border: "1px solid #ccc",
//                 borderRadius: "999px",
//                 overflow: "hidden",
//                 height: "45px",
//                 backgroundColor: "#f8f9fa"
//               }}>
//                 <FormControl
//                   type="search"
//                   placeholder="Search a Product"
//                   className="border-0 shadow-none"
//                   style={{
//                     flex: 1,
//                     paddingLeft: "20px",
//                     fontSize: "1rem",
//                     borderRadius: "999px 0 0 999px",
//                     backgroundColor: "#f8f9fa"
//                   }}
//                 />
//                 <div style={{
//                   width: "50px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderLeft: "2px solid #cce0ff",
//                   backgroundColor: "#f2f2f2"
//                 }}>
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
    
// {screenWidth >= 1440 && (
//   <div
//     className="position-relative me-2"
//     style={{ cursor: 'pointer' }}
//     onMouseEnter={handleMouseEnter}
//     onMouseLeave={handleMouseLeave}
//   >
//     <FaShoppingCart size={20} className="icon position-relative" />

//     {totalQuantity > 0 && (
//       <Badge
//         bg="primary"
//         pill
//         className="position-absolute top-0 start-100 translate-middle"
//       >
//         {totalQuantity}
//       </Badge>
//     )}

//     {showCartDropdown && (
//       <div
//         className="position-absolute"
//         style={{
//           top: '30px',
//           right: 0,
//           zIndex: 1000,
//           transition: 'all 0.2s ease',
//         }}
//       >
//         <CartDropdown
//           cartItems={cartItems}
//           totalPrice={totalPrice}
//           onRemoveItem={(id) => dispatch(removeFromCart(id))}
//         />
//       </div>
//     )}
//   </div>
// )}
  
//             </div>
//           </Container>
//         </Navbar>



//         XXL CATEGORY NAVBAR
//         <Navbar bg="dark" variant="dark" className="d-none d-xxl-flex sticky-top-1" style={{ height: "60px" }}>
//           <Container fluid className="ms-5 me-5">
//             <Button variant="primary" className="fw-bold text-white" onClick={() => {
//               if (screenWidth >= 1440) setShowSidebar(true);
//             }}>
//               <FaBars className="me-2" /> BROWSE ALL CATEGORIES
//             </Button>
//             <div className="position-absolute start-50 top-50 translate-middle">
//               <Nav className="fw-semibold d-flex align-items-center justify-content-center">
//                 <Nav.Link as={Link} to="/" className="text-white top-nav-hover mx-3">Home</Nav.Link>
//                 <Nav.Link as={Link} to="/shop" className="text-white top-nav-hover mx-3">Shop</Nav.Link>
//                 <Nav.Link as={Link} to="/track" className="text-white top-nav-hover mx-3">Track Your Order</Nav.Link>
//                 <Nav.Link as={Link} to="/aboutus" className="text-white top-nav-hover mx-3">About Us</Nav.Link>
//               </Nav>
//             </div>
//           </Container>
//         </Navbar>
//       </div>
//       tablet
//       <Navbar className="py-2 bg-light-blue shadow-sm d-none d-md-flex d-xxl-none position-sticky top-0" style={{ zIndex: 999 }}>
//   <Container fluid className="ms-3 me-3">
//     Logo + Sidebar Toggle
//     <div className="d-flex align-items-center gap-2 me-3">
//       <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
//       <FaBars
//         size={22}
//         style={{ cursor: 'pointer' }}
//         onClick={() => setShowSidebar(true)}
//         onMouseEnter={() => {
//           if (screenWidth >= 768 && screenWidth < 1400) {
//             setShowSidebar(true);
//           }
//         }}
//       />
//     </div>

//     Search Icon
//     <FaSearch size={22} className="ms-auto me-3 text-dark" />

//     Wishlist, Account, Cart with Hover Dropdown
//     <div className="d-flex align-items-center gap-4">
//       <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
//         <FaHeart size={20} className="me-2 icon" />
//         <span className="fw-semibold text">Wishlist</span>
//       </Link>

//       <Link to="/profile" className="nav-hover text-decoration-none d-flex align-items-center">
//         <FaUser size={20} className="me-2 icon" />
//         <span className="fw-semibold text">Account</span>
//       </Link>

//       Cart Hover Dropdown
//       <div
//         className="position-relative me-2 "
//         style={{ cursor: 'pointer' }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <FaShoppingCart size={20} className="icon position-relative" />

//         {totalQuantity > 0 && (
//           <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle">
//             {totalQuantity}
//           </Badge>
//         )}

//         {showCartDropdown && (
//           <div
//             className="position-absolute"
//             style={{
//               top: '30px',
//               right: 0,
//               zIndex: 1000,
//               transition: 'all 0.2s ease',
//             }}
//           >
//             <CartDropdown
//               cartItems={cartItems}
//               totalPrice={totalPrice}
//               onRemoveItem={(id) => dispatch(removeFromCart(id))}
//             />
//           </div>
//         )}
//       </div>

      
//     </div>
//   </Container>
// </Navbar>



//       Mobile Top Navbar
//       <Navbar className="py-2 bg-light-blue shadow-sm d-flex d-md-none position-sticky top-0" style={{ zIndex: 999 }}>
//         <Container fluid className="ms-1 me-1">
//           <div className="cursor-hover" onMouseEnter={() => {
//             if (screenWidth <= 425) setShowSidebar(true);
//           }}>
//             <FaBars size={24} className="text-dark" />
//           </div>
//           <div className="d-flex flex-column align-items-center text-center">
//             <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
//           </div>
//           <FaSearch size={22} className="text-dark" />
//         </Container>
//       </Navbar>

//       Mobile Bottom Nav
//       <div className="mobile-bottom-nav d-md-none" style={{
//         position: "fixed", bottom: 0, left: 0, right: 0, background: "grey",
//         borderTop: "1px solid #ccc", display: "flex", justifyContent: "space-around",
//         padding: "10px 0", zIndex: 1000
//       }}>
        
//   <Button
//     variant="link"
//     className={`nav-icon ${isActive("/") ? "text-primary" : "text-dark"}`}
//     onClick={() => navigate("/")}
//   >
//     <FaHome size={20} />
//   </Button>

//   <Button
//     variant="link"
//     className={`nav-icon ${isActive("/search") ? "text-primary" : "text-dark"}`}
//     onClick={() => navigate("/search")}
//   >
//     <FaSearch size={20} />
//   </Button>

//   <Button
//     variant="link"
//     className={`nav-icon ${isActive("/wishlist") ? "text-primary" : "text-dark"}`}
//     onClick={() => navigate("/wishlist")}
//   >
//     <FaHeart size={20} />
//   </Button>

//   <div className="position-relative">
//   <Button
//     variant="link"
//     className={`nav-icon ${isActive("/cart") ? "text-primary" : "text-dark"}`}
//     onClick={() => setShowMobileCartDropdown(!showMobileCartDropdown)}
//   >
//     <FaShoppingCart size={20} />
//     {totalQuantity > 0 && (
//       <Badge
//         bg="primary"
//         pill
//         className="position-absolute top-0 start-100 translate-middle"
//         style={{ fontSize: "0.6rem" }}
//       >
//         {totalQuantity}
//       </Badge>
//     )}
//   </Button>

//   Show CartDropdown when tapped
//   {showMobileCartDropdown && (
//     <div
//       className="position-absolute"
//       style={{
//         bottom: "50px", 
//         right: 0,
//         zIndex: 1100,
//       }}
//     >
//       <CartDropdown
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         onRemoveItem={(id) => dispatch(removeFromCart(id))}
//       />
//     </div>
//   )}
// </div>


//   <Button
//     variant="link"
//     className={`nav-icon ${isActive("/profile") ? "text-primary" : "text-dark"}`}
//     onClick={() => navigate("/profile")}
//   >
//     <FaUser size={20} />
//   </Button>


//       </div>

//       Sidebar
//       <Offcanvas
//         show={showSidebar}
//         onHide={() => setShowSidebar(false)}
//         scroll
//         backdrop={false}
//         placement="start"
//         className="custom-sidebar"
//       >
//         <Offcanvas.Body
//           className="px-3 py-2"
//           onMouseEnter={() => {
//             if (hoverTimeout.current) {
//               clearTimeout(hoverTimeout.current);
//               hoverTimeout.current = null;
//             }
//             setShowSidebar(true);
//           }}
//           onMouseLeave={() => {
//             hoverTimeout.current = setTimeout(() => {
//               setShowSidebar(false);
//             }, 200);
//           }}
//         >
//           <SidebarMenu
//             onClose={() => setShowSidebar(false)}
//             onSelectCategory={handleCategorySelect}
//           />
//         </Offcanvas.Body>
      
//       </Offcanvas>
//     </>
//   );
// };

// export default CustomNavbar;


import React, { useState, useEffect , useRef } from "react";
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

import { clearUser } from '../redux/userSlice'; // adjust path if needed


const CustomNavbar = () => {
  const hoverTimeout = useRef(null);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
  
    
localStorage.removeItem("userInfo");
localStorage.removeItem("token"); // if you're using a token
dispatch(clearUser());
navigate("/login");
  };

  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState(""); 
useEffect(() => {
  if (userInfo) {
    setIsLoggedIn(true);
    setUsername(userInfo.name || "User");
  } else {
    setIsLoggedIn(false);
    setUsername("");
  }
}, [userInfo]);


  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   setUsername("");
  //   navigate("/login");
  // };
             

// new 
const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const dispatch = useDispatch();
  const { cartItems, showCartDropdown, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileCartDropdown, setShowMobileCartDropdown] = useState(false);


useEffect(() => {
  const params = new URLSearchParams(location.search);
  setIsLoginMode(params.get("mode") !== "register");
}, [location.search]);


  const handleMouseEnter = () => {
    if (screenWidth >= 1440) dispatch(toggleDropdown(true));
  };
  const handleMouseLeave = () => {
    if (screenWidth >= 1440) dispatch(toggleDropdown(false));
  };

  const handleMobileCartToggle = () => {
    setShowMobileCartDropdown((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(toggleDropdown(false));
    setShowMobileCartDropdown(false);
  }, [location.pathname]);

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
            
          
              {/* {isLoggedIn && (
  <div
    className="position-relative nav-hover text-decoration-none d-flex align-items-center"
    onMouseEnter={() => setShowAccountDropdown(true)}
    onMouseLeave={() => setShowAccountDropdown(false)}
    style={{ cursor: "pointer" }}
  >
    <FaUser size={20} className="me-2 icon" />
    <span className="fw-semibold text">My Account</span>

    {showAccountDropdown && (
      <div
        className="position-absolute bg-white shadow-sm rounded"
        style={{ top: "19px", right: 0, zIndex: 1000, padding: "0.5rem 1rem", minWidth: "100px" }}
      >
        <span onClick={handleLogout} style={{ cursor: "pointer", color: "#333", fontWeight: 500 }}>
          Logout
        </span>
      </div>
    )}
  </div>
)} */}
    {/* <div
  className="position-relative nav-hover text-decoration-none d-flex align-items-center"
  onMouseEnter={() => setShowAccountDropdown(true)}
  onMouseLeave={() => setShowAccountDropdown(false)}
  style={{ cursor: "pointer" }}
>
  <FaUser size={20} className="me-2 icon" />
  <span className="fw-semibold text">
    {isLoggedIn ? `Hi, ${username}` : 'Login'}
  </span>

  {showAccountDropdown && (
    <div
      className="position-absolute bg-white shadow-sm rounded"
      style={{ top: "25px", right: 0, zIndex: 1000, padding: "0.5rem 1rem", minWidth: "150px" }}
    >
      {isLoggedIn ? (
        <>
          <div className="mb-2" onClick={() => navigate("/myaccount")} style={{ cursor: "pointer", fontWeight: 500 }}>My Account</div>
          <div className="mb-2" onClick={() => navigate("/orders")} style={{ cursor: "pointer", fontWeight: 500 }}>My Orders</div>
          <div onClick={handleLogout} style={{ cursor: "pointer", fontWeight: 500, color: "#c00" }}>Logout</div>
        </>
      ) : (
        <>
          <div className="mb-2" onClick={() => navigate("/login")} style={{ cursor: "pointer", fontWeight: 500 }}>Login</div>
          <div onClick={() => navigate("/register")} style={{ cursor: "pointer", fontWeight: 500 }}>Register</div>
        </>
      )}
    </div>
  )}
</div> */}
<div
  className="position-relative nav-hover text-decoration-none d-flex align-items-center"
  onMouseEnter={() => setShowAccountDropdown(true)}
  onMouseLeave={() => setShowAccountDropdown(false)}
  style={{ cursor: "pointer" }}
>
  <FaUser size={20} className="me-2 icon" />
  <span className="fw-semibold text">
    {isLoggedIn ? `Hi, ${username}` : 'My Account'}
  </span>

  {showAccountDropdown && (
    <div
      className="position-absolute dropdown-box bg-white shadow-sm rounded"
      style={{
        top: "25px",
        left: "6px",
        zIndex: 1000,
        padding: "0.75rem 1rem",
        minWidth: "180px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      {isLoggedIn ? (
        <>
          <div className="dropdown-item" onClick={() => navigate("/profile")}>
            My Profile
          </div>
          <div className="dropdown-item" onClick={() => navigate("/orders")}>
            Orders
          </div>
          <div className="dropdown-item" onClick={() => navigate("/wishlist")}>
            Wishlist
          </div>
          <div
            className="dropdown-item text-danger"
            onClick={handleLogout}
          >
            Logout
          </div>
        </>
      ) : (
        <>
           <div className="dropdown-item" onClick={() => navigate("/login?mode=login")}>
      Login
    </div>
    <div className="dropdown-item" onClick={() => navigate("/login?mode=register")}>
      Register
    </div>
        </>
      )}
    </div>
  )}
</div>

              {screenWidth >= 1440 && (
                <div
                  className="position-relative me-2"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaShoppingCart size={20} className="icon position-relative" />
                  {totalQuantity > 0 && (
                    <Badge
                      bg="primary"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {totalQuantity}
                    </Badge>
                  )}
                  {showCartDropdown && (
                    <div className="position-absolute" style={{ top: '32px', left: '20px', zIndex: 1000 }}>
                      <CartDropdown
                        cartItems={cartItems}
                        totalPrice={totalPrice}
                        onRemoveItem={(id) => dispatch(removeFromCart(id))}
                      />
                    </div>
                  )}
                </div>
              )}
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

      {/* Tablet Navbar */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-none d-md-flex d-xxl-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-3 me-3">
          <div className="d-flex align-items-center gap-2  me-3">
            <Link to="/" style={{ textDecoration: 'none' }} className="brand-text fs-5">BLUEVIN</Link>
            <FaBars size={22} style={{ cursor: 'pointer' }} onClick={() => setShowSidebar(true)} />
          </div>
          <FaSearch size={22} className="ms-auto me-3 text-dark" />
          <div className="d-flex align-items-center gap-4">
  <Link to="/wishlist" className="nav-hover text-decoration-none d-flex align-items-center">
    <FaHeart size={20} className="me-2 icon" />
    <span className="fw-semibold text">Wishlist</span>
  </Link>


  <div className="position-relative me-2" style={{ cursor: 'pointer' }} onClick={handleMobileCartToggle}>
    <FaShoppingCart size={20} className="icon position-relative" />
    {totalQuantity > 0 && (
      <Badge bg="primary" pill className="position-absolute top-0 start-90 translate-middle">
        {totalQuantity}
      </Badge>
    )}
    {showMobileCartDropdown && (
      <div className="position-absolute" style={{ top: '30px', right: '2px', zIndex: 1000 }}>
        <CartDropdown
          cartItems={cartItems}
          totalPrice={totalPrice}
          onRemoveItem={(id) => dispatch(removeFromCart(id))}
        />
      </div>
    )}
  </div>
{/* Tablet/Laptop version: 768px–1024px */}
{/* {isLoggedIn && (
  <div
    className="d-none d-md-flex d-lg-none position-relative nav-hover text-decoration-none align-items-center"
    onClick={() => setShowAccountDropdown((prev) => !prev)}
    style={{ cursor: "pointer" }}
  >
    <FaUser size={20} className="me-2 icon" />
    <span className="fw-semibold text">My Account</span>

    {showAccountDropdown && (
      <div
        className="position-absolute bg-white shadow-sm rounded"
        style={{
          top: "35px",
          right: 0,
          zIndex: 1000,
          padding: "0.5rem 1rem",
          minWidth: "100px",
        }}
      >
        <span
          onClick={handleLogout}
          style={{ cursor: "pointer", color: "#333", fontWeight: 500 }}
        >
          Logout
        </span>
      </div>
    )}
  </div>
)} */}
<div
  className="position-relative nav-hover text-decoration-none d-flex align-items-center"
  onMouseEnter={() => setShowAccountDropdown(true)}
  onMouseLeave={() => setShowAccountDropdown(false)}
  style={{ cursor: "pointer" }}
>
  <FaUser size={20} className="me-2 icon" />
  <span className="fw-semibold text">
    {isLoggedIn ? `Hi, ${username}` : 'My Account'}
  </span>

  {showAccountDropdown && (
    <div
      className="position-absolute bg-white shadow-sm rounded"
      style={{
        top: "25px",
        right: 0,
        zIndex: 1000,
        padding: "0.75rem 1rem",
        minWidth: "180px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      {isLoggedIn ? (
        <>
          <div className="dropdown-item" onClick={() => navigate("/profile")}>
            My Profile
          </div>
          <div className="dropdown-item" onClick={() => navigate("/orders")}>
            Orders
          </div>
          <div className="dropdown-item" onClick={() => navigate("/wishlist")}>
            Wishlist
          </div>
          <div
            className="dropdown-item text-danger"
            onClick={handleLogout}
          >
            Logout
          </div>
        </>
      ) : (
        <>
           <div className="dropdown-item" onClick={() => navigate("/login?mode=login")}>
      Login
    </div>
    <div className="dropdown-item" onClick={() => navigate("/login?mode=register")}>
      Register
    </div>
        </>
      )}
    </div>
  )}
</div>

</div>

        </Container>
      </Navbar>

      {/* Mobile Top Navbar */}
      <Navbar className="py-2 bg-light-blue shadow-sm d-flex d-md-none position-sticky top-0" style={{ zIndex: 999 }}>
        <Container fluid className="ms-1 me-1">
          <div className="cursor-hover" onClick={() => setShowSidebar(true)}>
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
        <Button variant="link" className={`nav-icon ${isActive("/") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/")}> <FaHome size={20} /> </Button>
        <Button variant="link" className={`nav-icon ${isActive("/search") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/search")}> <FaSearch size={20} /> </Button>
        <Button variant="link" className={`nav-icon ${isActive("/wishlist") ? "text-primary" : "text-dark"}`} onClick={() => navigate("/wishlist")}> <FaHeart size={20} /> </Button>
        <div className="position-relative">
          <Button variant="link" className={`nav-icon ${isActive("/cart") ? "text-primary" : "text-dark"}`} onClick={handleMobileCartToggle}>
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: "0.6rem" }}>{totalQuantity}</Badge>
            )}
          </Button>
          {showMobileCartDropdown && (
            <div className="position-absolute" style={{ bottom: "50px", right: 0, zIndex: 1100 }}>
              <CartDropdown
                cartItems={cartItems}
                totalPrice={totalPrice}
                onRemoveItem={(id) => dispatch(removeFromCart(id))}
              />
            </div>
          )}
        </div>
         <div
  className="position-relative nav-hover text-decoration-none d-flex align-items-center"
  onMouseEnter={() => setShowAccountDropdown(true)}
  onMouseLeave={() => setShowAccountDropdown(false)}
  style={{ cursor: "pointer" }}
>
  <FaUser size={20} className="me-2 icon" />
  <span className="fw-semibold text">
    {isLoggedIn ? `Hi, ${username}` : 'My Account'}
  </span>

  {showAccountDropdown && (
    <div
      className="position-absolute bg-white shadow-sm rounded"
      style={{
        bottom: "35px",
        right: 0,
        zIndex: 10000,
        padding: "0.75rem 1rem",
        minWidth: "180px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#007BFF",
      }}
    >
      {isLoggedIn ? (
        <>
          <div className="dropdown-item" onClick={() => navigate("/profile")}>
            My Profile
          </div>
          <div className="dropdown-item" onClick={() => navigate("/orders")}>
            Orders
          </div>
          <div className="dropdown-item" onClick={() => navigate("/wishlist")}>
            Wishlist
          </div>
          <div
            className="dropdown-item text-danger"
            onClick={handleLogout}
          >
            Logout
          </div>
        </>
      ) : (
        <>
           <div className="dropdown-item" onClick={() => navigate("/login?mode=login")}>
      Login
    </div>
    <div className="dropdown-item" onClick={() => navigate("/login?mode=register")}>
      Register
    </div>
        </>
      )}
    </div>
  )}
</div>


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
            if (hoverTimeout.current) {
              clearTimeout(hoverTimeout.current);
              hoverTimeout.current = null;
            }
            setShowSidebar(true);
          }}
          onMouseLeave={() => {
            hoverTimeout.current = setTimeout(() => {
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
