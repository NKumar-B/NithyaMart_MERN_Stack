import { Routes, Route } from 'react-router-dom'
import './pages/pages.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import BackToTop from './components/BackToTop/BackToTop.jsx'
import Home from './pages/Home.jsx'
import IceCreams from './pages/IceCreams.jsx'
import Cakes from './pages/Cakes.jsx'
import Chocolates from './pages/Chocolates.jsx'
import ColdBrews from './pages/ColdBrews.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Cart from './pages/Cart.jsx'
import Bill from './pages/Bill.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ice-creams" element={<IceCreams />} />
          <Route path="/ice-cream-cakes" element={<Cakes />} />
          <Route path="/chocolates" element={<Chocolates />} />
          <Route path="/cold-brews" element={<ColdBrews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
