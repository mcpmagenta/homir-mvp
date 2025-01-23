"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@googlemaps/js-api-loader"
import { X } from "lucide-react"

interface LocationInputProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void
  initialValue?: string
}

export default function LocationInput({ onLocationSelect, initialValue = "" }: LocationInputProps) {
  const [address, setAddress] = useState(initialValue)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const initAutocomplete = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places"],
      })

      try {
        const google = await loader.load()
        if (inputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ["geometry", "formatted_address"],
            types: ["address"],
          })

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace()
            if (place?.geometry?.location) {
              setAddress(place.formatted_address || "")
              onLocationSelect({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              })
            }
          })
        }
      } catch (error) {
        console.error("Error initializing Google Places Autocomplete:", error)
      }
    }

    initAutocomplete()
  }, [onLocationSelect])

  const clearAddress = () => {
    setAddress("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter pickup location"
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        className="pr-10 bg-gray-100 border-none"
      />
      {address && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={clearAddress}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

