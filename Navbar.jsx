import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/home")}
      >
        🛍️
        <span>EcomStore</span>
      </div>


      {/* Navigation Links */}
      <div className="navbar-links">

        <Link to="/home">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>


      {/* Right Side */}
      <div className="navbar-actions">

        {/* Cart */}
        <Link
          to="/cart"
          className="cart-button"
          aria-label="Shopping Cart"
        >
          <span className="cart-icon">
            🛒
          </span>

          <span className="cart-text">
            Cart
          </span>

          <span className="cart-count">
            {cartCount}
          </span>
        </Link>


        {/* Login */}
        <Link
          to="/login"
          className="navbar-login"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;