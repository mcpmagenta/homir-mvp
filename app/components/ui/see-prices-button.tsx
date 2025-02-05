"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SeePricesButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SeePricesButton = React.forwardRef<HTMLButtonElement, SeePricesButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex items-center justify-center h-[52px] px-3 text-base font-normal rounded-[12px] bg-black text-white hover:bg-black/90 transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
SeePricesButton.displayName = "SeePricesButton"

