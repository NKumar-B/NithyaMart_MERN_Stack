import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Shop from "./pages/Shop";

function App() {
  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/cart" element={<CartPage />} />

      </Routes>
    </HashRouter>
  );
}

export default App;