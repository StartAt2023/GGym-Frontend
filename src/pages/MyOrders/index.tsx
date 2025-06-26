import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { useCart } from '../../store/CartContext'
import './styles.css'

interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

const MyOrders: FC = () => {
  const { isLoggedIn } = useAuth()
  const { addToCart } = useCart()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Load orders from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const stored = localStorage.getItem('userOrders')
      if (stored) {
        setOrders(JSON.parse(stored))
      } else {
        // Generate sample orders for demonstration
        const sampleOrders: Order[] = [
          {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            status: 'delivered',
            items: [
              {
                id: 1,
                name: 'Professional Dumbbell Set',
                price: 299,
                image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
                quantity: 1
              },
              {
                id: 2,
                name: 'Resistance Bands Set',
                price: 49,
                image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&h=600&fit=crop',
                quantity: 2
              }
            ],
            total: 397,
            shippingAddress: {
              firstName: 'John',
              lastName: 'Doe',
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            },
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2024-01-20'
          },
          {
            id: 'ORD-2024-002',
            date: '2024-01-20',
            status: 'shipped',
            items: [
              {
                id: 6,
                name: 'Olympic Barbell Set',
                price: 599,
                image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
                quantity: 1
              }
            ],
            total: 599,
            shippingAddress: {
              firstName: 'John',
              lastName: 'Doe',
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            },
            trackingNumber: 'TRK987654321',
            estimatedDelivery: '2024-01-25'
          },
          {
            id: 'ORD-2024-003',
            date: '2024-01-25',
            status: 'processing',
            items: [
              {
                id: 14,
                name: 'Exercise Bike Pro',
                price: 899,
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
                quantity: 1
              },
              {
                id: 17,
                name: 'Heart Rate Monitor',
                price: 199,
                image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop',
                quantity: 1
              }
            ],
            total: 1098,
            shippingAddress: {
              firstName: 'John',
              lastName: 'Doe',
              address: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            }
          }
        ]
        setOrders(sampleOrders)
        localStorage.setItem('userOrders', JSON.stringify(sampleOrders))
      }
    }
  }, [isLoggedIn])

  // Handle notification
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#f6ad55'
      case 'processing': return '#4299e1'
      case 'shipped': return '#9f7aea'
      case 'delivered': return '#48bb78'
      case 'cancelled': return '#e53e3e'
      default: return '#a0aec0'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pending'
      case 'processing': return 'Processing'
      case 'shipped': return 'Shipped'
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      default: return 'Unknown'
    }
  }

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }, isLoggedIn, () => setShowLoginPrompt(true))
    })
    
    if (isLoggedIn) {
      setNotificationMessage(`All items from order ${order.id} added to cart!`)
      setShowNotification(true)
    }
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <div className="empty-icon">📦</div>
          <h2>Please Login to View Your Orders</h2>
          <p>Sign in to see your order history and track your shipments.</p>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span>✅ {notificationMessage}</span>
          </div>
        </div>
      )}

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your orders and view order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>Start shopping to see your orders here!</p>
          <Link to="/products" className="shop-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.slice(0, 2).map(item => (
                  <div key={item.id} className="order-item">
                    <div 
                      className="item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="more-items">
                    +{order.items.length - 2} more items
                  </div>
                )}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total: ${order.total}</span>
                </div>
                <div className="order-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                  <button 
                    className="reorder-btn"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - #{selectedOrder.id}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowOrderDetails(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-summary">
                <div className="summary-item">
                  <span className="label">Order Date:</span>
                  <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Status:</span>
                  <span 
                    className="status-text"
                    style={{ color: getStatusColor(selectedOrder.status) }}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="summary-item">
                    <span className="label">Tracking Number:</span>
                    <span>{selectedOrder.trackingNumber}</span>
                  </div>
                )}
                {selectedOrder.estimatedDelivery && (
                  <div className="summary-item">
                    <span className="label">Estimated Delivery:</span>
                    <span>{new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="shipping-address">
                <h3>Shipping Address</h3>
                <p>
                  {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}<br />
                  {selectedOrder.shippingAddress.address}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}<br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              <div className="order-items-detail">
                <h3>Order Items</h3>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="detail-item">
                    <div 
                      className="item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Subtotal: ${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total-detail">
                <h3>Order Total: ${selectedOrder.total}</h3>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="reorder-btn"
                onClick={() => {
                  handleReorder(selectedOrder)
                  setShowOrderDetails(false)
                }}
              >
                Reorder All Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyOrders 