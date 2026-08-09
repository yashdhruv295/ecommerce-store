import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter basename="/ecommerce-store">
      <CartProvider>
        <Routes>

          {/* DEFAULT PAGE → LOGIN */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* HOME */}
          <Route
            path="/home"
            element={<Home />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* INVALID URL → LOGIN */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;