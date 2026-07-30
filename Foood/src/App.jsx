import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Menu from './pages/Menu';
import VegMenu from './pages/VegMenu';
import NonVegMenu from './pages/NonVegMenu';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/admin/Dashboard';
import ManageFoods from './pages/admin/ManageFoods';
import AddFood from './pages/admin/AddFood';
import EditFood from './pages/admin/EditFood';
import ManageOrders from './pages/admin/ManageOrders';

import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Customer-facing site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/veg" element={<VegMenu />} />
        <Route path="/non-veg" element={<NonVegMenu />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="foods" element={<ManageFoods />} />
        <Route path="foods/add" element={<AddFood />} />
        <Route path="foods/edit/:id" element={<EditFood />} />
        <Route path="orders" element={<ManageOrders />} />
      </Route>
    </Routes>
  );
}
