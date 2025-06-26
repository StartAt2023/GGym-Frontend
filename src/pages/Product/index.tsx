import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'
import LoginPrompt from '../../components/LoginPrompt'
import productsData from '../../data/products.json'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

const Product: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('default')
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { addToCart } = useCart()
  const { isLoggedIn } = useAuth()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)
  const [addedToWishlist, setAddedToWishlist] = useState<number | null>(null)

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && ['weight-loss', 'strength', 'muscle-gain', 'cardio', 'flexibility', 'performance', 'functional', 'senior'].includes(category)) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

  const categories = [
    { id: 'all', name: 'All Products', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' },
    { id: 'weight-loss', name: 'Weight Loss', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop' },
    { id: 'strength', name: 'Strength Training', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop' },
    { id: 'muscle-gain', name: 'Muscle Gain', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop' },
    { id: 'cardio', name: 'Cardio Equipment', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
    { id: 'flexibility', name: 'Flexibility & Recovery', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
    { id: 'performance', name: 'Performance Training', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' },
    { id: 'functional', name: 'Functional Training', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=300&fit=crop' },
    { id: 'senior', name: 'Senior Fitness', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=300&fit=crop' }
  ]

  // Filter products
  const filteredProducts = selectedCategory === 'all' 
    ? productsData.products 
    : productsData.products.filter(product => product.category === selectedCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    setAddedToCart(product.id)
    
    setTimeout(() => {
      setAddedToCart(null)
    }, 3000)
  }

  const handleAddToWishlist = (product: Product) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    // Add to wishlist logic here
    setAddedToWishlist(product.id)
    
    setTimeout(() => {
      setAddedToWishlist(null)
    }, 3000)
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Fitness Equipment</h1>
        <p>Discover our comprehensive range of professional fitness equipment</p>
      </div>

      <div className="category-filter">
        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {addedToCart === product.id && (
                <div className="added-notification">
                  Added to cart!
                </div>
              )}
              {addedToWishlist === product.id && (
                <div className="added-notification">
                  Added to wishlist!
                </div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price}</div>
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className="add-to-wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  ♡
                </button>
                <Link to={`/product/${product.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <LoginPrompt 
          isVisible={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        />
      )}
    </div>
  )
}

export default Product 