"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { AlertCircle } from "lucide-react"

interface MapboxMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  selectedLocation?: { lat: number; lng: number; address?: string } | null
}

export default function MapboxMap({ center, zoom = 14, selectedLocation }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const popup = useRef<mapboxgl.Popup | null>(null)
  const geolocate = useRef<mapboxgl.GeolocateControl | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const updateMarkerAndPopup = useCallback(() => {
    if (!map.current || !selectedLocation || !selectedLocation.address) {
      // Remove existing marker and popup if no valid location
      if (marker.current) {
        marker.current.remove()
        marker.current = null
      }
      if (popup.current) {
        popup.current.remove()
        popup.current = null
      }
      return
    }

    // Create new marker
    const el = document.createElement("div")
    el.className = "custom-marker"
    el.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="black"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    `

    marker.current = new mapboxgl.Marker(el).setLngLat([selectedLocation.lng, selectedLocation.lat]).addTo(map.current)

    // Create new popup
    const streetAddress = selectedLocation.address.split(",")[0]
    popup.current = new mapboxgl.Popup({
      offset: 15,
      closeButton: false,
      closeOnClick: false,
      className: "address-popup",
    })
      .setLngLat([selectedLocation.lng, selectedLocation.lat])
      .setHTML(`
        <div class="flex items-center gap-1 py-2 px-3">
          <span class="text-sm font-medium">${streetAddress}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `)
      .addTo(map.current)
  }, [selectedLocation])

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || map.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (!token) {
      setError("Mapbox access token is missing")
      return
    }

    try {
      console.log("Initializing map...")
      mapboxgl.accessToken = token

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [center.lng, center.lat],
        zoom: zoom,
        scrollZoom: false,
      })

      newMap.on("style.load", () => {
        newMap.setPaintProperty("water", "fill-color", "#B3DAFF")
        newMap.setPaintProperty("land", "background-color", "#ECEFF4")
        newMap.setPaintProperty("landuse", "fill-color", "#A7DFB6")
        newMap.setPaintProperty("building", "fill-color", "#EDF0F6")
      })

      newMap.on("load", () => {
        console.log("Map loaded successfully")
        setMapLoaded(true)
        setIsInitializing(false)
        map.current = newMap

        const nav = new mapboxgl.NavigationControl({ showCompass: false })
        geolocate.current = new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        })

        newMap.addControl(geolocate.current, "bottom-right")
        newMap.addControl(nav, "bottom-right")

        geolocate.current.on("geolocate", (e: GeolocationPosition) => {
          const lon = e.coords.longitude
          const lat = e.coords.latitude
          if (!selectedLocation || !selectedLocation.address) {
            newMap.setCenter([lon, lat])
          }
        })

        if (!selectedLocation || !selectedLocation.address) {
          geolocate.current.trigger()
        }

        newMap.resize()
        updateMarkerAndPopup()
      })

      newMap.on("error", (e) => {
        console.error("Mapbox error:", e)
        setError(`Unable to load map: ${e.error?.message || "Unknown error"}`)
      })
    } catch (error) {
      console.error("Error initializing map:", error)
      setError("Failed to initialize map")
    }
  }, [center.lat, center.lng, zoom, selectedLocation, updateMarkerAndPopup])

  useEffect(() => {
    initializeMap()
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [initializeMap])

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([center.lng, center.lat])
      map.current.setZoom(zoom)
    }
  }, [center.lat, center.lng, zoom])

  useEffect(() => {
    if (map.current && mapLoaded) {
      updateMarkerAndPopup()
    }
  }, [mapLoaded, updateMarkerAndPopup])

  useEffect(() => {
    const handleResize = () => {
      if (map.current) {
        map.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .mapboxgl-ctrl-bottom-right {
        flex-direction: column;
        align-items: flex-end;
      }
      .mapboxgl-ctrl-group {
        margin-bottom: 10px;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="relative w-full h-full bg-[#f3f4f6]" style={{ minHeight: "400px" }}>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6] z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6] z-10">
          <div className="flex flex-col items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}

