"use client"

import { useState } from "react"
import CustomDatepicker from "@/components/custom-datepicker"
import MapboxMap from "./components/mapbox-map"
import LocationInput from "./components/location-input"
import ServiceTypeSelector from "./components/service-type-selector"
import { SeePricesButton } from "@/components/ui/see-prices-button"
import { TimePicker } from "@/components/time-picker"
import dayjs from "dayjs"

const DEFAULT_LOCATION = { lat: 44.9778, lng: -93.265 }

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address?: string } | null>(
    DEFAULT_LOCATION,
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>("Now")
  const [isToday, setIsToday] = useState(true)

  const handleLocationSelect = (location: { lat: number; lng: number; address?: string } | null) => {
    setSelectedLocation(location)
  }

  const handleDateChange = (date: Date | null, isToday: boolean) => {
    setSelectedDate(date)
    setIsToday(isToday)
    if (!date) {
      setSelectedTime(null)
    } else if (isToday) {
      const now = dayjs()
      const nextAvailableTime = now.minute() < 30 ? now.minute(30) : now.add(1, "hour").minute(0)
      setSelectedTime(nextAvailableTime.format("h:mm A"))
    } else {
      setSelectedTime("12:00 PM")
    }
  }

  const handleTimeChange = (time: string | null, date: Date | null) => {
    setSelectedTime(time)
    if (date) {
      setSelectedDate(date)
    }
  }

  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[450px,1fr] gap-6 lg:gap-[150px] max-w-[1200px] mx-auto">
        <div className="w-full max-w-[450px] mx-auto md:mx-0 lg:max-w-none">
          <h1 className="text-[40px] leading-[1.1] font-bold mb-12">Home care anywhere with Homir</h1>

          <ServiceTypeSelector />

          <div className="mt-12 space-y-4">
            <LocationInput onLocationSelect={handleLocationSelect} initialValue={selectedLocation?.address || ""} />

            <div className="grid grid-cols-2 gap-4">
              <CustomDatepicker
                onChange={handleDateChange}
                onClear={() => {
                  setSelectedDate(null)
                  setSelectedTime("Now")
                }}
                selectedDate={selectedDate}
              />
              <TimePicker
                selectedDate={selectedDate}
                isToday={isToday}
                onChange={handleTimeChange}
                containerClassName="w-full"
                buttonClassName="time-picker-button"
                dropdownClassName="time-picker-dropdown"
                optionClassName="time-picker-option"
              />
            </div>

            <div className="w-full">
              <SeePricesButton className="w-[30%]">See prices</SeePricesButton>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] md:h-[calc(100vh-200px)] lg:h-auto lg:aspect-square max-w-none md:max-w-none lg:max-w-[500px] lg:max-h-[500px] mx-auto lg:ml-0 mt-6 md:mt-0">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <MapboxMap center={selectedLocation || DEFAULT_LOCATION} zoom={14} selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </main>
  )
}

