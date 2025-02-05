"use client"

import { useState } from "react"
import { Heart, Baby } from "lucide-react"

const services = [
  {
    id: "senior",
    icon: <Heart className="h-6 w-6 text-current" />,
    label: "Senior Care",
  },
  {
    id: "child",
    icon: <Baby className="h-6 w-6 text-current" />,
    label: "Child Care",
  },
]

export default function ServiceTypeSelector() {
  const [selected, setSelected] = useState("senior")

  return (
    <div className="flex gap-16">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => setSelected(service.id)}
          className={`flex flex-col items-start gap-3 transition-colors
            ${selected === service.id ? "text-black" : "text-[#5E5E5E]"}
            hover:text-gray-900 focus-visible:outline-none focus-visible:text-gray-900
          `}
        >
          <div className={`rounded-lg p-4 ${selected === service.id ? "bg-[#F3F3F3]" : "bg-transparent"}`}>
            {service.icon}
          </div>
          <span className="text-[15px] font-medium">{service.label}</span>
        </button>
      ))}
    </div>
  )
}

