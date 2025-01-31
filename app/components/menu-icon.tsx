"use client"

interface MenuIconProps {
  isOpen: boolean
}

export default function MenuIcon({ isOpen }: MenuIconProps) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <span
        className={`absolute h-[2.5px] bg-current transition-all duration-300 ${
          isOpen ? "w-6 top-1/2 -translate-y-1/2 rotate-45" : "w-6 top-[38%]"
        }`}
      />
      <span
        className={`absolute h-[2.5px] bg-current transition-all duration-300 ${
          isOpen ? "w-6 top-1/2 -translate-y-1/2 -rotate-45" : "w-6 top-[62%]"
        }`}
      />
    </div>
  )
}

