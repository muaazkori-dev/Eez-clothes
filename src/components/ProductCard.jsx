import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, title, price, oldPrice, img, category, badge }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);

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
          <img src={img} alt={title} />
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
