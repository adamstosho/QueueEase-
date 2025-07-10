"use client"
import { Users, RefreshCw } from "lucide-react"
import { useApi } from "../hooks/useApi"
import apiService from "../services/api"
import AddToQueueForm from "../components/queue/AddToQueueForm"
import QueueList from "../components/queue/QueueList"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const QueuePage = () => {
  const { data: queue, loading, refetch } = useApi(() => apiService.getQueue(), [])

  const waitingCount = queue?.filter((item) => item.status === "waiting").length || 0

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Queue Management</h1>
        <p className="text-gray-600">Join the queue or view current status</p>
      </div>

      {/* Stats */}
      <div className="card text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Users className="w-6 h-6 text-primary-600" />
          <span className="text-2xl font-bold text-gray-900">
            {loading ? <LoadingSpinner size="sm" /> : waitingCount}
          </span>
        </div>
        <p className="text-gray-600">{waitingCount === 1 ? "person waiting" : "people waiting"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add to Queue Form */}
        <div className="lg:col-span-1">
          <AddToQueueForm onSuccess={refetch} />
        </div>

        {/* Queue List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Current Queue</h2>
            <button
              onClick={refetch}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <QueueList queue={queue} onUpdate={refetch} />
        </div>
      </div>
    </div>
  )
}

export default QueuePage
