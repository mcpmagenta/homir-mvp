"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@googlemaps/js-api-loader"
import { X, MapPin } from "lucide-react"
import type * as google from "@googlemaps/google-maps-services-js"

interface LocationInputProps {
  onLocationSelect: (location: { lat: number; lng: number; address?: string } | null) => void
  initialValue?: string
}

export default function LocationInput({ onLocationSelect, initialValue = "" }: LocationInputProps) {
  const [address, setAddress] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAutocomplete = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places"],
      })

      try {
        let google: google.maps // Declare google variable with type
        google = await loader.load()
        if (inputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ["geometry", "formatted_address"],
            types: ["address"],
          })

          // Apply custom styles to the autocomplete dropdown
          if (containerRef.current) {
            const pacContainer = containerRef.current.querySelector(".pac-container") as HTMLElement
            // Removed lines:
            // if (pacContainer) {
            //   // Remove default styles
            //   pacContainer.style.border = "none"
            //   pacContainer.style.background = "white"
            //   pacContainer.style.borderRadius = "8px"
            //   pacContainer.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
            //   pacContainer.style.marginTop = "4px"
            //   pacContainer.style.fontSize = "14px"
            //   pacContainer.style.padding = "8px 0"
            // }
          }

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace()
            if (place?.geometry?.location) {
              const formattedAddress = place.formatted_address || ""
              setAddress(formattedAddress)
              onLocationSelect({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: formattedAddress,
              })
            }
          })
        }
      } catch (error) {
        console.error("Error initializing Google Places Autocomplete:", error)
      }
    }

    initAutocomplete()

    // Add custom styles to override Google's default styles
    const style = document.createElement("style")
    style.textContent = `
.pac-container {
  border: none !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  font-family: inherit !important;
  margin-top: 4px !important;
  padding: 0 !important;
  z-index: 100 !important;
}
.pac-item {
  padding: 12px 16px !important;
  cursor: pointer !important;
  font-family: inherit !important;
  font-size: 16px !important;
  line-height: 24px !important;
  border: none !important;
  color: #000000 !important;
}
.pac-item-query {
  font-size: 16px !important;
  padding-right: 4px !important;
  color: #000000 !important;
}
.pac-item span:not(.pac-item-query) {
  color: #000000 !important;
  font-size: 16px !important;
  margin-left: 0 !important;
}
.pac-item-selected, .pac-item:hover, .pac-item:active {
  background-color: #F3F3F3 !important;
}
.pac-matched {
  font-weight: normal !important;
}
.pac-logo:after {
  display: none !important;
}
.pac-icon {
  display: none !important;
}
.pac-item {
  padding-left: 16px !important;
}
input::placeholder {
  color: #5E5E5E !important;
}
input {
  color: #000000 !important;
}
`
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [onLocationSelect])

  const clearAddress = () => {
    setAddress("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
    onLocationSelect(null)
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[52px] rounded-[12px] border-2 transition-colors ${
        isFocused ? "bg-white border-black" : "bg-[#F3F3F3] hover:bg-[#EAEAEA] border-transparent"
      }`}
    >
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter home care location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-11 pr-10 h-[48px] text-base border-0 shadow-none focus:ring-0 bg-transparent rounded-none text-black placeholder-[#5E5E5E]"
        />
        {address && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
            onClick={clearAddress}
          >
            <X className="h-4 w-4 text-black" />
          </Button>
        )}
      </div>
    </div>
  )
}

