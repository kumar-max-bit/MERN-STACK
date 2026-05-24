import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    userType: "user",
    state: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.state || details.state === "Choose State") {
      toast.warning("Please choose a valid State");
      return;
    }
    if (details.userType === "Choose User Type") {
      details.userType = "user";
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        details
      );
      toast.success("Registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div id="form-container" className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <Form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-sm border" style={{ width: "650px" }}>
        <h3 className="fw-bold text-center mb-4">Create Account</h3>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              required
              placeholder="e.g. Rahul Sharma"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label className="fw-semibold">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              pattern="[6-9]{1}[0-9]{9}"
              placeholder="10-digit mobile number"
              required
              onChange={handleChange}
              name="phone"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridUserType">
            <Form.Label className="fw-semibold">User Role</Form.Label>
            <Form.Select name="userType" onChange={handleChange}>
              <option value="user">Customer</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              required
              placeholder="Create Password"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label className="fw-semibold">Street Address</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="address"
            required
            placeholder="Flat No. / House No., Area, Landmark"
          />
        </Form.Group>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label className="fw-semibold">City</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="city"
              required
              placeholder="e.g. Hyderabad"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className="fw-semibold">State</Form.Label>
            <Form.Select
              onChange={handleChange}
              name="state"
              required
            >
              <option>Choose State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label className="fw-semibold">PIN Code</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="zipCode"
              required
              placeholder="6-digit PIN"
            />
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small text-muted">
            Already have an account?{" "}
            <a href="/login" className="text-warning fw-bold text-decoration-none">
              Sign In
            </a>
          </span>
        </div>

        <Button variant="warning" type="submit" className="w-100 fw-bold py-2 shadow-sm">
          Register Account
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Register;
