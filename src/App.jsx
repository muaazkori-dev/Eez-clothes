import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* Main Layout */}
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Drawer and Modals */}
          <CartDrawer />
          <AuthModal />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
