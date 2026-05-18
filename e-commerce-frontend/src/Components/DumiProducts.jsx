import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CartContext } from "../service/CartProvider";
import axios from "axios";

function DumiProducts() {
  const [products, setProducts] = useState([]);
  const { items, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <Row xs={1} md={4} className="g-4">
      {products.map((item) => {
        const isPresent = items.some((product) => product.id === item.id);
        return (
          <Col key={item.id}>
            <Card>
              <Card.Img
                variant="top"
                src={item.imageSrc}
                height="290px"
                width="190px"
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(item)}
                  disabled={isPresent}
                >
                  {isPresent ? "Added to Cart" : "Add to Cart"}
                </button>
                <button className="btn btn-success mx-2">Buy</button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default DumiProducts;