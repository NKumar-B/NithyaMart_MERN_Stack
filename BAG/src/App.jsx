import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </HashRouter>
  );
}

export default App;