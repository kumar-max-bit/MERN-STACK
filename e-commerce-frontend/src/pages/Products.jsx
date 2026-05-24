import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { CartContext } from "../service/CartProvider";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);

  const { items, addToCart } = useContext(CartContext);

  // Function to load products (handling normal listing, filtering, or sorting)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/products/get-allproducts";
      
      // If price bounds are specified, use the filter endpoint
      if (minPrice !== "" || maxPrice !== "") {
        const min = minPrice !== "" ? minPrice : 0;
        const max = maxPrice !== "" ? maxPrice : 100000;
        url = `http://localhost:5000/products/filter-products?min=${min}&max=${max}`;
      } 
      // Else if sorting is specified, use the sort endpoint
      else if (sortOrder !== "") {
        url = `http://localhost:5000/products/sort-products?order=${sortOrder}`;
      }

      const response = await axios.get(url);
      
      // The backend returns filteredProducts, sortedProducts, or allProducts depending on the endpoint
      const list = response.data.allProducts || response.data.filteredProducts || response.data.sortedProducts || [];
      setProducts(list);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger loading on initial mount, or when filters change
  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("");
    setSearchQuery("");
    // Re-fetch all products
    setTimeout(() => {
      fetchProducts();
    }, 0);
  };

  // Local filter for search query text matching product names
  const searchedProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* Sidebar Filters */}
        <Col lg={3}>
          <div className="bg-light p-4 rounded shadow-sm border">
            <h4 className="fw-bold mb-4">Filters</h4>
            
            {/* Price Filter Form */}
            <Form onSubmit={handleFilterSubmit} className="mb-4">
              <Form.Label className="fw-semibold">Price Range (₹)</Form.Label>
              <Row className="g-2 mb-3">
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Col>
              </Row>
              <Button type="submit" variant="dark" className="w-100 mb-2">
                Apply Price
              </Button>
            </Form>

            {/* Sort Order Selector */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Sort By Price</Form.Label>
              <Form.Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </Form.Select>
            </Form.Group>

            {/* Reset Button */}
            <Button variant="outline-danger" className="w-100" onClick={handleResetFilters}>
              Reset All
            </Button>
          </div>
        </Col>

        {/* Product Catalog list */}
        <Col lg={9}>
          <div className="mb-4">
            <InputGroup className="shadow-sm">
              <Form.Control
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 border-0"
              />
            </InputGroup>
          </div>

          {loading ? (
            <div className="text-center my-5 py-5 fs-4 text-muted">Loading products...</div>
          ) : searchedProducts.length === 0 ? (
            <div className="text-center my-5 py-5 fs-4 text-muted border rounded bg-light">
              No products found matching your search.
            </div>
          ) : (
            <Row xs={1} md={3} className="g-4">
              {searchedProducts.map((product) => {
                const isPresent = items.some((item) => item._id === product._id);
                return (
                  <Col key={product._id}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img
                        variant="top"
                        src={product.imageSrc}
                        height="260px"
                        style={{ objectFit: "cover" }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold">{product.name}</Card.Title>
                        <Card.Text className="text-muted flex-grow-1">
                          {product.description}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span className="fw-bold text-success fs-5">₹{product.price}</span>
                          <span className="text-warning">★ {product.ratings || "N/A"}</span>
                        </div>
                        <div className="mt-3 d-flex gap-2">
                          <Button
                            variant="warning"
                            className="flex-grow-1"
                            onClick={() => addToCart(product)}
                            disabled={isPresent}
                          >
                            {isPresent ? "In Cart" : "Add To Cart"}
                          </Button>
                          <Button variant="success">Buy</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
