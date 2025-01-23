"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader } from "@googlemaps/js-api-loader"
import { X } from "lucide-react"

interface LocationInputProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void
  initialValue?: string
  placeholder?: string
}

export default function LocationInput({
  onLocationSelect,
  initialValue = "",
  placeholder = "Enter pickup location",
}: LocationInputProps) {
  const [address, setAddress] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const initAutocomplete = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          version: "weekly",
          libraries: ["places"],
        })

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
              setError(null)
            } else {
              setError("Please select a valid address")
            }
          })
        }
      } catch (error) {
        console.error("Error initializing Google Places Autocomplete:", error)
        setError("Failed to load location service")
      } finally {
        setIsLoading(false)
      }
    }

    initAutocomplete()
  }, [onLocationSelect])

  const clearAddress = () => {
    setAddress("")
    setError(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        className="pr-10 bg-gray-100 border-none"
        aria-label="Location input"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "location-error" : undefined}
        disabled={isLoading}
      />
      {address && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={clearAddress}
          aria-label="Clear address"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {error && (
        <p id="location-error" className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

