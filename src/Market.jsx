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
    description: "Sweet and juicy organic strawberries",
    unit: "pound",
    inStock: true,
    distance: 2.5,
    location: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
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
    description: "Sweet and tart organic raspberries",
    unit: "pound",
    inStock: true,
    distance: 2.5,
    location: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
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
    description: "Juicy organic blackberries",
    unit: "pound",
    inStock: true,
    distance: 2.5,
    location: { lat: 39.6293, lng: -75.6583 }, // Bear, DE
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
    description: "Fresh-picked blueberries",
    unit: "pound",
    inStock: true,
    distance: 1.8,
    location: { lat: 39.6393, lng: -75.6683 }, // Near Bear, DE
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
    description: "Homemade blueberry jam",
    unit: "8oz jar",
    inStock: true,
    distance: 1.8,
    location: { lat: 39.6393, lng: -75.6683 }, // Near Bear, DE
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
    description: "Farm-fresh organic eggs",
    unit: "dozen",
    inStock: true,
    distance: 5.2,
    location: { lat: 39.6837, lng: -75.7497 }, // Newark, DE
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
    description: "Homemade chicken sausage",
    unit: "pound",
    inStock: true,
    distance: 5.2,
    location: { lat: 39.6837, lng: -75.7497 }, // Newark, DE
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
    description: "Freshly harvested organic basil",
    unit: "bunch",
    inStock: true,
    distance: 8.5,
    location: { lat: 39.7396, lng: -75.5398 }, // Wilmington, DE
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
    description: "Fresh organic mint",
    unit: "bunch",
    inStock: true,
    distance: 8.5,
    location: { lat: 39.7396, lng: -75.5398 }, // Wilmington, DE
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
    description: "Freshly baked traditional sourdough",
    unit: "loaf",
    inStock: true,
    distance: 9.2,
    location: { lat: 39.7496, lng: -75.5498 }, // Near Wilmington, DE
    variants: ["Regular", "Whole Wheat", "Rye"],
    farm: {
      name: "Wilmington Bread Co.",
      image: "https://scottjosephorlando.com/wp-content/uploads/Bread_co_exterior.jpg"
    }
  },
  {
    id: 26,
    name: "Baguette",
    price: "$5.99",
    image: "https://rogueproduce.com/wp-content/uploads/2019/07/s914098472241472126_p4_i1_w320.jpeg",
    category: "Bakery",
    description: "Fresh French baguette",
    unit: "loaf",
    inStock: true,
    distance: 9.2,
    location: { lat: 39.7496, lng: -75.5498 }, // Near Wilmington, DE
    variants: ["Regular", "Whole Grain"],
    farm: {
      name: "Wilmington Bread Co.",
      image: "https://scottjosephorlando.com/wp-content/uploads/Bread_co_exterior.jpg"
    }
  },
  {
    id: 27,
    name: "Croissants",
    price: "$3.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzAlP0af9ShIdU8DAmGGBdpEDYcT2O_8NiqA&s",
    category: "Bakery",
    description: "Fresh baked croissants",
    unit: "each",
    inStock: true,
    distance: 9.2,
    location: { lat: 39.7496, lng: -75.5498 }, // Near Wilmington, DE
    variants: ["Plain", "Chocolate", "Almond"],
    farm: {
      name: "Wilmington Bread Co.",
      image: "https://scottjosephorlando.com/wp-content/uploads/Bread_co_exterior.jpg"
    }
  },

  // Dover Area Products
  {
    id: 7,
    name: "Cherry Tomatoes",
    price: "$4.99",
    image: "https://www.kitchengardenseeds.com/media/catalog/product/cache/b8afbc9b375ff88a260fed7bdf351322/4/3/4310_c.jpg",
    category: "Fruits & Veggies",
    description: "Sweet and juicy organic cherry tomatoes",
    unit: "pound",
    inStock: true,
    distance: 15.3,
    location: { lat: 39.1582, lng: -75.5244 }, // Dover, DE
    variants: ["Regular", "Mixed Colors"],
    farm: {
      name: "Dover Valley Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },

  {
    id: 29,
    name: "Tomato Sauce",
    price: "$7.99",
    image: "https://images.themodernproper.com/production/posts/HomemadeTomatoSauce_6.jpg?w=1200&q=82&auto=format&fit=crop&dm=1723598633&s=50d828b78ecd0e2be5790e125eabbbd6",
    category: "Pantry",
    description: "Homemade tomato sauce",
    unit: "16oz jar",
    inStock: true,
    distance: 15.3,
    location: { lat: 39.1582, lng: -75.5244 }, // Dover, DE
    variants: ["Regular", "Spicy"],
    farm: {
      name: "Dover Valley Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },

  // Dover Creek Dairy Products
  {
    id: 8,
    name: "Fresh Goat Cheese",
    price: "$6.99",
    image: "https://harmonylanefarms.com/wp-content/uploads/2021/02/IMG_5744-scaled.jpg",
    category: "Dairy",
    description: "Creamy artisanal goat cheese",
    unit: "4oz",
    inStock: true,
    distance: 16.2,
    location: { lat: 39.1682, lng: -75.5344 }, // Near Dover, DE
    variants: ["Plain", "Herb", "Garlic"],
    farm: {
      name: "Dover Creek Dairy",
      image: "https://images.unsplash.com/photo-1585438894319-a8765c8a4a39?w=50&h=50&fit=crop"
    }
  },
  {
    id: 30,
    name: "Goat Milk",
    price: "$5.99",
    image: "https://s3.amazonaws.com/grazecart/millersbiodiversityfarm/images/1586459643_5e8f73fb68292.jpg",
    category: "Dairy",
    description: "Fresh goat milk",
    unit: "quart",
    inStock: true,
    distance: 16.2,
    location: { lat: 39.1682, lng: -75.5344 }, // Near Dover, DE
    variants: ["Regular", "Chocolate"],
    farm: {
      name: "Dover Creek Dairy",
      image: "https://images.unsplash.com/photo-1585438894319-a8765c8a4a39?w=50&h=50&fit=crop"
    }
  },
  {
    id: 31,
    name: "Goat Milk Soap",
    price: "$6.99",
    image: "https://fancyfarmskincare.com/cdn/shop/files/Better_quality-328_1024x1024@2x.jpg?v=1721404486",
    category: "Home",
    description: "Natural goat milk soap",
    unit: "bar",
    inStock: true,
    distance: 16.2,
    location: { lat: 39.1682, lng: -75.5344 }, // Near Dover, DE
    variants: ["Lavender", "Oatmeal", "Unscented"],
    farm: {
      name: "Dover Creek Dairy",
      image: "https://images.unsplash.com/photo-1585438894319-a8765c8a4a39?w=50&h=50&fit=crop"
    }
  },
  // Milford Corn Farm Products
  {
    id: 11,
    name: "Fresh Corn",
    price: "$3.99",
    image: "https://m.media-amazon.com/images/I/81OLAk+oGiL.jpg",
    category: "Fruits & Veggies",
    description: "Sweet Delaware corn",
    unit: "dozen",
    inStock: true,
    distance: 18.3,
    location: { lat: 38.9108, lng: -75.5277 }, // Milford, DE
    variants: ["Yellow", "White", "Bi-color"],
    farm: {
      name: "Milford Corn Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },
  {
    id: 36,
    name: "Cornmeal",
    price: "$4.99",
    image: "https://cdn11.bigcommerce.com/s-cc4vwikzsm/images/stencil/1280x1280/products/1258/141975/full__42021.1690064770.jpg?c=1",
    category: "Pantry",
    description: "Fresh ground cornmeal",
    unit: "lb",
    inStock: true,
    distance: 18.3,
    location: { lat: 38.9108, lng: -75.5277 }, // Milford, DE
    variants: ["Fine", "Medium", "Coarse"],
    farm: {
      name: "Milford Corn Farm",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=50&h=50&fit=crop"
    }
  },

  // Peach Valley Orchard Products
  {
    id: 12,
    name: "Fresh Peaches",
    price: "$4.99",
    image: "https://130383311.cdn6.editmysite.com/uploads/1/3/0/3/130383311/s947339032414868585_p343_i1_w1920.jpeg",
    category: "Fruits & Veggies",
    description: "Juicy Delaware peaches",
    unit: "pound",
    inStock: true,
    distance: 20.1,
    location: { lat: 38.9208, lng: -75.5377 }, // Near Milford, DE
    variants: ["Yellow", "White"],
    farm: {
      name: "Peach Valley Orchard",
      image: "https://images.unsplash.com/photo-1585438896013-06f01882e8e4?w=50&h=50&fit=crop"
    }
  },
  {
    id: 38,
    name: "Peach Jam",
    price: "$6.99",
    image: "https://madeinmichigan.com/wp-content/uploads/2024/07/Peach-Jam.jpg",
    category: "Pantry",
    description: "Homemade peach jam",
    unit: "8oz jar",
    inStock: true,
    distance: 20.1,
    location: { lat: 38.9208, lng: -75.5377 }, // Near Milford, DE
    variants: ["Regular", "Spiced"],
    farm: {
      name: "Peach Valley Orchard",
      image: "https://images.unsplash.com/photo-1585438896013-06f01882e8e4?w=50&h=50&fit=crop"
    }
  },
  {
    id: 39,
    name: "Peach Pie",
    price: "$14.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2ux_09N67o1QkD8wgQ25VfBKgrcHGs2U1Q&s",
    category: "Bakery",
    description: "Fresh peach pie",
    unit: "each",
    inStock: true,
    distance: 20.1,
    location: { lat: 38.9208, lng: -75.5377 }, // Near Milford, DE
    variants: ["Regular", "Crumble Top"],
    farm: {
      name: "Peach Valley Orchard",
      image: "https://images.unsplash.com/photo-1585438896013-06f01882e8e4?w=50&h=50&fit=crop"
    }
  },

];

function Market({ cart, addToCart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    if (userLocation && product.location) {
      productDistance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        product.location.lat,
        product.location.lng
      );
    } else {
      productDistance = product.distance;
    }

    return productDistance <= filters.distance;
  });

  return (
    <div className="market-container">
      <nav className="market-nav">
        <h1>Farm2Table</h1>
        <div className="nav-buttons">
          <div className="cart-container">
            <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
              <span className="cart-text">Cart ({cart.length})</span>
              {cart.length > 0 && isCartOpen && (
                <div className="cart-dropdown">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">{item.price}</p>
                      </div>
                      <div className="quantity-controls">
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, Math.max(0, item.quantity - 1));
                          }} 
                          className="quantity-btn"
                        >
                          -
                        </div>
                        <span className="quantity">{item.quantity}</span>
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }} 
                          className="quantity-btn"
                        >
                          +
                        </div>
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }} 
                          className="remove-btn"
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    <p>Total: ${cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}</p>
                  </div>
                  <Link to="/cart" className="check-cart-btn">Check Cart</Link>
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
                <select value={filters.distance} onChange={(e) => handleDistanceChange(e.target.value)} className="distance-select">
                  {distanceOptions.map(distance => (
                    <option key={distance} value={distance}>Within {distance} miles</option>
                  ))}
                </select>
              )}
            </div>

            <div className="filter-section">
              <h3>Categories</h3>
              <ul>
                {["Fruits & Veggies", "Dairy", "Bakery", "Meat", "Pantry", "Herbs", "Home"].map(category => (
                  <li key={category}>
                    <label className="filter-label">
                      <input 
                        type="checkbox" 
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter("categories", category)}
                      />
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="filter-section">
              <h3>Labels</h3>
              <ul>
                {["Organic", "Local"].map(label => (
                  <li key={label}>
                    <label className="filter-label">
                      <input 
                        type="checkbox" 
                        checked={filters.labels.includes(label)}
                        onChange={() => toggleFilter("labels", label)}
                      />
                      {label}
                    </label>
                  </li>
                ))}
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
                        product.location.lat,
                        product.location.lng
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
                          selectedProduct.location.lat,
                          selectedProduct.location.lng
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
