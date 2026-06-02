import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cart, cartTotal, showToast } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || '');
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === 'vip10') {
      setAppliedDiscount(cartTotal * 0.1);
      showToast('10% VIP Discount Applied!');
    } else {
      showToast('Invalid Discount Code');
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    // Simulate payment success
    alert('Order Placed! Thank you for shopping with Eez Clothes VIP.');
    
    // In a real app we'd clear the cart, let's refresh or clear state
    showToast('Order Placed Successfully!');
    navigate('/dashboard');
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  return (
    <div className="checkout-page" style={{ paddingTop: '120px', paddingBottom: '100px', background: 'var(--hover-bg)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          
          {/* Checkout Form */}
          <form className="checkout-form-container" onSubmit={handlePayNow} style={{ background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ marginBottom: '24px' }}>Checkout</h2>
            
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Contact Information</h3>
            <div style={{ marginBottom: '24px' }}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', marginBottom: '12px', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
              />
              <label style={{ fontSize: '0.9rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" /> Email me with news and offers
              </label>
            </div>

            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Shipping Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input 
                type="text" 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{ padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{ padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
              />
            </div>
            <input 
              type="text" 
              placeholder="Address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', marginBottom: '12px', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
            />
            <input 
              type="text" 
              placeholder="City" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={{ width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', marginBottom: '24px', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
            />

            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Payment</h3>
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', marginBottom: '24px', background: 'var(--hover-bg)' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
                <input type="radio" name="payment" defaultChecked /> <span>Credit Card</span>
              </div>
              <input 
                type="text" 
                placeholder="Card Number" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                style={{ width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', marginBottom: '12px', outline: 'none', background: 'var(--white)', color: 'var(--text-main)' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                  style={{ padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none', background: 'var(--white)', color: 'var(--text-main)' }}
                />
                <input 
                  type="password" 
                  placeholder="CVC" 
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                  maxLength={4}
                  style={{ padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none', background: 'var(--white)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }}>
              Pay Now
            </button>
          </form>

          {/* Order Summary */}
          <div className="checkout-summary">
            <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
              
              <div id="checkout-items" style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {cart.length === 0 ? (
                  <p style={{ color: 'var(--text-light)' }}>No items in cart.</p>
                ) : (
                  cart.map((item, index) => (
                    <div 
                      key={item.title + index}
                      style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', alignItems: 'center' }}
                    >
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <img 
                          src={item.img} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                          alt={item.title}
                        />
                        <div>
                          <p style={{ fontWeight: 600 }}>{item.title}</p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <input 
                  type="text" 
                  placeholder="Discount Code" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  style={{ flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
                />
                <button type="button" className="btn btn-secondary" onClick={handleApplyDiscount} style={{ padding: '12px 20px' }}>
                  Apply
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-light)' }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#E63946' }}>
                  <span>VIP Discount (10%)</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                <span>Shipping</span>
                <span>Free VIP</span>
              </div>

              <div style={{ display: 'flex', justifySpaceBetween: 'space-between', fontSize: '1.25rem', fontWeight: '700', justifyContent: 'space-between' }}>
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
