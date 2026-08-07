import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    // Success Message Popup
    showToast("🍫 Chocolate added to cart successfully! 🎉");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className="toast-notification">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;