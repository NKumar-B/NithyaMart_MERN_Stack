import { createContext, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const wishlistCount = wishlist.length;
  const cartCount = cart.length;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist 🤍`);
        return current.filter((item) => item.id !== product.id);
      }
      showToast(`Added "${product.name}" to wishlist ❤️`);
      return [...current, product];
    });
  };

  const addToCart = (product) => {
    setCart((current) => {
      if (current.some((item) => item.id === product.id)) {
        showToast(`"${product.name}" is already in your cart! 🛍️`);
        return current;
      }
      showToast(`Added "${product.name}" to cart successfully! 🎉`);
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) => {
      const item = current.find((i) => i.id === productId);
      if (item) showToast(`Removed "${item.name}" from wishlist`);
      return current.filter((item) => item.id !== productId);
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => {
      const item = current.find((i) => i.id === productId);
      if (item) showToast(`Removed "${item.name}" from cart`);
      return current.filter((item) => item.id !== productId);
    });
  };

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      wishlistCount,
      cartCount,
      toggleWishlist,
      addToCart,
      removeFromWishlist,
      removeFromCart,
    }),
    [wishlist, cart, wishlistCount, cartCount]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast-notification">
          {toast}
        </div>
      )}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
