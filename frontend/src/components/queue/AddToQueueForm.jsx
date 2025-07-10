"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useApiMutation } from "../../hooks/useApi"
import apiService from "../../services/api"
import LoadingSpinner from "../ui/LoadingSpinner"

const AddToQueueForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    remarks: "",
  })

  const { mutate, loading } = useApiMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim()) {
      return
    }

    await mutate(() => apiService.addToQueue(formData), {
      successMessage: "Successfully added to queue!",
      onSuccess: () => {
        setFormData({ name: "", phone: "", remarks: "" })
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

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Plus className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Join Queue</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
            Remarks (Optional)
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="input-field"
            rows="3"
            placeholder="Any special requirements or notes"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.name.trim() || !formData.phone.trim()}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Join Queue</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default AddToQueueForm
