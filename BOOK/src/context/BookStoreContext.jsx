import { createContext, useContext, useState, useEffect } from 'react';

const BookStoreContext = createContext();

export const BOOKS_DATA = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    originalPrice: 699,
    image: "https://picsum.photos/seed/atomichabits/300/400",
    category: "Self Help",
    rating: 4.8,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how tiny changes can lead to remarkable results.",
    pages: 320,
    publisher: "Avery",
    year: 2018
  },
  {
    id: 2,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 699,
    originalPrice: 899,
    image: "https://picsum.photos/seed/harrypotter/300/400",
    category: "Fiction",
    rating: 4.9,
    description: "The first book in the legendary Harry Potter series. Follow young Harry as he discovers he's a wizard and begins his journey at Hogwarts.",
    pages: 309,
    publisher: "Scholastic",
    year: 1997
  },
  {
    id: 3,
    title: "Ikigai: The Japanese Secret",
    author: "Héctor García",
    price: 299,
    originalPrice: 499,
    image: "https://picsum.photos/seed/ikigai/300/400",
    category: "Self Help",
    rating: 4.6,
    description: "Discover the Japanese concept of ikigai—a reason for living. Find joy, purpose, and balance in your daily life with these timeless wisdom teachings.",
    pages: 208,
    publisher: "Penguin",
    year: 2016
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 350,
    originalPrice: 550,
    image: "https://picsum.photos/seed/richdad/300/400",
    category: "Finance",
    rating: 4.7,
    description: "What the rich teach their kids about money that the poor and middle class do not. A classic personal finance book that changes mindsets.",
    pages: 336,
    publisher: "Plata Publishing",
    year: 1997
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 399,
    originalPrice: 599,
    image: "https://picsum.photos/seed/alchemist/300/400",
    category: "Fiction",
    rating: 4.8,
    description: "A mystical story about a young shepherd named Santiago who travels from Spain to Egypt in search of treasure buried near the Pyramids.",
    pages: 208,
    publisher: "HarperOne",
    year: 1988
  },
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 450,
    originalPrice: 650,
    image: "https://picsum.photos/seed/thinkgrow/300/400",
    category: "Finance",
    rating: 4.5,
    description: "The classic money-making book. Napoleon Hill reveals the secret to wealth that made Henry Ford, Thomas Edison, and other tycoons successful.",
    pages: 320,
    publisher: "Wilder Publications",
    year: 1937
  },
  {
    id: 7,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 550,
    originalPrice: 750,
    image: "https://picsum.photos/seed/psychologymoney/300/400",
    category: "Finance",
    rating: 4.9,
    description: "Timeless lessons on wealth, greed, and happiness. This book explores the strange ways people think about money and teaches you how to make better financial decisions.",
    pages: 256,
    publisher: "Harriman House",
    year: 2020
  },
  {
    id: 8,
    title: "Deep Work",
    author: "Cal Newport",
    price: 480,
    originalPrice: 680,
    image: "https://picsum.photos/seed/deepwork/300/400",
    category: "Self Help",
    rating: 4.7,
    description: "Rules for focused success in a distracted world. Learn how to cultivate deep focus and produce high-quality work in our increasingly distracted world.",
    pages: 304,
    publisher: "Grand Central Publishing",
    year: 2016
  },
  {
    id: 9,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 620,
    originalPrice: 820,
    image: "https://picsum.photos/seed/hobbit/300/400",
    category: "Fiction",
    rating: 4.8,
    description: "The classic prelude to The Lord of the Rings. Follow Bilbo Baggins on an unexpected journey with a company of dwarves to reclaim their mountain home.",
    pages: 310,
    publisher: "Houghton Mifflin",
    year: 1937
  },
  {
    id: 10,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    price: 599,
    originalPrice: 899,
    image: "https://picsum.photos/seed/intelligentinvestor/300/400",
    category: "Finance",
    rating: 4.6,
    description: "The definitive book on value investing. Warren Buffett's favorite investing book, providing timeless strategies for long-term investing success.",
    pages: 640,
    publisher: "Harper Business",
    year: 1949
  },
  {
    id: 11,
    title: "Eleanor Oliphant Is Completely Fine",
    author: "Gail Honeyman",
    price: 349,
    originalPrice: 549,
    image: "https://picsum.photos/seed/eleanor/300/400",
    category: "Fiction",
    rating: 4.5,
    description: "A warm, funny, and uplifting novel about a socially awkward woman who learns the importance of friendship and human connection.",
    pages: 320,
    publisher: "Viking",
    year: 2017
  },
  {
    id: 12,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 420,
    originalPrice: 620,
    image: "https://picsum.photos/seed/7habits/300/400",
    category: "Self Help",
    rating: 4.7,
    description: "A holistic, principle-centered approach for solving personal and professional problems. One of the most influential self-help books ever written.",
    pages: 432,
    publisher: "Free Press",
    year: 1989
  }
];

export const COUPONS = [
  { code: "WELCOME10", discount: 10, type: "percent", description: "10% off for new customers" },
  { code: "BOOKS50", discount: 50, type: "fixed", description: "₹50 off on orders above ₹500", minOrder: 500 },
  { code: "SUMMER20", discount: 20, type: "percent", description: "Summer sale - 20% off everything" },
  { code: "BIGSPENDER", discount: 100, type: "fixed", description: "₹100 off on orders above ₹1000", minOrder: 1000 }
];

export function BookStoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bookstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bookstore_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('bookstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bookstore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (book) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === book.id);
      if (exists) {
        return prev.filter(item => item.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const isInWishlist = (bookId) => wishlist.some(item => item.id === bookId);

  const isInCart = (bookId) => cart.some(item => item.id === bookId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyCoupon = (code) => {
    const coupon = COUPONS.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (!coupon) {
      return { success: false, message: "Invalid coupon code" };
    }
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order value ₹${coupon.minOrder} required` };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon applied: ${coupon.description}` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = Math.round(subtotal * (appliedCoupon.discount / 100));
    } else {
      discount = appliedCoupon.discount;
    }
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <BookStoreContext.Provider
      value={{
        books: BOOKS_DATA,
        coupons: COUPONS,
        cart,
        wishlist,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isInCart,
        cartCount,
        subtotal,
        discount,
        total,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
}

export function useBookStore() {
  const context = useContext(BookStoreContext);
  if (!context) {
    throw new Error("useBookStore must be used within a BookStoreProvider");
  }
  return context;
}
