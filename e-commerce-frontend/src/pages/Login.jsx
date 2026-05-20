import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../service/CartProvider";
import axios from "axios";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const { setIsLogin } = useContext(CartContext);
  const navigate = useNavigate();

  //function to fetch input values
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  //function to handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginDetails.username) {
      toast.warn("Email is required");
      return;
    }
    if (!loginDetails.password) {
      toast.warn("Password is required");
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        username: loginDetails.username,
        password: loginDetails.password
      });
      
      toast.success("Login successful! 😊");
      console.log(response.data);
      
      // Save user session in localStorage
      localStorage.setItem("token", "241sadgghs3546adDh");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setIsLogin(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("An error occurred during login");
      }
    }
  };

  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  return (
    <div id="form-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="username"
              onChange={handleChange}
              value={loginDetails.username}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={loginDetails.password}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Form.Group>

        {/* button  row  */}
        <Row className="my-2">
          <Col>
            <Button
              variant="primary"
              type="submit"
            >
              SignIn
            </Button>
          </Col>
          <Col>
            <Button onClick={handleReset} type="reset" variant="warning">
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default Login;