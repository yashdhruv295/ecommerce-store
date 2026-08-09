import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const usersRef = collection(db, "users");

      const snapshot = await getDocs(usersRef);

      let loggedInUser = null;

      snapshot.forEach((doc) => {
        const user = doc.data();

        if (
          user.email &&
          user.email.toLowerCase() === email &&
          user.password === password
        ) {
          loggedInUser = {
            id: doc.id,
            ...user,
          };
        }
      });

      if (!loggedInUser) {
        alert("Invalid email or password.");
        return;
      }

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
      );

      alert("Login successful!");

      // IMPORTANT:
      // Login ke baad Dashboard nahi,
      // Home page open hoga.
      navigate("/home", { replace: true });

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Login failed. Please check your Firebase connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your e-commerce account
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* REGISTER */}

        <div className="register-link">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;