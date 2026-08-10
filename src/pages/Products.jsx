import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

import "../styles/products.css";

function Products() {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // FETCH PRODUCTS FROM FIREBASE
  // ========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const productsRef = collection(db, "products");

      const snapshot = await getDocs(productsRef);

      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Firebase Products:", productList);

      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);

      setError(
        "Unable to load products. Please check your Firebase connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD PRODUCTS ON PAGE LOAD
  // ========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ========================================
  // ADD TO CART
  // ========================================

  const handleAddToCart = (product) => {
    if (!product) {
      return;
    }

    const stock = Number(product.stock);

    if (product.stock !== undefined && stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    addToCart(product, 1);

    alert(`${product.name || "Product"} added to cart!`);
  };

  // ========================================
  // BUY NOW
  // ========================================

  const handleBuyNow = (product) => {
    if (!product) {
      return;
    }

    const stock = Number(product.stock);

    if (product.stock !== undefined && stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    addToCart(product, 1);

    navigate("/cart");
  };

  // ========================================
  // IMAGE ERROR HANDLER
  // ========================================

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;

    event.currentTarget.src =
      "https://placehold.co/800x600?text=Product+Image";
  };

  // ========================================
  // IMAGE LOADING HANDLER
  // ========================================

  const handleImageLoad = (event) => {
    event.currentTarget.classList.add("image-loaded");
  };

  return (
    <>
      <Navbar />

      <main className="products-container">
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="products-header">
          <div>
            <span>OUR COLLECTION</span>

            <h1>All Products</h1>

            <p>
              Discover our latest products and find something you love.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchProducts}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        {/* ========================================
            LOADING
        ======================================== */}

        {loading && (
          <div className="products-message">
            <div className="loading-spinner"></div>

            <p>Loading products...</p>
          </div>
        )}

        {/* ========================================
            ERROR
        ======================================== */}

        {!loading && error && (
          <div className="products-message error-message">
            <div className="empty-icon">⚠️</div>

            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={fetchProducts}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ========================================
            EMPTY
        ======================================== */}

        {!loading && !error && products.length === 0 && (
          <div className="products-message">
            <div className="empty-icon">🛍️</div>

            <h2>No Products Found</h2>

            <p>
              There are currently no products in the Firebase
              products collection.
            </p>

            <button
              type="button"
              onClick={fetchProducts}
            >
              Refresh Products
            </button>
          </div>
        )}

        {/* ========================================
            PRODUCTS GRID
        ======================================== */}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => {
              const outOfStock =
                product.stock !== undefined &&
                Number(product.stock) <= 0;

              return (
                <div
                  className="product-card"
                  key={product.id}
                >
                  {/* ========================================
                      PRODUCT IMAGE
                  ======================================== */}

                  <div className="product-image">
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/800x600?text=Product+Image"
                      }
                      alt={product.name || "Product"}
                      loading="lazy"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />

                    {/* CATEGORY */}

                    {product.category && (
                      <span className="product-category">
                        {product.category}
                      </span>
                    )}

                    {/* OUT OF STOCK */}

                    {outOfStock && (
                      <span className="out-of-stock-badge">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* ========================================
                      PRODUCT CONTENT
                  ======================================== */}

                  <div className="product-content">
                    {/* PRODUCT NAME */}

                    <h2>
                      {product.name || "Unnamed Product"}
                    </h2>

                    {/* DESCRIPTION */}

                    <p className="product-description">
                      {product.description ||
                        "No description available."}
                    </p>

                    {/* RATING */}

                    {product.rating !== undefined && (
                      <div className="product-rating">
                        <span>★</span>

                        <span>
                          {Number(product.rating).toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* PRICE + STOCK */}

                    <div className="product-bottom">
                      <strong className="product-price">
                        ₹
                        {Number(product.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      {product.stock !== undefined && (
                        <span
                          className={
                            outOfStock
                              ? "product-stock out"
                              : "product-stock"
                          }
                        >
                          {outOfStock
                            ? "Out of stock"
                            : `${product.stock} in stock`}
                        </span>
                      )}
                    </div>

                    {/* ========================================
                        BUTTONS
                    ======================================== */}

                    <div className="product-buttons">
                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        className="details-button"
                        onClick={() =>
                          navigate(
                            `/product/${product.id}`
                          )
                        }
                      >
                        View Details
                      </button>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="cart-button"
                        disabled={outOfStock}
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        🛒 Add to Cart
                      </button>

                      {/* BUY NOW */}

                      <button
                        type="button"
                        className="buy-now-button"
                        disabled={outOfStock}
                        onClick={() =>
                          handleBuyNow(product)
                        }
                      >
                        ⚡ Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default Products;