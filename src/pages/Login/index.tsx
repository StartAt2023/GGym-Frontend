import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import "./styles.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login for user:", formData.username);
      
      await authAPI.login(formData);
      
      console.log("Login successful");
      // Refresh the page to update the navigation bar with user info
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login failed:", err);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (err.response?.status === 500) {
        errorMessage = "Server error. Please check if the backend server is running.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response?.data?.message || "Invalid login credentials.";
      } else if (err.response?.status === 401) {
        errorMessage = err.response?.data?.message || "Invalid username or password. Please check your credentials.";
      } else if (err.response?.status === 404) {
        errorMessage = "Login endpoint not found. Please check the API configuration.";
      } else if (err.code === 'ECONNREFUSED') {
        errorMessage = "Cannot connect to server. Please check if the backend is running on port 5000.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = `Login error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 