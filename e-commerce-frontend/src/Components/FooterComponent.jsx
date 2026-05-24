import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4} className="mb-3">
            <h5 className="text-warning fw-bold mb-3">Alpha Mart</h5>
            <p className="small text-muted">
              Your one-stop destination for premium tech, athletic apparel, sunglasses, and bags. Localized for Indian shoppers with fast delivery and secured payments.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-warning fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled lh-lg small">
              <li><a href="/products" className="text-muted text-decoration-none hover-link">Shop Products</a></li>
              <li><a href="/cart" className="text-muted text-decoration-none hover-link">My Shopping Cart</a></li>
              <li><a href="/dashboard" className="text-muted text-decoration-none hover-link">User Dashboard</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-warning fw-bold mb-3">Support</h5>
            <ul className="list-unstyled lh-lg small text-muted">
              <li>📞 Helpdesk: 1800-123-4567</li>
              <li>✉️ Email: support@alphamart.in</li>
              <li>📍 Headquarters: Hyderabad, Telangana, India</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <Row>
          <Col className="text-center small text-muted">
            <p className="mb-0">© {new Date().getFullYear()} Alpha Mart. All Rights Reserved. Built with ❤️ in India.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;