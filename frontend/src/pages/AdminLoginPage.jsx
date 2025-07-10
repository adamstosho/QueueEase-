"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, User, LogIn } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useApiMutation } from "../hooks/useApi"
import apiService from "../services/api"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()
  const { login } = useAuth()
  const { mutate, loading } = useApiMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!credentials.username.trim() || !credentials.password.trim()) {
      return
    }

    await mutate(() => apiService.adminLogin(credentials), {
      successMessage: "Login successful!",
      onSuccess: (data) => {
        login(data.token)
        navigate("/admin/dashboard")
      },
    })
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !credentials.username.trim() || !credentials.password.trim()}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
            <p className="text-sm font-mono text-gray-800">Username: admin</p>
            <p className="text-sm font-mono text-gray-800">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
