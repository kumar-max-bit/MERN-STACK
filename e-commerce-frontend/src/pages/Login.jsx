import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    otp: "",
  });

  const [mailOtp, setMailOtp] = useState(null);

  //function to fetch input values
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // form reset function
  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
      otp: "",
    });
  };

  //function to generate otp and send to mail
  const generateOtp = async () => {
    try {
      let generatedOtp = Math.floor(Math.random() * 1000000);
      let time = new Date();
      let expiredTime = `${time.getHours()}:${time.getMinutes() + 15}:00`;
      setMailOtp(generatedOtp);

      let formData = {
        email: loginDetails.username,
        otp: generatedOtp,
        time: expiredTime,
      };
      await emailjs.send("service_9l1dihp", "template_7bth6c8", formData, {
        publicKey: "N3xga7GAtw352Ac-q",
      });

      toast.success("otp send to ur mail successfully");
    } catch (err) {
      console.log(err);
      toast.error("failed to generate otp");
    }
  };

  //function to handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginDetails.password === "") {
      toast.warn("Password is required");
      return;
    }
    if (mailOtp === null) {
      toast.warn("Please generate an OTP first.");
      return;
    }
    if (mailOtp === Number(loginDetails.otp)) {
      toast.success("login successful");
    } else {
      toast.warn("invalid otp");
    }
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
            <Button variant="primary" type="submit">
              SignIn
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleReset}
              type="reset"
              variant="warning"
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