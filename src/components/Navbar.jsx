import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount, wishlist, openCart } = useCart();
  const { openAuth } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="menu-overlay" 
          style={{ display: 'block', opacity: 1 }}
          onClick={closeMobileMenu}
        />
      )}

      {/* Navbar */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            Eez<span>Clothes</span>
          </Link>
          <nav className="navbar">
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shop" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  Account
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="nav-icons">
            <Link to="/shop" className="icon-btn hide-mobile">
              <i className="fas fa-search"></i>
            </Link>
            <Link to="/wishlist" className="icon-btn hide-mobile">
              <i className="far fa-heart"></i>
              {wishlist.length > 0 && (
                <span className="cart-count" style={{ backgroundColor: '#E63946' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <a 
              href="#" 
              className="icon-btn hide-mobile" 
              onClick={(e) => { e.preventDefault(); openAuth(); }}
            >
              <i className="fas fa-user"></i>
            </a>
            <a 
              href="#" 
              className="icon-btn cart-btn hide-mobile"
              onClick={(e) => { e.preventDefault(); openCart(); }}
            >
              <i className="fas fa-shopping-bag"></i>
              <span className="cart-count">{cartCount}</span>
            </a>
            <button class="mobile-toggle" onClick={toggleMobileMenu}>
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/shop" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <i className="fas fa-search"></i>
          <span>Shop</span>
        </NavLink>
        <NavLink 
          to="/wishlist" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          style={{ position: 'relative' }}
        >
          <i className="far fa-heart"></i>
          {wishlist.length > 0 && (
            <span className="cart-count" style={{ top: '-5px', right: '5px', backgroundColor: '#E63946' }}>
              {wishlist.length}
            </span>
          )}
          <span>Saved</span>
        </NavLink>
        <a 
          href="#" 
          className="nav-item cart-nav"
          onClick={(e) => { e.preventDefault(); openCart(); }}
        >
          <i className="fas fa-shopping-bag"></i>
          <span className="cart-count">{cartCount}</span>
          <span>Cart</span>
        </a>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
