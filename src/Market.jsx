import React, { useState } from "react";
import "./Market.css";

const products = [
  { 
    id: 1,
    name: "Fresh Strawberries", 
    price: "$5.25", 
    image: "https://static.wixstatic.com/media/872702_c379dbb493e34c2eaf8b20a41322c9ea~mv2.jpg/v1/fill/w_520,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/872702_c379dbb493e34c2eaf8b20a41322c9ea~mv2.jpg",
    category: "Fruits & Veggies",
    description: "Sweet and juicy organic strawberries",
    unit: "pint",
    inStock: true
  },
  { 
    id: 2,
    name: "Blueberries", 
    price: "$4.50", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTOlBTC1nQ3TdOsvd7PFhnSqUZhgdb4XFmQ&s",
    category: "Fruits & Veggies",
    description: "Fresh-picked blueberries",
    unit: "pint",
    inStock: true
  },
  { 
    id: 3,
    name: "Cucumbers", 
    price: "$2.50", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-Oi68V13zZMEEJWgi1IZOIYIcKLlpR3acg&s",
    category: "Fruits & Veggies",
    description: "Crisp, organic cucumbers",
    unit: "each",
    inStock: true
  },
  { 
    id: 4,
    name: "Whole Milk", 
    price: "$4.99", 
    image: "https://admin.marketwagon.com/uploads/161223538888729354-410B-4293-9C8C-C5472D1C8500.jpeg.webp",
    category: "Dairy",
    description: "Farm-fresh whole milk",
    unit: "gallon",
    inStock: true
  },
  { 
    id: 5,
    name: "Chocolate Whole Milk", 
    price: "$5.99", 
    image: "https://admin.marketwagon.com/uploads/1612234917AB094FC1-6604-4BDE-BC4E-53653D48B022.jpeg.webp",
    category: "Dairy",
    description: "Rich and creamy chocolate milk",
    unit: "gallon",
    inStock: true
  },
  { 
    id: 6,
    name: "Organic Carrots", 
    price: "$4.25", 
    image: "https://ediblealaska.ediblecommunities.com/wp-content/uploads/2024/08/carrot-cult_01-789x1024.jpg",
    category: "Fruits & Veggies",
    description: "Fresh organic carrots",
    unit: "bunch",
    inStock: true
  }
];

function Market() {
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    labels: [],
    priceRange: {
      min: 0,
      max: 50
    }
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: Number(value)
      }
    }));
  };

  const filteredProducts = products.filter(product => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }
    const productPrice = parseFloat(product.price.replace('$', ''));
    if (productPrice < filters.priceRange.min || productPrice > filters.priceRange.max) {
      return false;
    }
    return true;
  });

  return (
    <div className="market-container">
      <nav className="market-nav">
        <h1>Farm2Table</h1>
        <div className="nav-buttons">
          <div className="cart-container">
            <button className="cart-button">
              <span className="cart-text">Cart ({cart.length})</span>
              {cart.length > 0 && (
                <div className="cart-dropdown">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">{item.price}</p>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    <p>Total: ${cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="market-grid">
        <aside className="filters">
          <h2>Keywords</h2>
          <div className="filter-box">
            <div className="filter-section">
              <h3>Categories</h3>
              <ul>
                <li>
                  <label className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={filters.categories.includes("Fruits & Veggies")}
                      onChange={() => toggleFilter("categories", "Fruits & Veggies")}
                    />
                    Fruits & Veggies
                  </label>
                </li>
                <li>
                  <label className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={filters.categories.includes("Dairy")}
                      onChange={() => toggleFilter("categories", "Dairy")}
                    />
                    Dairy
                  </label>
                </li>
              </ul>
            </div>
            
            <div className="filter-section">
              <h3>Labels</h3>
              <ul>
                <li>
                  <label className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={filters.labels.includes("Organic")}
                      onChange={() => toggleFilter("labels", "Organic")}
                    />
                    Organic
                  </label>
                </li>
                <li>
                  <label className="filter-label">
                    <input 
                      type="checkbox" 
                      checked={filters.labels.includes("Local")}
                      onChange={() => toggleFilter("labels", "Local")}
                    />
                    Local
                  </label>
                </li>
              </ul>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Min ($)</label>
                    <input
                      type="number"
                      min="0"
                      max={filters.priceRange.max}
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="price-input"
                    />
                  </div>
                  <div className="price-input-group">
                    <label>Max ($)</label>
                    <input
                      type="number"
                      min={filters.priceRange.min}
                      max="100"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="price-input"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="price-slider"
                />
              </div>
            </div>
          </div>
        </aside>
        <main className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
      <footer className="market-footer">
        &copy; 2025 Farm2Table. All rights reserved.
      </footer>
    </div>
  );
}

export default Market;
