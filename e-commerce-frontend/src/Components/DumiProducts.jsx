import { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CartContext } from "../service/CartProvider";
import axios from "axios";

function DumiProducts() {
  const [products, setProducts] = useState([]);
  const { items, addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/get-allproducts");
        setProducts(response.data.allProducts || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Row xs={1} md={4} className="g-4">
      {products.map((item, idx) => {
        const isPresent = items.some((product) => product._id === item._id);

        return (
          <Col key={item._id || idx}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={item.imageSrc}
                height="290px"
                style={{ objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {item.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold text-success fs-5">${item.price}</span>
                  <span className="text-warning">★ {item.ratings || "N/A"}</span>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-warning flex-grow-1"
                    onClick={() => addToCart(item)}
                    disabled={isPresent}
                  >
                    {isPresent ? "In Cart" : "Add To Cart"}
                  </button>
                  <button className="btn btn-success">Buy</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default DumiProducts;
