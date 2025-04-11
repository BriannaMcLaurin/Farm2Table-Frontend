import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './FarmPage.css';


const FarmPage = ({ products, addToCart }) => {
  const { farmName } = useParams();
 
  // Find the farm details from any product of this farm
  const farmDetails = products.find(p => p.farm.name === decodeURIComponent(farmName))?.farm;
 
  // Filter products for this specific farm
  const farmProducts = products.filter(product =>
    product.farm.name === decodeURIComponent(farmName)
  );


  if (!farmDetails) {
    return (
      <div className="farm-page-container">
        <h1>Farm not found</h1>
        <Link to="/" className="back-link">Back to Market</Link>
      </div>
    );
  }


  return (
    <div className="farm-page-container">
      <Link to="/" className="back-link">← Back to Market</Link>
     
      <div className="farm-header">
        <img src={farmDetails.image} alt={farmDetails.name} className="farm-profile-image" />
        <h1>{farmDetails.name}</h1>
      </div>


      <div className="farm-products">
        <h2>Products from {farmDetails.name}</h2>
        <div className="farm-products-grid">
          {farmProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <p className="product-description">{product.description}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default FarmPage;