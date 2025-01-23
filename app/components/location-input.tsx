"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Loader } from "@googlemaps/js-api-loader"

interface LocationInputProps {
  defaultValue?: string
  onChange?: (location: string, coordinates?: { lat: number; lng: number }) => void
}

export function LocationInput({ defaultValue = "", onChange }: LocationInputProps) {
  const [location, setLocation] = useState(defaultValue)

  const handleChange = async (value: string) => {
    setLocation(value)

    if (onChange) {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          version: "weekly",
        })

        const { Geocoder } = await loader.importLibrary("geocoding")
        const geocoder = new Geocoder()

        const results = await geocoder.geocode({ address: value })
        if (results.results[0]) {
          const { lat, lng } = results.results[0].geometry.location
          onChange(value, { lat: lat(), lng: lng() })
        } else {
          onChange(value)
        }
      } catch (error) {
        onChange(value)
      }
    }
  }

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}

