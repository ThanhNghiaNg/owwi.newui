import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  const stats = [
    {
      title: "Total Income",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: "📈",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Total Expenses",
      value: "$8,234",
      change: "-5.2%",
      trend: "down",
      icon: "📉",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      textColor: "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Net Income",
      value: "$4,111",
      change: "+8.1%",
      trend: "up",
      icon: "💰",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
      textColor: "text-sky-600 dark:text-sky-400",
    },
    {
      title: "Total Loans",
      value: "$2,500",
      change: "+2.3%",
      trend: "up",
      icon: "🏦",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      textColor: "text-violet-600 dark:text-violet-400",
    },
  ]

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <p className={`text-xs ${stat.textColor}`}>{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
