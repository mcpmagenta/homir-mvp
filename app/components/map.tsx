"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface MapProps {
  center: { lat: number; lng: number }
  zoom?: number
  onLocationChange?: (location: { lat: number; lng: number }) => void
}

export function Map({ center, zoom = 12, onLocationChange }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      })

      const { Map, Marker } = await loader.importLibrary("maps")

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: true,
          zoomControl: true,
        })

        markerRef.current = new Marker({
          position: center,
          map,
          draggable: true,
        })

        if (onLocationChange) {
          markerRef.current.addListener("dragend", () => {
            const position = markerRef.current?.getPosition()
            if (position) {
              onLocationChange({
                lat: position.lat(),
                lng: position.lng(),
              })
            }
          })
        }
      }
    }

    initMap()
  }, [center, zoom, onLocationChange])

  return <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
}

