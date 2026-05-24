import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Tab,
  Tabs,
  Badge
} from "react-bootstrap";
import { CartContext } from "../service/CartProvider";
import axios from "axios";

const Dashboard = () => {
  const { isLogin } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states for Add/Edit Product
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    imageSrc: "",
    about: ""
  });

  // Decode user details on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setUser(decoded);
        setIsAdmin(decoded.role === "admin");
      } catch (e) {
        console.error("Failed to parse token payload:", e);
      }
    }
  }, [isLogin]);

  // Fetch Dashboard data based on role
  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (isAdmin) {
        // Admin: Load all orders, products, and users
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/orders/all", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/products/get-allproducts"),
          axios.get("http://localhost:5000/user/get-users")
        ]);
        setOrders(ordersRes.data.orders || []);
        setProducts(productsRes.data.allProducts || []);
        setUsersList(usersRes.data.allUsers || []);
      } else {
        // Customer: Load only their orders
        const ordersRes = await axios.get("http://localhost:5000/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(ordersRes.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, isAdmin]);

  // Admin: Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/products/add-products", productForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Product added successfully!");
      setShowAddModal(false);
      setProductForm({ name: "", price: "", description: "", ratings: "", imageSrc: "", about: "" });
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product.");
    }
  };

  // Admin: Open Edit modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      ratings: product.ratings || "",
      imageSrc: product.imageSrc || "",
      about: product.about || ""
    });
    setShowEditModal(true);
  };

  // Admin: Edit product handler
  const handleEditProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/products/edit-product/${selectedProduct._id}`,
        productForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product updated successfully!");
      setShowEditModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  // Admin: Delete product handler
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/products/delete-product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Product deleted!");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  // Admin: Update order status handler
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "Shipped":
        return <Badge bg="primary">Shipped</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="warning" text="dark">Processing</Badge>;
    }
  };

  return (
    <Container className="my-5">
      {/* Profile Card */}
      <Card className="shadow border-0 mb-5 overflow-hidden">
        <div className="bg-dark p-4 text-white d-flex align-items-center justify-content-between">
          <div>
            <h3 className="fw-bold mb-1">Welcome back, {user?.email}!</h3>
            <span className="text-warning text-uppercase fw-bold letter-spacing-1">
              Role: {user?.role || "Customer"}
            </span>
          </div>
          {isAdmin && (
            <Button variant="warning" className="fw-bold" onClick={() => setShowAddModal(true)}>
              + Add Product
            </Button>
          )}
        </div>
      </Card>

      {isAdmin ? (
        // Admin Panel Tabs
        <Tabs defaultActiveKey="orders" className="mb-4 shadow-sm p-2 bg-light rounded">
          <Tab eventKey="orders" title="Customer Orders">
            <Card className="border-0 shadow-sm p-3">
              <h4 className="fw-bold mb-3">Manage Orders</h4>
              <Table responsive hover className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td><code className="text-dark">{order._id}</code></td>
                      <td>
                        <div>{order.userId?.name || "N/A"}</div>
                        <small className="text-muted">{order.userId?.email}</small>
                      </td>
                      <td>
                        {order.products.map((p, idx) => (
                          <div key={idx} className="small">
                            • {p.name} (₹{p.price})
                          </div>
                        ))}
                      </td>
                      <td className="fw-bold text-success">₹{order.totalAmount}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Tab>

          <Tab eventKey="products" title="Manage Products">
            <Card className="border-0 shadow-sm p-3">
              <h4 className="fw-bold mb-3">Product Catalog</h4>
              <Table responsive hover className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          height="50px"
                          width="50px"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                      </td>
                      <td className="fw-bold">{product.name}</td>
                      <td className="text-success fw-bold">₹{product.price}</td>
                      <td>★ {product.ratings || "N/A"}</td>
                      <td className="text-truncate" style={{ maxWidth: "250px" }}>
                        {product.description}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm" onClick={() => openEditModal(product)}>
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Tab>

          <Tab eventKey="users" title="System Users">
            <Card className="border-0 shadow-sm p-3">
              <h4 className="fw-bold mb-3">User Registry</h4>
              <Table responsive hover className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((usr) => (
                    <tr key={usr._id}>
                      <td className="fw-bold">{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>{usr.phone}</td>
                      <td>
                        <Badge bg={usr.userType === "admin" ? "danger" : "secondary"}>
                          {usr.userType}
                        </Badge>
                      </td>
                      <td>{usr.city}, {usr.state}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Tab>
        </Tabs>
      ) : (
        // Customer View: Order History
        <Card className="border-0 shadow p-4 bg-white">
          <h3 className="fw-bold mb-4">Your Order History</h3>
          {orders.length === 0 ? (
            <div className="text-center my-5 text-muted fs-5">
              You haven't placed any orders yet.
            </div>
          ) : (
            <Table responsive hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Products Ordered</th>
                  <th>Total Amount</th>
                  <th>Order Status</th>
                  <th>Placed On</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td><code className="text-dark">{order._id}</code></td>
                    <td>
                      {order.products.map((p, idx) => (
                        <div key={idx} className="small">
                          • {p.name}
                        </div>
                      ))}
                    </td>
                    <td className="fw-bold text-success">₹{order.totalAmount}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Product title"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="299"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                placeholder="A brief overview of the product"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ratings (e.g. 4.5)</Form.Label>
              <Form.Control
                type="text"
                placeholder="4.5"
                value={productForm.ratings}
                onChange={(e) => setProductForm({ ...productForm, ratings: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Source Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={productForm.imageSrc}
                onChange={(e) => setProductForm({ ...productForm, imageSrc: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Long "About" Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Full specs and features details..."
                value={productForm.about}
                onChange={(e) => setProductForm({ ...productForm, about: e.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="dark">
                Save Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                required
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="text"
                value={productForm.ratings}
                onChange={(e) => setProductForm({ ...productForm, ratings: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Source Link</Form.Label>
              <Form.Control
                type="url"
                value={productForm.imageSrc}
                onChange={(e) => setProductForm({ ...productForm, imageSrc: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Long "About" Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productForm.about}
                onChange={(e) => setProductForm({ ...productForm, about: e.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="dark">
                Update Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
