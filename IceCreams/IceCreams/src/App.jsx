import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import IbacoShopRoutes from './shops/ibaco'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shops/ibaco/*" element={<IbacoShopRoutes />} />
        <Route path="/" element={<div>Welcome to Ibaco Ice Cream Shop! <a href="#/shops/ibaco">Visit Shop</a></div>} />
      </Routes>
    </Router>
  )
}

export default App
