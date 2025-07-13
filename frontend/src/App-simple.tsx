import React, { useState, useEffect } from 'react';
import './App.css';

// Simple interfaces for the prototype
interface Product {
  _id: string;
  productName: string;
  category: string;
  carbonFootprint: number;
  packagingWaste: number;
  isSustainable: boolean;
  price: number;
  description: string;
  ecoScore: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ecoPoints, setEcoPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products from API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const avgEcoScore = cart.length > 0 
    ? Math.round(cart.reduce((sum, item) => sum + item.product.ecoScore, 0) / cart.length)
    : 0;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading EcoTrack...</h2>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ 
        background: '#16a34a', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center' 
      }}>
        <h1>🌱 EcoTrack - Smart Cart Intelligence</h1>
        <p>EcoPoints: {ecoPoints}</p>
      </header>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '20px', padding: '20px' }}>
        {/* Products Section */}
        <div style={{ flex: '2' }}>
          <h2>Available Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {products.map(product => (
              <div key={product._id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '15px',
                backgroundColor: 'white'
              }}>
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>${product.price.toFixed(2)}</span>
                  <span style={{ 
                    color: product.ecoScore >= 80 ? 'green' : 
                           product.ecoScore >= 60 ? 'orange' : 'red',
                    fontWeight: 'bold'
                  }}>
                    EcoScore: {product.ecoScore}/100
                  </span>
                </div>
                <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                  Carbon: {product.carbonFootprint}kg | Packaging: {product.packagingWaste}g
                </div>
                {product.isSustainable && (
                  <div style={{ 
                    backgroundColor: '#dcfce7', 
                    color: '#16a34a', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    marginBottom: '10px'
                  }}>
                    🌱 Sustainable Choice
                  </div>
                )}
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div style={{ flex: '1' }}>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white',
            marginBottom: '20px'
          }}>
            <h2>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
            
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.product._id} style={{ 
                    borderBottom: '1px solid #eee', 
                    paddingBottom: '10px', 
                    marginBottom: '10px' 
                  }}>
                    <h4>{item.product.productName}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>${item.product.price.toFixed(2)} x {item.quantity}</span>
                      <div>
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          style={{ marginRight: '5px', padding: '2px 6px' }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          style={{ marginLeft: '5px', padding: '2px 6px' }}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.product._id)}
                          style={{ 
                            marginLeft: '10px', 
                            backgroundColor: '#dc2626', 
                            color: 'white', 
                            border: 'none', 
                            padding: '2px 6px',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      EcoScore: {item.product.ecoScore}/100
                    </div>
                  </div>
                ))}
                
                <div style={{ borderTop: '2px solid #ddd', paddingTop: '10px', marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                    <span>Total: ${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Analytics */}
          {cart.length > 0 && (
            <div style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px',
              backgroundColor: 'white'
            }}>
              <h3>Cart EcoScore</h3>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                textAlign: 'center',
                color: avgEcoScore >= 80 ? 'green' : 
                       avgEcoScore >= 60 ? 'orange' : 'red'
              }}>
                {avgEcoScore}/100
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ 
                  backgroundColor: avgEcoScore >= 80 ? '#dcfce7' : 
                                   avgEcoScore >= 60 ? '#fef3c7' : '#fee2e2',
                  color: avgEcoScore >= 80 ? '#16a34a' : 
                         avgEcoScore >= 60 ? '#d97706' : '#dc2626',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  {avgEcoScore >= 80 ? 'Excellent Choice!' : 
                   avgEcoScore >= 60 ? 'Good Progress' : 'Room for Improvement'}
                </span>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h4>Environmental Impact</h4>
                <div style={{ marginBottom: '10px' }}>
                  <span>Total Carbon Footprint: </span>
                  <strong>{cart.reduce((sum, item) => sum + (item.product.carbonFootprint * item.quantity), 0).toFixed(1)}kg CO₂</strong>
                </div>
                <div>
                  <span>Total Packaging Waste: </span>
                  <strong>{cart.reduce((sum, item) => sum + (item.product.packagingWaste * item.quantity), 0)}g</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
