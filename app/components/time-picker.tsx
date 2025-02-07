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

const generateTimeOptions = (isToday: boolean) => {
  const now = dayjs()
  const options = []

  if (isToday) {
    let nextTime = now.minute() < 30 ? now.startOf("hour").add(30, "minute") : now.startOf("hour").add(1, "hour")
    while (nextTime.isBefore(now.endOf("day"))) {
      options.push(nextTime.format("h:mm A"))
      nextTime = nextTime.add(30, "minute")
    }
  } else {
    let startTime = now.startOf("day")
    while (startTime.isBefore(now.endOf("day"))) {
      options.push(startTime.format("h:mm A"))
      startTime = startTime.add(30, "minute")
    }
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
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [timeOptions, setTimeOptions] = useState<string[]>([])

  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      dropdownRef.current.style.top = `${buttonRect.height}px`
      dropdownRef.current.style.bottom = "auto"
      dropdownRef.current.style.maxHeight = "240px" // Consistent height
    }
  }, [])

  useEffect(() => {
    setTimeOptions(generateTimeOptions(isToday))

    if (selectedDate) {
      if (isToday) {
        const currentTime = dayjs()
        setSelectedTime(getNextAvailableTime(currentTime).format("h:mm A"))
      } else {
        setSelectedTime("12:00 PM")
      }
    } else {
      setSelectedTime(null)
    }
  }, [selectedDate, isToday])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleResizeAndScroll = () => {
      if (isOpen) {
        updateDropdownPosition()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("resize", handleResizeAndScroll)
    window.addEventListener("scroll", handleResizeAndScroll, true)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("resize", handleResizeAndScroll)
      window.removeEventListener("scroll", handleResizeAndScroll, true)
    }
  }, [isOpen, updateDropdownPosition])

  const toggleTimeDropdown = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition()
    }
  }, [isOpen, updateDropdownPosition])

  useEffect(() => {
    if (isOpen && dropdownRef.current && selectedTime) {
      const selectedElement = dropdownRef.current.querySelector(`[data-time="${selectedTime}"]`) as HTMLElement
      if (selectedElement) {
        const containerRect = dropdownRef.current.getBoundingClientRect()
        const elementRect = selectedElement.getBoundingClientRect()
        const scrollOffset = elementRect.top - containerRect.top - containerRect.height / 2 + elementRect.height / 2
        dropdownRef.current.scrollTop = scrollOffset
      }
    }
  }, [isOpen, selectedTime])

  const handleTimeSelect = (time: string) => {
    const newSelectedTime = time === "Now" ? null : time
    setSelectedTime(newSelectedTime)
    setIsOpen(false)
    onChange(newSelectedTime, selectedDate)
  }

  return (
    <div ref={containerRef} className={`relative w-full ${containerClassName}`}>
      <button
        ref={buttonRef}
        onClick={toggleTimeDropdown}
        type="button"
        className={`
          flex items-center w-full h-[52px] px-3 text-[16px] rounded-[12px] cursor-pointer transition-all
          ${isOpen ? "bg-white border-2 border-black" : "bg-[#F3F3F3] hover:bg-[#EAEAEA] border-2 border-transparent"}
          ${selectedTime ? "text-black" : "text-[#5E5E5E]"}
          ${buttonClassName}
        `}
      >
        <Clock className="h-5 w-5 text-black mr-3" />
        <span className="text-left flex-1 text-[16px] font-normal">{selectedTime || "Now"}</span>
        <ChevronDown className="h-5 w-5 text-black" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 w-full z-50 bg-white rounded-[12px] shadow-lg ${dropdownClassName}`}
          style={{
            maxHeight: "240px",
            overflowY: "auto",
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

