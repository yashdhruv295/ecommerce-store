import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ecommerceUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ecommerceUser");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>E-Commerce Store</h1>
          <p>Welcome to your dashboard</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">

        <section className="welcome-card">
          <h2>
            Welcome, {user.fullName} 👋
          </h2>

          <p>
            You are successfully logged in.
          </p>
        </section>

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <h3>My Profile</h3>
            <p>View and manage your profile.</p>
          </div>

          <div className="dashboard-card">
            <h3>Products</h3>
            <p>Browse our available products.</p>
          </div>

          <div className="dashboard-card">
            <h3>My Orders</h3>
            <p>View your orders and order status.</p>
          </div>

          <div className="dashboard-card">
            <h3>Cart</h3>
            <p>View products added to your cart.</p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;