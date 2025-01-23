"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface MapProps {
  center: { lat: number; lng: number }
  zoom?: number
  onLocationChange?: (location: { lat: number; lng: number }) => void
  userLocation?: { lat: number; lng: number } | null
}

export default function Map({ center, zoom = 14, onLocationChange, userLocation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places"],
      })

      try {
        const google = await loader.load()
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          })

          const marker = new google.maps.Marker({
            position: center,
            map,
            draggable: true,
          })

          if (onLocationChange) {
            marker.addListener("dragend", () => {
              const position = marker.getPosition()
              if (position) {
                onLocationChange({
                  lat: position.lat(),
                  lng: position.lng(),
                })
              }
            })
          }

          if (userLocation) {
            new google.maps.Marker({
              position: userLocation,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            })
          }
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error)
      }
    }

    initMap()
  }, [center, zoom, onLocationChange, userLocation])

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" />
}

