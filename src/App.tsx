import type { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">EzCart</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <div className="dropdown">
              <button className="dropbtn">Categories</button>
              <div className="dropdown-content">
                <Link to="/products?category=strength">Strength Training</Link>
                <Link to="/products?category=cardio">Cardio Equipment</Link>
                <Link to="/products?category=yoga">Yoga & Recovery</Link>
                <Link to="/products?category=accessories">Fitness Accessories</Link>
                <Link to="/products?category=wearables">Fitness Wearables</Link>
              </div>
            </div>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="nav-auth">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
