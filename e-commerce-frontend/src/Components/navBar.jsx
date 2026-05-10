import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../service/CartProvider";

function NavBar() {
  const { items, isLogin, setIsLogin } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <div
      id="navbar-container"
      style={{ position: "sticky", top: "0px", zIndex: "3" }}
    >
      <Navbar expand="lg" id="nav-container">
        <Container>
          <Navbar.Brand>
            <Link id="brand-name" to={isLogin ? "/home" : "/"}>
              Alpha Mart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={isLogin ? "/home" : "/"}>
                Home
              </Nav.Link>
              {!isLogin && (
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              )}
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/products">
                  View Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cart">
                  Cart Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/dashboard">
                  Dashboard
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {isLogin ? (
          <button
            id="login-btn"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            LogOut
          </button>
        ) : (
          <Link to="/login" id="login-btn" className="btn btn-primary">
            Login
          </Link>
        )}

        <Link to="/cart" id="cart-btn">
          Cart {items.length}
        </Link>
      </Navbar>
    </div>
  );
}

export default NavBar;