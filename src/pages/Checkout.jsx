import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const shipping =
    cartTotal >= 2000 || cartTotal === 0 ? 0 : 99;

  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },

        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name || "",
          price: Number(item.price) || 0,
          quantity: item.quantity || 1,
          image: item.image || "",
          category: item.category || "",
        })),

        itemCount: cartCount,
        subtotal: cartTotal,
        shipping: shipping,
        total: grandTotal,

        status: "Pending",
        paymentStatus: "Pending",
        paymentMethod: "Cash on Delivery",

        createdAt: serverTimestamp(),
      };

      const orderRef = await addDoc(
        collection(db, "orders"),
        orderData
      );

      clearCart();

      alert(
        `Order placed successfully!\nOrder ID: ${orderRef.id}`
      );

      navigate("/home");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />

        <div className="checkout-empty">
          <div>🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products before going to checkout.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-container">

        <div className="checkout-header">
          <p>CHECKOUT</p>

          <h1>Complete Your Order</h1>

          <span>
            Enter your delivery details below.
          </span>
        </div>

        <div className="checkout-layout">

          {/* CUSTOMER DETAILS */}

          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >

            <div className="checkout-section">

              <h2>
                👤 Customer Information
              </h2>

              <div className="form-grid">

                <div className="checkout-input">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-input">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-input">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="checkout-section">

              <h2>
                📍 Delivery Address
              </h2>

              <div className="checkout-input">

                <label>Address</label>

                <textarea
                  name="address"
                  placeholder="House No, Street, Area"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              <div className="form-grid">

                <div className="checkout-input">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-input">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-input">
                  <label>PIN Code</label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6-digit PIN"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="checkout-section">

              <h2>
                💳 Payment Method
              </h2>

              <div className="payment-option">

                <div className="payment-radio">
                  ✓
                </div>

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <p>
                    Pay when your order is delivered.
                  </p>
                </div>

              </div>

            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : `Place Order • ₹${grandTotal.toLocaleString(
                    "en-IN"
                  )}`}
            </button>

          </form>

          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <h2>Order Summary</h2>

            <div className="checkout-products">

              {cartItems.map((item) => (
                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <div className="checkout-product-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      "🛍️"
                    )}

                  </div>

                  <div className="checkout-product-info">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      Qty: {item.quantity}
                    </span>

                  </div>

                  <strong>
                    ₹{(
                      Number(item.price || 0) *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>
              ))}

            </div>

            <div className="checkout-line"></div>

            <div className="checkout-total-row">
              <span>Subtotal</span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="checkout-total-row">
              <span>Shipping</span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </strong>
            </div>

            <div className="checkout-line"></div>

            <div className="checkout-grand-total">

              <span>Total</span>

              <strong>
                ₹{grandTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="checkout-security">
              🔒 Secure Order
            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default Checkout;