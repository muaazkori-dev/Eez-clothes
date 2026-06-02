import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, updateQty, removeItem, cartCount, cartTotal } = useCart();

  return (
    <>
      {/* Cart Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={closeCart}
      />

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart (<span className="cart-count-drawer">{cartCount}</span>)</h2>
          <button className="close-cart" onClick={closeCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-items" id="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-msg">Your cart is empty.</div>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={item.title + index}>
                <img src={item.img} alt={item.title} />
                <div className="cart-item-info">
                  <div>
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(index, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(index, 1)}>+</button>
                    </div>
                    <button className="remove-item" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span className="total-price" id="cart-total-price">${cartTotal.toFixed(2)}</span>
          </div>
          <p className="shipping-msg">Shipping & taxes calculated at checkout</p>
          <Link 
            to="/checkout" 
            className={`btn btn-primary checkout-btn ${cart.length === 0 ? 'disabled' : ''}`} 
            style={{ width: '100%' }}
            onClick={closeCart}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
