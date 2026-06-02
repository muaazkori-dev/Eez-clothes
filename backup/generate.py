import os

header_html = """
    <!-- Mobile Menu Overlay -->
    <div class="menu-overlay"></div>

    <!-- Navbar -->
    <header class="header">
        <div class="container nav-container">
            <a href="index.html" class="logo">Eez<span>Clothes</span></a>
            <nav class="navbar">
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-home">Home</a></li>
                    <li><a href="shop.html" class="nav-shop">Shop</a></li>
                    <li><a href="dashboard.html" class="nav-account">Account</a></li>
                </ul>
            </nav>
            <div class="nav-icons">
                <a href="shop.html" class="icon-btn hide-mobile"><i class="fas fa-search"></i></a>
                <a href="#" class="icon-btn hide-mobile auth-trigger"><i class="fas fa-user"></i></a>
                <a href="#" class="icon-btn cart-btn hide-mobile cart-trigger">
                    <i class="fas fa-shopping-bag"></i>
                    <span class="cart-count">0</span>
                </a>
                <button class="mobile-toggle"><i class="fas fa-bars"></i></button>
            </div>
        </div>
    </header>

    <!-- Cart Drawer -->
    <div class="cart-overlay"></div>
    <div class="cart-drawer">
        <div class="cart-header">
            <h2>Your Cart (<span class="cart-count-drawer">0</span>)</h2>
            <button class="close-cart"><i class="fas fa-times"></i></button>
        </div>
        <div class="cart-items" id="cart-items-container">
            <div class="empty-cart-msg">Your cart is empty.</div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Subtotal</span>
                <span class="total-price" id="cart-total-price">$0.00</span>
            </div>
            <p class="shipping-msg">Shipping & taxes calculated at checkout</p>
            <a href="checkout.html" class="btn btn-primary checkout-btn disabled" style="width: 100%;">Proceed to Checkout</a>
        </div>
    </div>

    <!-- Login/Signup Modal -->
    <div class="auth-modal-overlay"></div>
    <div class="auth-modal">
        <button class="close-modal"><i class="fas fa-times"></i></button>
        <div class="auth-tabs">
            <button class="auth-tab active" data-tab="login">Login</button>
            <button class="auth-tab" data-tab="signup">Sign Up</button>
        </div>
        <div class="auth-content active" id="login-tab">
            <h2>Welcome Back</h2>
            <p>Enter your details to access your VIP account.</p>
            <form class="auth-form" onsubmit="event.preventDefault(); window.location.href='dashboard.html';">
                <input type="email" placeholder="Email Address" required>
                <input type="password" placeholder="Password" required>
                <div class="auth-options">
                    <label><input type="checkbox"> Remember me</label>
                    <a href="#" class="forgot-pw">Forgot password?</a>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
            </form>
        </div>
        <div class="auth-content" id="signup-tab">
            <h2>Create Account</h2>
            <p>Join the VIP club today.</p>
            <form class="auth-form" onsubmit="event.preventDefault(); window.location.href='dashboard.html';">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="password" placeholder="Password" required>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Sign Up</button>
            </form>
        </div>
    </div>

    <!-- Toast Container -->
    <div id="toast-container"></div>
"""

footer_html = """
    <!-- Footer -->
    <footer class="footer" style="margin-top: 50px;">
        <div class="container footer-grid">
            <div class="footer-col brand-col">
                <a href="index.html" class="logo">Eez<span>Clothes</span></a>
                <p>Redefining modern menswear with premium fabrics and impeccable designs. Your style, elevated.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Shop</h4>
                <ul>
                    <li><a href="shop.html">New Arrivals</a></li>
                    <li><a href="shop.html">Casual Shirts</a></li>
                    <li><a href="shop.html">Formal Shirts</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="dashboard.html">My Account</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Shipping & Returns</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 Eez Clothes. All rights reserved.</p>
                <div class="payment-methods">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-paypal"></i>
                </div>
            </div>
        </div>
    </footer>

    <!-- Mobile Bottom Navigation -->
    <div class="mobile-bottom-nav">
        <a href="index.html" class="nav-item nav-home-mobile">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="shop.html" class="nav-item nav-shop-mobile">
            <i class="fas fa-search"></i>
            <span>Shop</span>
        </a>
        <a href="#" class="nav-item cart-nav cart-trigger">
            <i class="fas fa-shopping-bag"></i>
            <span class="cart-count">0</span>
            <span>Cart</span>
        </a>
        <a href="#" class="nav-item auth-trigger nav-account-mobile">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </div>

    <script src="script.js"></script>
"""

def wrap_html(title, body_content, active_page='home'):
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Eez Clothes</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            const dt = document.querySelector('.nav-{active_page}');
            if(dt) dt.classList.add('active');
            const mt = document.querySelector('.nav-{active_page}-mobile');
            if(mt) mt.classList.add('active');
        }});
    </script>
</head>
<body>
{header_html}
{body_content}
{footer_html}
</body>
</html>"""
    return html

# 1. product.html
product_content = """
    <div class="product-page" style="padding-top: 100px;">
        <div class="container product-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div class="product-gallery">
                <img id="main-product-img" src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=800" alt="Classic Plaid Flannel" style="width: 100%; border-radius: 12px; margin-bottom: 16px;">
                <div class="thumbnail-list" style="display: flex; gap: 12px; overflow-x: auto;">
                    <img class="thumb active" src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=200" alt="Thumb 1" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid var(--action-color);">
                    <img class="thumb" src="https://images.unsplash.com/photo-1588359348347-9bc6cbea68cb?auto=format&fit=crop&q=80&w=200" alt="Thumb 2" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent;">
                    <img class="thumb" src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=200" alt="Thumb 3" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent;">
                </div>
            </div>
            <div class="product-details">
                <div class="breadcrumb" style="color: var(--text-light); margin-bottom: 16px; font-size: 0.9rem;"><a href="index.html">Home</a> / <a href="shop.html">Casual</a> / Classic Plaid</div>
                <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Classic Plaid Flannel</h1>
                <div class="reviews-summary" style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                    <div class="stars" style="color: #FFC107;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                    <span style="color: var(--text-light); font-size: 0.9rem;">(124 Reviews)</span>
                </div>
                <h2 class="product-price" style="font-size: 1.8rem; color: var(--action-color); margin-bottom: 16px;">$45.00</h2>
                <p class="product-desc" style="color: var(--text-light); margin-bottom: 24px;">The ultimate comfort piece for your everyday wardrobe. This premium flannel shirt features an exceptionally soft feel, tailored fit, and a timeless plaid pattern.</p>
                
                <div class="selector-group" style="margin-bottom: 24px;">
                    <h3 style="margin-bottom: 12px; font-size: 1.1rem;">Color</h3>
                    <div class="color-options" style="display: flex; gap: 12px;">
                        <label style="cursor: pointer;"><input type="radio" name="color" checked style="display: none;"><span style="display: block; width: 32px; height: 32px; border-radius: 50%; background: #A03B3B; border: 2px solid var(--text-main); padding: 2px; background-clip: content-box;"></span></label>
                        <label style="cursor: pointer;"><input type="radio" name="color" style="display: none;"><span style="display: block; width: 32px; height: 32px; border-radius: 50%; background: #2D4356; border: 2px solid transparent;"></span></label>
                    </div>
                </div>

                <div class="selector-group" style="margin-bottom: 32px;">
                    <div class="size-header" style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <h3 style="font-size: 1.1rem;">Size</h3>
                        <a href="#" style="color: var(--text-light); text-decoration: underline; font-size: 0.9rem;">Size Guide</a>
                    </div>
                    <div class="size-options" style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <label class="size-box" style="border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: 0.3s;"><input type="radio" name="size" style="display: none;"> S</label>
                        <label class="size-box" style="border: 1px solid var(--action-color); background: var(--action-color); color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: 0.3s;"><input type="radio" name="size" checked style="display: none;"> M</label>
                        <label class="size-box" style="border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: 0.3s;"><input type="radio" name="size" style="display: none;"> L</label>
                        <label class="size-box" style="border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: 0.3s;"><input type="radio" name="size" style="display: none;"> XL</label>
                    </div>
                </div>

                <div class="action-group" style="display: flex; gap: 16px; margin-bottom: 40px;">
                    <div class="qty-selector" style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: 50px; padding: 5px 15px;">
                        <button class="qty-btn" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">-</button>
                        <input type="number" value="1" min="1" max="10" style="width: 40px; text-align: center; border: none; font-family: inherit; font-size: 1rem; pointer-events: none;">
                        <button class="qty-btn" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">+</button>
                    </div>
                    <button class="btn btn-primary add-to-cart-lg" style="flex: 1;" data-title="Classic Plaid Flannel" data-price="45.00" data-img="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=200">
                        Add to Cart
                    </button>
                    <button class="btn btn-outline wishlist-btn-lg" style="width: 50px; padding: 0;"><i class="far fa-heart"></i></button>
                </div>

                <div class="accordion" style="border-top: 1px solid var(--border-color);">
                    <div class="accordion-item" style="border-bottom: 1px solid var(--border-color); padding: 16px 0;">
                        <div class="accordion-header" style="font-weight: 600; cursor: pointer; display: flex; justify-content: space-between;">Product Details <i class="fas fa-chevron-down"></i></div>
                        <div class="accordion-body" style="padding-top: 12px; color: var(--text-light); font-size: 0.95rem;">
                            <ul style="padding-left: 20px;">
                                <li>100% Premium Cotton</li>
                                <li>Slim Fit Design</li>
                                <li>Button-down collar</li>
                                <li>Machine washable</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
"""

# 2. shop.html
shop_content = """
    <div class="shop-page" style="padding-top: 120px;">
        <div class="container">
            <h1 style="margin-bottom: 10px;">Shop All Collections</h1>
            <p style="color: var(--text-light); margin-bottom: 40px;">Explore our VIP range of premium shirts tailored for greatness.</p>
            
            <div class="shop-layout" style="display: grid; grid-template-columns: 250px 1fr; gap: 40px;">
                <!-- Sidebar Filters -->
                <div class="filters-sidebar">
                    <h3 style="margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">Filters</h3>
                    
                    <div class="filter-group" style="margin-bottom: 24px;">
                        <h4 style="margin-bottom: 12px;">Category</h4>
                        <label style="display: block; margin-bottom: 8px; color: var(--text-light); cursor: pointer;"><input type="checkbox" checked> All Shirts</label>
                        <label style="display: block; margin-bottom: 8px; color: var(--text-light); cursor: pointer;"><input type="checkbox"> Casual</label>
                        <label style="display: block; margin-bottom: 8px; color: var(--text-light); cursor: pointer;"><input type="checkbox"> Formal</label>
                    </div>

                    <div class="filter-group" style="margin-bottom: 24px;">
                        <h4 style="margin-bottom: 12px;">Price Range</h4>
                        <input type="range" min="20" max="150" value="150" style="width: 100%;">
                        <div style="display: flex; justify-content: space-between; color: var(--text-light); font-size: 0.9rem; margin-top: 8px;">
                            <span>$20</span>
                            <span>$150+</span>
                        </div>
                    </div>
                    <button class="btn btn-outline" style="width: 100%;">Apply Filters</button>
                </div>

                <!-- Product Grid -->
                <div class="shop-main">
                    <div class="shop-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <span style="color: var(--text-light);">Showing 1-4 of 24 results</span>
                        <select style="padding: 8px 16px; border: 1px solid var(--border-color); border-radius: 30px; font-family: inherit; outline: none;">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                    </div>

                    <div class="product-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                        <!-- Product 1 -->
                        <div class="product-card">
                            <div class="product-img">
                                <a href="product.html"><img src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=600" alt="Classic Plaid Shirt"></a>
                                <span class="badge">New</span>
                            </div>
                            <div class="product-info">
                                <span class="category">Casual</span>
                                <h3><a href="product.html">Classic Plaid Flannel</a></h3>
                                <div class="price-row">
                                    <span class="price">$45.00</span>
                                    <button class="add-to-cart" data-title="Classic Plaid Flannel" data-price="45.00" data-img="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=200"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <!-- Product 2 -->
                        <div class="product-card">
                            <div class="product-img">
                                <a href="product.html"><img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600" alt="Oxford Button-Down"></a>
                            </div>
                            <div class="product-info">
                                <span class="category">Formal</span>
                                <h3><a href="product.html">Oxford Button-Down</a></h3>
                                <div class="price-row">
                                    <span class="price">$55.00</span>
                                    <button class="add-to-cart" data-title="Oxford Button-Down" data-price="55.00" data-img="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=200"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <!-- Product 3 -->
                        <div class="product-card">
                            <div class="product-img">
                                <a href="product.html"><img src="https://images.unsplash.com/photo-1588359348347-9bc6cbea68cb?auto=format&fit=crop&q=80&w=600" alt="Crisp White"></a>
                                <span class="badge sale">Sale</span>
                            </div>
                            <div class="product-info">
                                <span class="category">Formal</span>
                                <h3><a href="product.html">Crisp White Essential</a></h3>
                                <div class="price-row">
                                    <span class="price"><del>$70.00</del> $50.00</span>
                                    <button class="add-to-cart" data-title="Crisp White Essential" data-price="50.00" data-img="https://images.unsplash.com/photo-1588359348347-9bc6cbea68cb?auto=format&fit=crop&q=80&w=200"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <!-- Product 4 -->
                        <div class="product-card">
                            <div class="product-img">
                                <a href="product.html"><img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600" alt="Denim Shirt"></a>
                            </div>
                            <div class="product-info">
                                <span class="category">Casual</span>
                                <h3><a href="product.html">Vintage Denim Shirt</a></h3>
                                <div class="price-row">
                                    <span class="price">$65.00</span>
                                    <button class="add-to-cart" data-title="Vintage Denim Shirt" data-price="65.00" data-img="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=200"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
"""

# 3. checkout.html
checkout_content = """
    <div class="checkout-page" style="padding-top: 120px; padding-bottom: 100px; background: var(--hover-bg);">
        <div class="container" style="max-width: 1000px;">
            <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px;">
                <div class="checkout-form-container" style="background: var(--white); padding: 40px; border-radius: 16px; box-shadow: var(--shadow-sm);">
                    <h2 style="margin-bottom: 24px;">Checkout</h2>
                    
                    <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Contact Information</h3>
                    <div style="margin-bottom: 24px;">
                        <input type="email" placeholder="Email" style="width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; margin-bottom: 12px; outline: none;">
                        <label style="font-size: 0.9rem; color: var(--text-light);"><input type="checkbox"> Email me with news and offers</label>
                    </div>

                    <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Shipping Address</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <input type="text" placeholder="First Name" style="padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; outline: none;">
                        <input type="text" placeholder="Last Name" style="padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; outline: none;">
                    </div>
                    <input type="text" placeholder="Address" style="width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; margin-bottom: 12px; outline: none;">
                    <input type="text" placeholder="City" style="width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; margin-bottom: 24px; outline: none;">

                    <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Payment</h3>
                    <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 24px; background: #fafafa;">
                        <div style="display: flex; gap: 10px; margin-bottom: 16px;">
                            <input type="radio" name="payment" checked> <span>Credit Card</span>
                        </div>
                        <input type="text" placeholder="Card Number" style="width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; margin-bottom: 12px; outline: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <input type="text" placeholder="MM/YY" style="padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; outline: none;">
                            <input type="text" placeholder="CVC" style="padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; outline: none;">
                        </div>
                    </div>

                    <button class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 1.1rem;" onclick="alert('Order Placed! Thank you for shopping with Eez Clothes VIP.'); window.location.href='index.html';">Pay Now</button>
                </div>

                <div class="checkout-summary" style="position: sticky; top: 100px;">
                    <div style="background: var(--white); padding: 30px; border-radius: 16px; box-shadow: var(--shadow-sm);">
                        <h3 style="margin-bottom: 20px;">Order Summary</h3>
                        <div id="checkout-items" style="margin-bottom: 20px;">
                            <!-- Items will be mirrored from cart via JS in a real app, placeholder for now -->
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 15px;">
                                <div style="display: flex; gap: 15px;">
                                    <img src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=100" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                                    <div>
                                        <p style="font-weight: 600;">Classic Plaid Flannel</p>
                                        <p style="font-size: 0.85rem; color: var(--text-light);">Size: M</p>
                                    </div>
                                </div>
                                <span style="font-weight: 600;">$45.00</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; margin-bottom: 24px;">
                            <input type="text" placeholder="Discount Code" style="flex: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; outline: none;">
                            <button class="btn btn-secondary" style="padding: 12px 20px;">Apply</button>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: var(--text-light);">
                            <span>Subtotal</span>
                            <span>$45.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; color: var(--text-light); border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700;">
                            <span>Total</span>
                            <span>$45.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
"""

# 4. dashboard.html
dashboard_content = """
    <div class="dashboard-page" style="padding-top: 120px; padding-bottom: 100px;">
        <div class="container" style="max-width: 1000px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1>Welcome, VIP Member!</h1>
                <p style="color: var(--text-light);">Manage your account, track orders, and discover personalized offers.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px;">
                <div style="background: var(--white); padding: 30px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                    <i class="fas fa-box-open" style="font-size: 2.5rem; color: var(--action-color); margin-bottom: 16px;"></i>
                    <h3>My Orders</h3>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 8px;">Track, return, or buy things again.</p>
                </div>
                <div style="background: var(--white); padding: 30px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                    <i class="fas fa-heart" style="font-size: 2.5rem; color: var(--action-color); margin-bottom: 16px;"></i>
                    <h3>Wishlist</h3>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 8px;">View your saved premium items.</p>
                </div>
                <div style="background: var(--white); padding: 30px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                    <i class="fas fa-cog" style="font-size: 2.5rem; color: var(--action-color); margin-bottom: 16px;"></i>
                    <h3>Settings</h3>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 8px;">Edit addresses and password.</p>
                </div>
            </div>

            <div style="background: var(--hover-bg); padding: 40px; border-radius: 16px; text-align: center;">
                <h2>Recent Order #VIP-2026</h2>
                <p style="color: var(--text-light); margin-bottom: 20px;">Placed on May 8, 2026 - <span style="color: #4CAF50; font-weight: 600;">Shipped</span></p>
                <button class="btn btn-primary">Track Package</button>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <button class="btn btn-outline" onclick="window.location.href='index.html'">Log Out</button>
            </div>
        </div>
    </div>
"""

import sys
with open('product.html', 'w') as f: f.write(wrap_html('Product', product_content, 'shop'))
with open('shop.html', 'w') as f: f.write(wrap_html('Shop', shop_content, 'shop'))
with open('checkout.html', 'w') as f: f.write(wrap_html('Checkout', checkout_content, 'none'))
with open('dashboard.html', 'w') as f: f.write(wrap_html('Dashboard', dashboard_content, 'account'))

# Modify existing index.html to add standard header and footer wrapping
with open('index.html', 'r') as f: content = f.read()

# I will replace the header, hero, features, shop, banners into the new wrap
import re
try:
    body_content = re.search(r'<!-- Hero Section -->(.*?)<!-- Footer -->', content, re.DOTALL).group(1)
    
    # Let's modify the add-to-cart buttons in index.html to have data attributes
    body_content = body_content.replace('class="add-to-cart"', 'class="add-to-cart" data-title="Premium Shirt" data-price="50.00" data-img="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=200"')
    
    # Wrap index.html
    with open('index.html', 'w') as f: f.write(wrap_html('Home', "<!-- Hero Section -->" + body_content, 'home'))
except Exception as e:
    pass

print("Generated HTML pages.")
