document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle with Overlay
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    function toggleMenu() {
        if(!navLinks) return;
        navLinks.classList.toggle('active');
        
        if (menuOverlay) {
            if (navLinks.classList.contains('active')) {
                menuOverlay.style.display = 'block';
                void menuOverlay.offsetWidth;
                menuOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            } else {
                menuOverlay.style.opacity = '0';
                setTimeout(() => {
                    menuOverlay.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        }
        
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Toast Notification System
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if(!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Slide-out Cart Drawer Logic
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartTriggers = document.querySelectorAll('.cart-trigger, .cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    
    function openCart() {
        if(!cartDrawer) return;
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
        if(!cartDrawer) return;
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Cart Functionality
    let cart = [];
    const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-lg');
    const cartCountEls = document.querySelectorAll('.cart-count, .cart-count-drawer');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function updateCartUI() {
        // Update counts
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEls.forEach(el => {
            el.textContent = totalItems;
            el.style.transform = 'scale(1.5)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        });

        // Update Drawer HTML
        if(!cartItemsContainer) return;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
            if(checkoutBtn) checkoutBtn.classList.add('disabled');
            if(cartTotalPriceEl) cartTotalPriceEl.textContent = '$0.00';
            return;
        }

        if(checkoutBtn) checkoutBtn.classList.remove('disabled');
        let total = 0;
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            total += (item.price * item.qty);
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <div>
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="qty-controls">
                                <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                                <span>${item.qty}</span>
                                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        
        if(cartTotalPriceEl) cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;
    }

    // Make these globally accessible for the inline onclick handlers
    window.updateQty = (index, change) => {
        if(cart[index].qty + change > 0) {
            cart[index].qty += change;
        } else {
            cart.splice(index, 1);
        }
        updateCartUI();
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = btn.getAttribute('data-title') || 'Premium Shirt';
            const price = parseFloat(btn.getAttribute('data-price') || '45.00');
            const img = btn.getAttribute('data-img') || 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=200';
            
            // Check if exists
            const existing = cart.find(i => i.title === title);
            if(existing) {
                existing.qty++;
            } else {
                cart.push({ title, price, img, qty: 1 });
            }
            
            updateCartUI();
            showToast(`${title} added to cart!`);
            openCart();
            
            // Button feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.backgroundColor = '#004AAD';
            btn.style.color = '#FFF';
            btn.style.borderColor = '#004AAD';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 1000);
        });
    });

    // Auth Modals
    const authTriggers = document.querySelectorAll('.auth-trigger');
    const authOverlay = document.querySelector('.auth-modal-overlay');
    const authModal = document.querySelector('.auth-modal');
    const closeAuthBtn = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authContents = document.querySelectorAll('.auth-content');

    function openAuth(tab = 'login') {
        if(!authModal) return;
        authModal.classList.add('active');
        authOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchAuthTab(tab);
    }
    
    function closeAuth() {
        if(!authModal) return;
        authModal.classList.remove('active');
        authOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function switchAuthTab(tabId) {
        authTabs.forEach(t => t.classList.remove('active'));
        authContents.forEach(c => c.classList.remove('active'));
        document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    authTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openAuth();
        });
    });
    
    if(closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuth);
    if(authOverlay) authOverlay.addEventListener('click', closeAuth);

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchAuthTab(tab.getAttribute('data-tab'));
        });
    });

    // Product Gallery specific logic
    const mainImg = document.getElementById('main-product-img');
    const thumbs = document.querySelectorAll('.thumb');
    
    if (mainImg && thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Change main image with a slight fade effect
                mainImg.style.opacity = 0.5;
                setTimeout(() => {
                    mainImg.src = thumb.src.replace('&w=200', '&w=800');
                    mainImg.style.opacity = 1;
                }, 150);

                thumbs.forEach(t => {
                    t.classList.remove('active');
                    t.style.border = '2px solid transparent';
                });
                thumb.classList.add('active');
                thumb.style.border = '2px solid var(--action-color)';
            });
        });
    }

    // Product Page Color Selector (Updates Image)
    const colorOptions = document.querySelectorAll('.color-options label');
    const colorImages = [
        "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=800", // Red
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800"  // Blue
    ];

    colorOptions.forEach((label, index) => {
        label.addEventListener('click', () => {
            // Remove active styling from all swatches
            colorOptions.forEach(l => {
                const span = l.querySelector('span');
                if (span) {
                    span.style.border = '2px solid transparent';
                }
            });
            // Add active styling to clicked swatch
            const span = label.querySelector('span');
            if (span) {
                span.style.border = '2px solid var(--text-main)';
            }

            // Update main image if available
            if (mainImg && colorImages[index]) {
                mainImg.style.opacity = 0.5;
                setTimeout(() => {
                    mainImg.src = colorImages[index];
                    mainImg.style.opacity = 1;
                }, 150);
            }
        });
    });

    // Product Page Size Selector
    const sizeOptions = document.querySelectorAll('.size-box');
    sizeOptions.forEach(box => {
        box.addEventListener('click', () => {
            sizeOptions.forEach(b => {
                b.style.border = '1px solid var(--border-color)';
                b.style.background = 'transparent';
                b.style.color = 'var(--text-main)';
            });
            box.style.border = '1px solid var(--action-color)';
            box.style.background = 'var(--action-color)';
            box.style.color = 'white';
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            if (body.style.display === 'block') {
                body.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                body.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Product Quantity Selector
    const qtyInput = document.querySelector('.qty-selector input');
    const qtyBtns = document.querySelectorAll('.qty-selector button');
    
    if (qtyInput && qtyBtns.length === 2) {
        qtyBtns[0].addEventListener('click', (e) => {
            e.preventDefault();
            let currentVal = parseInt(qtyInput.value);
            if (currentVal > 1) {
                qtyInput.value = currentVal - 1;
            }
        });
        
        qtyBtns[1].addEventListener('click', (e) => {
            e.preventDefault();
            let currentVal = parseInt(qtyInput.value);
            if (currentVal < 10) {
                qtyInput.value = currentVal + 1;
            }
        });
    }

    // Wishlist Button
    const wishlistBtnLg = document.querySelector('.wishlist-btn-lg');
    if (wishlistBtnLg) {
        wishlistBtnLg.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = wishlistBtnLg.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#E63946';
                showToast('Added to Wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showToast('Removed from Wishlist');
            }
        });
    }

    // Product Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
