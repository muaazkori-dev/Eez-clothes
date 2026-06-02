import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Shop = () => {
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState({
    Football: true,
    Cricket: true,
    'T-Shirts': true,
  });
  const [priceRange, setPriceRange] = useState(150);
  const [sortBy, setSortBy] = useState('Featured');

  // Handle Category checkbox change
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) => {
      const updated = { ...prev, [cat]: !prev[cat] };
      return updated;
    });
  };

  // Filter and Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category filter
      const categoryMatch = selectedCategories[p.category];
      // Price filter
      const priceMatch = p.price <= priceRange;
      // Search query filter
      const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest Arrivals') {
      result.sort((a, b) => {
        if (a.badge === 'New' && b.badge !== 'New') return -1;
        if (a.badge !== 'New' && b.badge === 'New') return 1;
        return 0;
      });
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

  return (
    <div className="shop-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Page Header and Search Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ marginBottom: '10px' }}>Shop All Collections</h1>
            <p style={{ color: 'var(--text-light)' }}>
              Explore our VIP range of premium shirts tailored for greatness.
            </p>
          </div>
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search shirts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px 12px 40px',
                borderRadius: '30px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontFamily: 'inherit',
                background: 'var(--white)',
                color: 'var(--text-main)',
                fontSize: '0.95rem'
              }}
            />
            <i 
              className="fas fa-search" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          {/* Sidebar Filters */}
          <div className="filters-sidebar" style={{ minWidth: '250px' }}>
            <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
              Filters
            </h3>

            <div className="filter-group" style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px' }}>Category</h4>
              {['Football', 'Cricket', 'T-Shirts'].map((cat) => (
                <label 
                  key={cat}
                  style={{ display: 'block', marginBottom: '8px', color: 'var(--text-light)', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories[cat]}
                    onChange={() => handleCategoryChange(cat)}
                    style={{ marginRight: '8px' }}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <div className="filter-group" style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px' }}>Price Range</h4>
              <input
                type="range"
                min="20"
                max="150"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '8px' }}>
                <span>$20</span>
                <span>Up to ${priceRange}</span>
              </div>
            </div>
            
            <button 
              className="btn btn-outline" 
              style={{ width: '100%' }}
              onClick={() => {
                setSelectedCategories({ Football: true, Cricket: true, 'T-Shirts': true });
                setPriceRange(150);
                setSortBy('Featured');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="shop-main" style={{ flex: 1 }}>
            <div className="shop-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ color: 'var(--text-light)' }}>
                Showing {filteredAndSortedProducts.length} of {products.length} results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '30px', fontFamily: 'inherit', outline: 'none', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}
              >
                <option value="Featured">Sort by: Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
              </select>
            </div>

            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  img={product.img}
                  category={product.category}
                  badge={product.badge}
                />
              ))}
            </div>
            {filteredAndSortedProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                No products match your search or filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
