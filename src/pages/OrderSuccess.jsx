import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random VIP order number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`VIP-${randomNum}`);
  }, []);

  return (
    <div className="checkout-page" style={{ paddingTop: '120px', paddingBottom: '100px', background: 'var(--hover-bg)' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ background: 'var(--white)', padding: '50px 40px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(76, 175, 80, 0.1)',
            color: '#4CAF50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 24px'
          }}>
            <i className="fas fa-check"></i>
          </div>
          
          <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Order Confirmed!</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>
            Thank you for shopping with Eez Clothes. Your payment has been processed successfully.
          </p>

          <div style={{
            background: 'var(--hover-bg)',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-light)' }}>Order ID</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{orderId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-light)' }}>Shipping Method</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Free VIP Express</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-light)' }}>Estimated Delivery</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>2-3 Business Days</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-outline" style={{ flex: 1 }}>
              Continue Shopping
            </Link>
            <Link to="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
