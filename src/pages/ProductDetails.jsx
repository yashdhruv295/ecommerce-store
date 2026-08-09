import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import { useCart } from "../context/CartContext";

import "../styles/product-details.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const productRef = doc(db, "products", id);

      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        setProduct({
          id: productSnapshot.id,
          ...productSnapshot.data(),
        });
      } else {
        setError("Product not found.");
      }
    } catch (err) {
      console.error("Error loading product:", err);

      setError(
        "Unable to load product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="product-details-page">
          <div className="product-details-loading">
            <div className="product-loader"></div>

            <p>
              Loading product...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="product-details-page">
          <div className="product-details-error">

            <div className="error-icon">
              😕
            </div>

            <h2>
              {error || "Product not found"}
            </h2>

            <button
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>

          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-details-page">

        {/* Breadcrumb */}

        <div className="product-breadcrumb">

          <button
            onClick={() => navigate("/products")}
          >
            Products
          </button>

          <span>
            /
          </span>

          <span>
            {product.name}
          </span>

        </div>


        {/* Product Details */}

        <section className="product-details-container">

          {/* Product Image */}

          <div className="product-details-image">

            <div className="product-large-image">
              {product.emoji || "🛍️"}
            </div>

          </div>


          {/* Product Information */}

          <div className="product-details-info">

            <span className="details-category">
              {product.category || "Product"}
            </span>

            <h1>
              {product.name}
            </h1>


            {/* Rating */}

            <div className="details-rating">

              <span>
                ⭐ {product.rating || "4.0"}
              </span>

              <span className="rating-text">
                Customer Rating
              </span>

            </div>


            {/* Price */}

            <div className="details-price">

              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}

            </div>


            {/* Description */}

            <p className="details-description">
              {product.description ||
                "This is a high-quality product available at EcomStore. Shop now and enjoy an excellent shopping experience."}
            </p>


            {/* Stock */}

            <div className="stock-status">

              {Number(product.stock || 0) > 0 ? (
                <>
                  <span className="stock-dot"></span>

                  In Stock
                  {" "}
                  ({product.stock} available)
                </>
              ) : (
                <span className="out-of-stock">
                  Out of Stock
                </span>
              )}

            </div>


            {/* Quantity */}

            <div className="details-quantity">

              <span>
                Quantity
              </span>

              <div className="quantity-box">

                <button
                  onClick={decreaseQuantity}
                  disabled={
                    Number(product.stock || 0) <= 0
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  disabled={
                    Number(product.stock || 0) <= 0 ||
                    quantity >=
                      Number(product.stock || 999999)
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* Actions */}

            <div className="product-actions">

              <button
                className="details-cart-btn"
                onClick={handleAddToCart}
                disabled={
                  Number(product.stock || 0) <= 0
                }
              >
                🛒 Add to Cart
              </button>

              <button
                className="buy-now-btn"
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                disabled={
                  Number(product.stock || 0) <= 0
                }
              >
                Buy Now
              </button>

            </div>


            {/* Features */}

            <div className="product-features">

              <div>
                <span>
                  🚚
                </span>

                <div>
                  <strong>
                    Fast Delivery
                  </strong>

                  <p>
                    Quick delivery to your doorstep
                  </p>
                </div>
              </div>


              <div>
                <span>
                  🔒
                </span>

                <div>
                  <strong>
                    Secure Shopping
                  </strong>

                  <p>
                    Safe and secure checkout
                  </p>
                </div>
              </div>


              <div>
                <span>
                  ↩️
                </span>

                <div>
                  <strong>
                    Easy Returns
                  </strong>

                  <p>
                    Hassle-free return policy
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default ProductDetails;
