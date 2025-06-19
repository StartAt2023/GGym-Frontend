import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
  return config
}, (error) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

// Add response interceptor to handle token expiration
api.interceptors.response.use((response) => {
  console.log('API Response:', response.status, response.data)
  return response
}, (error) => {
  console.error('API Error:', {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    url: error.config?.url,
    method: error.config?.method
  })
  
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

// Auth API
export const authAPI = {
  register: async (data: { username: string; email: string; password: string }) => {
    try {
      console.log('Registering user:', { username: data.username, email: data.email })
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error: any) {
      console.error('Registration error:', error)
      throw error
    }
  },

  login: async (data: { username: string; password: string }) => {
    try {
      console.log('Logging in user:', { username: data.username })
      
      // Try to determine if the input is an email or username
      const isEmail = data.username.includes('@')
      const loginData = isEmail 
        ? { email: data.username, password: data.password }
        : { username: data.username, password: data.password }
      
      console.log('Sending login data:', loginData)
      const response = await api.post('/auth/login', loginData)
      console.log('Login response:', response.data)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        console.log('Token stored successfully')
      } else {
        console.warn('No token received in login response')
      }
      
      return response.data
    } catch (error: any) {
      console.error('Login error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getUserInfo: async () => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error: any) {
      console.error('Get user info error:', error)
      throw error
    }
  }
}

export default api 