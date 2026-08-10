import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";


function Orders() {

  const navigate =
    useNavigate();


  return (

    <>

      <Navbar />


      <main className="orders-page">


        <div className="orders-header">

          <span>
            MY ACCOUNT
          </span>

          <h1>
            My Orders
          </h1>

          <p>
            View and manage your orders.
          </p>

        </div>


        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>


          <h2>
            No Orders Yet
          </h2>


          <p>
            You haven't placed any orders yet.
          </p>


          <button
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            Start Shopping →
          </button>

        </div>


      </main>

    </>

  );

}


export default Orders;