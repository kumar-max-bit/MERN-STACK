import { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../service/CartProvider";

function NavBar() {
  const { items, isLogin, setIsLogin } = useContext(CartContext);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setUserRole(decoded.role);
      } catch (e) {
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <div
      id="navbar-container"
      style={{ position: "sticky", top: "0px", zIndex: "1000" }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand className="fw-bold fs-3 text-warning">
            <Link id="brand-name" to="/" className="text-decoration-none text-warning">
              Alpha Mart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
              
              {isLogin && (
                <>
                  <Nav.Link as={Link} to="/products" className="px-3">Shop Products</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard" className="px-3">
                    {userRole === "admin" ? "Admin Panel" : "My Orders"}
                  </Nav.Link>
                </>
              )}

              {userRole === "admin" && (
                <Nav.Link as={Link} to="/view-users" className="px-3">Manage Users</Nav.Link>
              )}

              {!isLogin && (
                <Nav.Link as={Link} to="/register" className="px-3">Register</Nav.Link>
              )}
            </Nav>
            
            <div className="d-flex align-items-center gap-3">
              {isLogin && (
                <Link to="/cart" className="btn btn-outline-light d-flex align-items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span>Cart ({items.length})</span>
                </Link>
              )}

              {isLogin ? (
                <button
                  className="btn btn-warning d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <span>LogOut</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </button>
              ) : (
                <Link to="/login" className="btn btn-warning d-flex align-items-center gap-2">
                  <span>LogIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
