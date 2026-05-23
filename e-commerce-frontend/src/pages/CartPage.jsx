import { useContext, useState } from "react";
import { CartContext } from "../service/CartProvider";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CartPage = () => {
  const { items, removeToCart } = useContext(CartContext);
  const [inputText, setInputText] = useState("");

  const filteredProducts = items.filter((product) =>
    (product.name || "").toLowerCase().includes(inputText.toLowerCase().trim())
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">Your Cart</h2>
      
      {/* Search Input */}
      <div className="d-flex justify-content-center mb-5">
        <input
          type="text"
          className="form-control w-50 p-2 shadow-sm border-0"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Search Products in Cart..."
        />
      </div>

      {/* Cart Items List */}
      <div id="cart-products">
        {items.length <= 0 ? (
          <div className="text-center my-5 py-5 text-muted fs-4">
            No products added to your cart yet.
          </div>
        ) : filteredProducts.length <= 0 ? (
          <div className="text-center my-5 py-5 text-muted fs-4">
            No matching products found.
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col xs={12} key={product._id}>
                <Card className="shadow-sm border-0 overflow-hidden">
                  <Row className="g-0 align-items-center">
                    <Col md={3}>
                      <Card.Img
                        src={product.imageSrc}
                        alt={product.name}
                        style={{ height: "150px", objectFit: "cover", width: "100%" }}
                      />
                    </Col>
                    <Col md={6} className="p-3">
                      <Card.Body>
                        <Card.Title className="fw-bold fs-4 mb-2">{product.name}</Card.Title>
                        <Card.Text className="text-muted mb-2">
                          {product.description}
                        </Card.Text>
                        <Card.Text className="fw-bold text-success fs-5">
                          Price: ${product.price}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    <Col md={3} className="text-center p-3">
                      <Button
                        variant="danger"
                        onClick={() => removeToCart(product)}
                        className="px-4 py-2"
                      >
                        Remove from Cart
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
