import type { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

const Product: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('default')

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏋️‍♂️' },
    { id: 'strength', name: 'Strength Training', icon: '💪' },
    { id: 'cardio', name: 'Cardio Equipment', icon: '🏃‍♂️' },
    { id: 'yoga', name: 'Yoga & Recovery', icon: '🧘‍♀️' },
    { id: 'accessories', name: 'Fitness Accessories', icon: '🎯' },
    { id: 'wearables', name: 'Fitness Wearables', icon: '⌚' }
  ]

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: 'Professional Dumbbell Set',
      price: 299,
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
      category: 'strength',
      description: 'Professional dumbbell set with multiple weight options, perfect for various training needs'
    },
    {
      id: 2,
      name: 'Multi-functional Treadmill',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      category: 'cardio',
      description: 'Smart treadmill with multiple training modes and heart rate monitoring'
    },
    {
      id: 3,
      name: 'Yoga Mat Set',
      price: 199,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      category: 'yoga',
      description: 'Eco-friendly yoga mat with non-slip surface, includes yoga blocks and stretch bands'
    },
    {
      id: 4,
      name: 'Power Training Rack',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e',
      category: 'strength',
      description: 'Multi-functional power rack supporting squats, bench press, and various exercises'
    },
    {
      id: 5,
      name: 'Exercise Bike',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      category: 'cardio',
      description: 'Professional exercise bike with silent design, perfect for home use'
    },
    {
      id: 6,
      name: 'Yoga Ball Set',
      price: 159,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      category: 'yoga',
      description: 'Professional yoga ball set with various sizes, suitable for different training needs'
    },
    {
      id: 7,
      name: 'Fitness Tracker',
      price: 199,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288',
      category: 'wearables',
      description: 'Advanced fitness tracker with heart rate monitoring and activity tracking'
    },
    {
      id: 8,
      name: 'Resistance Bands Set',
      price: 49,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      category: 'accessories',
      description: 'Set of resistance bands for strength training and rehabilitation'
    }
  ]

  // Filter products
  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' ? true : product.category === selectedCategory
  )

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

  return (
    <div className="product-page">
      <div className="filters-section">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
        <div className="sort-filter">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <div 
              className="product-image"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-actions">
                <button className="add-to-cart-btn">Add to Cart</button>
                <Link to={`/product/${product.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product 