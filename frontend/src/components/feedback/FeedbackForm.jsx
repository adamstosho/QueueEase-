"use client"

import { useState } from "react"
import { Star, Send } from "lucide-react"
import { useApiMutation } from "../../hooks/useApi"
import apiService from "../../services/api"
import LoadingSpinner from "../ui/LoadingSpinner"

const FeedbackForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  })

  const { mutate, loading } = useApiMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || formData.rating === 0) {
      return
    }

    await mutate(() => apiService.submitFeedback(formData), {
      successMessage: "Thank you for your feedback!",
      onSuccess: () => {
        setFormData({ name: "", rating: 0, comment: "" })
        onSuccess?.()
      },
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Star className="w-5 h-5 text-warning-500" />
        <h2 className="text-lg font-semibold text-gray-900">Share Your Feedback</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded transition-colors duration-200 ${
                  star <= formData.rating ? "text-warning-500" : "text-gray-300 hover:text-warning-400"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating > 0 && `${formData.rating} star${formData.rating > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment (Optional)
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="input-field"
            rows="4"
            placeholder="Tell us about your experience..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.name.trim() || formData.rating === 0}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default FeedbackForm
