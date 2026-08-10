import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* =========================
          BRAND / LOGO
      ========================== */}
      <div
        className="navbar-brand"
        onClick={() => handleNavigation("/home")}
      >
        <div className="brand-icon">
          🛍️
        </div>

        <div className="brand-text">
          <span className="brand-name">Ecom</span>
          <span className="brand-store">Store</span>
        </div>
      </div>


      {/* =========================
          DESKTOP NAVIGATION
      ========================== */}
      <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>

        <Link
          to="/home"
          className={isActive("/home") ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-icon">⌂</span>
          Home
        </Link>

        <Link
          to="/products"
          className={isActive("/products") ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-icon">▦</span>
          Products
        </Link>

        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-icon">▥</span>
          Dashboard
        </Link>

      </div>


      {/* =========================
          RIGHT ACTIONS
      ========================== */}
      <div className="navbar-actions">

        {/* Cart */}
        <Link
          to="/cart"
          className={`cart-button ${
            isActive("/cart") ? "cart-active" : ""
          }`}
          aria-label="Shopping Cart"
        >
          <span className="cart-icon">
            🛒
          </span>

          <span className="cart-text">
            Cart
          </span>

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>


        {/* Login */}
        <Link
          to="/login"
          className="navbar-login"
        >
          <span className="login-icon">
            👤
          </span>

          <span>
            Login
          </span>
        </Link>


        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;