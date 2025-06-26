import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'
import LoginPrompt from '../../components/LoginPrompt'
import productsData from '../../data/products.json'
import './styles.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  detailedDescription: string
  features: string[]
  specifications: Record<string, string>
  reviews: Review[]
}

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const { isLoggedIn } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showAddToCartNotification, setShowAddToCartNotification] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  // Handle add to cart notification
  useEffect(() => {
    if (showAddToCartNotification) {
      const timer = setTimeout(() => {
        setShowAddToCartNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showAddToCartNotification])

  // Find product by ID from JSON data
  useEffect(() => {
    if (id) {
      const product = productsData.products.find(p => p.id === parseInt(id)) as Product | undefined
      setSelectedProduct(product || null)
    }
  }, [id])

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: quantity
      })
      setShowAddToCartNotification(true)
    }
  }

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    // Add to wishlist logic here
    setShowAddToCartNotification(true)
  }

  if (!selectedProduct) {
    return (
      <div className="product-detail-page">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  const averageRating = selectedProduct.reviews.length > 0
    ? selectedProduct.reviews.reduce((sum, review) => sum + review.rating, 0) / selectedProduct.reviews.length
    : 0

  return (
    <div className="product-detail-page">
      {/* Login Prompt */}
      {showLoginPrompt && (
        <LoginPrompt 
          isVisible={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        />
      )}

      {/* Add to cart notification */}
      {showAddToCartNotification && (
        <div className="add-to-cart-notification">
          <div className="notification-content">
            <span>✅ Product successfully added to cart!</span>
          </div>
        </div>
      )}

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {selectedProduct.name}
      </div>

      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
        </div>

        <div className="product-info">
          <h1>{selectedProduct.name}</h1>
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={star <= averageRating ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {averageRating.toFixed(1)} ({selectedProduct.reviews.length} reviews)
            </span>
          </div>
          <div className="product-price">${selectedProduct.price}</div>
          <p className="product-description">{selectedProduct.description}</p>

          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="add-to-wishlist-btn" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <h3>Product Description</h3>
              <p>{selectedProduct.detailedDescription}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-tab">
              <h3>Key Features</h3>
              <ul>
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="specifications-tab">
              <h3>Technical Specifications</h3>
              <div className="specs-grid">
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <h3>Customer Reviews</h3>
              <div className="reviews-list">
                {selectedProduct.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.user}</span>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 