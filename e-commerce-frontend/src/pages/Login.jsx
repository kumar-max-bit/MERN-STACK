import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../service/CartProvider";

const Login = () => {
  const { setIsLogin } = useContext(CartContext);
  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  //function to fetch input values
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // form reset function
  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  //function to handle form submit
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/user/login", {
        username: loginDetails.username,
        password: loginDetails.password,
      });
      toast.success("login successful");

      localStorage.setItem("token", response.data.token);
      setIsLogin(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div id="form-container" className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Form onSubmit={handleLogin} className="bg-white p-5 rounded shadow-sm border" style={{ width: "400px" }}>
        <h3 className="fw-bold text-center mb-4">Sign In</h3>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            required
            onChange={handleChange}
            value={loginDetails.username}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
            value={loginDetails.password}
          />
        </Form.Group>

        {/* button row */}
        <Row className="g-2">
          <Col>
            <Button type="submit" variant="warning" className="w-100 fw-bold py-2">
              SignIn
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleReset}
              type="button"
              variant="outline-secondary"
              className="w-100 py-2"
            >
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
