import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const CheckoutSuccess: FC = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(20)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="success-page">
      <div className="success-content">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22,4 12,14.01 9,11.01"></polyline>
          </svg>
        </div>
        
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <p>We will ship your items within 3-5 business days.</p>
        
        <div className="countdown-section">
          <p>Page will automatically redirect to home in <span className="countdown-number">{countdown}</span> seconds</p>
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          className="back-home-btn"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default CheckoutSuccess 