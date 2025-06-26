import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../store/AuthContext'
import './styles.css'

interface UserProfile {
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    newsletter: boolean
  }
}

const AccountSettings: FC = () => {
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      newsletter: true
    }
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Load user profile from localStorage
  useEffect(() => {
    if (isLoggedIn && user) {
      const stored = localStorage.getItem('userProfile')
      if (stored) {
        setProfile(JSON.parse(stored))
      } else {
        // Initialize with user data
        setProfile(prev => ({
          ...prev,
          username: user.username,
          email: user.email
        }))
      }
    }
  }, [isLoggedIn, user])

  const handleProfileChange = (field: keyof UserProfile, value: string | boolean) => {
    if (field === 'preferences') {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...(value as any)
        }
      }))
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile))
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      setLoading(false)
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' })
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="account-settings-page">
        <div className="login-required">
          <div className="login-icon">🔒</div>
          <h2>Please Login to Access Account Settings</h2>
          <p>Sign in to manage your account preferences and profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="account-settings-page">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your profile, security, and preferences</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            📝 Profile Information
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔐 Security & Password
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            ⚙️ Preferences
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h2>Profile Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => handleProfileChange('username', e.target.value)}
                    disabled
                  />
                  <small>Username cannot be changed</small>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => handleProfileChange('city', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={profile.state}
                    onChange={(e) => handleProfileChange('state', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    value={profile.zipCode}
                    onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => handleProfileChange('country', e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="save-btn"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-tab">
              <h2>Change Password</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="save-btn"
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-tab">
              <h2>Notification Preferences</h2>
              <div className="preferences-list">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Email Notifications</h3>
                    <p>Receive order updates and promotions via email</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={profile.preferences.emailNotifications}
                      onChange={(e) => handleProfileChange('preferences', { emailNotifications: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>SMS Notifications</h3>
                    <p>Receive order updates via text message</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={profile.preferences.smsNotifications}
                      onChange={(e) => handleProfileChange('preferences', { smsNotifications: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Newsletter</h3>
                    <p>Receive our monthly newsletter with fitness tips and product updates</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={profile.preferences.newsletter}
                      onChange={(e) => handleProfileChange('preferences', { newsletter: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button 
                className="save-btn"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountSettings 