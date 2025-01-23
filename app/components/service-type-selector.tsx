"use client"

import { useState } from "react"
import { Home, Heart, Baby } from "lucide-react"
import { Button } from "app/components/ui/button"

const services = [
  {
    id: "home",
    icon: <Home className="h-6 w-6" />,
    label: "Home Care",
  },
  {
    id: "senior",
    icon: <Heart className="h-6 w-6" />,
    label: "Senior Care",
  },
  {
    id: "child",
    icon: <Baby className="h-6 w-6" />,
    label: "Child Care",
  },
]

export default function ServiceTypeSelector() {
  const [selected, setSelected] = useState("home")

  return (
    <div className="grid grid-cols-3 gap-2">
      {services.map((service) => (
        <Button
          key={service.id}
          variant={selected === service.id ? "default" : "outline"}
          className={`h-auto py-6 px-4 flex flex-col items-center gap-2 hover:bg-gray-100 transition-colors
            ${selected === service.id ? "bg-black text-white hover:bg-black/90" : "bg-white hover:bg-gray-100"}`}
          onClick={() => setSelected(service.id)}
        >
          <div className={`rounded-full p-3 ${selected === service.id ? "bg-white/10" : "bg-gray-100"}`}>
            {service.icon}
          </div>
          <div className="text-sm font-medium">{service.label}</div>
        </Button>
      ))}
    </div>
  )
}

