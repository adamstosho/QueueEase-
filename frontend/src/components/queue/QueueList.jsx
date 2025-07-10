"use client"

import { useState } from "react"
import { Clock, Phone, MessageSquare, Check, X, Trash2 } from "lucide-react"
import { useApiMutation } from "../../hooks/useApi"
import apiService from "../../services/api"
import LoadingSpinner from "../ui/LoadingSpinner"
import ConfirmDialog from "../ui/ConfirmDialog"

const QueueList = ({ queue, onUpdate }) => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null, item: null })
  const { mutate, loading } = useApiMutation()

  const handleStatusUpdate = async (id, status) => {
    await mutate(() => apiService.updateQueueStatus(id, status), {
      successMessage: `Status updated to ${status}`,
      onSuccess: onUpdate,
    })
  }

  const handleRemove = async (id) => {
    await mutate(() => apiService.removeFromQueue(id), {
      successMessage: "Removed from queue",
      onSuccess: onUpdate,
    })
  }

  const openConfirmDialog = (action, item) => {
    setConfirmDialog({ isOpen: true, action, item })
  }

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, action: null, item: null })
  }

  const handleConfirm = () => {
    const { action, item } = confirmDialog
    if (action === "remove") {
      handleRemove(item._id)
    } else if (action === "serve") {
      handleStatusUpdate(item._id, "served")
    } else if (action === "skip") {
      handleStatusUpdate(item._id, "skipped")
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      waiting: <span className="status-waiting">Waiting</span>,
      served: <span className="status-served">Served</span>,
      skipped: <span className="status-skipped">Skipped</span>,
    }
    return badges[status] || badges.waiting
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
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

  if (!queue || queue.length === 0) {
    return (
      <div className="card text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No one in queue</h3>
        <p className="text-gray-600">The queue is currently empty.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {queue.map((item, index) => (
          <div key={item._id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 rounded-full font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(item.joinTime)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {item.remarks && (
                  <div className="flex items-start space-x-2 mt-2 p-3 bg-gray-50 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">{item.remarks}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 ml-4">
                {getStatusBadge(item.status)}

                {item.status === "waiting" && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openConfirmDialog("serve", item)}
                      className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors duration-200"
                      title="Mark as served"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openConfirmDialog("skip", item)}
                      className="p-2 text-warning-600 hover:bg-warning-50 rounded-lg transition-colors duration-200"
                      title="Skip"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => openConfirmDialog("remove", item)}
                  className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors duration-200"
                  title="Remove from queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirm}
        title={
          confirmDialog.action === "remove"
            ? "Remove from Queue"
            : confirmDialog.action === "serve"
              ? "Mark as Served"
              : "Skip Customer"
        }
        message={
          confirmDialog.action === "remove"
            ? `Are you sure you want to remove ${confirmDialog.item?.name} from the queue?`
            : confirmDialog.action === "serve"
              ? `Mark ${confirmDialog.item?.name} as served?`
              : `Skip ${confirmDialog.item?.name}?`
        }
        confirmText={
          confirmDialog.action === "remove" ? "Remove" : confirmDialog.action === "serve" ? "Mark Served" : "Skip"
        }
        type={confirmDialog.action === "remove" ? "danger" : "warning"}
      />
    </>
  )
}

export default QueueList
