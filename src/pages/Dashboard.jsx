import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Dashboard = () => {
  const { user, isLoggedIn, logout, openAuth } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully');
    navigate('/');
  };

  const handleTrackPackage = () => {
    alert('Tracking details sent to your email!');
  };

  if (!isLoggedIn) {
    return (
      <div className="dashboard-page" style={{ paddingTop: '120px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', background: 'var(--white)', padding: '50px 40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <i className="fas fa-lock" style={{ fontSize: '3.5rem', color: 'var(--action-color)', marginBottom: '24px' }}></i>
          <h1 style={{ marginBottom: '12px' }}>VIP Membership Area</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>
            Please log in or sign up to access your order history, wishlist, and VIP member benefits.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => openAuth('login')}>
              Log In
            </button>
            <button className="btn btn-outline" onClick={() => openAuth('signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Welcome Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>Welcome, {user.name}!</h1>
          <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
            Manage your account, track orders, and discover personalized offers.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          
          <div 
            className="dashboard-card"
            style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer', transition: '0.3s' }}
          >
            <i className="fas fa-box-open" style={{ fontSize: '2.5rem', color: 'var(--action-color)', marginBottom: '16px' }}></i>
            <h3>My Orders</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '8px' }}>
              Track, return, or buy things again.
            </p>
          </div>

          <div 
            className="dashboard-card"
            style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer', transition: '0.3s' }}
          >
            <i className="fas fa-heart" style={{ fontSize: '2.5rem', color: 'var(--action-color)', marginBottom: '16px' }}></i>
            <h3>Wishlist</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '8px' }}>
              View your saved premium items.
            </p>
          </div>

          <div 
            className="dashboard-card"
            style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer', transition: '0.3s' }}
          >
            <i className="fas fa-cog" style={{ fontSize: '2.5rem', color: 'var(--action-color)', marginBottom: '16px' }}></i>
            <h3>Settings</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '8px' }}>
              Edit addresses and password.
            </p>
          </div>

        </div>

        {/* Recent Order */}
        <div style={{ background: 'var(--hover-bg)', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
          <h2>Recent Order #VIP-2026</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px', marginTop: '8px' }}>
            Placed on May 8, 2026 - <span style={{ color: '#4CAF50', fontWeight: '600' }}>Shipped</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <img 
              src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=100" 
              style={{ width: '80px', borderRadius: '8px' }} 
              alt="Ordered shirt"
            />
          </div>
          <button className="btn btn-primary" onClick={handleTrackPackage}>
            Track Package
          </button>
        </div>
        
        {/* Log Out */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn btn-outline" onClick={handleLogout}>
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
