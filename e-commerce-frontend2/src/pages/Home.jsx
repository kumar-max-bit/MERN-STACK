import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to Home Page</h1>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary me-2">Go to Register</Link>
        <Link to="/login" className="btn btn-success">Go to Login</Link>
      </div>
    </div>
  );
};

export default Home;