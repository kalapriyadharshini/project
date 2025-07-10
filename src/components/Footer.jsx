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
    <footer className="bg-light  border-top">
      {/* <Container fluid className="text-center"> */}
      <Container className="text-center text-md-start">



        {/* Top Bar */}
        <Row className="text-center py-3 border-bottom">
          <Col md={3}>
            <FaTruck size={24} className="mb-2" />
            <h6>SPEED DELIVERY</h6>
            <p>Surface And Air Delivery</p>
          </Col>
          <Col md={3}>
            <FaClock size={24} className="mb-2" />
            <h6>24 X 7 SERVICE</h6>
            <p>Online Service For 24 X 7</p>
          </Col>
          <Col md={3}>
            <FaBullhorn size={24} className="mb-2" />
            <h6>NEW STOCKS DAILY</h6>
            <p>New Updates Every Day</p>
          </Col>
          <Col md={3}>
            <FaTags size={24} className="mb-2" />
            <h6>BEST PRICES & OFFERS</h6>
            <p>Lowest Price In The Market</p>
          </Col>
        </Row>

        {/* Main Footer */}
        <Row className="py-4">
          {/* Logo and About */}
          <Col md={4} className="mb-3">
            <img src="/logo.png" alt="Bluevin" style={{ width: "120px" }} />
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
    <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
    <li><Link to="/track-order" className="text-muted text-decoration-none">Track Your Order</Link></li>
    <li><Link to="/terms" className="text-muted text-decoration-none">Terms & Conditions</Link></li>
    <li><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
    <li><Link to="/shipping" className="text-muted text-decoration-none">Shipping & Returns</Link></li>
    <li><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
  </ul>
</Col>


          {/* Store Information */}
          <Col md={4}>
            <h5>STORE INFORMATION</h5>
            <p className="mt-3 text-muted">
              <FaMapMarkerAlt /> 2a, 4th Cross Road, Samipillai Thottam Road Lawspet, Pondicherry - 605008
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
