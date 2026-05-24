import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setEmail(decoded.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Welcome Section */}
        <div className="text-center mb-5 p-5 bg-dark text-white rounded shadow-sm position-relative overflow-hidden">
          <div className="position-relative z-index-1">
            <h1 className="display-4 fw-bold mb-3 text-warning">Alpha Mart Portal</h1>
            <p className="lead text-light mb-4">
              Logged in successfully as <strong className="text-warning">{email}</strong>
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/products" className="btn btn-warning btn-lg fw-bold px-4">
                Shop Products
              </Link>
              <Link to="/dashboard" className="btn btn-outline-light btn-lg px-4">
                View My Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <h3 className="fw-bold mb-4 text-dark text-center">Quick Navigation</h3>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="bg-warning-light p-3 rounded-circle mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag-check text-warning" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a 1 1 0 0 1-1-1V5z"/>
                  </svg>
                </div>
                <Card.Title className="fw-bold">Browse Catalog</Card.Title>
                <Card.Text className="text-muted">
                  Explore our premium tech items, athletic footwear, polarized eyewear, and canvas bags.
                </Card.Text>
                <Link to="/products" className="btn btn-dark mt-auto w-100">
                  Shop Now
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="bg-success-light p-3 rounded-circle mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart3 text-success" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
                <Card.Title className="fw-bold">My Shopping Cart</Card.Title>
                <Card.Text className="text-muted">
                  View your selected products, adjust items, check total pricing, and proceed to checkout.
                </Card.Text>
                <Link to="/cart" className="btn btn-dark mt-auto w-100">
                  Open Cart
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="bg-primary-light p-3 rounded-circle mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-lines-fill text-primary" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                  </svg>
                </div>
                <Card.Title className="fw-bold">Customer Portal</Card.Title>
                <Card.Text className="text-muted">
                  Manage your personal account profile, check shipment status, and review order history.
                </Card.Text>
                <Link to="/dashboard" className="btn btn-dark mt-auto w-100">
                  Go to Profile
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
