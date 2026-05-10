import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CartContext } from "../service/CartProvider";

function DumiProducts() {
  const products = [
    {
      id: 1,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEHRe6qwUg__61qgldYKbyvMS6yhDdyTHLQ&s",
      title: "Clothes",
      description: "Comfortable and stylish clothing for every occasion.",
    },
    {
      id: 2,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYFHqubsxgEDlbHQy-DqJ7gpEX8Honnsv9cQ&s",
      title: "Laptops",
      description: "High-performance laptops for work, gaming, and everyday use.",
    },
    {
      id: 3,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu40lyAEF3ePk1CS3swYqngcJIBufVRo1ouA&s",
      title: "Mobiles",
      description: "Latest smartphones with advanced features and great cameras.",
    },
    {
      id: 4,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEnHaxGDq08atEEjHNYlHsfEeHXzVw2zeOQ&s",
      title: "Shoes",
      description: "Durable and trendy footwear to keep you moving in style.",
    },
    {
      id: 5,
      imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Watches",
      description: "Elegant timepieces that perfectly complement your outfit.",
    },
    {
      id: 6,
      imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Headphones",
      description: "Noise-cancelling headphones for an immersive audio experience.",
    },
    {
      id: 7,
      imageSrc: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Bags",
      description: "Spacious and durable bags for travel, school, or work.",
    },
    {
      id: 8,
      imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Sunglasses",
      description: "Protect your eyes with these stylish and polarized sunglasses.",
    },
  ];

  const { items, addToCart } = useContext(CartContext);

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