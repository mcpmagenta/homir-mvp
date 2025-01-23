"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Card } from "app/components/ui/card"
import Map from "./components/map"
import LocationInput from "./components/location-input"
import ServiceTypeSelector from "./components/service-type-selector"

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>({
    lat: 44.9778,
    lng: -93.265,
  })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting user location:", error)
        },
      )
    }
  }, [])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-64px)]">
      {/* Left Section */}
      <div className="w-[450px] p-8 flex flex-col">
        <h1 className="text-4xl font-bold mb-6">Care anywhere with Homir</h1>

        <ServiceTypeSelector />

        <Card className="p-4 mt-6">
          <LocationInput
            onLocationSelect={(location: { lat: number; lng: number }) => setSelectedLocation(location)}
            initialValue={userLocation ? `${userLocation.lat}, ${userLocation.lng}` : ""}
          />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Now
            </Button>
          </div>

          <Button className="w-full mt-4">See prices</Button>
        </Card>
      </div>

      {/* Right Section - Map */}
      <div className="flex-1">
        <Map center={selectedLocation} zoom={14} onLocationChange={setSelectedLocation} userLocation={userLocation} />
      </div>
    </div>
  )
}

