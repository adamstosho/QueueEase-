"use client"
import { RefreshCw } from "lucide-react"
import { useApi } from "../hooks/useApi"
import apiService from "../services/api"
import FeedbackForm from "../components/feedback/FeedbackForm"
import FeedbackList from "../components/feedback/FeedbackList"

const FeedbackPage = () => {
  const { data: feedback, loading, refetch } = useApi(() => apiService.getFeedback(), [])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback</h1>
        <p className="text-gray-600">Share your experience and read what others say</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feedback Form */}
        <div className="lg:col-span-1">
          <FeedbackForm onSuccess={refetch} />
        </div>

        {/* Feedback List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Feedback</h2>
            <button
              onClick={refetch}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <FeedbackList feedback={feedback} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
