import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";


function Dashboard() {

  const navigate =
    useNavigate();


  return (

    <>

      <Navbar />


      <main className="dashboard-container">


        {/* HEADER */}

        <section className="dashboard-header">

          <span className="dashboard-label">
            MY ACCOUNT
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Manage your shopping account,
            orders and products.
          </p>

        </section>


        {/* CARDS */}

        <section className="dashboard-grid">


          {/* CART */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/cart"
              )
            }
          >

            <div className="dashboard-card-icon">
              🛒
            </div>

            <div className="dashboard-card-content">

              <h2>
                Cart
              </h2>

              <p>
                View your shopping cart
                and manage your items.
              </p>

              <span>
                View Cart →
              </span>

            </div>

          </div>


          {/* ORDERS */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/orders"
              )
            }
          >

            <div className="dashboard-card-icon">
              📦
            </div>

            <div className="dashboard-card-content">

              <h2>
                My Orders
              </h2>

              <p>
                View your previous and
                current orders.
              </p>

              <span>
                View Orders →
              </span>

            </div>

          </div>


          {/* PRODUCTS */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >

            <div className="dashboard-card-icon">
              🛍️
            </div>

            <div className="dashboard-card-content">

              <h2>
                Products
              </h2>

              <p>
                Browse all available
                products.
              </p>

              <span>
                Shop Products →
              </span>

            </div>

          </div>


          {/* PROFILE */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate(
                "/profile"
              )
            }
          >

            <div className="dashboard-card-icon">
              👤
            </div>

            <div className="dashboard-card-content">

              <h2>
                My Profile
              </h2>

              <p>
                View and manage your
                profile information.
              </p>

              <span>
                View Profile →
              </span>

            </div>

          </div>


        </section>


        {/* QUICK ACTIONS */}

        <section className="dashboard-actions">

          <h2>
            Quick Actions
          </h2>


          <div className="quick-actions-grid">


            <button
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              🛍️ Continue Shopping
            </button>


            <button
              onClick={() =>
                navigate(
                  "/cart"
                )
              }
            >
              🛒 Open Cart
            </button>


            <button
              onClick={() =>
                navigate(
                  "/orders"
                )
              }
            >
              📦 My Orders
            </button>


            <button
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
            >
              👤 My Profile
            </button>


          </div>

        </section>


      </main>

    </>

  );

}


export default Dashboard;