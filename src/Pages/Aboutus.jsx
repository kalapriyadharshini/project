import React from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import "./AboutUs.css"; // Create AboutUs.css for custom styles
import about from '../assets/about.jpg';
export default function AboutUs({
  brandName = "Bluevin",
  imageSrc = about,
}) {
  return (
    <section className="about-us-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Image src={imageSrc} alt={`${brandName} - About us`} fluid rounded />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">About Us</h2>
            <p>
              At <strong>{brandName}</strong>, we believe aquariums are living works of art — a peaceful escape and a glimpse into nature’s beauty. Our love for aquatic life started as a hobby and grew into a mission: to provide healthy fish, vibrant plants, and premium equipment so that anyone can build their dream aquarium with ease.
            </p>
            <p>
              We handpick every fish and plant with care, ensuring they are healthy, ethically sourced, and ready to flourish in your tank. Our range of products is tested for quality, durability, and sustainability — because your aquarium deserves the best.
            </p>
            <h4 className="mt-4"> Why Choose Us?</h4>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>Healthy, hand-selected fish and plants</ListGroup.Item>
              <ListGroup.Item>High-quality tanks, filters, and accessories</ListGroup.Item>
              <ListGroup.Item>Expert advice and friendly support</ListGroup.Item>
              <ListGroup.Item>Tips and guides for beginners & pros alike</ListGroup.Item>
            </ListGroup>
            <p>
              Whether you want a small betta tank, a planted aquascape, or a full marine setup, we’re here to make it happen.
            </p>
            <div className="d-flex gap-2">
              <Button variant="primary" href="/">Shop Now</Button>
              <Button variant="outline-secondary" href="/guides">Read Our Guides</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

