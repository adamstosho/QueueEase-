import { Users, CheckCircle, XCircle, Clock } from "lucide-react"
import LoadingSpinner from "../ui/LoadingSpinner"

const StatsCards = ({ stats, loading }) => {
  const cards = [
    {
      title: "Waiting",
      value: stats?.waiting || 0,
      icon: Clock,
      color: "warning",
      bgColor: "bg-warning-50",
      iconColor: "text-warning-600",
    },
    {
      title: "Served",
      value: stats?.served || 0,
      icon: CheckCircle,
      color: "success",
      bgColor: "bg-success-50",
      iconColor: "text-success-600",
    },
    {
      title: "Skipped",
      value: stats?.skipped || 0,
      icon: XCircle,
      color: "gray",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      title: "Total",
      value: (stats?.waiting || 0) + (stats?.served || 0) + (stats?.skipped || 0),
      icon: Users,
      color: "primary",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.title} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <div className="flex items-center">
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
