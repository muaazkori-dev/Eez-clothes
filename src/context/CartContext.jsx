import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load initial cart and wishlist from localStorage
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const localWish = localStorage.getItem('wishlist');
    return localWish ? JSON.parse(localWish) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (item) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((w) => w.title === item.title);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prevWishlist.filter((w) => w.title !== item.title);
      } else {
        showToast(`Added to Wishlist!`);
        return [...prevWishlist, item];
      }
    });
  };

  const isInWishlist = (title) => {
    return wishlist.some((w) => w.title === title);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        toast,
        openCart,
        closeCart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div id="toast-container" style={{ zIndex: 9999 }}>
          <div className="toast show">
            <i className="fas fa-check-circle"></i> <span>{toast}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
