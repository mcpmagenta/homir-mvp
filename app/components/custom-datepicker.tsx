"use client"

import React, { useState, useEffect, useRef, forwardRef } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react"
import dayjs from "dayjs"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface CustomDatepickerProps {
  onChange?: (date: Date | null, isToday: boolean) => void
  onClear?: () => void
  selectedDate: Date | null
}

const CustomDatepicker = forwardRef<HTMLDivElement, CustomDatepickerProps>(
  ({ onChange, onClear, selectedDate }, ref) => {
    const currentDate = dayjs()
    const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(dayjs(selectedDate) || dayjs())
    const [isOpen, setIsOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<"month" | "year" | null>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const [calendarPosition, setCalendarPosition] = useState<"top" | "bottom">("bottom")

    const currentYear = dayjs().year()
    const years = Array.from({ length: 6 }, (_, i) => currentYear + i)

    useEffect(() => {
      if (selectedDate) {
        setDisplayDate(dayjs(selectedDate))
      } else {
        setDisplayDate(dayjs())
      }
    }, [selectedDate])

    useEffect(() => {
      const updatePosition = () => {
        if (triggerRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect()
          const spaceAbove = triggerRect.top
          const spaceBelow = window.innerHeight - triggerRect.bottom
          setCalendarPosition(spaceAbove > spaceBelow ? "top" : "bottom")
        }
      }

      if (isOpen) {
        updatePosition()
        window.addEventListener("scroll", updatePosition, true)
        window.addEventListener("resize", updatePosition)
      }
      return () => {
        window.removeEventListener("scroll", updatePosition, true)
        window.removeEventListener("resize", updatePosition)
      }
    }, [isOpen])

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }, [])

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      } else {
        document.removeEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen, handleClickOutside])

    const handleDateChange = (newDate: dayjs.Dayjs) => {
      const isToday = newDate.isSame(dayjs(), "day")
      onChange?.(newDate.toDate(), isToday)
      setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setDisplayDate(dayjs())
      onChange?.(null, false)
      onClear?.()
    }

    const handleMonthClick = (index: number) => {
      const newDate = displayDate.month(index)
      setDisplayDate(newDate)
      setOpenDropdown(null)
    }

    const handleYearClick = (year: number) => {
      const newDate = displayDate.year(year)
      setDisplayDate(newDate)
      setOpenDropdown(null)
    }

    const renderCalendarDays = () => {
      const startOfMonth = displayDate.startOf("month")
      const endOfMonth = displayDate.endOf("month")
      const startDate = startOfMonth.startOf("week")
      const endDate = endOfMonth.endOf("week")

      const days = []
      let day = startDate

      while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
        days.push(day)
        day = day.add(1, "day")
      }

      const today = dayjs().startOf("day")

      return days.map((d) => {
        const isSelected = selectedDate && d.isSame(dayjs(selectedDate), "day")
        const isOutsideMonth = d.month() !== displayDate.month()
        const isPastDate = d.isBefore(today)

        return (
          <button
            key={d.format("YYYY-MM-DD")}
            onClick={() => handleDateChange(d)}
            className={`
              relative w-10 h-10 flex items-center justify-center text-base transition-all duration-200
              ${isOutsideMonth ? "text-[#D4D4D4]" : "text-black"}
              ${isPastDate ? "opacity-50 cursor-not-allowed" : ""}
              ${
                isSelected
                  ? "bg-black text-white rounded-full"
                  : "hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:border-2 hover:before:border-black hover:before:rounded-full"
              }
              disabled:hover:before:border-0
            `}
            disabled={isPastDate}
            aria-selected={isSelected}
            aria-disabled={isPastDate}
          >
            <span className="relative z-10">{d.date()}</span>
          </button>
        )
      })
    }

    return (
      <div ref={ref} className="relative inline-block text-left w-full">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`
            flex items-center w-full h-[52px] px-3 text-[16px] rounded-[12px] cursor-pointer transition-colors
            ${isOpen ? "bg-white border-2 border-black" : "bg-[#F3F3F3] hover:bg-[#EAEAEA] border-2 border-transparent"}
            ${selectedDate ? "text-black" : "text-[#5E5E5E]"}
          `}
        >
          <CalendarIcon className="w-5 h-5 mr-3 text-black flex-shrink-0" />
          <span className="text-left flex-1 font-normal truncate">
            {selectedDate ? dayjs(selectedDate).format("MMM D") : "Today"}
          </span>
          {selectedDate && (
            <div onClick={(e) => handleClear(e)} className="p-1 hover:bg-transparent rounded-full cursor-pointer ml-1">
              <X className="h-4 w-4 text-black" />
            </div>
          )}
        </button>

        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute z-50 bg-white rounded-lg shadow-lg p-5 w-[420px]"
            style={{
              top: calendarPosition === "bottom" ? "calc(100% + 8px)" : "auto",
              bottom: calendarPosition === "top" ? "calc(100% + 8px)" : "auto",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center justify-between px-2 py-2">
              <button
                onClick={() => {
                  const prevMonth = displayDate.subtract(1, "month")
                  if (prevMonth.isAfter(dayjs().startOf("month")) || prevMonth.isSame(dayjs().startOf("month"))) {
                    setDisplayDate(prevMonth)
                  }
                }}
                disabled={displayDate.month() === dayjs().month() && displayDate.year() === dayjs().year()}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "month" ? null : "month")}
                    className="appearance-none bg-transparent pr-6 pl-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer text-base font-semibold"
                  >
                    {months[displayDate.month()]}
                  </button>
                  <ChevronDown className="h-5 w-5 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                  {openDropdown === "month" && (
                    <div className="absolute z-50 mt-1 w-40 bg-white shadow-lg rounded-md py-1 text-sm max-h-48 overflow-y-auto">
                      {months.map((month, index) => {
                        const monthDate = displayDate.month(index)
                        const isPastMonth = monthDate.isBefore(dayjs(), "month")
                        return (
                          <button
                            key={month}
                            onClick={() => handleMonthClick(index)}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100
                              ${displayDate.month() === index ? "font-semibold" : ""}
                              ${isPastMonth ? "text-gray-400 cursor-not-allowed" : ""}
                            `}
                            disabled={isPastMonth}
                          >
                            {month}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "year" ? null : "year")}
                    className="appearance-none bg-transparent pr-6 pl-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer text-base font-semibold"
                  >
                    {displayDate.year()}
                  </button>
                  <ChevronDown className="h-5 w-5 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                  {openDropdown === "year" && (
                    <div className="absolute z-50 mt-1 w-20 bg-white shadow-lg rounded-md py-1 text-sm max-h-48 overflow-y-auto">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearClick(year)}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-100
                            ${displayDate.year() === year ? "font-semibold" : ""}
                          `}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setDisplayDate(displayDate.add(1, "month"))}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>
        )}
      </div>
    )
  },
)

CustomDatepicker.displayName = "CustomDatepicker"

export default CustomDatepicker

