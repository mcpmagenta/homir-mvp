import type React from "react"
import { TimePicker } from "@/components/time-picker"

interface StyledTimePickerProps {
  selectedDate: Date | null
  onChange: (time: string | null, date: Date | null) => void
  containerClassName?: string
  buttonClassName?: string
  isToday: boolean
}

export const StyledTimePicker: React.FC<StyledTimePickerProps> = ({
  selectedDate,
  onChange,
  containerClassName,
  buttonClassName,
  isToday,
}) => {
  return (
    <TimePicker
      selectedDate={selectedDate}
      onChange={onChange}
      containerClassName={containerClassName}
      buttonClassName={buttonClassName}
      isToday={isToday}
    />
  )
}

