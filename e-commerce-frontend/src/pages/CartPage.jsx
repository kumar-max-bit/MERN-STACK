import { useContext, useState } from "react";
import { CartContext } from "../service/CartProvider";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { items, removeToCart, fetchCart } = useContext(CartContext);
  const [inputText, setInputText] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [orderPlacing, setOrderPlacing] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = items.filter((product) =>
    (product.name || "").toLowerCase().includes(inputText.toLowerCase().trim())
  );

  const totalAmount = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setOrderPlacing(true);
    try {
      const orderProducts = items.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price
      }));

      await axios.post(
        "http://localhost:5000/orders/place",
        {
          products: orderProducts,
          totalAmount,
          shippingDetails
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Refresh cart state to empty it
      await fetchCart();
      alert("Order placed successfully! 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setOrderPlacing(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold text-dark">Your Shopping Cart</h2>

      {items.length <= 0 ? (
        <div className="text-center my-5 py-5 text-muted fs-4">
          No products added to your cart yet.
        </div>
      ) : (
        <Row className="g-4">
          {/* Cart items list column */}
          <Col lg={showCheckout ? 7 : 12}>
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                className="form-control p-3 shadow-sm border-0 bg-light"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Search products in cart..."
              />
            </div>

            <div id="cart-products">
              {filteredProducts.length <= 0 ? (
                <div className="text-center my-5 py-5 text-muted fs-4">
                  No matching products found.
                </div>
              ) : (
                <Row className="g-3">
                  {filteredProducts.map((product) => (
                    <Col xs={12} key={product._id}>
                      <Card className="shadow-sm border-0 overflow-hidden">
                        <Row className="g-0 align-items-center">
                          <Col md={3}>
                            <Card.Img
                              src={product.imageSrc}
                              alt={product.name}
                              style={{ height: "120px", objectFit: "cover", width: "100%" }}
                            />
                          </Col>
                          <Col md={6} className="p-3">
                            <Card.Body className="p-0">
                              <Card.Title className="fw-bold fs-5 mb-1">{product.name}</Card.Title>
                              <Card.Text className="fw-bold text-success">
                                ₹{product.price}
                              </Card.Text>
                            </Card.Body>
                          </Col>
                          <Col md={3} className="text-center p-3">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeToCart(product)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>

            {!showCheckout && (
              <div className="d-flex justify-content-between align-items-center mt-5 p-4 bg-light rounded shadow-sm">
                <span className="fs-4 fw-bold">Total Amount: <span className="text-success">₹{totalAmount}</span></span>
                <Button variant="warning" size="lg" className="fw-bold px-5" onClick={() => setShowCheckout(true)}>
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </Col>

          {/* Checkout Column */}
          {showCheckout && (
            <Col lg={5}>
              <Card className="shadow border-0 p-4 bg-white">
                <h4 className="fw-bold mb-4">Checkout Details</h4>
                <div className="mb-4 p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items Count:</span>
                    <strong>{items.length}</strong>
                  </div>
                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Order Total:</span>
                    <span className="text-success">₹{totalAmount}</span>
                  </div>
                </div>

                <Form onSubmit={handlePlaceOrder}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      required
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="Flat No. 402, Sai Residency"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      required
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      placeholder="Hyderabad"
                    />
                  </Form.Group>

                  <Row className="g-2 mb-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          required
                          value={shippingDetails.state}
                          onChange={handleInputChange}
                          placeholder="Telangana"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>PIN Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          required
                          value={shippingDetails.zipCode}
                          onChange={handleInputChange}
                          placeholder="500001"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" className="w-50" onClick={() => setShowCheckout(false)}>
                      Back to Cart
                    </Button>
                    <Button type="submit" variant="success" className="w-50 fw-bold" disabled={orderPlacing}>
                      {orderPlacing ? "Placing..." : "Place Order"}
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
