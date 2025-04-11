import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Market.css";

export const products = [
  // Bear Area Products
  { 
    id: 1,
    name: "Fresh Strawberries", 
    price: "$5.25", 
    image: "https://static.wixstatic.com/media/872702_c379dbb493e34c2eaf8b20a41322c9ea~mv2.jpg/v1/fill/w_520,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/872702_c379dbb493e34c2eaf8b20a41322c9ea~mv2.jpg",
    category: "Fruits & Veggies",
    description: "Sweet and juicy organic strawberries, picked fresh from local farms. Perfect for desserts or healthy snacking.",
    unit: "pint",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    farmer: "Green Valley Farms",
    location: "Local",
    distance: 2.5,
    coordinates: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
    variants: ["Regular"],
    farm: {
      name: "Bear Valley Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },
  { 
    id: 16,
    name: "Fresh Raspberries", 
    price: "$5.99", 
    image: "https://scenichillfarmnursery.com/cdn/shop/products/Autumn_Britten_watermarked.jpg?v=1554579036",
    category: "Fruits & Veggies",
    description: "Sweet and tart organic raspberries, perfect for desserts or snacking.",
    unit: "pound",
    inStock: true,
    rating: 4.7,
    reviews: 89,
    farmer: "Bear Valley Farm",
    location: "Local",
    distance: 2.5,
    coordinates: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
    variants: ["Regular"],
    farm: {
      name: "Bear Valley Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },
  { 
    id: 17,
    name: "Fresh Blackberries", 
    price: "$5.75", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxBqrUvh0OR0ZTKQFH6BlZox5xC75fimYudA&s",
    category: "Fruits & Veggies",
    description: "Juicy organic blackberries, bursting with flavor.",
    unit: "pound",
    inStock: true,
    rating: 4.6,
    reviews: 76,
    farmer: "Bear Valley Farm",
    location: "Local",
    distance: 2.5,
    coordinates: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
    variants: ["Regular"],
    farm: {
      name: "Bear Valley Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },

  // Blueberry Hill Farm Products
  { 
    id: 2,
    name: "Blueberries", 
    price: "$4.50", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTOlBTC1nQ3TdOsvd7PFhnSqUZhgdb4XFmQ&s",
    category: "Fruits & Veggies",
    description: "Fresh-picked blueberries, bursting with flavor and antioxidants. Great for smoothies or baking.",
    unit: "pint",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    farmer: "Berry Patch Farms",
    location: "Local",
    distance: 1.8,
    coordinates: { lat: 39.6393, lng: -75.6683 }, // Near Bear, DE
    variants: ["Regular"],
    farm: {
      name: "Blueberry Hill Farm",
      image: "https://images.squarespace-cdn.com/content/v1/59233439b3db2b1a2bff6b52/1595284184451-6FMHRISLTYCOUBJVW1NU/blueberry+farms+glens+falls+ny"
    }
  },
  { 
    id: 18,
    name: "Blueberry Jam", 
    price: "$6.99", 
    image: "https://www.twinoakmarket.com/cdn/shop/products/BlueberryJam.jpg?v=1615856777",
    category: "Pantry",
    description: "Homemade blueberry jam, made with fresh berries and natural sweeteners.",
    unit: "8oz jar",
    inStock: true,
    rating: 4.8,
    reviews: 112,
    farmer: "Berry Patch Farms",
    location: "Local",
    distance: 1.8,
    coordinates: { lat: 39.6393, lng: -75.6683 }, // Near Bear, DE
    variants: ["Regular", "Low Sugar"],
    farm: {
      name: "Blueberry Hill Farm",
      image: "https://images.squarespace-cdn.com/content/v1/59233439b3db2b1a2bff6b52/1595284184451-6FMHRISLTYCOUBJVW1NU/blueberry+farms+glens+falls+ny"
    }
  },

  // Newark Area Products
  {
    id: 3,
    name: "Fresh Eggs",
    price: "$6.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkq-L39OlKMpP5_8jjf3ytTEq0cIjQePskQg&s",
    category: "Dairy",
    description: "Farm-fresh organic eggs from free-range chickens.",
    unit: "dozen",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    farmer: "Newark Poultry Farm",
    location: "Local",
    distance: 5.2,
    coordinates: { lat: 39.6837, lng: -75.7497 }, // Newark, DE
    variants: ["Regular", "Large", "Extra Large"],
    farm: {
      name: "Newark Poultry Farm",
      image: "https://corporate.perduefarms.com/media/2375/outdoor-chicken.jpg"
    }
  },
  {
    id: 21,
    name: "Chicken Sausage",
    price: "$7.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NKIu60-K6-uahbG5668wyWOnjoktzbA4dg&s",
    category: "Meat",
    description: "Homemade chicken sausage, made with premium ingredients.",
    unit: "pound",
    inStock: true,
    rating: 4.7,
    reviews: 98,
    farmer: "Newark Poultry Farm",
    location: "Local",
    distance: 5.2,
    coordinates: { lat: 39.6837, lng: -75.7497 }, // Newark, DE
    variants: ["Italian", "Apple Sage", "Spicy"],
    farm: {
      name: "Newark Poultry Farm",
      image: "https://corporate.perduefarms.com/media/2375/outdoor-chicken.jpg"
    }
  },

  // Wilmington Area Products
  {
    id: 5,
    name: "Fresh Basil",
    price: "$3.99",
    image: "https://frutplanet.com/wp-content/uploads/2023/10/Basil.jpg",
    category: "Herbs",
    description: "Freshly harvested organic basil, perfect for cooking.",
    unit: "bunch",
    inStock: true,
    rating: 4.5,
    reviews: 67,
    farmer: "Wilmington Urban Farm",
    location: "Local",
    distance: 8.5,
    coordinates: { lat: 39.7396, lng: -75.5398 }, // Wilmington, DE
    variants: ["Regular"],
    farm: {
      name: "Wilmington Urban Farm",
      image: "https://static.country-guide.ca/wp-content/uploads/2022/10/04115141/farm_red_barns-iStock.jpeg"
    }
  },
  {
    id: 24,
    name: "Fresh Mint",
    price: "$3.99",
    image: "https://cdnimg.webstaurantstore.com/images/products/large/440660/2263438.jpg",
    category: "Herbs",
    description: "Fresh organic mint, great for beverages and cooking.",
    unit: "bunch",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    farmer: "Wilmington Urban Farm",
    location: "Local",
    distance: 8.5,
    coordinates: { lat: 39.7396, lng: -75.5398 }, // Wilmington, DE
    variants: ["Regular"],
    farm: {
      name: "Wilmington Urban Farm",
      image: "https://static.country-guide.ca/wp-content/uploads/2022/10/04115141/farm_red_barns-iStock.jpeg"
    }
  },

  // Wilmington Bread Co. Products
  {
    id: 6,
    name: "Artisan Sourdough Bread",
    price: "$7.50",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300",
    category: "Bakery",
    description: "Freshly baked artisan sourdough bread, made with organic flour.",
    unit: "loaf",
    inStock: true,
    rating: 4.9,
    reviews: 134,
    farmer: "Wilmington Bread Co.",
    location: "Local",
    distance: 8.5,
    coordinates: { lat: 39.7396, lng: -75.5398 }, // Wilmington, DE
    variants: ["Regular", "Whole Wheat"],
    farm: {
      name: "Wilmington Bread Co.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=50&h=50&fit=crop"
    }
  }
];

function Market({ cart, addToCart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = React.useRef(null);
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    productId: null
  });
  const [filters, setFilters] = useState({
    categories: [],
    labels: [],
    priceRange: {
      min: 0,
      max: 50
    },
    distance: 30
  });

  const distanceOptions = [5, 10, 15, 20, 25, 30];

  const requestLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
          setIsLocationLoading(false);
        },
        (error) => {
          setLocationError("Unable to access location. Please enable location services in your browser settings.");
          setIsLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLocationLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const formatDistance = (distance) => {
    return `${distance.toFixed(1)} miles from you`;
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

  const handleDistanceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      distance: Number(value)
    }));
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleFarmClick = (e, farmName) => {
    e.stopPropagation();
    navigate(`/farm/${encodeURIComponent(farmName)}`);
  };

  const filteredProducts = products.filter(product => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }

    const productPrice = parseFloat(product.price.replace('$', ''));
    if (productPrice < filters.priceRange.min || productPrice > filters.priceRange.max) {
      return false;
    }

    if (filters.labels.length > 0) {
      if (filters.labels.includes("Organic") && !product.description.toLowerCase().includes("organic")) {
        return false;
      }
      if (filters.labels.includes("Local") && product.distance > 10) {
        return false;
      }
    }

    let productDistance;
    if (userLocation && product.coordinates) {
      productDistance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        product.coordinates.lat,
        product.coordinates.lng
      );
    } else {
      productDistance = product.distance;
    }

    return productDistance <= filters.distance;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`}>★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half-star">½</span>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }
    return stars;
  };

  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price?.replace('$', '') || '0');
      const quantity = parseInt(item.quantity || '0');
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  // Add click outside handler to close cart dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debug cart state
  useEffect(() => {
    console.log("Cart state in Market:", cart);
  }, [cart]);

  return (
    <div className="market-container">
      <nav className="market-nav">
        <h1>Farm2Table</h1>
        <div className="nav-buttons">
          <div className="cart-container" ref={cartRef}>
            <button 
              className="cart-button" 
              onClick={() => {
                console.log("Cart button clicked, current state:", isCartOpen);
                setIsCartOpen(!isCartOpen);
              }}
            >
              <span className="cart-text">Cart ({cart ? cart.length : 0})</span>
            </button>
            <div className={`cart-dropdown ${isCartOpen ? 'show' : ''}`}>
              {!cart || cart.length === 0 ? (
                <div className="empty-cart-message">Your cart is empty</div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-price">{item.price}</div>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, Math.max(0, item.quantity - 1));
                          }} 
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }} 
                          className="quantity-btn"
                        >
                          +
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    Total: ${calculateTotal()}
                  </div>
                  <Link to="/cart" className="check-cart-btn">Check Cart</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="market-grid">
        <aside className="filters">
          <h2>Filters</h2>
          <div className="filter-box">
            <div className="filter-section">
              <h3>Distance</h3>
              {!userLocation && !locationError && (
                <button onClick={requestLocation} className="location-request-btn" disabled={isLocationLoading}>
                  {isLocationLoading ? "Getting Location..." : "Share My Location"}
                </button>
              )}
              {locationError && (
                <div className="location-error">
                  <p>{locationError}</p>
                  <button onClick={requestLocation} className="location-request-btn" disabled={isLocationLoading}>
                    Try Again
                  </button>
                </div>
              )}
              {userLocation && (
                <select 
                  value={filters.distance} 
                  onChange={(e) => handleDistanceChange(e.target.value)} 
                  className="distance-select"
                >
                  {distanceOptions.map(distance => (
                    <option key={distance} value={distance}>Within {distance} miles</option>
                  ))}
                </select>
              )}
            </div>

            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-list">
                {["Fruits & Veggies", "Dairy", "Bakery", "Meat", "Pantry", "Herbs", "Home"].map(category => (
                  <div key={category} className="filter-item">
                    <label className="filter-label">
                      <input 
                        type="checkbox" 
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter("categories", category)}
                      />
                      <span className="filter-text">{category}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Labels</h3>
              <div className="filter-list">
                {["Organic", "Local"].map(label => (
                  <div key={label} className="filter-item">
                    <label className="filter-label">
                      <input 
                        type="checkbox" 
                        checked={filters.labels.includes(label)}
                        onChange={() => toggleFilter("labels", label)}
                      />
                      <span className="filter-text">{label}</span>
                    </label>
                  </div>
                ))}
              </div>
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
              </div>
            </div>
          </div>
        </aside>

        <main className="products-grid">
          {!userLocation && !locationError && (
            <div className="location-prompt">
              <h2>Find Products Near You</h2>
              <p>Share your location to see products available in your area.</p>
              <button 
                onClick={requestLocation}
                className="location-request-btn large"
                disabled={isLocationLoading}
              >
                {isLocationLoading ? "Getting Location..." : "Share My Location"}
              </button>
            </div>
          )}
          {locationError && (
            <div className="location-error-message">
              <h2>Location Access Required</h2>
              <p>{locationError}</p>
              <button 
                onClick={requestLocation}
                className="location-request-btn large"
                disabled={isLocationLoading}
              >
                Try Again
              </button>
            </div>
          )}
          {userLocation && filteredProducts.length === 0 && (
            <div className="no-products-message">
              <h2>No Products Found</h2>
              <p>No products found within {filters.distance} miles of your location.</p>
              <p>Try increasing the distance range or check back later for new products.</p>
            </div>
          )}
          {userLocation && filteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => openProductDetails(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <div className="product-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="review-count">({product.reviews} reviews)</span>
                </div>
                <p className="product-price">{product.price}</p>
                <div className="farm-info">
                  <img src={product.farm.image} alt={product.farm.name} className="farm-image" />
                  <span className="farm-name clickable" onClick={(e) => handleFarmClick(e, product.farm.name)}>
                    {product.farm.name}
                  </span>
                </div>
                <p className="distance-info">
                  <span className="distance-icon">📍</span>
                  {userLocation 
                    ? formatDistance(calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        product.coordinates.lat,
                        product.coordinates.lng
                      ))
                    : formatDistance(product.distance)
                  }
                </p>
                <button onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>

        {selectedProduct && (
          <div className="product-modal-overlay" onClick={closeProductDetails}>
            <div className="product-modal" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={closeProductDetails}>&times;</button>
              <div className="product-modal-content">
                <div className="product-modal-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
                <div className="product-modal-info">
                  <h2>{selectedProduct.name}</h2>
                  <p className="product-category">{selectedProduct.category}</p>
                  <div className="farm-info modal-farm-info">
                    <img src={selectedProduct.farm.image} alt={selectedProduct.farm.name} className="farm-image" />
                    <span className="farm-name clickable" onClick={(e) => handleFarmClick(e, selectedProduct.farm.name)}>
                      {selectedProduct.farm.name}
                    </span>
                  </div>
                  <p className="distance-info modal-distance">
                    <span className="distance-icon">📍</span>
                    {userLocation 
                      ? formatDistance(calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          selectedProduct.coordinates.lat,
                          selectedProduct.coordinates.lng
                        ))
                      : formatDistance(selectedProduct.distance)
                    }
                  </p>
                  <div className="product-options">
                    <div className="flavor-select">
                      <label>Pick a flavor</label>
                      <select>
                        {selectedProduct.variants.map((variant, index) => (
                          <option key={index} value={variant}>{variant}</option>
                        ))}
                      </select>
                    </div>
                    <div className="size-select">
                      <label>Pick a size</label>
                      <select>
                        {selectedProduct.category === "Fruits & Veggies" ? (
                          <>
                            <option value="1">1 pound</option>
                            <option value="2">2 pounds</option>
                            <option value="5">5 pounds</option>
                          </>
                        ) : selectedProduct.category === "Dairy" ? (
                          <>
                            <option value="8oz">8 oz</option>
                            <option value="16oz">16 oz</option>
                            <option value="32oz">32 oz</option>
                          </>
                        ) : selectedProduct.category === "Bakery" ? (
                          <>
                            <option value="regular">Regular</option>
                            <option value="large">Large</option>
                          </>
                        ) : (
                          <option value="regular">Regular</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <button className="add-to-cart-btn modal-add-btn" onClick={() => {
                    addToCart(selectedProduct);
                    closeProductDetails();
                  }}>
                    Add to Cart
                  </button>
                  <div className="product-description">
                    <h3>Description</h3>
                    <p>{selectedProduct.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="market-footer">
        &copy; 2025 Farm2Table. All rights reserved.
      </footer>
    </div>
  );
}

export default Market;
