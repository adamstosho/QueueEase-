import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import Layout from "./components/layout/Layout"
import QueuePage from "./pages/QueuePage"
import FeedbackPage from "./pages/FeedbackPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<QueuePage />} />
              <Route path="/queue" element={<QueuePage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
