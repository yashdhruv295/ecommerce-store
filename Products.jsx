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

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || "",
      category: product.category || "",
      quantity: 1,
    });

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">

      <Navbar />

      <main className="products-container">

        {/* HEADER */}

        <div className="products-header">

          <div>
            <span>OUR COLLECTION</span>

            <h1>All Products</h1>

            <p>
              Discover our latest products and
              find something you love.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={fetchProducts}
          >
            ↻ Refresh
          </button>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="products-message">

            <div className="loading-spinner"></div>

            <p>
              Loading products...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="products-message error-message">

            <div>⚠️</div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button onClick={fetchProducts}>
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="products-message">

              <div className="empty-icon">
                🛍️
              </div>

              <h2>
                No Products Found
              </h2>

              <p>
                There are currently no products
                in the Firebase products collection.
              </p>

            </div>
          )}

        {/* PRODUCTS */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="products-grid">

              {products.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  {/* IMAGE */}

                  <div className="product-image">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="no-image">
                        🛍️
                      </div>
                    )}

                    {product.category && (
                      <span className="product-category">
                        {product.category}
                      </span>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="product-content">

                    <h2>
                      {product.name || "Unnamed Product"}
                    </h2>

                    <p className="product-description">
                      {product.description ||
                        "No description available."}
                    </p>

                    <div className="product-bottom">

                      <strong className="product-price">
                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}
                      </strong>

                      {product.stock !== undefined && (
                        <span className="product-stock">
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>
                      )}

                    </div>

                    {/* BUTTONS */}

                    <div className="product-buttons">

                      <button
                        className="details-button"
                        onClick={() =>
                          navigate(
                            `/product/${product.id}`
                          )
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="cart-button"
                        disabled={
                          product.stock !== undefined &&
                          Number(product.stock) <= 0
                        }
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        🛒 Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default Products;