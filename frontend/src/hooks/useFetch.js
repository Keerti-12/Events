/**
 * Custom hook for fetching data from API
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Generic data fetching hook
 * @param {Function} fetchFunction - API function to call
 * @param {Array} dependencies - Dependencies for useEffect
 * @param {Object} options - Additional options
 */
export const useFetch = (fetchFunction, dependencies = [], options = {}) => {
  const { immediate = true, initialData = null } = options
  
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFunction(...args)
      // Handle paginated responses (data.results) or direct data
      const result = response.data?.results !== undefined ? response.data.results : response.data
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, dependencies)

  return { data, loading, error, execute, setData }
}

export default useFetch
