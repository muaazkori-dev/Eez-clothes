import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { openAuth } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img 
            src="https://image.pollinations.ai/prompt/premium%20modern%20casual%20t-shirt%20clothing%2C%20isolated%20on%20white%20background%2C%20cinematic%20studio%20lighting%2C%20high%20resolution%2C%20realistic%20photo%2C%20style%207?width=600&height=800&nologo=true" 
            alt="Premium Menswear Background" 
          />
          <div className="overlay"></div>
        </div>
        <div className="container hero-content">
          <span className="subtitle">New Collection</span>
          <h1>Elevate Your Everyday Style</h1>
          <p>Discover our premium selection of shirts crafted for the modern man. Experience unparalleled comfort and VIP aesthetics.</p>
          <div className="hero-btns">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/shop" className="btn btn-secondary">View Collections</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container features-grid">
          <div className="feature-card">
            <div className="icon"><i className="fas fa-gem"></i></div>
            <h3>Premium Fabrics</h3>
            <p>Sourced from the finest materials worldwide for ultimate comfort.</p>
          </div>
          <div className="feature-card">
            <div className="icon"><i className="fas fa-ruler-combined"></i></div>
            <h3>Perfect Fit</h3>
            <p>Tailored to perfection, offering a sharp silhouette for every body type.</p>
          </div>
          <div className="feature-card">
            <div className="icon"><i className="fas fa-shipping-fast"></i></div>
            <h3>Fast Shipping</h3>
            <p>Complimentary express delivery on all VIP orders.</p>
          </div>
          <div className="feature-card">
            <div className="icon"><i className="fas fa-undo-alt"></i></div>
            <h3>Easy Returns</h3>
            <p>Hassle-free 30-day return policy for your peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="shop" id="shop">
        <div className="container">
          <div className="section-header">
            <h2>Featured Selection</h2>
            <p>Our most sought-after pieces, designed for distinction.</p>
          </div>

          <div className="product-filters">
            {['all', 'football', 'cricket', 't-shirts'].map((category) => (
              <button 
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`} 
                onClick={() => setActiveFilter(category)}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                img={product.img}
                category={product.category}
                badge={product.badge}
              />
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/shop" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="promotional-banner">
        <div className="container">
          <div className="banner-content">
            <h2>The VIP Member Experience</h2>
            <p>Join our exclusive club for early access to new releases, special discounts, and personalized style advice.</p>
            <a 
              href="#" 
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); openAuth('signup'); }}
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <h2>Stay in the Loop</h2>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
