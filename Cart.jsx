import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = cartTotal >= 2000 || cartTotal === 0 ? 0 : 99;

  const grandTotal = cartTotal + shipping;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />

        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <Navbar />

      <main className="cart-container">

        {/* Header */}

        <div className="cart-header">

          <div>
            <p className="cart-label">
              SHOPPING CART
            </p>

            <h1>Your Cart</h1>

            <p>
              {cartCount} item
              {cartCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button
            className="clear-cart-button"
            onClick={clearCart}
          >
            🗑 Clear Cart
          </button>

        </div>

        {/* Cart Layout */}

        <div className="cart-layout">

          {/* Products */}

          <section className="cart-items">

            {cartItems.map((item) => {

              const itemPrice = Number(item.price) || 0;

              const itemTotal =
                itemPrice * item.quantity;

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* Image */}

                  <div className="cart-item-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>🛍️</span>
                    )}

                  </div>

                  {/* Information */}

                  <div className="cart-item-info">

                    <span className="cart-item-category">
                      {item.category || "Product"}
                    </span>

                    <h2>{item.name}</h2>

                    <p>
                      ₹{itemPrice.toLocaleString("en-IN")}
                      {" "}each
                    </p>

                    {/* Quantity */}

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* Right Side */}

                  <div className="cart-item-right">

                    <strong>
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

            {/* Continue Shopping */}

            <button
              className="continue-shopping"
              onClick={() => navigate("/products")}
            >
              ← Continue Shopping
            </button>

          </section>

          {/* Summary */}

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </strong>

            </div>

            {shipping === 0 && cartTotal > 0 && (
              <p className="free-shipping">
                🎉 You got free shipping!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{grandTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>

            <div className="secure-payment">
              🔒 Secure Checkout
            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Cart;