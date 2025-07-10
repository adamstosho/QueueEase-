"use client"
import { BarChart3, RefreshCw } from "lucide-react"
import { useApi } from "../hooks/useApi"
import apiService from "../services/api"
import StatsCards from "../components/admin/StatsCards"
import FeedbackList from "../components/feedback/FeedbackList"

const AdminDashboardPage = () => {
  const { data: stats, loading: statsLoading, refetch: refetchStats } = useApi(() => apiService.getStats(), [])
  const {
    data: feedback,
    loading: feedbackLoading,
    refetch: refetchFeedback,
  } = useApi(() => apiService.getFeedback(), [])

  const handleRefresh = () => {
    refetchStats()
    refetchFeedback()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor queue statistics and customer feedback</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Queue Statistics</h2>
        </div>
        <StatsCards stats={stats} loading={statsLoading} />
      </div>

      {/* Feedback Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Customer Feedback</h2>
          <div className="text-sm text-gray-600">{feedback?.length || 0} total feedback entries</div>
        </div>
        <FeedbackList feedback={feedback} loading={feedbackLoading} />
      </div>
    </div>
  )
}

export default AdminDashboardPage
