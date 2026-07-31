import { createContext, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const wishlistCount = wishlist.length;
  const cartCount = cart.length;

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }
      return [...current, product];
    });
  };

  const addToCart = (product) => {
    setCart((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) =>
      current.filter((item) => item.id !== productId)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.id !== productId)
    );
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
