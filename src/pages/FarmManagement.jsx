import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './FarmManagement.css';

const FarmManagement = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // State for farm details
  const [farmDetails, setFarmDetails] = useState({
    name: '',
    image: '',
    description: '',
    location: '',
    contact: '',
    established: '',
    specialties: []
  });
  
  // State for products
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    unit: '',
    inStock: true,
    variants: []
  });
  
  // State for UI
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Load farm data on component mount
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage to persist data
    const savedFarmDetails = localStorage.getItem(`farm_${currentUser?.uid}`);
    const savedProducts = localStorage.getItem(`products_${currentUser?.uid}`);
    
    if (savedFarmDetails) {
      setFarmDetails(JSON.parse(savedFarmDetails));
    }
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [currentUser]);
  
  // Save farm data to localStorage
  const saveFarmData = () => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate farm details
      if (!farmDetails.name) {
        throw new Error('Farm name is required');
      }
      
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem(`farm_${currentUser?.uid}`, JSON.stringify(farmDetails));
      localStorage.setItem(`products_${currentUser?.uid}`, JSON.stringify(products));
      
      setSuccess('Farm details saved successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add a new product
  const addProduct = () => {
    setError('');
    
    // Validate product
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      setError('Product name, price, and category are required');
      return;
    }
    
    // Create a new product with a unique ID
    const productToAdd = {
      ...newProduct,
      id: Date.now(), // Simple way to generate a unique ID
      farm: {
        name: farmDetails.name,
        image: farmDetails.image
      }
    };
    
    // Add to products array
    setProducts([...products, productToAdd]);
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      image: '',
      category: '',
      description: '',
      unit: '',
      inStock: true,
      variants: []
    });
    
    setIsAddingProduct(false);
    setSuccess('Product added successfully!');
  };
  
  // Remove a product
  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setSuccess('Product removed successfully!');
  };
  
  // Update a product
  const updateProduct = (productId, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...updatedProduct } : product
    ));
    setSuccess('Product updated successfully!');
  };
  
  // Toggle product stock status
  const toggleProductStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, inStock: !product.inStock } : product
    ));
  };
  
  // Handle input changes for farm details
  const handleFarmDetailChange = (e) => {
    const { name, value } = e.target;
    setFarmDetails({
      ...farmDetails,
      [name]: value
    });
  };
  
  // Handle input changes for new product
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle specialty changes
  const handleSpecialtyChange = (e) => {
    const { value } = e.target;
    if (value && !farmDetails.specialties.includes(value)) {
      setFarmDetails({
        ...farmDetails,
        specialties: [...farmDetails.specialties, value]
      });
    }
  };
  
  // Remove a specialty
  const removeSpecialty = (specialty) => {
    setFarmDetails({
      ...farmDetails,
      specialties: farmDetails.specialties.filter(s => s !== specialty)
    });
  };
  
  // Handle variant changes
  const handleVariantChange = (e) => {
    const { value } = e.target;
    if (value && !newProduct.variants.includes(value)) {
      setNewProduct({
        ...newProduct,
        variants: [...newProduct.variants, value]
      });
    }
  };
  
  // Remove a variant
  const removeVariant = (variant) => {
    setNewProduct({
      ...newProduct,
      variants: newProduct.variants.filter(v => v !== variant)
    });
  };
  
  // Publish farm to market
  const publishToMarket = () => {
    // In a real app, this would send data to an API
    // For now, we'll just show a success message
    setSuccess('Farm published to market successfully!');
    
    // Redirect to market page
    setTimeout(() => {
      navigate('/market');
    }, 2000);
  };
  
  return (
    <div className="farm-management-container">
      <h1>Farm Management</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="farm-details-section">
        <div className="section-header">
          <h2>Farm Details</h2>
          {!isEditing ? (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Farm Details
            </button>
          ) : (
            <div className="action-buttons">
              <button 
                className="save-button"
                onClick={saveFarmData}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="farm-form">
            <div className="form-group">
              <label htmlFor="name">Farm Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={farmDetails.name}
                onChange={handleFarmDetailChange}
                placeholder="Enter your farm name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Farm Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={farmDetails.image}
                onChange={handleFarmDetailChange}
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Farm Description</label>
              <textarea
                id="description"
                name="description"
                value={farmDetails.description}
                onChange={handleFarmDetailChange}
                placeholder="Describe your farm"
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={farmDetails.location}
                onChange={handleFarmDetailChange}
                placeholder="Enter farm location"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact">Contact Information</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={farmDetails.contact}
                onChange={handleFarmDetailChange}
                placeholder="Enter contact information"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="established">Established Year</label>
              <input
                type="text"
                id="established"
                name="established"
                value={farmDetails.established}
                onChange={handleFarmDetailChange}
                placeholder="Enter year established"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="specialties">Specialties</label>
              <div className="specialties-input">
                <input
                  type="text"
                  id="specialties"
                  placeholder="Add a specialty (e.g., Organic, Sustainable)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSpecialtyChange(e);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className="add-button"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value) {
                      handleSpecialtyChange({ target: { value: input.value } });
                      input.value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <div className="specialties-list">
                {farmDetails.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">
                    {specialty}
                    <button 
                      className="remove-tag"
                      onClick={() => removeSpecialty(specialty)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="farm-preview">
            {farmDetails.image && (
              <div className="farm-image">
                <img src={farmDetails.image} alt={farmDetails.name || 'Farm'} />
              </div>
            )}
            
            <div className="farm-info">
              <h3>{farmDetails.name || 'Your Farm'}</h3>
              <p>{farmDetails.description || 'No description provided.'}</p>
              
              {farmDetails.location && (
                <div className="info-item">
                  <strong>Location:</strong> {farmDetails.location}
                </div>
              )}
              
              {farmDetails.contact && (
                <div className="info-item">
                  <strong>Contact:</strong> {farmDetails.contact}
                </div>
              )}
              
              {farmDetails.established && (
                <div className="info-item">
                  <strong>Established:</strong> {farmDetails.established}
                </div>
              )}
              
              {farmDetails.specialties.length > 0 && (
                <div className="info-item">
                  <strong>Specialties:</strong>
                  <div className="specialties-list">
                    {farmDetails.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="products-section">
        <div className="section-header">
          <h2>Products</h2>
          {!isAddingProduct ? (
            <button 
              className="add-product-button"
              onClick={() => setIsAddingProduct(true)}
            >
              Add New Product
            </button>
          ) : (
            <button 
              className="cancel-button"
              onClick={() => setIsAddingProduct(false)}
            >
              Cancel
            </button>
          )}
        </div>
        
        {isAddingProduct ? (
          <div className="product-form">
            <div className="form-group">
              <label htmlFor="product-name">Product Name *</label>
              <input
                type="text"
                id="product-name"
                name="name"
                value={newProduct.name}
                onChange={handleProductChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="product-price">Price *</label>
              <input
                type="text"
                id="product-price"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
                placeholder="Enter price (e.g., $5.99)"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="product-image">Product Image URL</label>
              <input
                type="text"
                id="product-image"
                name="image"
                value={newProduct.image}
                onChange={handleProductChange}
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="product-category">Category *</label>
              <select
                id="product-category"
                name="category"
                value={newProduct.category}
                onChange={handleProductChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Fruits & Veggies">Fruits & Veggies</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
                <option value="Meat">Meat</option>
                <option value="Pantry">Pantry</option>
                <option value="Herbs">Herbs</option>
                <option value="Home">Home</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                name="description"
                value={newProduct.description}
                onChange={handleProductChange}
                placeholder="Describe your product"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="product-unit">Unit</label>
              <input
                type="text"
                id="product-unit"
                name="unit"
                value={newProduct.unit}
                onChange={handleProductChange}
                placeholder="Enter unit (e.g., pound, dozen)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="product-variants">Variants</label>
              <div className="variants-input">
                <input
                  type="text"
                  id="product-variants"
                  placeholder="Add a variant (e.g., Regular, Organic)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleVariantChange(e);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className="add-button"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value) {
                      handleVariantChange({ target: { value: input.value } });
                      input.value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <div className="variants-list">
                {newProduct.variants.map((variant, index) => (
                  <span key={index} className="variant-tag">
                    {variant}
                    <button 
                      className="remove-tag"
                      onClick={() => removeVariant(variant)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="form-group checkbox">
              <label htmlFor="product-inStock">
                <input
                  type="checkbox"
                  id="product-inStock"
                  name="inStock"
                  checked={newProduct.inStock}
                  onChange={handleProductChange}
                />
                In Stock
              </label>
            </div>
            
            <button 
              className="save-button"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="empty-products">
                <p>You haven't added any products yet.</p>
                <button 
                  className="add-product-button"
                  onClick={() => setIsAddingProduct(true)}
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    )}
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">{product.price}</p>
                      <p className="product-category">{product.category}</p>
                      <div className="product-actions">
                        <button 
                          className={`stock-button ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
                          onClick={() => toggleProductStock(product.id)}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                        <button 
                          className="remove-button"
                          onClick={() => removeProduct(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="publish-section">
        <button 
          className="publish-button"
          onClick={publishToMarket}
          disabled={!farmDetails.name || products.length === 0}
        >
          Publish Farm to Market
        </button>
        <p className="publish-note">
          Publishing your farm will make it visible to customers in the market.
          Make sure all your information is complete before publishing.
        </p>
      </div>
    </div>
  );
};

export default FarmManagement; 