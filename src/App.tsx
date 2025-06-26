import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { authAPI } from './services/api'
import { useAuth } from './store/AuthContext'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/Product/ProductDetail'
import AdminProducts from './pages/AdminProducts'
import Wishlist from './pages/Wishlist'
import AccountSettings from './pages/AccountSettings'
import MyOrders from './pages/MyOrders'
import './App.css'

const App: FC = () => {
  const { user, isLoggedIn, login, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const data = await authAPI.getUserInfo()
        login(data)
        console.log('User info fetched:', data)
      } catch (error) {
        console.error('Failed to fetch user info:', error)
        logout()
      }
    } else {
      logout()
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  // Listen for storage changes (when token is set/removed)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          // Token was added, fetch user info
          fetchUserInfo()
        } else {
          // Token was removed, clear user
          logout()
          setLoading(false)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    authAPI.logout()
    logout()
    setShowUserMenu(false)
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">GGymShopping</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <div className="dropdown">
              <button className="dropbtn">Categories</button>
              <div className="dropdown-content">
                <Link to="/products?category=weight-loss">Weight Loss Training</Link>
                <Link to="/products?category=strength">Strength Training</Link>
                <Link to="/products?category=muscle-gain">Muscle Building</Link>
                <Link to="/products?category=cardio">Cardio Fitness</Link>
                <Link to="/products?category=flexibility">Flexibility Training</Link>
                <Link to="/products?category=performance">Sports Performance</Link>
                <Link to="/products?category=functional">Functional Training</Link>
                <Link to="/products?category=senior">Senior Fitness</Link>
              </div>
            </div>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            {user?.role === 'admin' && (
              <Link to="/admin/products">Admin Products</Link>
            )}
          </div>
          <div className="auth-links">
            {!loading && (
              <>
                {isLoggedIn ? (
                  <div className="user-menu">
                    <button 
                      className="user-menu-button"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      {user?.username}
                    </button>
                    {showUserMenu && (
                      <div className="user-dropdown">
                        <Link to="/account">Account Settings</Link>
                        <Link to="/wishlist">Wishlist</Link>
                        <Link to="/orders">My Orders</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="login-btn">Login</Link>
                    <Link to="/register" className="register-btn">Register</Link>
                  </>
                )}
              </>
            )}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/orders" element={<MyOrders />} />
            {user?.role === 'admin' && (
              <Route path="/admin/products" element={<AdminProducts user={user} />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
