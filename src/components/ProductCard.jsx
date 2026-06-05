import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, title, price, oldPrice, img, category, badge }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, title, price, img, category, badge });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist({ id, title, price, oldPrice, img, category, badge });
  };

  const isSaved = isInWishlist(title);

  return (
    <div className="product-card" data-category={category.toLowerCase()}>
      <div className="product-img">
        <Link to={`/product/${id}`}>
          {imgError ? (
            <div className="fallback-placeholder" style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
              color: '#495057',
              textAlign: 'center',
              padding: '20px'
            }}>
              <i className="fas fa-shirt" style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#004AAD' }}></i>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{category}</span>
            </div>
          ) : (
            <img src={img} alt={title} onError={() => setImgError(true)} />
          )}
        </Link>
        {badge && (
          <span className={`badge ${badge.toLowerCase() === 'sale' ? 'sale' : ''}`}>
            {badge}
          </span>
        )}
        <div className="product-actions">
          <button className="action-btn" onClick={handleWishlistToggle}>
            <i className={`${isSaved ? 'fas' : 'far'} fa-heart`} style={{ color: isSaved ? '#E63946' : '' }}></i>
          </button>
          <Link to={`/product/${id}`} className="action-btn">
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      </div>
      <div className="product-info">
        <span className="category">{category}</span>
        <h3>
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <div className="price-row">
          <span className="price">
            {oldPrice ? (
              <>
                <del>${oldPrice.toFixed(2)}</del> ${price.toFixed(2)}
              </>
            ) : (
              `$${price.toFixed(2)}`
            )}
          </span>
          <button 
            className="add-to-cart" 
            onClick={handleAddToCart}
            style={{
              backgroundColor: isAdded ? '#004AAD' : '',
              color: isAdded ? '#FFF' : '',
              borderColor: isAdded ? '#004AAD' : '',
            }}
          >
            <i className={`fas ${isAdded ? 'fa-check' : 'fa-plus'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
