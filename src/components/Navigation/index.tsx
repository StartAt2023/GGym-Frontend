import type { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Navigation: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const categories = [
    { name: 'Electronics', path: '/categories/electronics' },
    { name: 'Clothing', path: '/categories/clothing' },
    { name: 'Books', path: '/categories/books' },
    { name: 'Home & Garden', path: '/categories/home-garden' }
  ]

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/" className="logo">EzCart</Link>
      </div>
      
      <div className="nav-center">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li 
            className="categories-dropdown"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <span>Categories</span>
            {showCategories && (
              <div className="dropdown-menu">
                {categories.map((category) => (
                  <Link 
                    key={category.path} 
                    to={category.path}
                    className="dropdown-item"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <span className="user-status">Welcome, User</span>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation 