import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Home: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
      title: 'Professional Fitness Equipment',
      description: 'High-quality equipment for your fitness journey'
    },
    {
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      title: 'Cardio Solutions',
      description: 'Advanced cardio equipment for effective workouts'
    },
    {
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      title: 'Yoga & Recovery',
      description: 'Essential equipment for flexibility and recovery'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const categories = [
    {
      title: 'Strength Training',
      description: 'Professional equipment for building strength and muscle',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
      link: '/products?category=strength'
    },
    {
      title: 'Cardio Equipment',
      description: 'Advanced cardio machines for effective workouts',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      link: '/products?category=cardio'
    },
    {
      title: 'Yoga & Recovery',
      description: 'Essential equipment for flexibility and recovery',
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      link: '/products?category=yoga'
    }
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="logo-container">
          <h1>EzCart</h1>
          <p>Your One-Stop Shop for Professional Fitness Equipment</p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <Link to="/products" className="cta-button">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Our Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link to={category.link} className="category-link">
                  Explore More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Quality Equipment</h3>
              <p>Professional-grade fitness equipment for optimal results</p>
            </div>
            <div className="feature">
              <h3>Expert Support</h3>
              <p>Professional guidance and customer service</p>
            </div>
            <div className="feature">
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="feature">
              <h3>Warranty Service</h3>
              <p>Comprehensive warranty and after-sales support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 