import React from "react";



const ForgetPassword = () => {
    const 
    { details, setDetails } = useState({
        email: "",
        password: "",
    });

    





  return (
    <div>   <div id="form-container">
        <h2>Forget Password</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your registered email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
