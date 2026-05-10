import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../service/CartProvider";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    otp: "",
  });

  const { setIsLogin } = useContext(CartContext);
  const navigate = useNavigate();
  const [mailOtp, setMailOtp] = useState(null);

  //function to fetch input values
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  //function to generate otp and send to mail
  const generateOtp = async () => {
    if (!loginDetails.username) {
      toast.warn("Please enter your email first.");
      return;
    }
    try {
      let generatedOtp = Math.floor(Math.random() * 1000000);
      setMailOtp(generatedOtp);

      let formData = {
        email: loginDetails.username,
        otp: generatedOtp,
      };

      // This sends the OTP via email.
      // WARNING: This is NOT secure for a real application.
      // OTP generation and verification must happen on the server.
      await emailjs.send("service_9l1dihp", "template_7bth6c8", formData, {
        publicKey: "N3xga7GAtw352Ac-q",
      });

      toast.success("OTP sent to your email successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate OTP");
    }
  };

  //function to handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginDetails.password) {
      toast.warn("Password is required");
      return;
    }
    if (mailOtp === null) {
      toast.warn("Please generate an OTP first.");
      return;
    }
    // In a real app, you would send username, password, and OTP to your backend for verification.
    // Here, we are simulating it on the client, which is insecure.
    if (mailOtp === Number(loginDetails.otp) && loginDetails.password) {
      toast.success("Login successful!");
      localStorage.setItem("token", "241sadgghs3546adDh"); // This is just a dummy token
      setIsLogin(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.warn("Invalid OTP or password.");
    }
  };

  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
      otp: "",
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
        <Row className="my-2">
          <Col>
            <Button type="button" onClick={generateOtp} variant="info">
              Generate OTP
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="otp"
              placeholder="enter otp"
              onChange={handleChange}
              value={loginDetails.otp}
              required
            />
          </Col>
        </Row>
        {/* button  row  */}
        <Row className="my-2">
          <Col>
            <Button
              variant="primary"
              type="submit"
              disabled={!loginDetails.otp}
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