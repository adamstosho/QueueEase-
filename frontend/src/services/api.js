const API_BASE_URL = import.meta.env.VITE_APP_DB_SERVER ||"http://localhost:5000/api" || "https://queueease-byredox.onrender.com/api"


class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      return data
    } catch (error) {
      throw error
    }
  }

  // Queue Management
  async getQueue() {
    return this.request("/queue")
  }

  async addToQueue(userData) {
    return this.request("/queue", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateQueueStatus(id, status) {
    return this.request(`/queue/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  async removeFromQueue(id) {
    return this.request(`/queue/${id}`, {
      method: "DELETE",
    })
  }

  // Admin
  async adminLogin(credentials) {
    return this.request("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  // Feedback
  async submitFeedback(feedbackData) {
    return this.request("/feedback", {
      method: "POST",
      body: JSON.stringify(feedbackData),
    })
  }

  async getFeedback() {
    return this.request("/feedback")
  }

  // Stats
  async getStats() {
    return this.request("/stats")
  }
}

export default new ApiService()
