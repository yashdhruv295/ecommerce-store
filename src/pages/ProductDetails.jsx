import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import Navbar from "../components/Navbar";

import {
  db,
} from "../firebase/firebase";

import {
  useCart,
} from "../context/CartContext";

import "../styles/product-details.css";


function ProductDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    addToCart,
  } = useCart();


  const [
    product,
    setProduct,
  ] = useState(null);


  const [
    quantity,
    setQuantity,
  ] = useState(1);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {

    fetchProduct();

  }, [id]);


  const fetchProduct =
    async () => {

      try {

        setLoading(true);

        setError("");


        const productRef =
          doc(
            db,
            "products",
            id
          );


        const snapshot =
          await getDoc(
            productRef
          );


        if (
          snapshot.exists()
        ) {

          setProduct({

            id:
              snapshot.id,

            ...snapshot.data(),

          });

        } else {

          setError(
            "Product not found."
          );

        }

      } catch (err) {

        console.error(
          "Error loading product:",
          err
        );


        setError(
          "Unable to load product. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


  // =========================
  // INCREASE
  // =========================

  const increaseQuantity =
    () => {

      if (!product) {
        return;
      }


      const stock =
        Number(
          product.stock || 0
        );


      if (
        stock > 0 &&
        quantity >= stock
      ) {

        return;

      }


      setQuantity(
        (current) =>
          current + 1
      );

    };


  // =========================
  // DECREASE
  // =========================

  const decreaseQuantity =
    () => {

      setQuantity(
        (current) =>
          current > 1
            ? current - 1
            : 1
      );

    };


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart =
    () => {

      if (!product) {
        return;
      }


      const stock =
        Number(
          product.stock || 0
        );


      if (stock <= 0) {

        alert(
          "This product is out of stock."
        );

        return;

      }


      if (
        quantity > stock
      ) {

        alert(
          `Only ${stock} item${
            stock > 1
              ? "s"
              : ""
          } available.`
        );

        return;

      }


      addToCart(
        product,
        quantity
      );


      alert(
        `${quantity} × ${
          product.name ||
          "Product"
        } added to cart!`
      );

    };


  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow =
    () => {

      if (!product) {
        return;
      }


      const stock =
        Number(
          product.stock || 0
        );


      if (stock <= 0) {

        alert(
          "This product is out of stock."
        );

        return;

      }


      if (
        quantity > stock
      ) {

        alert(
          `Only ${stock} item${
            stock > 1
              ? "s"
              : ""
          } available.`
        );

        return;

      }


      addToCart(
        product,
        quantity
      );


      navigate(
        "/cart"
      );

    };


  // =========================
  // LOADING
  // =========================

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


  // =========================
  // ERROR
  // =========================

  if (
    error ||
    !product
  ) {

    return (

      <>

        <Navbar />

        <main className="product-details-page">

          <div className="product-details-error">

            <div className="error-icon">
              😕
            </div>

            <h2>
              {
                error ||
                "Product not found"
              }
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Back to Products
            </button>

          </div>

        </main>

      </>

    );

  }


  const stock =
    Number(
      product.stock || 0
    );


  const isOutOfStock =
    stock <= 0;


  return (

    <>

      <Navbar />


      <main className="product-details-page">


        {/* BREADCRUMB */}

        <div className="product-breadcrumb">

          <button
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            Products
          </button>

          <span>
            /
          </span>

          <span>
            {
              product.name
            }
          </span>

        </div>


        {/* PRODUCT */}

        <section className="product-details-container">


          {/* IMAGE */}

          <div className="product-details-image">

            <div className="product-large-image">

              {product.image ? (

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name ||
                    "Product"
                  }
                  onError={(
                    event
                  ) => {

                    event.currentTarget.style.display =
                      "none";

                  }}
                />

              ) : (

                product.emoji ||
                "🛍️"

              )}

            </div>

          </div>


          {/* INFORMATION */}

          <div className="product-details-info">


            <span className="details-category">

              {
                product.category ||
                "Product"
              }

            </span>


            <h1>

              {
                product.name ||
                "Unnamed Product"
              }

            </h1>


            {/* RATING */}

            <div className="details-rating">

              <span>

                ⭐{" "}

                {
                  product.rating ||
                  "4.0"
                }

              </span>

              <span className="rating-text">
                Customer Rating
              </span>

            </div>


            {/* PRICE */}

            <div className="details-price">

              ₹
              {Number(
                product.price || 0
              ).toLocaleString(
                "en-IN"
              )}

            </div>


            {/* DESCRIPTION */}

            <p className="details-description">

              {
                product.description ||
                "This is a high-quality product available at EcomStore."
              }

            </p>


            {/* STOCK */}

            <div className="stock-status">

              {!isOutOfStock ? (

                <>

                  <span className="stock-dot"></span>

                  In Stock (
                  {
                    product.stock
                  }{" "}
                  available)

                </>

              ) : (

                <span className="out-of-stock">
                  Out of Stock
                </span>

              )}

            </div>


            {/* QUANTITY */}

            <div className="details-quantity">

              <span>
                Quantity
              </span>


              <div className="quantity-box">

                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    isOutOfStock
                  }
                >
                  −
                </button>


                <span>
                  {
                    quantity
                  }
                </span>


                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  disabled={
                    isOutOfStock ||
                    quantity >= stock
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="product-actions">


              <button
                type="button"
                className="details-cart-btn"
                onClick={
                  handleAddToCart
                }
                disabled={
                  isOutOfStock
                }
              >
                🛒 Add to Cart
              </button>


              <button
                type="button"
                className="buy-now-btn"
                onClick={
                  handleBuyNow
                }
                disabled={
                  isOutOfStock
                }
              >
                ⚡ Buy Now
              </button>


            </div>


            {/* FEATURES */}

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
