import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './farm2table_dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = "http://localhost:8080/api/ai";

function Farm2TableDashboard() {
  const [pricingData, setPricingData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('Corn'); // Default product
  const [suggestedPrices, setSuggestedPrices] = useState([
    { name: 'Corn', basePrice: 12, category: 'Grains' },
    { name: 'Strawberries', basePrice: 8, category: 'Fruits' },
    { name: 'Blueberries', basePrice: 7, category: 'Fruits' },
    { name: 'Carrots', basePrice: 7, category: 'Vegetables' },
  ]);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Get unique products for the dropdown
  const uniqueProducts = [...new Set(suggestedPrices.map(crop => crop.name))];

  useEffect(() => {
    fetchRealTimePricing();
    generateSuggestedPrices();
    showPriceTooltip();

    const applyButton = document.getElementById("f2t-apply-btn");
    applyButton?.addEventListener("click", applySuggestedPrices);

    return () => {
      if (applyButton) {
        applyButton.removeEventListener("click", applySuggestedPrices);
      }
    };
  }, [selectedProduct]); // Refetch when product changes

  async function fetchRealTimePricing() {
    try {
      const requestData = {
        historicalPrices: [12.0, 11.8, 12.2, 12.5, 12.1],
        demand: [120, 150, 170, 140, 160],
      };

      const response = await fetch(`${API_BASE_URL}/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPricingData({
        price: data?.price ?? 12.2,
        message: data?.message
      });
    } catch (error) {
      console.error("Error fetching real-time pricing:", error);
      setPricingData({
        price: 12.2,
        message: "Using default pricing data (Backend server not available)"
      });
    }
  }

  function generateSuggestedPrices() {
    const crops = [
      { name: "Strawberries", basePrice: 8, category: 'Fruits' },
      { name: "Blueberries", basePrice: 7, category: 'Fruits' },
      { name: "Cucumbers", basePrice: 6, category: 'Vegetables' },
      { name: "Carrots", basePrice: 7, category: 'Vegetables' },
      { name: "Corn", basePrice: 12, category: 'Grains' },
      { name: "Whole Milk", basePrice: 4, category: 'Dairy' },
      { name: "Apples", basePrice: 5, category: 'Fruits' },
    ];

    setSuggestedPrices(crops);
  }

  function applySuggestedPrices() {
    const selectedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    selectedItems.forEach((item) => {
      const cropName = item.value;
      const cropPrice = parseFloat(item.dataset.price);
      updateCropPrice(cropName, cropPrice);
    });
  }

  async function updateCropPrice(cropName, price) {
    console.log(`Updating ${cropName} to $${price.toFixed(2)} per lb...`);
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Market Price Trend",
        data: [12, 11.8, 12.2, 12.5, 12.1, 13.0],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '6-Month Price History'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price per lb ($)'
        }
      }
    }
  };

  function showPriceTooltip() {
    const tooltip = document.getElementById("f2t-tooltip");
    tooltip.style.display = "block";
    setTimeout(() => {
      tooltip.style.display = "none";
    }, 5000);
  }

  // Group crops by category
  const groupedCrops = suggestedPrices.reduce((acc, crop) => {
    if (!acc[crop.category]) {
      acc[crop.category] = [];
    }
    acc[crop.category].push(crop);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="farm-dashboard">
      <header className="dashboard-header">
        <h1>Farm2Table Pricing Dashboard</h1>
        <p className="subtitle">Smart pricing for sustainable agriculture</p>
      </header>

      <div className="dashboard-grid">
        <div className="left-section">
          <div className="pricing-card">
            <h2>Real-time Market Price</h2>
            <div className="product-selector">
              <label htmlFor="price-product-select">Select Product:</label>
              <select 
                id="price-product-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {uniqueProducts.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
            {pricingData && typeof pricingData.price === 'number' ? (
              <div className="price-display">
                <div className="price-value">${pricingData.price.toFixed(2)}</div>
                <div className="price-label">per lb</div>
                {pricingData.message && (
                  <p className="warning-message">{pricingData.message}</p>
                )}
              </div>
            ) : (
              <div className="loading">Loading pricing data...</div>
            )}
          </div>

          <div className="chart-card">
            <h2>Market Price Trend</h2>
            <div className="product-selector">
              <label htmlFor="trend-product-select">Select Product:</label>
              <select 
                id="trend-product-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {uniqueProducts.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
            <div style={{ height: '300px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="category-grid">
            {Object.entries(groupedCrops).map(([category, crops]) => (
              <div 
                key={category}
                className={`category-card ${collapsedCategories[category] ? 'collapsed' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                <h3>{category}</h3>
                <div className="crop-list">
                  {crops.map((crop) => (
                    <div key={crop.name} className="crop-item">
                      <input
                        type="checkbox"
                        id={`f2t-${crop.name}`}
                        checked={selectedCrops.includes(crop.name)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSelectedCrops(isChecked ? [...selectedCrops, crop.name] : selectedCrops.filter((c) => c !== crop.name));
                        }}
                      />
                      <span className="crop-name">{crop.name}</span>
                      <span className="crop-price">${crop.basePrice.toFixed(2)}/lb</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-section">
        <button id="f2t-apply-btn" className="apply-button">
          Apply Selected Prices
        </button>
        <div id="f2t-tooltip" className="tooltip" style={{ display: 'none' }}>
          Prices have been updated!
        </div>
      </div>
    </div>
  );
}

export default Farm2TableDashboard; 