import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import IbacoHome from './IbacoHome';
import IbacoMenu from './IbacoMenu';
import ItemDetail from './ItemDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import AdminPanel from './AdminPanel';

// Mount this in your main app's router like:
// <Route path="/shops/ibaco/*" element={<IbacoShopRoutes />} />
const IbacoShopRoutes = () => {
  return (
    <CartProvider>
      <Routes>
        <Route index element={<IbacoHome />} />
        <Route path="menu" element={<IbacoMenu />} />
        <Route path="item/:id" element={<ItemDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="admin" element={<AdminPanel />} />
      </Routes>
    </CartProvider>
  );
};

export default IbacoShopRoutes;
