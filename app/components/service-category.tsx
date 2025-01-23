import { Home, Users, Heart } from "lucide-react"
import Link from "next/link"

interface ServiceCategoryProps {
  type: "HOME_CARE" | "SENIOR_CARE" | "CHILD_CARE"
  label: string
}

export function ServiceCategory({ type, label }: ServiceCategoryProps) {
  const icons = {
    HOME_CARE: Home,
    SENIOR_CARE: Users,
    CHILD_CARE: Heart,
  }

  const Icon = icons[type]

  return (
    <Link
      href={`/register?role=RECIPIENT&service=${type}`}
      className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-2">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

