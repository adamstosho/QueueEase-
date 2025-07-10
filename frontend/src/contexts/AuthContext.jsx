"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (authToken) => {
    setToken(authToken)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
  }

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
