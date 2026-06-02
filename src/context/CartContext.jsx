import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const openCart = () => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.style.overflow = '';
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.title === item.title);
      if (existing) {
        return prevCart.map((i) =>
          i.title === item.title ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    showToast(`${item.title} added to cart!`);
    openCart();
  };

  const updateQty = (index, change) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (updated[index].qty + change > 0) {
        updated[index] = { ...updated[index], qty: updated[index].qty + change };
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const removeItem = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(index, 1);
      return updated;
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        toast,
        openCart,
        closeCart,
        addToCart,
        updateQty,
        removeItem,
        cartCount,
        cartTotal,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div id="toast-container">
          <div className="toast show">
            <i className="fas fa-check-circle"></i> <span>{toast}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
