export const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "income":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "outcome":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "loan":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "borrow":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }