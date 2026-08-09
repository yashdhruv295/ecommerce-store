import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <Navbar />

      {/* HERO SECTION */}

      <section className="home-hero">

        <div className="hero-content">

          <span className="hero-badge">
            ✨ Welcome to Our Store
          </span>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p>
            Discover quality products at amazing prices.
            Browse our collection and find everything you need
            in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now →
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="hero-card card-one">
            🛍️
          </div>

          <div className="hero-card card-two">
            📦
          </div>

          <div className="hero-card card-three">
            ⭐
          </div>

          <div className="hero-main-icon">
            🛒
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="home-features">

        <div className="feature-card">

          <div className="feature-icon">
            🚚
          </div>

          <div>
            <h3>Fast Delivery</h3>

            <p>
              Quick and reliable delivery
              to your doorstep.
            </p>
          </div>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            🔒
          </div>

          <div>
            <h3>Secure Shopping</h3>

            <p>
              Your shopping experience
              is safe and secure.
            </p>
          </div>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            💎
          </div>

          <div>
            <h3>Quality Products</h3>

            <p>
              Carefully selected products
              for our customers.
            </p>
          </div>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            💬
          </div>

          <div>
            <h3>Customer Support</h3>

            <p>
              We are always here to
              help you.
            </p>
          </div>

        </div>

      </section>

      {/* CATEGORY SECTION */}

      <section className="home-categories">

        <div className="section-heading">

          <span>EXPLORE</span>

          <h2>
            Shop by Category
          </h2>

          <p>
            Find products that match
            your needs.
          </p>

        </div>

        <div className="category-grid">

          <div
            className="category-card"
            onClick={() => navigate("/products")}
          >
            <div className="category-icon">
              📱
            </div>

            <h3>Electronics</h3>

            <p>
              Latest gadgets & devices
            </p>

            <span>
              Explore →
            </span>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products")}
          >
            <div className="category-icon">
              👕
            </div>

            <h3>Fashion</h3>

            <p>
              Style for every occasion
            </p>

            <span>
              Explore →
            </span>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products")}
          >
            <div className="category-icon">
              🏠
            </div>

            <h3>Home & Living</h3>

            <p>
              Make your home beautiful
            </p>

            <span>
              Explore →
            </span>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products")}
          >
            <div className="category-icon">
              🎮
            </div>

            <h3>Entertainment</h3>

            <p>
              Fun & entertainment products
            </p>

            <span>
              Explore →
            </span>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="home-cta">

        <div>

          <span>
            READY TO SHOP?
          </span>

          <h2>
            Find Something You Love
          </h2>

          <p>
            Explore our products and start
            your shopping journey today.
          </p>

        </div>

        <button
          onClick={() => navigate("/products")}
        >
          Start Shopping →
        </button>

      </section>

      {/* FOOTER */}

      <footer className="home-footer">

        <div>
          © 2026 E-Commerce Store
        </div>

        <div>
          Made with ❤️ for better shopping
        </div>

      </footer>

    </div>
  );
}

export default Home;