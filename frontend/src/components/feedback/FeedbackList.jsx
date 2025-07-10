import { Star, MessageSquare, Calendar } from "lucide-react"
import LoadingSpinner from "../ui/LoadingSpinner"

const FeedbackList = ({ feedback, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-warning-500 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (!feedback || feedback.length === 0) {
    return (
      <div className="card text-center py-8">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
        <p className="text-gray-600">Be the first to share your experience!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <div key={item._id} className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              {renderStars(item.rating)}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>

          {item.comment && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{item.comment}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FeedbackList
