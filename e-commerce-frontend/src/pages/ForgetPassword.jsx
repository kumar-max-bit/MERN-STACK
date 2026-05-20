import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.email) {
      toast.warn("Email is required");
      return;
    }
    if (!details.password) {
      toast.warn("New Password is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/forgot-password", details);
      toast.success("Password reset successfully! 😊");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to reset password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div id="form-container">
        <h2>Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              value={details.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={details.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <span>
              Remember your password? <Link to="/login">Login</Link>
            </span>
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
