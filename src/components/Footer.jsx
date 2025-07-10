import { Container, Row, Col } from "react-bootstrap";
import {
  FaTruck,
  FaClock,
  FaBullhorn,
  FaTags,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaAndroid,
  FaApple,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import './Footer.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-light-blue ">    
      <Container className="text-center text-md-start">
        {/* Top Bar */}
        <Row className="text-center py-3">
          <Col md={3}>
            <FaTruck size={24} className="mb-3" />
            <h5>SPEED DELIVERY</h5>
            <p>Surface And Air Delivery</p>
          </Col>
          <Col md={3}>
            <FaClock size={24} className="mb-3" />
            <h5>24 X 7 SERVICE</h5>
            <p>Online Service For 24 X 7</p>
          </Col>
          <Col md={3}>
            <FaBullhorn size={24} className="mb-3" />
            <h5>NEW STOCKS DAILY</h5>
            <p>New Updates Every Day</p>
          </Col>
          <Col md={3}>
            <FaTags size={24} className="mb-3" />
            <h5>BEST PRICES & OFFERS</h5>
            <p>Lowest Price In The Market</p>
          </Col>
        </Row>
        {/* Main Footer */}
        <Row className="py-4">
          {/* Logo and About */}
          <Col md={4} className="mb-3">
            <h5>BLUEVIN</h5>
            <p className="mt-3 text-muted">
              Bluevin offers top-quality pet and aquatic products with fast delivery, secure payment, and 24/7 support, ensuring a trusted shopping experience.
            </p>
           <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2 fs-4">
  <FaInstagram />
  <FaYoutube />
  <FaFacebook />
  <FaWhatsapp />
</div>           
          </Col>
          {/* Useful Links */}
          <Col md={4} className="mb-3">
  <h5>USEFUL LINKS</h5>
  <ul className="list-unstyled text-muted mt-3">
  <li><Link to="/about" className="text-decoration-none text-muted">About Us</Link></li>
  <li><Link to="/track" className="text-decoration-none text-muted">Track Your Order</Link></li>
  <li><Link to="/term" className="text-decoration-none text-muted">Terms & Conditions</Link></li>
  <li><Link to="/privacy" className="text-decoration-none text-muted">Privacy Policy</Link></li>
  <li><Link to="/shipping" className="text-decoration-none text-muted">Shipping & Returns</Link></li>
  <li><Link to="/contact" className="text-decoration-none text-muted">Contact Us</Link></li>
</ul>
</Col>
          {/* Store Information */}
          <Col md={4}>
            <h5>STORE INFORMATION</h5>
            <p className="mt-3 text-muted">
              <FaMapMarkerAlt /> 2a, 4th Cross Road, Samipillai Thottam, Pondicherry - 605008
            </p>
            <p className="text-muted">
              <FaPhone /> 8838885424 / 9488814924 / 7397263023
            </p>
            <p className="text-muted">
              <FaEnvelope /> Support@Bluevin.com
            </p>
            <p className="text-muted">
              <FaClock /> 10:00 AM - 07:30 PM, Mon - Sun
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

// import { Container, Row, Col } from "react-bootstrap";
// import {
//   FaTruck,
//   FaClock,
//   FaBullhorn,
//   FaTags,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
//   FaAndroid,
//   FaApple,
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaWhatsapp,
// } from "react-icons/fa";
// import './Footer.css';
// import { Link } from "react-router-dom";
// const Footer = () => {
//   return (
// <footer className="">
//   Top Bar - Separate Container
//   <Container className="text-center  py-3 mb-4 topbar-container">
//     <Row>
//       <Col md={3} className="border-end">
//         <FaTruck size={24} className="mb-3" />
//         <h5>SPEED DELIVERY</h5>
//         <p>Surface And Air Delivery</p>
//       </Col>
//       <Col md={3} className="border-end">
//         <FaClock size={24} className="mb-3" />
//         <h5>24 X 7 SERVICE</h5>
//         <p>Online Service For 24 X 7</p>
//       </Col>
//       <Col md={3} className="border-end">
//         <FaBullhorn size={24} className="mb-3" />
//         <h5>NEW STOCKS DAILY</h5>
//         <p>New Updates Every Day</p>
//       </Col>
//       <Col md={3}>
//         <FaTags size={24} className="mb-3" />
//         <h5>BEST PRICES & OFFERS</h5>
//         <p>Lowest Price In The Market</p>
//       </Col>
//     </Row>
//   </Container>



//   Main Footer
//   <Container fluid className="text-center text-md-start bg-light-blue">
//     <Row className="py-4 ps-5 pe-4">
//       Logo and About
//       <Col md={5} className="footer-brand">
//       <Col md={5} className="mb-3">
//         <h5>BLUEVIN</h5>
//         <p className="mt-3 text-muted">
//           Bluevin offers top-quality pet and aquatic products with fast delivery, secure payment, and 24/7 support, ensuring a trusted shopping experience.
//         </p>
//         <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2 fs-4">
//           <div className="footer-icons d-flex gap-3 mt-2 fs-4">
//           <FaInstagram />
//           <FaYoutube />
//           <FaFacebook />
//           <FaWhatsapp />
//         </div>
//       </Col>

//       Useful Links
//       <Col md={3} className="footer-brand">
//         <h5>USEFUL LINKS</h5>
//         <ul className="list-unstyled text-muted mt-3">
//           <li><Link to="/about" className="text-decoration-none text-muted">About Us</Link></li>
//           <li><Link to="/track" className="text-decoration-none text-muted">Track Your Order</Link></li>
//           <li><Link to="/term" className="text-decoration-none text-muted">Terms & Conditions</Link></li>
//           <li><Link to="/privacy" className="text-decoration-none text-muted">Privacy Policy</Link></li>
//           <li><Link to="/shipping" className="text-decoration-none text-muted">Shipping & Returns</Link></li>
//           <li><Link to="/contact" className="text-decoration-none text-muted">Contact Us</Link></li>
//         </ul>
//       </Col>

//       Store Information
//       <Col md={4} className="footer-brand">
//         <h5>STORE INFORMATION</h5>
//         <p className="mt-3 text-muted">
//           <FaMapMarkerAlt /> 2a, 4th Cross Road, Samipillai Thottam, Pondicherry - 605008
//         </p>
//         <p className="text-muted">
//           <FaPhone /> 8838885424 / 9488814924 / 7397263023
//         </p>
//         <p className="text-muted">
//           <FaEnvelope /> Support@Bluevin.com
//         </p>
//         <p className="text-muted">
//           <FaClock /> 10:00 AM - 07:30 PM, Mon - Sun
//         </p>
//       </Col>
//     </Row>
//   </Container>
// </footer>
//  );
// };
// export default Footer;