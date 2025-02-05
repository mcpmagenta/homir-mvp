"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Clock, ChevronDown } from "lucide-react"
import dayjs from "dayjs"

interface TimePickerProps {
  selectedDate: Date | null
  isToday: boolean
  onChange: (time: string | null, date: Date | null) => void
  containerClassName?: string
  buttonClassName?: string
  dropdownClassName?: string
  optionClassName?: string
}

const generateTimeOptions = (isToday: boolean, currentTime: dayjs.Dayjs) => {
  const options: string[] = []
  let startTime = isToday ? currentTime.add(30 - (currentTime.minute() % 30), "minute") : dayjs().startOf("day")
  const endTime = dayjs().endOf("day")

  while (startTime.isBefore(endTime) || startTime.isSame(endTime)) {
    options.push(startTime.format("h:mm A"))
    startTime = startTime.add(30, "minute")
  }

  return options
}

const getNextAvailableTime = (currentTime: dayjs.Dayjs) => {
  const minutes = currentTime.minute()
  return minutes < 30 ? currentTime.minute(30) : currentTime.add(1, "hour").minute(0)
}

export function TimePicker({
  selectedDate,
  isToday,
  onChange,
  containerClassName = "",
  buttonClassName = "",
  dropdownClassName = "",
  optionClassName = "",
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [timeOptions, setTimeOptions] = useState<string[]>([])

  useEffect(() => {
    const currentTime = dayjs()
    const options = generateTimeOptions(isToday, currentTime)
    if (selectedDate) {
      if (isToday) {
        const nextAvailableTime = getNextAvailableTime(currentTime)
        const formattedTime = nextAvailableTime.format("h:mm A")
        setSelectedTime(formattedTime)
        setTimeOptions(["Now", ...options])
      } else {
        setSelectedTime("12:00 PM")
        setTimeOptions(options)
      }
    } else {
      setSelectedTime(null)
      setTimeOptions(["Now", ...options])
    }
  }, [selectedDate, isToday])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleTimeDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleTimeSelect = (time: string) => {
    const newSelectedTime = time === "Now" ? null : time
    setSelectedTime(newSelectedTime)
    setIsOpen(false)
    onChange(newSelectedTime, selectedDate)
    setTimeout(() => scrollToSelectedTime(), 0)
  }

  const scrollToSelectedTime = useCallback(() => {
    if (dropdownRef.current && selectedTime) {
      const selectedElement = dropdownRef.current.querySelector(`[data-time="${selectedTime}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "center", behavior: "auto" })
      }
    }
  }, [selectedTime])

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToSelectedTime, 0)
    }
  }, [isOpen, scrollToSelectedTime])

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <button
        ref={buttonRef}
        onClick={toggleTimeDropdown}
        type="button"
        className={`
          flex items-center w-full h-[52px] px-3 text-[16px] rounded-[12px] cursor-pointer transition-colors
          ${isOpen ? "bg-white border-2 border-black" : "bg-[#F3F3F3] hover:bg-[#EAEAEA] border-2 border-transparent"}
          ${selectedTime ? "text-black" : "text-[#5E5E5E]"}
        `}
      >
        <Clock className="h-5 w-5 text-black mr-3" />
        <span className="text-left flex-1 text-[16px] font-normal">{selectedTime || "Now"}</span>
        <ChevronDown className="h-5 w-5 text-black" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            absolute z-50 w-full bg-white rounded-[12px] shadow-lg mt-2 overflow-auto
            ${dropdownClassName}
          `}
          style={{
            maxHeight: "240px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="py-1">
            {timeOptions.map((time) => (
              <button
                key={time}
                data-time={time}
                className={`
                  w-full text-left px-4 py-3 text-[16px] transition-colors hover:bg-[#F3F3F3]
                  ${time === selectedTime ? "bg-[#F3F3F3] font-medium" : ""}
                  ${optionClassName}
                `}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

