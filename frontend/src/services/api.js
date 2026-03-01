/**
 * API Service
 * Centralized API calls using Axios
 */

import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.status, error.response.data)
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// ============ Services API ============

/**
 * Get all active services
 */
export const getServices = (params = {}) => {
  return api.get('/services/', { params })
}

/**
 * Get a single service by slug
 */
export const getService = (slug) => {
  return api.get(`/services/${slug}/`)
}

/**
 * Get featured services
 */
export const getServicesFeatured = () => {
  return api.get('/services/featured/')
}

// ============ Gallery API ============

/**
 * Get gallery items with optional filters
 */
export const getGallery = (params = {}) => {
  return api.get('/gallery/', { params })
}

/**
 * Get a single gallery item
 */
export const getGalleryItem = (id) => {
  return api.get(`/gallery/${id}/`)
}

/**
 * Get featured gallery items
 */
export const getGalleryFeatured = () => {
  return api.get('/gallery/featured/')
}

/**
 * Get gallery categories with counts
 */
export const getGalleryCategories = () => {
  return api.get('/gallery/categories/')
}

// ============ Testimonials API ============

/**
 * Get all testimonials
 */
export const getTestimonials = (params = {}) => {
  return api.get('/testimonials/', { params })
}

/**
 * Get featured testimonials
 */
export const getTestimonialsFeatured = () => {
  return api.get('/testimonials/featured/')
}

// ============ Contact API ============

/**
 * Submit a contact inquiry
 */
export const submitContact = (data) => {
  return api.post('/contact/', data)
}

// ============ Booking API ============

/**
 * Submit a booking request
 */
export const submitBooking = (data) => {
  return api.post('/booking/', data)
}

// ============ Site Settings API ============

/**
 * Get site settings
 */
export const getSiteSettings = () => {
  return api.get('/settings/')
}

// ============ Auth API ============

/**
 * Login and get JWT token
 */
export const login = (credentials) => {
  return api.post('/auth/token/', credentials)
}

/**
 * Refresh JWT token
 */
export const refreshToken = (refresh) => {
  return api.post('/auth/token/refresh/', { refresh })
}

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  return api.post('/auth/token/verify/', { token })
}

export default api
