import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { useCart } from '../../store/CartContext'
import './styles.css'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  addedDate: string
}

const Wishlist: FC = () => {
  const { isLoggedIn } = useAuth()
  const { addToCart } = useCart()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showAddToCartNotification, setShowAddToCartNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Load wishlist from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const stored = localStorage.getItem('wishlist')
      if (stored) {
        setWishlistItems(JSON.parse(stored))
      }
    }
  }, [isLoggedIn])

  // Save wishlist to localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, isLoggedIn])

  // Handle add to cart notification
  useEffect(() => {
    if (showAddToCartNotification) {
      const timer = setTimeout(() => {
        setShowAddToCartNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showAddToCartNotification])

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    }, isLoggedIn, () => setShowLoginPrompt(true))
    
    if (isLoggedIn) {
      setNotificationMessage(`${item.name} added to cart!`)
      setShowAddToCartNotification(true)
    }
  }

  const handleRemoveFromWishlist = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
    setNotificationMessage('Item removed from wishlist')
    setShowAddToCartNotification(true)
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      }, isLoggedIn, () => setShowLoginPrompt(true))
    })
    
    if (isLoggedIn) {
      setNotificationMessage('All items moved to cart!')
      setShowAddToCartNotification(true)
      setWishlistItems([])
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="empty-icon">💝</div>
          <h2>Please Login to View Your Wishlist</h2>
          <p>Sign in to save your favorite products and create your wishlist.</p>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      {/* Add to cart notification */}
      {showAddToCartNotification && (
        <div className="add-to-cart-notification">
          <div className="notification-content">
            <span>✅ {notificationMessage}</span>
          </div>
        </div>
      )}

      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Save your favorite products for later</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="empty-icon">💝</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Start browsing our products and add your favorites to your wishlist!</p>
          <Link to="/products" className="browse-btn">Browse Products</Link>
        </div>
      ) : (
        <>
          <div className="wishlist-actions">
            <span className="item-count">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</span>
            <button 
              className="move-all-btn"
              onClick={handleMoveAllToCart}
            >
              Move All to Cart
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div 
                  className="item-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">${item.price}</p>
                  <p className="item-category">{item.category}</p>
                  <p className="item-date">Added on {new Date(item.addedDate).toLocaleDateString()}</p>
                  
                  <div className="item-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                    <Link 
                      to={`/product/${item.id}`} 
                      className="view-details-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Wishlist 