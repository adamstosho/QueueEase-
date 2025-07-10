"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (apiCall, options = {}) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      if (options.successMessage) {
        toast.success(options.successMessage)
      }

      return result
    } catch (err) {
      setError(err.message)

      if (options.onError) {
        options.onError(err)
      } else {
        toast.error(err.message)
      }

      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
