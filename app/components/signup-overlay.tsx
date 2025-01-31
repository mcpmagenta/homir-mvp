"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface SignupOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupOverlay({ isOpen, onClose }: SignupOverlayProps) {
  console.log("SignupOverlay rendered, isOpen:", isOpen)
  const [selectedRole, setSelectedRole] = useState<"caregiver" | "recipient" | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join Homir</DialogTitle>
          <DialogDescription className="text-center text-base">Choose how you want to use Homir</DialogDescription>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid grid-cols-2 gap-6 p-6">
          <button
            onClick={() => setSelectedRole("recipient")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
              selectedRole === "recipient"
                ? "border-[#407A59] bg-[#407A59]/5"
                : "border-border hover:border-[#407A59]/50",
            )}
          >
            <div className="w-16 h-16 rounded-full bg-[#407A59]/10 flex items-center justify-center mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#407A59]"
              >
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 0)"
                  d="M11 8.75c0.8-0.8 2.2-0.8 3 0s0.8 2.2 0 3l-3 3-3-3c-0.8-0.8-0.8-2.2 0-3s2.2-0.8 3 0"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Looking for care</h3>
            <p className="text-sm text-center text-muted-foreground">
              Find and book trusted caregivers for your family
            </p>
          </button>

          <button
            onClick={() => setSelectedRole("caregiver")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
              selectedRole === "caregiver"
                ? "border-[#407A59] bg-[#407A59]/5"
                : "border-border hover:border-[#407A59]/50",
            )}
          >
            <div className="w-16 h-16 rounded-full bg-[#407A59]/10 flex items-center justify-center mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#407A59]"
              >
                <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a6 6 0 0 1 12 0v2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Become a caregiver</h3>
            <p className="text-sm text-center text-muted-foreground">Find flexible jobs and set your own schedule</p>
          </button>
        </div>

        <div className="flex justify-center px-6 pb-6">
          <Button
            className="w-full bg-[#407A59] hover:bg-[#407A59]/90"
            size="lg"
            disabled={!selectedRole}
            onClick={() => {
              if (selectedRole) {
                window.location.href = `/register?role=${selectedRole}`
              }
            }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

