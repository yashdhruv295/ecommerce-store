import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    try {

      const savedCart =
        localStorage.getItem("cartItems");

      if (!savedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];

    } catch (error) {

      console.error(
        "Error loading cart:",
        error
      );

      return [];
    }

  });


  // SAVE CART

  useEffect(() => {

    try {

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );

    } catch (error) {

      console.error(
        "Error saving cart:",
        error
      );

    }

  }, [cartItems]);


  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (
    product,
    quantity = 1
  ) => {

    if (
      !product ||
      !product.id
    ) {

      console.error(
        "Invalid product:",
        product
      );

      return;
    }


    const productQuantity =
      Math.max(
        1,
        Number(quantity) || 1
      );


    setCartItems(
      (currentItems) => {

        const existingItem =
          currentItems.find(
            (item) =>
              item.id === product.id
          );


        // PRODUCT ALREADY EXISTS

        if (existingItem) {

          return currentItems.map(
            (item) =>
              item.id === product.id
                ? {
                    ...item,

                    quantity:
                      Number(
                        item.quantity || 0
                      ) +
                      productQuantity,
                  }
                : item
          );

        }


        // NEW PRODUCT

        return [
          ...currentItems,

          {
            id: product.id,

            name:
              product.name ||
              "Product",

            price:
              Number(
                product.price
              ) || 0,

            image:
              product.image || "",

            emoji:
              product.emoji || "",

            category:
              product.category || "",

            description:
              product.description || "",

            quantity:
              productQuantity,
          },
        ];

      }
    );

  };


  // =========================
  // INCREASE
  // =========================

  const increaseQuantity = (
    productId
  ) => {

    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) =>
            item.id === productId
              ? {
                  ...item,

                  quantity:
                    Number(
                      item.quantity || 0
                    ) + 1,
                }
              : item
        )
    );

  };


  // =========================
  // DECREASE
  // =========================

  const decreaseQuantity = (
    productId
  ) => {

    setCartItems(
      (currentItems) =>
        currentItems
          .map(
            (item) =>
              item.id === productId
                ? {
                    ...item,

                    quantity:
                      Number(
                        item.quantity || 0
                      ) - 1,
                  }
                : item
          )
          .filter(
            (item) =>
              Number(
                item.quantity || 0
              ) > 0
          )
    );

  };


  // =========================
  // REMOVE
  // =========================

  const removeFromCart = (
    productId
  ) => {

    setCartItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            item.id !== productId
        )
    );

  };


  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {

    setCartItems([]);

  };


  // =========================
  // CART COUNT
  // =========================

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );


  // =========================
  // CART TOTAL
  // =========================

  const cartTotal =
    cartItems.reduce(
      (total, item) => {

        const price =
          Number(
            item.price
          ) || 0;

        const quantity =
          Number(
            item.quantity
          ) || 0;

        return (
          total +
          price * quantity
        );

      },
      0
    );


  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );

}


// =========================
// USE CART
// =========================

export function useCart() {

  const context =
    useContext(
      CartContext
    );

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;

}