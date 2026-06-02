import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { addToCart, openCart, showToast } = useCart();

  // Product Data
  const productData = {
    title: 'Classic Plaid Flannel',
    price: 45.00,
    desc: 'The ultimate comfort piece for your everyday wardrobe. This premium flannel shirt features an exceptionally soft feel, tailored fit, and a timeless plaid pattern.',
    images: [
      'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Red', hex: '#A03B3B', img: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'Blue', hex: '#2D4356', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800' }
    ],
    sizes: ['S', 'M', 'L', 'XL']
  };

  // State
  const [activeImage, setActiveImage] = useState(productData.images[0]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Handlers
  const handleColorChange = (index) => {
    setSelectedColor(index);
    setActiveImage(productData.colors[index].img);
  };

  const handleQtyChange = (val) => {
    if (quantity + val >= 1 && quantity + val <= 10) {
      setQuantity(quantity + val);
    }
  };

  const handleAddToCart = () => {
    const finalProduct = {
      title: `${productData.title} (${productData.colors[selectedColor].name} / ${selectedSize})`,
      price: productData.price,
      img: activeImage,
    };

    // Since our context addToCart adds 1 by default, let's call it 'quantity' times or modify it
    for (let i = 0; i < quantity; i++) {
      addToCart(finalProduct);
    }
    
    // We already openCart and showToast inside addToCart context!
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showToast(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist!');
  };

  return (
    <div className="product-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Product Gallery */}
        <div className="product-gallery">
          <img 
            id="main-product-img" 
            src={activeImage} 
            alt={productData.title} 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', transition: 'opacity 0.15s ease' }} 
          />
          <div className="thumbnail-list" style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
            {productData.images.map((img, i) => (
              <img
                key={i}
                className={`thumb ${activeImage === img ? 'active' : ''}`}
                src={img.replace('&w=800', '&w=200')}
                alt={`Thumb ${i + 1}`}
                onClick={() => setActiveImage(img)}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: activeImage === img ? '2px solid var(--action-color)' : '2px solid transparent'
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Details Info */}
        <div className="product-details">
          <div className="breadcrumb" style={{ color: 'var(--text-light)', marginBottom: '16px', fontSize: '0.9rem' }}>
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {productData.title}
          </div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{productData.title}</h1>
          
          <div className="reviews-summary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div className="stars" style={{ color: '#FFC107' }}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>(124 Reviews)</span>
          </div>

          <h2 className="product-price" style={{ fontSize: '1.8rem', color: 'var(--action-color)', marginBottom: '16px' }}>
            ${productData.price.toFixed(2)}
          </h2>
          
          <p className="product-desc" style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
            {productData.desc}
          </p>
          
          {/* Color Selector */}
          <div className="selector-group" style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Color</h3>
            <div className="color-options" style={{ display: 'flex', gap: '12px' }}>
              {productData.colors.map((color, index) => (
                <label key={color.name} style={{ cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="color" 
                    checked={selectedColor === index}
                    onChange={() => handleColorChange(index)}
                    style={{ display: 'none' }} 
                  />
                  <span 
                    style={{ 
                      display: 'block', 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: color.hex, 
                      border: selectedColor === index ? '2px solid var(--text-main)' : '2px solid transparent',
                      padding: '2px', 
                      backgroundClip: 'content-box' 
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="selector-group" style={{ marginBottom: '32px' }}>
            <div className="size-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Size</h3>
              <a href="#" style={{ color: 'var(--text-light)', textDecoration: 'underline', fontSize: '0.9rem' }} onClick={(e) => e.preventDefault()}>
                Size Guide
              </a>
            </div>
            <div className="size-options" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {productData.sizes.map((size) => (
                <label 
                  key={size}
                  className="size-box" 
                  onClick={() => setSelectedSize(size)}
                  style={{ 
                    border: selectedSize === size ? '1px solid var(--action-color)' : '1px solid var(--border-color)', 
                    background: selectedSize === size ? 'var(--action-color)' : 'transparent',
                    color: selectedSize === size ? 'white' : 'var(--text-main)',
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    transition: '0.3s' 
                  }}
                >
                  <input type="radio" name="size" style={{ display: 'none' }} /> 
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Action Row (Quantity & Cart & Wishlist) */}
          <div className="action-group" style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <div className="qty-selector" style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '50px', padding: '5px 15px' }}>
              <button 
                className="qty-btn" 
                onClick={() => handleQtyChange(-1)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                readOnly
                style={{ width: '40px', textAlign: 'center', border: 'none', fontFamily: 'inherit', fontSize: '1rem', background: 'transparent', color: 'var(--text-main)' }} 
              />
              <button 
                className="qty-btn" 
                onClick={() => handleQtyChange(1)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-primary add-to-cart-lg" 
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="btn btn-outline wishlist-btn-lg" 
              onClick={toggleWishlist}
              style={{ width: '50px', padding: 0 }}
            >
              <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`} style={{ color: isWishlisted ? '#E63946' : '' }}></i>
            </button>
          </div>

          {/* Accordion Details */}
          <div className="accordion" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="accordion-item" style={{ borderBottom: '1px solid var(--border-color)', padding: '16px 0' }}>
              <div 
                className="accordion-header" 
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                style={{ fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                Product Details 
                <i className="fas fa-chevron-down" style={{ transition: '0.3s', transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0)' }}></i>
              </div>
              {isAccordionOpen && (
                <div className="accordion-body" style={{ paddingTop: '12px', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>100% Premium Cotton</li>
                    <li>Slim Fit Design</li>
                    <li>Button-down collar</li>
                    <li>Machine washable</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
