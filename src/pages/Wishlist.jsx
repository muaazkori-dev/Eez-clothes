import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useCart();

  return (
    <div className="shop-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <h1 style={{ marginBottom: '10px' }}>My Saved Items</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '40px' }}>
          Explore your saved VIP premium items and add them to your cart.
        </p>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <i className="far fa-heart" style={{ fontSize: '3.5rem', color: 'var(--text-light)', marginBottom: '20px' }}></i>
            <h2>Your wishlist is empty</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '8px', marginBottom: '24px' }}>
              Tap the heart icon on any shirt to save it here.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
            {wishlist.map((product) => (
              <ProductCard
                key={product.id || product.title}
                id={product.id}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                img={product.img}
                category={product.category || 'Collection'}
                badge={product.badge}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
